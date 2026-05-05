const express = require('express');
const { query } = require('../config/database');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { sendVerificationEmail } = require('../utils/email');

const router = express.Router();

// All admin routes require authentication + admin role
router.use(authenticate);
router.use(requireAdmin);

// ── GET /api/admin/dashboard — Admin overview stats ──
router.get('/dashboard', async (req, res) => {
  try {
    const [total, pending, approved, rejected, jobs, pendingJobs, events, mentors] = await Promise.all([
      query('SELECT COUNT(*) FROM users WHERE role != $1', ['admin']),
      query("SELECT COUNT(*) FROM users WHERE approval = 'pending'"),
      query("SELECT COUNT(*) FROM users WHERE approval = 'approved'"),
      query("SELECT COUNT(*) FROM users WHERE approval = 'rejected'"),
      query('SELECT COUNT(*) FROM jobs'),
      query("SELECT COUNT(*) FROM jobs WHERE status = 'pending'"),
      query('SELECT COUNT(*) FROM events'),
      query('SELECT COUNT(*) FROM users WHERE is_mentor = TRUE'),
    ]);

    res.json({
      total_users: parseInt(total.rows[0].count),
      pending_registrations: parseInt(pending.rows[0].count),
      approved_users: parseInt(approved.rows[0].count),
      rejected_users: parseInt(rejected.rows[0].count),
      total_jobs: parseInt(jobs.rows[0].count),
      pending_jobs: parseInt(pendingJobs.rows[0].count),
      total_events: parseInt(events.rows[0].count),
      total_mentors: parseInt(mentors.rows[0].count),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admin stats.' });
  }
});

// ── GET /api/admin/pending — List all pending registrations ──
router.get('/pending', async (req, res) => {
  try {
    const result = await query(
      `SELECT id, email, full_name, batch_year, department, course, company, designation,
              location, phone, linkedin_url, skills, bio, is_mentor, created_at,
              (SELECT COUNT(*) FROM registration_approvals WHERE applicant_id = users.id AND vote = 'approve') AS approval_votes
       FROM users
       WHERE approval = 'pending' AND role != 'admin'
       ORDER BY created_at DESC`
    );
    res.json({ pending: result.rows });
  } catch (err) {
    console.error('Pending list error:', err);
    res.status(500).json({ error: 'Failed to fetch pending registrations.' });
  }
});

// ── GET /api/admin/all-users — List all users with their status ──
router.get('/all-users', async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;
    const conditions = ["role != 'admin'"];
    const params = [];
    let idx = 1;

    if (status) {
      conditions.push(`approval = $${idx}`);
      params.push(status);
      idx++;
    }

    const where = conditions.join(' AND ');
    const result = await query(
      `SELECT id, email, full_name, batch_year, department, course, company, designation,
              location, approval, role, created_at, approved_at
       FROM users WHERE ${where}
       ORDER BY created_at DESC
       LIMIT $${idx} OFFSET $${idx + 1}`,
      [...params, parseInt(limit), offset]
    );

    const countResult = await query(`SELECT COUNT(*) FROM users WHERE ${where}`, params);

    res.json({
      users: result.rows,
      total: parseInt(countResult.rows[0].count),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

// ── PUT /api/admin/approve/:userId — Approve a registration ──
router.put('/approve/:userId', async (req, res) => {
  try {
    const result = await query(
      `UPDATE users SET approval = 'approved', approved_at = NOW(), approved_by = $1
       WHERE id = $2 AND approval = 'pending'
       RETURNING id, email, full_name, batch_year, department, course`,
      [req.user.id, req.params.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found or already processed.' });
    }

    const approved = result.rows[0];

    // Send approval email notification
    try {
      await sendApprovalEmail(approved.email, approved.full_name);
    } catch (emailErr) {
      console.error('Approval email failed:', emailErr.message);
    }

    // Create in-app notification for the user
    await query(
      `INSERT INTO notifications (user_id, type, title, message)
       VALUES ($1, 'approval', 'Registration Approved!',
       'Congratulations! Your registration as an IIT (ISM) Dhanbad alumni has been approved. You now have full access to all portal features.')`,
      [req.params.userId]
    );

    res.json({ message: `${approved.full_name} has been approved.`, user: approved });
  } catch (err) {
    console.error('Approve error:', err);
    res.status(500).json({ error: 'Failed to approve user.' });
  }
});

// ── PUT /api/admin/reject/:userId — Reject a registration ──
router.put('/reject/:userId', async (req, res) => {
  try {
    const { reason } = req.body;

    const result = await query(
      `UPDATE users SET approval = 'rejected' WHERE id = $1 AND approval = 'pending'
       RETURNING id, email, full_name`,
      [req.params.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found or already processed.' });
    }

    // Notify user
    await query(
      `INSERT INTO notifications (user_id, type, title, message)
       VALUES ($1, 'rejection', 'Registration Not Approved',
       $2)`,
      [req.params.userId, reason || 'Your registration could not be verified. Please contact alumni@iitism.ac.in for assistance.']
    );

    res.json({ message: `${result.rows[0].full_name} has been rejected.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reject user.' });
  }
});

// ── GET /api/admin/pending-jobs — List pending job posts ──
router.get('/pending-jobs', async (req, res) => {
  try {
    const result = await query(
      `SELECT j.*, u.full_name AS posted_by_name, u.batch_year AS posted_by_batch
       FROM jobs j JOIN users u ON j.posted_by = u.id
       WHERE j.status = 'pending'
       ORDER BY j.created_at DESC`
    );
    res.json({ jobs: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending jobs.' });
  }
});

// ── GET /api/admin/notifications — Admin notifications ──
router.get('/notifications', async (req, res) => {
  try {
    const result = await query(
      `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50`,
      [req.user.id]
    );
    res.json({ notifications: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications.' });
  }
});

// ── Helper: send approval email ──
async function sendApprovalEmail(email, name) {
  const { sendVerificationEmail } = require('../utils/email');
  // Reuse the email transporter but with approval content
  const nodemailer = require('nodemailer');

  const html = `
    <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#fdf8f0;border:2px solid #d4b896;border-radius:8px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#7B1E1E,#4a1010);padding:28px;text-align:center;color:#fff;">
        <h1 style="font-family:Georgia,serif;margin:0;font-size:22px;">IIT (ISM) Dhanbad</h1>
        <p style="margin:4px 0 0;font-size:12px;color:#C6A44E;letter-spacing:2px;">ALUMNI NETWORK — CENTENARY YEAR 2026</p>
      </div>
      <div style="padding:28px;">
        <h2 style="color:#16a34a;font-family:Georgia,serif;">🎉 Registration Approved!</h2>
        <p style="color:#5a4a3a;line-height:1.7;">Dear <strong>${name}</strong>,</p>
        <p style="color:#5a4a3a;line-height:1.7;">We are pleased to inform you that your registration on the IIT (ISM) Dhanbad Alumni Portal has been <strong style="color:#16a34a;">approved</strong>.</p>
        <p style="color:#5a4a3a;line-height:1.7;">You now have full access to all portal features including:</p>
        <ul style="color:#5a4a3a;line-height:2;">
          <li>Alumni Directory & Connections</li>
          <li>Job Board & Posting</li>
          <li>Mentorship Program</li>
          <li>Direct Messaging</li>
          <li>Events & RSVP</li>
        </ul>
        <p style="color:#5a4a3a;line-height:1.7;">Welcome to the ISM family! 🏛️</p>
      </div>
      <div style="background:#2c0f0f;padding:14px;text-align:center;color:rgba(255,255,255,0.4);font-size:11px;">
        © 2026 IIT (ISM) Dhanbad Alumni Association — Est. 1926
      </div>
    </div>`;

  if (process.env.NODE_ENV === 'development' && !process.env.SMTP_HOST) {
    console.log(`\n📧 APPROVAL EMAIL (dev mode):`);
    console.log(`   To: ${email}`);
    console.log(`   Status: APPROVED ✅\n`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"IIT (ISM) Alumni Portal" <${process.env.EMAIL_FROM || 'alumni@iitism.ac.in'}>`,
    to: email,
    subject: '✅ Registration Approved — IIT (ISM) Dhanbad Alumni Portal',
    html,
  });
}

module.exports = router;
