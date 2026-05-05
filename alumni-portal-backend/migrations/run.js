/**
 * ═══════════════════════════════════════════════════════
 * DATABASE MIGRATION — IIT (ISM) DHANBAD ALUMNI PORTAL
 * Run: npm run migrate
 * ═══════════════════════════════════════════════════════
 */
require('dotenv').config({ path: __dirname + '/../.env' });
const { pool } = require('../src/config/database');

const migration = `

-- ══════════════════════════════
-- Enable UUID extension
-- ══════════════════════════════
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ══════════════════════════════
-- ENUM TYPES
-- ══════════════════════════════
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('alumni', 'admin', 'superadmin');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE job_status AS ENUM ('pending', 'approved', 'rejected', 'expired');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE job_type AS ENUM ('Full-time', 'Part-time', 'Internship', 'Contract', 'Remote');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE mentorship_status AS ENUM ('pending', 'accepted', 'declined', 'completed');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE event_type AS ENUM ('Centenary', 'Festival', 'Webinar', 'Chapter Meet', 'Networking', 'Reunion', 'Other');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ══════════════════════════════
-- 1. USERS (Alumni)
-- ══════════════════════════════
CREATE TABLE IF NOT EXISTS users (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email           VARCHAR(255) UNIQUE NOT NULL,
  password_hash   VARCHAR(255) NOT NULL,
  role            user_role DEFAULT 'alumni',

  -- Personal info
  full_name       VARCHAR(255) NOT NULL,
  phone           VARCHAR(20),
  avatar_url      TEXT,

  -- Academic info
  batch_year      INTEGER,
  department      VARCHAR(255),
  degree          VARCHAR(100),

  -- Professional info
  company         VARCHAR(255),
  designation     VARCHAR(255),
  location        VARCHAR(255),
  linkedin_url    TEXT,
  skills          TEXT[],
  bio             TEXT,

  -- Mentorship
  is_mentor       BOOLEAN DEFAULT FALSE,
  mentor_topics   TEXT[],

  -- Verification & Security
  is_verified     BOOLEAN DEFAULT FALSE,
  verify_token    VARCHAR(255),
  verify_expires  TIMESTAMP,
  reset_token     VARCHAR(255),
  reset_expires   TIMESTAMP,
  last_login      TIMESTAMP,
  login_attempts  INTEGER DEFAULT 0,
  locked_until    TIMESTAMP,

  -- Timestamps
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

-- ══════════════════════════════
-- 2. JOBS
-- ══════════════════════════════
CREATE TABLE IF NOT EXISTS jobs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  posted_by       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  title           VARCHAR(255) NOT NULL,
  company         VARCHAR(255) NOT NULL,
  location        VARCHAR(255),
  job_type        job_type DEFAULT 'Full-time',
  salary          VARCHAR(100),
  description     TEXT NOT NULL,
  requirements    TEXT,
  apply_link      TEXT,

  status          job_status DEFAULT 'approved',
  visibility      VARCHAR(20) DEFAULT 'public',

  expires_at      TIMESTAMP,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

-- ══════════════════════════════
-- 3. JOB APPLICATIONS
-- ══════════════════════════════
CREATE TABLE IF NOT EXISTS job_applications (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id          UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  applicant_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cover_note      TEXT,
  status          VARCHAR(20) DEFAULT 'applied',
  created_at      TIMESTAMP DEFAULT NOW(),

  UNIQUE(job_id, applicant_id)
);

-- ══════════════════════════════
-- 4. MENTORSHIP CONNECTIONS
-- ══════════════════════════════
CREATE TABLE IF NOT EXISTS mentorships (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentor_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mentee_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status          mentorship_status DEFAULT 'pending',
  message         TEXT,
  goals           TEXT,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW(),

  UNIQUE(mentor_id, mentee_id)
);

-- ══════════════════════════════
-- 5. MESSAGES (Direct Messaging)
-- ══════════════════════════════
CREATE TABLE IF NOT EXISTS conversations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS conversation_participants (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  last_read_at    TIMESTAMP,

  UNIQUE(conversation_id, user_id)
);

CREATE TABLE IF NOT EXISTS messages (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content         TEXT NOT NULL,
  is_read         BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMP DEFAULT NOW()
);

-- ══════════════════════════════
-- 6. EVENTS
-- ══════════════════════════════
CREATE TABLE IF NOT EXISTS events (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_by      UUID REFERENCES users(id) ON DELETE SET NULL,

  title           VARCHAR(255) NOT NULL,
  description     TEXT,
  event_type      event_type DEFAULT 'Other',
  location        VARCHAR(255),
  event_date      TIMESTAMP NOT NULL,
  end_date        TIMESTAMP,
  is_virtual      BOOLEAN DEFAULT FALSE,
  meeting_link    TEXT,
  max_attendees   INTEGER,

  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

-- ══════════════════════════════
-- 7. EVENT RSVPS
-- ══════════════════════════════
CREATE TABLE IF NOT EXISTS event_rsvps (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id        UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status          VARCHAR(20) DEFAULT 'attending',
  created_at      TIMESTAMP DEFAULT NOW(),

  UNIQUE(event_id, user_id)
);

-- ══════════════════════════════
-- 8. CONNECTIONS (Alumni Network)
-- ══════════════════════════════
CREATE TABLE IF NOT EXISTS connections (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status          VARCHAR(20) DEFAULT 'pending',
  created_at      TIMESTAMP DEFAULT NOW(),

  UNIQUE(requester_id, receiver_id)
);

-- ══════════════════════════════
-- 9. NOTIFICATIONS
-- ══════════════════════════════
CREATE TABLE IF NOT EXISTS notifications (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type            VARCHAR(50) NOT NULL,
  title           VARCHAR(255) NOT NULL,
  message         TEXT,
  link            TEXT,
  is_read         BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMP DEFAULT NOW()
);

-- ══════════════════════════════
-- INDEXES for Performance
-- ══════════════════════════════
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_batch ON users(batch_year);
CREATE INDEX IF NOT EXISTS idx_users_dept ON users(department);
CREATE INDEX IF NOT EXISTS idx_users_mentor ON users(is_mentor) WHERE is_mentor = TRUE;

CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_posted_by ON jobs(posted_by);
CREATE INDEX IF NOT EXISTS idx_jobs_created ON jobs(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_messages_conv ON messages(conversation_id, created_at);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);

CREATE INDEX IF NOT EXISTS idx_mentorships_mentor ON mentorships(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentorships_mentee ON mentorships(mentee_id);

CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read);

-- ══════════════════════════════
-- UPDATE TRIGGER for updated_at
-- ══════════════════════════════
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_jobs_updated BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_events_updated BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

`;

async function runMigration() {
  console.log('🔄 Running database migration...\n');
  try {
    await pool.query(migration);
    console.log('✅ Migration completed successfully!');
    console.log('   Tables created: users, jobs, job_applications, mentorships,');
    console.log('   conversations, conversation_participants, messages,');
    console.log('   events, event_rsvps, connections, notifications');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    throw err;
  } finally {
    await pool.end();
  }
}

runMigration();
