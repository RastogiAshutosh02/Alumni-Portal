const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { query, getClient } = require('../config/database');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    const safeExt = ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext) ? ext : '.jpg';
    cb(null, `avatar_${Date.now()}_${Math.round(Math.random() * 1e9)}${safeExt}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype || !file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed for profile photo.'));
    }
    cb(null, true);
  },
});

// ── POST /api/auth/register ──
// No email domain restriction — anyone registers, stays pending until approved
router.post('/register', upload.single('avatar'), async (req, res) => {
  let client;
  try {
    const {
      email, password, full_name, batch_year, department, course,
      phone, company, designation, location, linkedin_url, skills, bio, is_mentor,
    } = req.body;

    if (!email || !password || !full_name) {
      return res.status(400).json({ error: 'Email, password, and full name are required.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    const existing = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const password_hash = await bcrypt.hash(password, 12);
    const skillsArray = skills
      ? (Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()).filter(Boolean))
      : [];
    const mentorFlag = typeof is_mentor === 'string' ? is_mentor === 'true' : !!is_mentor;
    const parsedBatchYear = batch_year ? parseInt(batch_year) : null;
    const avatar_url = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : null;

    client = await getClient();
    await client.query('BEGIN');

    const result = await client.query(
      `INSERT INTO users
       (email, password_hash, full_name, batch_year, department, course, phone, company,
        designation, location, linkedin_url, avatar_url, skills, bio, is_mentor, approval, is_verified)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,'pending',TRUE)
       RETURNING id, email, full_name, role, approval, batch_year, department, course, avatar_url`,
      [email.toLowerCase(), password_hash, full_name, parsedBatchYear, department || null,
       course || null, phone || null, company || null, designation || null, location || null,
       linkedin_url || null, avatar_url, skillsArray, bio || null, mentorFlag]
    );

    const user = result.rows[0];

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Notify admins
    await client.query(
      `INSERT INTO notifications (user_id, type, title, message)
       SELECT id, 'registration', 'New Alumni Registration',
              $1 FROM users WHERE role IN ('admin', 'superadmin')`,
      [`${full_name} (${email}) — Batch ${batch_year || 'N/A'}, ${department || 'N/A'}, ${course || 'N/A'} — needs approval.`]
    );

    // Assign up to 5 random approved alumni from same batch/department/course as peer reviewers.
    let assignedCount = 0;
    if (user.batch_year && user.department && user.course) {
      const assigned = await client.query(
        `INSERT INTO registration_approvals (applicant_id, approver_id, vote, comment)
         SELECT $1, u.id, NULL, NULL
         FROM users u
         WHERE u.approval = 'approved'
           AND u.role = 'alumni'
           AND u.batch_year = $2
           AND u.department = $3
           AND u.course = $4
           AND u.id <> $1
         ORDER BY RANDOM()
         LIMIT 5
         ON CONFLICT (applicant_id, approver_id) DO NOTHING
         RETURNING approver_id`,
        [user.id, user.batch_year, user.department, user.course]
      );

      assignedCount = assigned.rowCount;

      if (assignedCount > 0) {
        await client.query(
          `INSERT INTO notifications (user_id, type, title, message, link)
           SELECT approver_id, 'peer_approval', 'Peer Approval Request', $2, '/admin'
           FROM registration_approvals
           WHERE applicant_id = $1 AND vote IS NULL`,
          [
            user.id,
            `${user.full_name} (${user.email}) from your batch/department/course has requested alumni approval. Please review.`,
          ]
        );
      }
    }

    await client.query('COMMIT');

    res.status(201).json({
      message: assignedCount > 0
        ? 'Registration submitted! Your request is being reviewed by admins and fellow alumni.'
        : 'Registration submitted! Your request is being reviewed.',
      token,
      user: {
        id: user.id, email: user.email, full_name: user.full_name,
        role: user.role, approval: user.approval,
        batch_year: user.batch_year, department: user.department, course: user.course, avatar_url: user.avatar_url,
      },
    });
  } catch (err) {
    if (client) {
      await client.query('ROLLBACK');
    }
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed.' });
  } finally {
    if (client) {
      client.release();
    }
  }
});

// ── POST /api/auth/login ──
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

    const result = await query(
      `SELECT id, email, password_hash, full_name, role, approval, login_attempts, locked_until,
              batch_year, department, course, avatar_url FROM users WHERE email = $1`,
      [email.toLowerCase()]
    );
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid email or password.' });

    const user = result.rows[0];

    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      const mins = Math.ceil((new Date(user.locked_until) - new Date()) / 60000);
      return res.status(423).json({ error: `Account locked. Try again in ${mins} minutes.` });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      const attempts = (user.login_attempts || 0) + 1;
      const lockUntil = attempts >= 5 ? new Date(Date.now() + 5 * 60 * 1000) : null;
      await query('UPDATE users SET login_attempts = $1, locked_until = $2 WHERE id = $3', [attempts, lockUntil, user.id]);
      return res.status(401).json({
        error: attempts >= 5 ? 'Too many failed attempts. Account locked for 5 minutes.' : 'Invalid email or password.',
      });
    }

    await query('UPDATE users SET login_attempts = 0, locked_until = NULL, last_login = NOW() WHERE id = $1', [user.id]);

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: user.approval === 'approved' ? 'Login successful!' : 'Logged in. Registration still pending approval.',
      token,
      user: {
        id: user.id, email: user.email, full_name: user.full_name,
        role: user.role, approval: user.approval,
        batch_year: user.batch_year, department: user.department, course: user.course, avatar_url: user.avatar_url,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed.' });
  }
});

// ── GET /api/auth/me ──
router.get('/me', authenticate, async (req, res) => {
  try {
    const result = await query(
      `SELECT id, email, full_name, phone, avatar_url, batch_year, department, course, degree,
              company, designation, location, linkedin_url, skills, bio,
              is_mentor, role, approval, approved_at, created_at, last_login
       FROM users WHERE id = $1`,
      [req.user.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found.' });
    res.json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile.' });
  }
});

// ── PUT /api/auth/me ──
router.put('/me', authenticate, async (req, res) => {
  try {
    const { full_name, phone, batch_year, department, course, company, designation, location, linkedin_url, skills, bio, is_mentor } = req.body;
    const skillsArray = skills ? (Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()).filter(Boolean)) : undefined;

    const result = await query(
      `UPDATE users SET
        full_name=COALESCE($1,full_name), phone=COALESCE($2,phone), batch_year=COALESCE($3,batch_year),
        department=COALESCE($4,department), course=COALESCE($5,course), company=COALESCE($6,company),
        designation=COALESCE($7,designation), location=COALESCE($8,location), linkedin_url=COALESCE($9,linkedin_url),
        skills=COALESCE($10,skills), bio=COALESCE($11,bio), is_mentor=COALESCE($12,is_mentor)
       WHERE id = $13
       RETURNING id, email, full_name, batch_year, department, course, company, designation, location, skills, bio, is_mentor, approval`,
      [full_name, phone, batch_year, department, course, company, designation, location, linkedin_url, skillsArray, bio, is_mentor, req.user.id]
    );
    res.json({ message: 'Profile updated.', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Profile update failed.' });
  }
});

// ── GET /api/auth/peer-approvals — Pending peer approvals assigned to me ──
router.get('/peer-approvals', authenticate, async (req, res) => {
  try {
    const result = await query(
      `SELECT u.id, u.email, u.full_name, u.batch_year, u.department, u.course,
              u.company, u.designation, u.location, u.bio, u.skills, u.created_at
       FROM registration_approvals ra
       JOIN users u ON u.id = ra.applicant_id
       WHERE ra.approver_id = $1
         AND ra.vote IS NULL
         AND u.approval = 'pending'
       ORDER BY u.created_at DESC`,
      [req.user.id]
    );

    res.json({ pending: result.rows });
  } catch (err) {
    console.error('Peer approvals list error:', err);
    res.status(500).json({ error: 'Failed to fetch peer approvals.' });
  }
});

// ── PUT /api/auth/peer-approvals/:applicantId — Cast peer approval vote ──
router.put('/peer-approvals/:applicantId', authenticate, async (req, res) => {
  let client;
  try {
    const { vote, comment } = req.body;

    if (!['approve', 'reject'].includes(vote)) {
      return res.status(400).json({ error: 'Vote must be either approve or reject.' });
    }

    client = await getClient();
    await client.query('BEGIN');

    const assignment = await client.query(
      `SELECT ra.id, ra.vote AS existing_vote, u.approval, u.full_name, u.email
       FROM registration_approvals ra
       JOIN users u ON u.id = ra.applicant_id
       WHERE ra.applicant_id = $1 AND ra.approver_id = $2
       FOR UPDATE`,
      [req.params.applicantId, req.user.id]
    );

    if (assignment.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(403).json({ error: 'You are not assigned to review this registration.' });
    }

    const target = assignment.rows[0];
    if (target.approval !== 'pending') {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'This registration is already processed.' });
    }
    if (target.existing_vote) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'You have already voted on this registration.' });
    }

    await client.query(
      `UPDATE registration_approvals
       SET vote = $1, comment = $2, created_at = NOW()
       WHERE applicant_id = $3 AND approver_id = $4`,
      [vote, comment || null, req.params.applicantId, req.user.id]
    );

    const votes = await client.query(
      `SELECT
         COUNT(*) FILTER (WHERE vote = 'approve')::int AS approve_count,
         COUNT(*) FILTER (WHERE vote = 'reject')::int AS reject_count
       FROM registration_approvals
       WHERE applicant_id = $1`,
      [req.params.applicantId]
    );

    const approveCount = votes.rows[0].approve_count;
    const rejectCount = votes.rows[0].reject_count;

    let finalStatus = null;
    if (approveCount >= 3) {
      await client.query(
        `UPDATE users
         SET approval = 'approved', approved_at = NOW(), approved_by = $1
         WHERE id = $2 AND approval = 'pending'`,
        [req.user.id, req.params.applicantId]
      );
      finalStatus = 'approved';

      await client.query(
        `INSERT INTO notifications (user_id, type, title, message)
         VALUES ($1, 'approval', 'Registration Approved!',
         'Your registration has been approved by peer reviewers. You now have full access to the portal.')`,
        [req.params.applicantId]
      );
    } else if (rejectCount >= 3) {
      await client.query(
        `UPDATE users SET approval = 'rejected'
         WHERE id = $1 AND approval = 'pending'`,
        [req.params.applicantId]
      );
      finalStatus = 'rejected';

      await client.query(
        `INSERT INTO notifications (user_id, type, title, message)
         VALUES ($1, 'rejection', 'Registration Not Approved',
         'Your registration was not approved by peer reviewers. Please contact the alumni team for help.')`,
        [req.params.applicantId]
      );
    }

    // Keep admins informed whenever a peer vote is cast.
    await client.query(
      `INSERT INTO notifications (user_id, type, title, message, link)
       SELECT id, 'peer_vote', 'Peer Review Vote Submitted', $1, '/admin'
       FROM users WHERE role IN ('admin', 'superadmin')`,
      [
        `${req.user.full_name} voted '${vote}' for ${target.full_name} (${target.email}). ` +
        `Current tally: ${approveCount} approve, ${rejectCount} reject.`,
      ]
    );

    await client.query('COMMIT');

    res.json({
      message: finalStatus
        ? `Vote recorded. Registration ${finalStatus} by peer decision.`
        : 'Vote recorded successfully.',
      votes: {
        approve: approveCount,
        reject: rejectCount,
      },
      final_status: finalStatus,
    });
  } catch (err) {
    if (client) {
      await client.query('ROLLBACK');
    }
    console.error('Peer vote error:', err);
    res.status(500).json({ error: 'Failed to submit peer vote.' });
  } finally {
    if (client) {
      client.release();
    }
  }
});

module.exports = router;
