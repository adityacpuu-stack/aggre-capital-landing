#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Aggre Capital Development Environment...\n');

// Start Express.js backend
console.log('📡 Starting Express.js Backend on port 3001...');
const backend = spawn('node', ['server/start.js'], {
  cwd: process.cwd(),
  stdio: 'pipe',
  env: { ...process.env, NODE_ENV: 'development' }
});

backend.stdout.on('data', (data) => {
  console.log(`[Backend] ${data.toString().trim()}`);
});

backend.stderr.on('data', (data) => {
  console.error(`[Backend Error] ${data.toString().trim()}`);
});

// Start Next.js frontend
console.log('⚛️  Starting Next.js Frontend on port 3000...');
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: process.cwd(),
  stdio: 'pipe',
  env: { ...process.env, NODE_ENV: 'development' }
});

frontend.stdout.on('data', (data) => {
  console.log(`[Frontend] ${data.toString().trim()}`);
});

frontend.stderr.on('data', (data) => {
  console.error(`[Frontend Error] ${data.toString().trim()}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development servers...');
  backend.kill('SIGINT');
  frontend.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down development servers...');
  backend.kill('SIGTERM');
  frontend.kill('SIGTERM');
  process.exit(0);
});

// Handle backend exit
backend.on('exit', (code) => {
  if (code !== 0) {
    console.error(`❌ Backend exited with code ${code}`);
    frontend.kill('SIGINT');
    process.exit(1);
  }
});

// Handle frontend exit
frontend.on('exit', (code) => {
  if (code !== 0) {
    console.error(`❌ Frontend exited with code ${code}`);
    backend.kill('SIGINT');
    process.exit(1);
  }
});

console.log('✅ Both servers are starting...');
console.log('🌐 Frontend: http://localhost:3000');
console.log('🔗 Backend API: http://localhost:3001/api');
console.log('📊 Health Check: http://localhost:3001/health');
console.log('\nPress Ctrl+C to stop both servers\n');
