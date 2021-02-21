const {app, BrowserWindow, Menu, dialog} = require('electron');
const path = require('path');


function createWindow () {   
    // Create the browser window.     
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });
    
    //win.loadURL('http://localhost:3000/');
    win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);

    //win.webContents.openDevTools();

    return win;
} 

app.on('ready', ()=> {
    const mainWindow = createWindow();

    let menu = Menu.buildFromTemplate([
        {
            label: "File",
            submenu: [
                {
                    label: "Open",
                    click: ()=> {
                        dialog.showOpenDialog({properties: ['openFile'] }).then(function (response) {
                            if (!response.canceled) {
                                // handle fully qualified file name
                              console.log(response.filePaths[0]);
                              mainWindow.webContents.send('open-file', response.filePaths[0]);
                            } else {
                              console.log("no file selected");
                            }
                        });
                    }
                },
                {
                    label: "Quit",
                    click: () => app.quit()
                }
            ]
        }
    ]);
    Menu.setApplicationMenu(menu);
})

