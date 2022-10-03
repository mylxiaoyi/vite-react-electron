
const { contextBridge, ipcRenderer } = require('electron')

const validChannels = ['SEND_MESSAGE']
contextBridge.exposeInMainWorld(
    'ipc', {
        send: (channel, data) => {
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data)
            }
        },
        on: (channel, func) => {
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args))
            }
        }
    }
)
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text;
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }
})