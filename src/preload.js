const {contextBridge, ipcRenderer} = require('electron');
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
  })

  contextBridge.exposeInMainWorld(
    'api', {
      getPrimaryScreenId: () => {
        return new Promise((resolve, reject) => {
          ipcRenderer.once('primary-screen-id', (event, screenId) => {
            resolve(screenId);
          });
          ipcRenderer.send('get-primary-screen-id');
        });
      }
    }
  );
  