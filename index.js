// Electron
var electron = require("electron");
// The app
var app = electron.app;
// BrowserWindow
var BrowserWindow = electron.BrowserWindow;

// main window
var mainWindow = null;

// If every window is closed and the platform is NOT OS X, terminate the app
app.on("window-all-closed", function() {
	if (process.platform != "darwin") {
		app.quit();
	}
});


// When the app is ready, create a BrowserWindow and load a file
app.on("ready", function() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		icon: "awesomesauce_icon.png"
	});
	
	mainWindow.loadURL("file://" + __dirname + "/index.html");
	
	mainWindow.maximize();
	
	// When the window is closed, dereference the mainWindow variable
	mainWindow.on("closed", function() {
		mainWindow = null;
	});
});