/**
 * DATABASE SEED — Populate with sample data
 * Run: npm run seed
 */
require('dotenv').config({ path: __dirname + '/../.env' });
const bcrypt = require('bcryptjs');
const { pool } = require('../src/config/database');

async function seed() {
  console.log('🌱 Seeding database...\n');
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Hash a default password for all seed users
    const hash = await bcrypt.hash('ISMite@2026', 12);

    // ── Seed Users ──
    const users = [
      { email: 'rajesh.singh@iitism.ac.in', name: 'Dr. Rajesh Kumar Singh', batch: 1998, dept: 'Mining Engineering', company: 'Coal India Limited', role: 'Director (Technical)', location: 'Kolkata, India', mentor: true, skills: ['Mining Operations','Project Management','Safety Engineering'] },
      { email: 'ananya.sharma@iitism.ac.in', name: 'Ananya Sharma', batch: 2012, dept: 'Computer Science & Engineering', company: 'Google', role: 'Senior Software Engineer', location: 'Mountain View, USA', mentor: true, skills: ['Machine Learning','Distributed Systems','Cloud Computing'] },
      { email: 'vikram.patel@iitism.ac.in', name: 'Vikram Patel', batch: 2005, dept: 'Petroleum Engineering', company: 'ONGC', role: 'Chief Engineer', location: 'Mumbai, India', mentor: false, skills: ['Reservoir Engineering','Drilling','EOR'] },
      { email: 'priya.nair@iitism.ac.in', name: 'Priya Nair', batch: 2015, dept: 'Electronics & Communication Engineering', company: 'Intel Corporation', role: 'Design Engineer', location: 'Bangalore, India', mentor: true, skills: ['VLSI Design','Signal Processing','IoT'] },
      { email: 'amit.gupta@iitism.ac.in', name: 'Amit Gupta', batch: 2008, dept: 'Mechanical Engineering', company: 'Tata Motors', role: 'VP Engineering', location: 'Pune, India', mentor: true, skills: ['Automotive Design','Manufacturing','R&D Management'] },
      { email: 'sneha.das@iitism.ac.in', name: 'Sneha Das', batch: 2018, dept: 'Chemical Engineering', company: 'Reliance Industries', role: 'Process Engineer', location: 'Jamnagar, India', mentor: false, skills: ['Process Simulation','Catalysis','Green Chemistry'] },
      { email: 'arjun.mehta@iitism.ac.in', name: 'Arjun Mehta', batch: 2010, dept: 'Civil Engineering', company: 'L&T Construction', role: 'Project Manager', location: 'Hyderabad, India', mentor: true, skills: ['Structural Engineering','BIM','Construction Management'] },
      { email: 'kavitha.rajan@iitism.ac.in', name: 'Kavitha Rajan', batch: 2003, dept: 'Applied Geology', company: 'Geological Survey of India', role: 'Senior Geologist', location: 'Lucknow, India', mentor: true, skills: ['Mineral Exploration','GIS/Remote Sensing','Hydrogeology'] },
      { email: 'admin@iitism.ac.in', name: 'Portal Admin', batch: 2000, dept: 'Computer Science & Engineering', company: 'IIT (ISM) Dhanbad', role: 'Alumni Portal Administrator', location: 'Dhanbad, India', mentor: false, skills: ['Administration'] },
    ];

    const userIds = [];
    for (const u of users) {
      const res = await client.query(
        `INSERT INTO users (email, password_hash, full_name, batch_year, department, company, designation, location, is_mentor, skills, is_verified, role)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, TRUE, $11)
         ON CONFLICT (email) DO UPDATE SET full_name = $3
         RETURNING id`,
        [u.email, hash, u.name, u.batch, u.dept, u.company, u.role, u.location, u.mentor, u.skills, u.email === 'admin@iitism.ac.in' ? 'admin' : 'alumni']
      );
      userIds.push(res.rows[0].id);
    }
    console.log(`   ✅ ${users.length} users seeded`);

    // ── Seed Jobs ──
    const jobs = [
      { idx: 0, title: 'Senior Mining Engineer', company: 'Vedanta Resources', location: 'Goa, India', type: 'Full-time', salary: '₹18-25 LPA', desc: 'Looking for experienced mining engineers with 5+ years of open-cast mining experience. Must have knowledge of mine planning software and safety regulations.' },
      { idx: 1, title: 'ML Research Scientist', company: 'Google DeepMind', location: 'London, UK', type: 'Full-time', salary: '$150-200K', desc: 'Join our team working on cutting-edge AI research in natural language processing and reinforcement learning.' },
      { idx: 2, title: 'Petroleum Geoscientist', company: 'Shell', location: 'The Hague, Netherlands', type: 'Full-time', salary: '€85-110K', desc: 'Seeking geoscientist for subsurface characterization and reservoir modeling. Experience with Petrel preferred.' },
      { idx: 3, title: 'Software Development Intern', company: 'Microsoft', location: 'Hyderabad, India', type: 'Internship', salary: '₹80K/month', desc: 'Summer internship for pre-final year students in cloud services team. Strong DSA skills required.' },
      { idx: 4, title: 'Product Manager', company: 'Flipkart', location: 'Bangalore, India', type: 'Full-time', salary: '₹30-45 LPA', desc: 'Drive product strategy for consumer electronics vertical. 3+ years PM experience required.' },
    ];

    for (const j of jobs) {
      await client.query(
        `INSERT INTO jobs (posted_by, title, company, location, job_type, salary, description, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'approved')`,
        [userIds[j.idx], j.title, j.company, j.location, j.type, j.salary, j.desc]
      );
    }
    console.log(`   ✅ ${jobs.length} jobs seeded`);

    // ── Seed Events ──
    const events = [
      { title: 'Centenary Foundation Day Celebration', desc: 'The grand celebration marking 100 years of ISM. Join alumni from across the globe.', type: 'Centenary', location: 'IIT (ISM) Campus, Dhanbad', date: '2026-12-09' },
      { title: 'Centenary Basant 2026', desc: 'The most special Basant in ISM history. Join with your families.', type: 'Festival', location: 'IIT (ISM) Campus, Dhanbad', date: '2026-02-14' },
      { title: 'Tech Talk: AI in Mining Industry', desc: 'Exploring how AI and ML are transforming the mining and minerals sector.', type: 'Webinar', location: 'Virtual (Zoom)', date: '2026-05-10' },
      { title: 'Delhi NCR Chapter Meetup', desc: 'Quarterly meetup for ISMites in Delhi NCR. Networking, talks, and dinner.', type: 'Chapter Meet', location: 'India International Centre, Delhi', date: '2026-06-22' },
      { title: 'Startup Showcase & Pitch Night', desc: 'ISMite entrepreneurs present their startups. Connect with potential investors.', type: 'Networking', location: 'Virtual (Zoom)', date: '2026-07-08' },
    ];

    for (const e of events) {
      await client.query(
        `INSERT INTO events (created_by, title, description, event_type, location, event_date, is_virtual)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [userIds[8], e.title, e.desc, e.type, e.location, e.date, e.location.includes('Virtual')]
      );
    }
    console.log(`   ✅ ${events.length} events seeded`);

    await client.query('COMMIT');
    console.log('\n🎉 Seeding completed successfully!');
    console.log('   Default password for all users: ISMite@2026');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Seeding failed:', err.message);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
