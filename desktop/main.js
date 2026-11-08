const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 860,
    minWidth: 640,
    minHeight: 480,
    title: 'ClipNote',
    backgroundColor: '#111317',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  // The page lives in ../web during development; the build copies it into web/ inside the app.
  const page = app.isPackaged
    ? path.join(__dirname, 'web', 'clipnote.html')
    : path.join(__dirname, '..', 'web', 'clipnote.html');
  win.loadFile(page);

  // The app is a single local page: keep it from navigating anywhere else,
  // and open any web link in the system browser instead of a new app window.
  win.webContents.on('will-navigate', e => e.preventDefault());
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  createWindow();
  // macOS: reopen a window when the dock icon is clicked and none are open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
