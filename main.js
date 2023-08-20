// app for application life, BrowserWindow for creating browser window
const { app, BrowserWindow } = require("electron");

const homepage = "./html/index.html";
let windowsWidth = 400;
let windowsHeight = 800;

const createWindow = () => {
    const win = new BrowserWindow({
        width: windowsWidth,
        height: windowsHeight,
    });

    // load the html file
    win.loadFile(homepage);
};

// when app is ready, create window
app.on("ready", () => {
    createWindow();

    // on macOS, re-create window when dock icon is clicked
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    // on macOS, quit the app when window is closed
    if (process.platform !== "darwin") app.quit();
});
