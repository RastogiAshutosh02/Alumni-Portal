const express = require('express');
const { query, getClient } = require('../config/database');
const { authenticate } = require('../middleware/auth');
const { requireApproved } = require('../middleware/approval');

const router = express.Router();

// ALL messaging requires approval
router.use(authenticate);
router.use(requireApproved);

// ── GET /api/messages/conversations ──
router.get('/conversations', async (req, res) => {
  try {
    const result = await query(
      `SELECT c.id AS conversation_id,
              u.id AS other_user_id, u.full_name, u.avatar_url, u.company, u.designation,
              m.content AS last_message, m.created_at AS last_message_at,
              (SELECT COUNT(*) FROM messages WHERE conversation_id = c.id AND sender_id != $1 AND is_read = FALSE) AS unread_count
       FROM conversation_participants cp
       JOIN conversations c ON cp.conversation_id = c.id
       JOIN conversation_participants cp2 ON cp2.conversation_id = c.id AND cp2.user_id != $1
       JOIN users u ON cp2.user_id = u.id
       LEFT JOIN LATERAL (
         SELECT content, created_at FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1
       ) m ON TRUE
       WHERE cp.user_id = $1
       ORDER BY m.created_at DESC NULLS LAST`,
      [req.user.id]
    );
    res.json({ conversations: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch conversations.' });
  }
});

// ── POST /api/messages/conversations — Start new conversation ──
router.post('/conversations', async (req, res) => {
  try {
    const { recipient_id } = req.body;
    if (req.user.id === recipient_id) return res.status(400).json({ error: 'Cannot message yourself.' });

    const client = await getClient();
    try {
      await client.query('BEGIN');

      // Prevent duplicate conversations for the same user pair under concurrent requests.
      const pairKey = [req.user.id, recipient_id].sort().join(':');
      await client.query('SELECT pg_advisory_xact_lock(hashtext($1))', [`conversation:${pairKey}`]);

      const existing = await client.query(
        `SELECT c.id FROM conversations c
         JOIN conversation_participants cp1 ON cp1.conversation_id = c.id AND cp1.user_id = $1
         JOIN conversation_participants cp2 ON cp2.conversation_id = c.id AND cp2.user_id = $2
         ORDER BY c.created_at DESC
         LIMIT 1`,
        [req.user.id, recipient_id]
      );

      if (existing.rows.length > 0) {
        await client.query('COMMIT');
        return res.json({ conversation_id: existing.rows[0].id });
      }

      const conv = await client.query('INSERT INTO conversations DEFAULT VALUES RETURNING id');
      const convId = conv.rows[0].id;
      await client.query(
        'INSERT INTO conversation_participants (conversation_id, user_id) VALUES ($1, $2), ($1, $3)',
        [convId, req.user.id, recipient_id]
      );
      await client.query('COMMIT');
      res.status(201).json({ conversation_id: convId });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to create conversation.' });
  }
});

// ── GET /api/messages/:conversationId ──
router.get('/:conversationId', async (req, res) => {
  try {
    const participant = await query(
      'SELECT id FROM conversation_participants WHERE conversation_id = $1 AND user_id = $2',
      [req.params.conversationId, req.user.id]
    );
    if (participant.rows.length === 0) return res.status(403).json({ error: 'Access denied.' });

    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    const result = await query(
      `SELECT m.id, m.content, m.sender_id, m.is_read, m.created_at, u.full_name AS sender_name
       FROM messages m JOIN users u ON m.sender_id = u.id
       WHERE m.conversation_id = $1 ORDER BY m.created_at ASC LIMIT $2 OFFSET $3`,
      [req.params.conversationId, parseInt(limit), offset]
    );

    await query(
      'UPDATE messages SET is_read = TRUE WHERE conversation_id = $1 AND sender_id != $2 AND is_read = FALSE',
      [req.params.conversationId, req.user.id]
    );

    res.json({ messages: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

// ── POST /api/messages/:conversationId — Send message ──
router.post('/:conversationId', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || !content.trim()) return res.status(400).json({ error: 'Message content is required.' });

    const participant = await query(
      'SELECT id FROM conversation_participants WHERE conversation_id = $1 AND user_id = $2',
      [req.params.conversationId, req.user.id]
    );
    if (participant.rows.length === 0) return res.status(403).json({ error: 'Access denied.' });

    const result = await query(
      `INSERT INTO messages (conversation_id, sender_id, content) VALUES ($1, $2, $3)
       RETURNING id, content, sender_id, created_at`,
      [req.params.conversationId, req.user.id, content.trim()]
    );

    const otherUser = await query(
      'SELECT user_id FROM conversation_participants WHERE conversation_id = $1 AND user_id != $2',
      [req.params.conversationId, req.user.id]
    );
    if (otherUser.rows.length > 0) {
      await query(
        `INSERT INTO notifications (user_id, type, title, message) VALUES ($1, 'message', 'New Message', $2)`,
        [otherUser.rows[0].user_id, `${req.user.full_name} sent you a message.`]
      );
    }

    res.status(201).json({ message: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

module.exports = router;
