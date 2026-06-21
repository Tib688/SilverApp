const { app, BrowserWindow, ipcMain } = require('electron');
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
    backgroundColor: '#0f1117',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, 'icon.ico'),
  });

  mainWindow.webContents.session.clearCache();
  mainWindow.loadFile('src/pages/login.html');
  mainWindow.on('closed', () => { mainWindow = null; });
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

function startBackend() {
  const pythonPath = path.join(__dirname, 'backend', 'venv', 'Scripts', 'python.exe');
  const serverPath = path.join(__dirname, 'backend', 'server.py');
  backendProcess = spawn(pythonPath, [serverPath], { stdio: 'ignore' });
  backendProcess.on('error', () => {});
}

async function waitForBackend(maxRetries = 20) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get('http://127.0.0.1:8051/health', res => {
          res.resume();
          resolve();
        });
        req.on('error', reject);
        req.setTimeout(500, () => { req.destroy(); reject(); });
      });
      return;
    } catch {
      await new Promise(r => setTimeout(r, 300));
    }
  }
}

app.whenReady().then(async () => {
  startBackend();
  await waitForBackend();
  createWindow();
});

app.on('window-all-closed', () => {
  if (backendProcess) backendProcess.kill();
  app.quit();
});
