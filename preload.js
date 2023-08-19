// Desc: Preload script for the renderer process
window.addEventListener("DOMContentLoaded", () => {
    // replace text in the DOM of the index.html file
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        // if element exists, replace the text
        if (element) element.innerText = text;
    };

    // for each dependency, replace the text
    for (const dependency of ["chrome", "node", "electron"]) {
        replaceText(`${dependency}-version`, process.versions[dependency]);
    }
});
