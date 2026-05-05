const express = require('express');
const { query } = require('../config/database');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { requireApproved } = require('../middleware/approval');
const { jobValidation } = require('../middleware/validation');

const router = express.Router();

// ── GET /api/jobs — List approved jobs ──
router.get('/', authenticate, async (req, res) => {
  try {
    const { search, job_type, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    const conditions = ["j.status = 'approved'"];
    const params = [];
    let idx = 1;

    if (search) {
      conditions.push(`(j.title ILIKE $${idx} OR j.company ILIKE $${idx} OR j.location ILIKE $${idx})`);
      params.push(`%${search}%`);
      idx++;
    }
    if (job_type) {
      conditions.push(`j.job_type = $${idx}`);
      params.push(job_type);
      idx++;
    }

    const where = conditions.join(' AND ');

    const countResult = await query(`SELECT COUNT(*) FROM jobs j WHERE ${where}`, params);
    const total = parseInt(countResult.rows[0].count);

    const result = await query(
      `SELECT j.*, u.full_name AS posted_by_name, u.batch_year AS posted_by_batch
       FROM jobs j
       JOIN users u ON j.posted_by = u.id
       WHERE ${where}
       ORDER BY j.created_at DESC
       LIMIT $${idx} OFFSET $${idx + 1}`,
      [...params, parseInt(limit), offset]
    );

    res.json({
      jobs: result.rows,
      pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error('Jobs list error:', err);
    res.status(500).json({ error: 'Failed to fetch jobs.' });
  }
});

// ── POST /api/jobs — Create a job post ──
router.post('/', authenticate, requireApproved, jobValidation, async (req, res) => {
  try {
    const { title, company, location, job_type, salary, description, requirements, apply_link, visibility } = req.body;

    // If visibility is 'admin', set status to 'pending'
    const status = visibility === 'admin' ? 'pending' : 'approved';

    const result = await query(
      `INSERT INTO jobs (posted_by, title, company, location, job_type, salary, description, requirements, apply_link, status, visibility)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING *`,
      [req.user.id, title, company, location || null, job_type || 'Full-time', salary || null, description, requirements || null, apply_link || null, status, visibility || 'public']
    );

    // Notify admin if pending
    if (status === 'pending') {
      await query(
        `INSERT INTO notifications (user_id, type, title, message)
         SELECT id, 'job_review', 'New Job Pending Review', $1
         FROM users WHERE role IN ('admin', 'superadmin')`,
        [`${req.user.full_name} submitted a job: ${title} at ${company}`]
      );
    }

    res.status(201).json({
      message: status === 'pending' ? 'Job submitted for admin review.' : 'Job posted successfully!',
      job: result.rows[0],
    });
  } catch (err) {
    console.error('Job create error:', err);
    res.status(500).json({ error: 'Failed to post job.' });
  }
});

// ── GET /api/jobs/:id — Get single job ──
router.get('/:id', authenticate, async (req, res) => {
  try {
    const result = await query(
      `SELECT j.*, u.full_name AS posted_by_name, u.batch_year AS posted_by_batch, u.company AS poster_company
       FROM jobs j JOIN users u ON j.posted_by = u.id WHERE j.id = $1`,
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Job not found.' });

    // Get application count
    const apps = await query('SELECT COUNT(*) FROM job_applications WHERE job_id = $1', [req.params.id]);

    res.json({ job: result.rows[0], applications: parseInt(apps.rows[0].count) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch job.' });
  }
});

// ── POST /api/jobs/:id/apply — Apply to a job ──
router.post('/:id/apply', authenticate, requireApproved, async (req, res) => {
  try {
    const { cover_note } = req.body;
    await query(
      `INSERT INTO job_applications (job_id, applicant_id, cover_note)
       VALUES ($1, $2, $3) ON CONFLICT (job_id, applicant_id) DO NOTHING`,
      [req.params.id, req.user.id, cover_note || null]
    );

    // Notify job poster
    const job = await query('SELECT posted_by, title FROM jobs WHERE id = $1', [req.params.id]);
    if (job.rows.length > 0) {
      await query(
        `INSERT INTO notifications (user_id, type, title, message)
         VALUES ($1, 'application', 'New Job Application', $2)`,
        [job.rows[0].posted_by, `${req.user.full_name} applied to ${job.rows[0].title}`]
      );
    }

    res.json({ message: 'Application submitted!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to apply.' });
  }
});

// ── PUT /api/jobs/:id/approve — Admin: approve/reject job ──
router.put('/:id/approve', authenticate, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body; // 'approved' or 'rejected'
    await query('UPDATE jobs SET status = $1 WHERE id = $2', [status, req.params.id]);
    res.json({ message: `Job ${status}.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update job.' });
  }
});

// ── DELETE /api/jobs/:id — Delete own job ──
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const result = await query('DELETE FROM jobs WHERE id = $1 AND (posted_by = $2 OR $3 IN (SELECT role FROM users WHERE id = $2)) RETURNING id',
      [req.params.id, req.user.id, 'admin']);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Job not found or not authorized.' });
    res.json({ message: 'Job deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete job.' });
  }
});

module.exports = router;
