require('dotenv').config({ path: '.env.local' })
const { Pool } = require('pg')

async function testDatabaseConnection() {
  console.log('🔗 Testing database connection...')
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set')
  
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  })

  try {
    const client = await pool.connect()
    console.log('✅ Database connected successfully!')
    
    // Test query
    const result = await client.query('SELECT NOW() as current_time, version() as postgres_version')
    console.log('📊 Database info:')
    console.log('  - Current time:', result.rows[0].current_time)
    console.log('  - PostgreSQL version:', result.rows[0].postgres_version.split(' ')[0])
    
    // Test strategic_partners table
    const partnersResult = await client.query('SELECT COUNT(*) as count FROM strategic_partners')
    console.log('  - Strategic partners count:', partnersResult.rows[0].count)
    
    client.release()
    console.log('🎉 Database test completed successfully!')
    
  } catch (error) {
    console.error('❌ Database connection failed:')
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Possible solutions:')
      console.log('1. Check if DATABASE_URL is correct in .env.local')
      console.log('2. Verify database server is running')
      console.log('3. Check firewall settings')
      console.log('4. Verify SSL configuration')
    }
    
  } finally {
    await pool.end()
  }
}

testDatabaseConnection()
