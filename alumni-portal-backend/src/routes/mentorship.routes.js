const express = require('express');
const { query } = require('../config/database');
const { authenticate } = require('../middleware/auth');
const { requireApproved } = require('../middleware/approval');

const router = express.Router();

// ── GET /api/mentorship/mentors — viewable by all logged-in users ──
router.get('/mentors', authenticate, async (req, res) => {
  try {
    const { department, search, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    const conditions = ["is_mentor = TRUE AND approval = 'approved'"];
    const params = [];
    let idx = 1;

    if (department) { conditions.push(`department = $${idx}`); params.push(department); idx++; }
    if (search) {
      conditions.push(`(full_name ILIKE $${idx} OR company ILIKE $${idx} OR skills::text ILIKE $${idx})`);
      params.push(`%${search}%`); idx++;
    }

    const where = conditions.join(' AND ');
    const result = await query(
      `SELECT id, full_name, batch_year, department, course, company, designation, location, skills, bio, avatar_url
       FROM users WHERE ${where} ORDER BY batch_year DESC LIMIT $${idx} OFFSET $${idx + 1}`,
      [...params, parseInt(limit), offset]
    );
    const countResult = await query(`SELECT COUNT(*) FROM users WHERE ${where}`, params);

    res.json({ mentors: result.rows, total: parseInt(countResult.rows[0].count) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch mentors.' });
  }
});

// ── POST /api/mentorship/request/:mentorId — REQUIRES APPROVAL ──
router.post('/request/:mentorId', authenticate, requireApproved, async (req, res) => {
  try {
    const { message, goals } = req.body;
    if (req.user.id === req.params.mentorId) return res.status(400).json({ error: 'Cannot request mentorship from yourself.' });

    const mentor = await query('SELECT id, full_name, is_mentor FROM users WHERE id = $1', [req.params.mentorId]);
    if (mentor.rows.length === 0 || !mentor.rows[0].is_mentor) return res.status(404).json({ error: 'Mentor not found.' });

    await query(
      `INSERT INTO mentorships (mentor_id, mentee_id, message, goals) VALUES ($1, $2, $3, $4)
       ON CONFLICT (mentor_id, mentee_id) DO UPDATE SET message = $3, goals = $4, status = 'pending'`,
      [req.params.mentorId, req.user.id, message || null, goals || null]
    );

    await query(
      `INSERT INTO notifications (user_id, type, title, message) VALUES ($1, 'mentorship', 'New Mentorship Request', $2)`,
      [req.params.mentorId, `${req.user.full_name} has requested your mentorship.`]
    );

    res.json({ message: `Mentorship request sent to ${mentor.rows[0].full_name}!` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send request.' });
  }
});

// ── GET /api/mentorship/my — REQUIRES APPROVAL ──
router.get('/my', authenticate, requireApproved, async (req, res) => {
  try {
    const asMentee = await query(
      `SELECT m.*, u.full_name AS mentor_name, u.company AS mentor_company, u.designation AS mentor_role
       FROM mentorships m JOIN users u ON m.mentor_id = u.id WHERE m.mentee_id = $1 ORDER BY m.created_at DESC`,
      [req.user.id]
    );
    const asMentor = await query(
      `SELECT m.*, u.full_name AS mentee_name, u.batch_year AS mentee_batch, u.department AS mentee_dept
       FROM mentorships m JOIN users u ON m.mentee_id = u.id WHERE m.mentor_id = $1 ORDER BY m.created_at DESC`,
      [req.user.id]
    );
    res.json({ as_mentee: asMentee.rows, as_mentor: asMentor.rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch mentorships.' });
  }
});

// ── PUT /api/mentorship/:id — REQUIRES APPROVAL ──
router.put('/:id', authenticate, requireApproved, async (req, res) => {
  try {
    const { status } = req.body;
    const result = await query(
      'UPDATE mentorships SET status = $1 WHERE id = $2 AND mentor_id = $3 RETURNING *',
      [status, req.params.id, req.user.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Mentorship not found.' });
    res.json({ message: `Mentorship ${status}.`, mentorship: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update mentorship.' });
  }
});

module.exports = router;
