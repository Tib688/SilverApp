const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('silver', {
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  navigate: (page) => ipcRenderer.send('navigate', page),
  openExternal: (url) => ipcRenderer.send('open-external', url),
  downloadUpdate: (url) => ipcRenderer.invoke('download-update', url),
  onDownloadProgress: (cb) => ipcRenderer.on('download-progress', (e, data) => cb(data)),
});
