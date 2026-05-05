const express = require('express');
const { query } = require('../config/database');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// ── GET /api/events — List events ──
router.get('/', async (req, res) => {
  try {
    const { type, upcoming, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    const conditions = [];
    const params = [];
    let idx = 1;

    if (upcoming === 'true') {
      conditions.push('event_date > NOW()');
    }
    if (type) {
      conditions.push(`event_type = $${idx}`);
      params.push(type);
      idx++;
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const result = await query(
      `SELECT e.*, u.full_name AS created_by_name,
              (SELECT COUNT(*) FROM event_rsvps WHERE event_id = e.id AND status = 'attending') AS attendee_count
       FROM events e
       LEFT JOIN users u ON e.created_by = u.id
       ${where}
       ORDER BY e.event_date ASC
       LIMIT $${idx} OFFSET $${idx + 1}`,
      [...params, parseInt(limit), offset]
    );

    const countResult = await query(`SELECT COUNT(*) FROM events ${where}`, params);

    res.json({
      events: result.rows,
      total: parseInt(countResult.rows[0].count),
    });
  } catch (err) {
    console.error('Events error:', err);
    res.status(500).json({ error: 'Failed to fetch events.' });
  }
});

// ── POST /api/events — Create event (admin) ──
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { title, description, event_type, location, event_date, end_date, is_virtual, meeting_link, max_attendees } = req.body;

    const result = await query(
      `INSERT INTO events (created_by, title, description, event_type, location, event_date, end_date, is_virtual, meeting_link, max_attendees)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [req.user.id, title, description, event_type || 'Other', location, event_date, end_date || null, is_virtual || false, meeting_link || null, max_attendees || null]
    );

    res.status(201).json({ message: 'Event created.', event: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event.' });
  }
});

// ── POST /api/events/:id/rsvp — RSVP to event ──
router.post('/:id/rsvp', authenticate, async (req, res) => {
  try {
    const { status } = req.body; // 'attending' or 'not_attending'

    // Check max attendees
    const event = await query('SELECT max_attendees, title FROM events WHERE id = $1', [req.params.id]);
    if (event.rows.length === 0) return res.status(404).json({ error: 'Event not found.' });

    if (event.rows[0].max_attendees) {
      const count = await query(
        "SELECT COUNT(*) FROM event_rsvps WHERE event_id = $1 AND status = 'attending'",
        [req.params.id]
      );
      if (parseInt(count.rows[0].count) >= event.rows[0].max_attendees) {
        return res.status(400).json({ error: 'Event is full.' });
      }
    }

    await query(
      `INSERT INTO event_rsvps (event_id, user_id, status)
       VALUES ($1, $2, $3)
       ON CONFLICT (event_id, user_id) DO UPDATE SET status = $3`,
      [req.params.id, req.user.id, status || 'attending']
    );

    res.json({ message: `RSVP confirmed for ${event.rows[0].title}!` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to RSVP.' });
  }
});

// ── GET /api/events/:id — Get event details ──
router.get('/:id', async (req, res) => {
  try {
    const result = await query(
      `SELECT e.*, u.full_name AS created_by_name,
              (SELECT COUNT(*) FROM event_rsvps WHERE event_id = e.id AND status = 'attending') AS attendee_count
       FROM events e LEFT JOIN users u ON e.created_by = u.id WHERE e.id = $1`,
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Event not found.' });
    res.json({ event: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event.' });
  }
});

module.exports = router;
