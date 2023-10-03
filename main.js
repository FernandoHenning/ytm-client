const { app, BrowserWindow, Menu, Tray, nativeImage, ipcMain, screen } = require('electron');
const path = require('path');


let tray = null;
let mainWindow;
let isQuiting;

const iconPath = path.join(__dirname, 'assets', 'icons', 'icon.ico');
const singleInstanceLock = app.requestSingleInstanceLock();

function createTray() {
    const trayIcon = nativeImage.createFromPath(iconPath)
    tray = new Tray(trayIcon);
    tray.setToolTip('Youtube Music client')

    const contextMenu = buildContextMenu();
    tray.setContextMenu(contextMenu)

    tray.setTitle('Youtube Music Client');
    tray.setImage(trayIcon);
}

function buildContextMenu() {
    return Menu.buildFromTemplate(
        [
            {
                label: 'Open',
                click: () => {
                    if (mainWindow) {
                        mainWindow.show();
                    } else {
                        createWindow();
                    }
                }
            },
            {
                label: 'Quit',
                click: () => {
                    isQuiting = true;
                    app.quit();
                }
            }
        ]
    );
}

function createWindow() {
    mainWindow = new BrowserWindow({
        icon: iconPath,
        width: 1400,
        height: 900,
        center: true,

        webPreferences: {
            preload: path.join(__dirname, 'src', 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,

        },
        title: 'Youtube Music Client',
        backgroundMaterial: 'tabbed',
        show: false
    });

    mainWindow.loadURL('https://music.youtube.com/');
    mainWindow.setMenu(null);

    configWindowBehavior(mainWindow);

}

ipcMain.on('get-primary-screen-id', (event) => {
    const primaryDisplay = screen.getPrimaryDisplay();
    event.reply('primary-screen-id', primaryDisplay.id);
  });

function configWindowBehavior(window) {
    window.on('page-title-updated', (evt) => {
        evt.preventDefault();
    });

    window.on('close', function (event) {
        if (!isQuiting) {
            event.preventDefault();
            mainWindow.hide();
            event.returnValue = false;
        }
    });

    window.once('ready-to-show', () => {
        mainWindow.show();
    });
}

app.on('before-quit', function () {
    isQuiting = true;
});


app.whenReady().then(() => {
    createTray();
    createWindow();

    app.on('activate', function () {
        if (!mainWindow) createWindow();
    });

    tray.on('click', function (event) {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
            mainWindow.focus();
        }
    })
});


if (!singleInstanceLock) {
    app.quit();
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        if (mainWindow) {
            mainWindow.restore();
            mainWindow.focus();
        }
    });
}

app.on('window-all-closed', () => {
    if (process.platform === 'darwin') {
        app.dock.hide();
    }
});
