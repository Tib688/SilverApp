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
