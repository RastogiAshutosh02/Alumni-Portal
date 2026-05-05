/**
 * ═══════════════════════════════════════════════════════════
 * IIT (ISM) DHANBAD ALUMNI PORTAL — EXPRESS SERVER
 * ═══════════════════════════════════════════════════════════
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

// Import routes
const authRoutes = require('./routes/auth.routes');
const alumniRoutes = require('./routes/alumni.routes');
const jobsRoutes = require('./routes/jobs.routes');
const mentorshipRoutes = require('./routes/mentorship.routes');
const messagesRoutes = require('./routes/messages.routes');
const eventsRoutes = require('./routes/events.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();
const PORT = process.env.PORT || 5000;
const isDevelopment = (process.env.NODE_ENV || 'development') !== 'production';
const uploadsDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ══════════════════════════════
// SECURITY MIDDLEWARE
// ══════════════════════════════

// Helmet — secure HTTP headers
app.use(helmet());

// CORS — allow frontend origin
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting — prevent brute force
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDevelopment ? 5000 : 200,
  message: { error: 'Too many requests. Please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: isDevelopment ? 200 : 20, // stricter for auth endpoints in production
  message: { error: 'Too many authentication attempts. Please wait 5 minutes.' },
});

app.use(generalLimiter);

// ══════════════════════════════
// PARSING & LOGGING
// ══════════════════════════════
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use('/uploads', express.static(uploadsDir));

// ══════════════════════════════
// API ROUTES
// ══════════════════════════════
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/mentorship', mentorshipRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/admin', adminRoutes);

// ── Health check ──
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'IIT (ISM) Dhanbad Alumni Portal API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// ══════════════════════════════
// ERROR HANDLING
// ══════════════════════════════

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found.` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error.'
      : err.message,
  });
});

// ══════════════════════════════
// START SERVER
// ══════════════════════════════
app.listen(PORT, () => {
  console.log(`
  ═══════════════════════════════════════════════
  🏛️  IIT (ISM) DHANBAD — ALUMNI PORTAL API
  ═══════════════════════════════════════════════
  🚀 Server running on http://localhost:${PORT}
  📦 Environment: ${process.env.NODE_ENV || 'development'}
  🔑 Auth: JWT with bcrypt
  🛡️  Security: Helmet + CORS + Rate Limiting
  ═══════════════════════════════════════════════
  `);
});

module.exports = app;
