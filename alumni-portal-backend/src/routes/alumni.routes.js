const express = require('express');
const { query } = require('../config/database');
const { authenticate } = require('../middleware/auth');
const { requireApproved } = require('../middleware/approval');

const router = express.Router();

// ── GET /api/alumni — List alumni (viewable by all logged-in users) ──
router.get('/', authenticate, async (req, res) => {
  try {
    const { search, department, batch_year, course, is_mentor, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    const conditions = ["approval = 'approved'"];
    const params = [];
    let idx = 1;

    if (search) {
      conditions.push(`(full_name ILIKE $${idx} OR company ILIKE $${idx} OR location ILIKE $${idx})`);
      params.push(`%${search}%`); idx++;
    }
    if (department) { conditions.push(`department = $${idx}`); params.push(department); idx++; }
    if (batch_year) { conditions.push(`batch_year = $${idx}`); params.push(parseInt(batch_year)); idx++; }
    if (course) { conditions.push(`course = $${idx}`); params.push(course); idx++; }
    if (is_mentor === 'true') { conditions.push('is_mentor = TRUE'); }

    const where = conditions.join(' AND ');
    const countResult = await query(`SELECT COUNT(*) FROM users WHERE ${where}`, params);
    const total = parseInt(countResult.rows[0].count);

    const result = await query(
      `SELECT id, full_name, email, batch_year, department, course, company, designation, location,
              skills, bio, is_mentor, avatar_url, created_at
       FROM users WHERE ${where}
       ORDER BY created_at DESC LIMIT $${idx} OFFSET $${idx + 1}`,
      [...params, parseInt(limit), offset]
    );

    res.json({
      alumni: result.rows,
      pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error('Alumni list error:', err);
    res.status(500).json({ error: 'Failed to fetch alumni.' });
  }
});

// ── GET /api/alumni/:id ──
router.get('/:id', authenticate, async (req, res) => {
  try {
    const result = await query(
      `SELECT id, full_name, email, batch_year, department, course, degree, company, designation,
              location, linkedin_url, skills, bio, is_mentor, avatar_url, created_at
       FROM users WHERE id = $1`, [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Alumni not found.' });

    const conn = await query(
      `SELECT status FROM connections
       WHERE (requester_id = $1 AND receiver_id = $2) OR (requester_id = $2 AND receiver_id = $1)`,
      [req.user.id, req.params.id]
    );

    res.json({ alumni: result.rows[0], connection_status: conn.rows[0]?.status || null });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile.' });
  }
});

// ── POST /api/alumni/:id/connect — REQUIRES APPROVAL ──
router.post('/:id/connect', authenticate, requireApproved, async (req, res) => {
  try {
    if (req.user.id === req.params.id) return res.status(400).json({ error: 'Cannot connect with yourself.' });

    await query(
      `INSERT INTO connections (requester_id, receiver_id, status) VALUES ($1, $2, 'pending')
       ON CONFLICT (requester_id, receiver_id) DO NOTHING`,
      [req.user.id, req.params.id]
    );

    await query(
      `INSERT INTO notifications (user_id, type, title, message) VALUES ($1, 'connection', 'New Connection Request', $2)`,
      [req.params.id, `${req.user.full_name} wants to connect with you.`]
    );

    res.json({ message: 'Connection request sent.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send request.' });
  }
});

// ── GET /api/alumni/stats/overview ──
router.get('/stats/overview', async (req, res) => {
  try {
    const [users, mentors, jobs, events] = await Promise.all([
      query("SELECT COUNT(*) FROM users WHERE approval = 'approved'"),
      query("SELECT COUNT(*) FROM users WHERE is_mentor = TRUE AND approval = 'approved'"),
      query("SELECT COUNT(*) FROM jobs WHERE status = 'approved'"),
      query('SELECT COUNT(*) FROM events WHERE event_date > NOW()'),
    ]);
    res.json({
      total_alumni: parseInt(users.rows[0].count),
      total_mentors: parseInt(mentors.rows[0].count),
      active_jobs: parseInt(jobs.rows[0].count),
      upcoming_events: parseInt(events.rows[0].count),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats.' });
  }
});

module.exports = router;
