const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('localhost') ? false : {
    rejectUnauthorized: false
  }
});

async function checkApplicationsStatus() {
  try {
    console.log('🔍 Checking applications status in database...\n');

    // Get all applications
    const allAppsQuery = await pool.query(`
      SELECT application_id, customer_name, status, created_at, updated_at
      FROM applications
      ORDER BY created_at DESC
    `);

    console.log('📊 Total applications:', allAppsQuery.rows.length);
    console.log('\n📋 All applications:');
    console.table(allAppsQuery.rows.map(app => ({
      ID: app.application_id,
      Name: app.customer_name,
      Status: app.status,
      Created: new Date(app.created_at).toLocaleDateString('id-ID'),
      Updated: new Date(app.updated_at).toLocaleDateString('id-ID')
    })));

    // Status breakdown
    const statusQuery = await pool.query(`
      SELECT status, COUNT(*) as count
      FROM applications
      GROUP BY status
      ORDER BY count DESC
    `);

    console.log('\n📈 Status breakdown:');
    console.table(statusQuery.rows);

    // Check if there are any non-pending applications
    const nonPendingQuery = await pool.query(`
      SELECT COUNT(*) as count
      FROM applications
      WHERE status != 'pending'
    `);

    console.log('\n✅ Non-pending applications:', nonPendingQuery.rows[0].count);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

checkApplicationsStatus();

