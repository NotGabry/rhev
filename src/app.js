const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');


const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 350,
    height: 530,
    transparent: true,
    webPreferences: {
      devTools: false,
      nodeIntegration: true,
      contextIsolation: false
    },
    frame: false,
    resizable: false
  })

  mainWindow.loadFile(path.join(__dirname, 'App', 'index.html'))
}

// APP
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// IPC
ipcMain.on('close-window', async () => {
  await app.quit()
})
ipcMain.on('min-window', async () => {
  await BrowserWindow.getFocusedWindow().minimize()
})