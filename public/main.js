const {app, BrowserWindow} = require('electron');
const path = require('path'); 

function createWindow () {   
    // Create the browser window.     
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    
    //win.loadURL('http://localhost:3000/');
    win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);

    //win.webContents.openDevTools();
} 

app.on('ready', createWindow)

