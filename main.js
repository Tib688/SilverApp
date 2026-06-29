const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');

let mainWindow;
let backendProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    frame: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#020204',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, 'icon.ico'),
  });

  mainWindow.loadFile('src/pages/splash.html');
  mainWindow.on('closed', () => { mainWindow = null; });
  setTimeout(() => { if (mainWindow) mainWindow.loadFile('src/pages/login.html'); }, 2000);
}

// Window controls
ipcMain.on('window-minimize', () => mainWindow?.minimize());
ipcMain.on('window-maximize', () => {
  if (mainWindow?.isMaximized()) mainWindow.unmaximize();
  else mainWindow?.maximize();
});
ipcMain.on('window-close', () => mainWindow?.close());
ipcMain.on('navigate', (e, page) => {
  mainWindow.loadFile(`src/pages/${page}.html`);
});
ipcMain.on('open-external', (e, url) => {
  shell.openExternal(url);
});

ipcMain.handle('download-update', async (e, url) => {
  const https = require('https');
  const fs = require('fs');
  const os = require('os');
  const dest = path.join(os.tmpdir(), 'SilverAppUpdate.exe');

  return new Promise((resolve, reject) => {
    function doDownload(downloadUrl) {
      https.get(downloadUrl, { headers: { 'User-Agent': 'SilverApp' } }, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          doDownload(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) { reject(`HTTP ${res.statusCode}`); return; }

        const total = parseInt(res.headers['content-length'] || '0', 10);
        let downloaded = 0;
        const file = fs.createWriteStream(dest);

        res.on('data', chunk => {
          downloaded += chunk.length;
          file.write(chunk);
          if (mainWindow && total > 0) {
            mainWindow.webContents.send('download-progress', {
              percent: Math.round(downloaded / total * 100),
              downloaded,
              total,
            });
          }
        });

        res.on('end', () => {
          file.end(() => {
            if (mainWindow) mainWindow.webContents.send('download-progress', { percent: 100, done: true });
            const { exec } = require('child_process');
            exec(`"${dest}"`, () => {});
            setTimeout(() => { app.quit(); }, 1500);
            resolve(dest);
          });
        });

        res.on('error', err => { file.end(); reject(err.message); });
      }).on('error', err => reject(err.message));
    }
    doDownload(url);
  });
});

function startBackend() {
  const isWin = process.platform === 'win32';
  const pythonPath = isWin
    ? path.join(__dirname, 'backend', 'venv', 'Scripts', 'python.exe')
    : path.join(__dirname, 'backend', 'venv', 'bin', 'python');
  const serverPath = path.join(__dirname, 'backend', 'server.py');
  try {
    backendProcess = spawn(pythonPath, [serverPath], {
      stdio: 'ignore',
      cwd: path.join(__dirname, 'backend'),
    });
    backendProcess.on('error', () => {});
  } catch {}
}

async function waitForBackend(maxRetries = 60) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get('http://127.0.0.1:8051/health', res => {
          res.resume();
          resolve();
        });
        req.on('error', reject);
        req.setTimeout(1000, () => { req.destroy(); reject(); });
      });
      return;
    } catch {
      await new Promise(r => setTimeout(r, 500));
    }
  }
}

app.whenReady().then(() => {
  startBackend();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (backendProcess) backendProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});
