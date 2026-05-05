const { query } = require('../config/database');

/**
 * Require approved status to access protected features
 * (job posting, mentorship, messaging, connections)
 */
const requireApproved = async (req, res, next) => {
  try {
    const result = await query(
      'SELECT approval FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (result.rows[0].approval !== 'approved') {
      return res.status(403).json({
        error: 'Your registration is pending approval. You will be notified via email once approved.',
        approval_status: result.rows[0].approval,
      });
    }

    next();
  } catch (err) {
    console.error('Approval check error:', err);
    res.status(500).json({ error: 'Authorization check failed.' });
  }
};

module.exports = { requireApproved };
