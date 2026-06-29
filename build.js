const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = pkg.version;
const appDir = path.join(__dirname, 'App');
const latestDir = path.join(appDir, 'latest');
const versionsDir = path.join(appDir, 'versions');
const tempDir = path.join(__dirname, '_build_temp');

console.log(`\n  Building Silver App v${version}...\n`);

execSync(`npx electron-builder --win nsis --publish never -c.directories.output=_build_temp`, { stdio: 'inherit' });

const files = fs.readdirSync(tempDir);
const setup = files.find(f => f.endsWith('.exe') && f.includes('Setup'));
if (!setup) { console.error('Setup not found!'); process.exit(1); }

fs.mkdirSync(latestDir, { recursive: true });
fs.mkdirSync(versionsDir, { recursive: true });

// Setup → latest/
fs.copyFileSync(path.join(tempDir, setup), path.join(latestDir, `Silver App Setup ${version}.exe`));
// Remove old version from latest/
for (const f of fs.readdirSync(latestDir)) {
  if (f !== `Silver App Setup ${version}.exe`) fs.rmSync(path.join(latestDir, f), { force: true });
}
console.log(`  -> latest/Silver App Setup ${version}.exe`);

// Setup → versions/
fs.copyFileSync(path.join(tempDir, setup), path.join(versionsDir, `Silver App Setup ${version}.exe`));
console.log(`  -> versions/Silver App Setup ${version}.exe`);

// Cleanup
fs.rmSync(tempDir, { recursive: true, force: true });

console.log(`\n  Silver App v${version} built!`);
console.log(`  Now run: App/latest/Silver App Setup.exe\n`);
