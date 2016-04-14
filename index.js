// Electron
var electron = require("electron");
// The app
var app = electron.app;
// BrowserWindow
var BrowserWindow = electron.BrowserWindow;
// IPC (Inter-Process Communication)
var ipc = electron.ipcMain;

// main window
var mainWindow = null;

// If every window is closed and the platform is NOT OS X, terminate the app
app.on("window-all-closed", () => {
  if (process.platform != "darwin") app.quit();
});


// When the app is ready, create a BrowserWindow and load a file
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "awesomesauce_icon.png"
  });

  mainWindow.loadURL("file://" + __dirname + "/html/animation.html");

  mainWindow.maximize();

  // When the window is closed, dereference the mainWindow variable
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // Event handler to go to login page
  ipc.on("goToLogin", (data) => {
    mainWindow.loadURL("file://" + __dirname + "/html/login.html");
  });
});
