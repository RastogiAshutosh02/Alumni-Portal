/**
 * ═══════════════════════════════════════════════════════════
 * MIGRATION V2 — APPROVAL-BASED REGISTRATION SYSTEM
 * Adds: approval_status, course field, registration_approvals table
 * Run: node migrations/v2_approval_system.js
 * ═══════════════════════════════════════════════════════════
 */
require('dotenv').config({ path: __dirname + '/../.env' });
const { pool } = require('../src/config/database');

const migration = `

-- ══════════════════════════════
-- New ENUM for approval status
-- ══════════════════════════════
DO $$ BEGIN
  CREATE TYPE approval_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ══════════════════════════════
-- Add new columns to users table
-- ══════════════════════════════
ALTER TABLE users ADD COLUMN IF NOT EXISTS approval  approval_status DEFAULT 'pending';
ALTER TABLE users ADD COLUMN IF NOT EXISTS course    VARCHAR(100);
ALTER TABLE users ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES users(id) ON DELETE SET NULL;

-- Update existing users to be approved (they were already in the system)
UPDATE users SET approval = 'approved', approved_at = NOW() WHERE approval IS NULL OR approval = 'pending';

-- ══════════════════════════════
-- Registration Approvals / Votes
-- Tracks which alumni vouched for a new registration
-- ══════════════════════════════
CREATE TABLE IF NOT EXISTS registration_approvals (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  applicant_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  approver_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  vote            VARCHAR(10) DEFAULT 'approve',  -- 'approve' or 'reject'
  comment         TEXT,
  created_at      TIMESTAMP DEFAULT NOW(),

  UNIQUE(applicant_id, approver_id)
);

CREATE INDEX IF NOT EXISTS idx_reg_approvals_applicant ON registration_approvals(applicant_id);
CREATE INDEX IF NOT EXISTS idx_reg_approvals_approver ON registration_approvals(approver_id);
CREATE INDEX IF NOT EXISTS idx_users_approval ON users(approval);
CREATE INDEX IF NOT EXISTS idx_users_course ON users(course);

`;

async function runMigration() {
  console.log('🔄 Running V2 migration (approval system)...\n');
  try {
    await pool.query(migration);
    console.log('✅ V2 Migration completed successfully!');
    console.log('   Added: approval_status column to users');
    console.log('   Added: course column to users');
    console.log('   Added: registration_approvals table');
    console.log('   Existing users set to approved');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    throw err;
  } finally {
    await pool.end();
  }
}

runMigration();
