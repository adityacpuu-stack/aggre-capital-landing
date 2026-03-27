#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🧹 Clearing Next.js cache...')

// Remove .next directory
if (fs.existsSync('.next')) {
  fs.rmSync('.next', { recursive: true, force: true })
  console.log('✅ Removed .next directory')
}

// Remove node_modules/.cache
if (fs.existsSync('node_modules/.cache')) {
  fs.rmSync('node_modules/.cache', { recursive: true, force: true })
  console.log('✅ Removed node_modules/.cache')
}

// Remove .next/cache if exists
if (fs.existsSync('.next/cache')) {
  fs.rmSync('.next/cache', { recursive: true, force: true })
  console.log('✅ Removed .next/cache')
}

// Clear npm cache
try {
  execSync('npm cache clean --force', { stdio: 'inherit' })
  console.log('✅ Cleared npm cache')
} catch (error) {
  console.log('⚠️  Could not clear npm cache:', error.message)
}

// Clear pnpm cache if pnpm is used
try {
  execSync('pnpm store prune', { stdio: 'inherit' })
  console.log('✅ Cleared pnpm cache')
} catch (error) {
  console.log('⚠️  Could not clear pnpm cache:', error.message)
}

console.log('🎉 Cache cleared successfully!')
console.log('💡 You can now run: npm run dev or pnpm dev')
