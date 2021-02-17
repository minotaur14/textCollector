const { app, BrowserWindow } = require('electron');

/* 브라우저 창을 생성 */
function createWindow () {
  let win = new BrowserWindow({
    width: 1360, height: 768,
    fullscreen: false, center: true,
    frame: true, autoHideMenuBar: true,
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: true
    }    
  })
  win.loadFile('./index.html')
  win.setResizable(true)
}

app.on('ready', createWindow);

const ipcMain = require('electron').ipcMain;
ipcMain.on('udpReady', (event, argument) => {   
  var _warningCheck = event.sender;
  global._warningCheck = _warningCheck;  
});

/* udp receive */

var iconv = require('iconv-lite');
var dgram = require('dgram');
var dSocket = dgram.createSocket('udp4');
dSocket.bind(18820);

dSocket.on('listening', function() {
    console.log('listening event');
});

dSocket.on('message', function(msg, rinfo) {       
    // console.log('receive', rinfo.address, msg.toString());    
    var sendText = iconv.decode(msg, 'euc-kr');
    _warningCheck.send('warningCheck', sendText);
});

dSocket.on('close', function() {
    console.log('close event');
});

// auto update*
const { autoUpdater } = require('electron-updater');

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('checking-for-update', () => {
  updateWin.send('checking-for-update');
});

autoUpdater.on('update-available', () => {
  updateWin.send('update-available');
});

autoUpdater.on('update-not-available', () => {
  updateWin.send('update-not-available');
});

autoUpdater.on('update-downloaded', () => {
  updateWin.send('update-downloaded');
});

autoUpdater.on('error', (err) => {
  updateWin.send('error', err);
})

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});  

ipcMain.on('updateWindowReady', (event, argument) => {    
  var updateWin = event.sender;  
  global.updateWin = updateWin;      
  autoUpdater.checkForUpdatesAndNotify();
});
// auto update**