const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function fixChunkLoading() {
  console.log('🔧 Fixing chunk loading issues...');
  
  try {
    // 1. Clear Next.js cache
    console.log('🧹 Clearing Next.js cache...');
    const nextCachePath = path.join(__dirname, '../.next');
    if (fs.existsSync(nextCachePath)) {
      fs.rmSync(nextCachePath, { recursive: true, force: true });
      console.log('✅ Removed .next directory');
    }

    // 2. Clear node_modules cache
    console.log('🧹 Clearing node_modules cache...');
    const nodeModulesPath = path.join(__dirname, '../node_modules');
    if (fs.existsSync(nodeModulesPath)) {
      fs.rmSync(nodeModulesPath, { recursive: true, force: true });
      console.log('✅ Removed node_modules directory');
    }

    // 3. Clear package-lock.json
    console.log('🧹 Clearing package-lock.json...');
    const packageLockPath = path.join(__dirname, '../package-lock.json');
    if (fs.existsSync(packageLockPath)) {
      fs.unlinkSync(packageLockPath);
      console.log('✅ Removed package-lock.json');
    }

    // 4. Clear pnpm-lock.yaml
    console.log('🧹 Clearing pnpm-lock.yaml...');
    const pnpmLockPath = path.join(__dirname, '../pnpm-lock.yaml');
    if (fs.existsSync(pnpmLockPath)) {
      fs.unlinkSync(pnpmLockPath);
      console.log('✅ Removed pnpm-lock.yaml');
    }

    // 5. Clear npm cache
    console.log('🧹 Clearing npm cache...');
    execSync('npm cache clean --force', { stdio: 'inherit' });
    console.log('✅ Cleared npm cache');

    // 6. Clear pnpm cache
    console.log('🧹 Clearing pnpm cache...');
    try {
      execSync('pnpm store prune', { stdio: 'inherit' });
      execSync('pnpm cache clean', { stdio: 'inherit' });
      console.log('✅ Cleared pnpm cache');
    } catch (error) {
      console.log('⚠️ pnpm cache clean failed, continuing...');
    }

    // 7. Reinstall dependencies
    console.log('📦 Reinstalling dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies reinstalled');

    // 8. Build project
    console.log('🏗️ Building project...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Project built successfully');

    console.log('🎉 Chunk loading fix completed!');
    console.log('💡 You can now run: npm run dev or npm start');
    
  } catch (error) {
    console.error('❌ Error fixing chunk loading:', error.message);
    process.exit(1);
  }
}

fixChunkLoading();
