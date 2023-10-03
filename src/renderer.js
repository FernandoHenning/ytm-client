const { ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld(
    'api', {
      getPrimaryScreenId: () => {
        return ipcRenderer.invoke('get-primary-screen-id');
      }
    }
  );


window.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.send('get-primary-screen-id');
  
  ipcRenderer.on('primary-screen-id', (event, screenId) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioStream = require('electron').desktopCapturer.getSources({ types: ['audio'], thumbnailSize: { width: 0, height: 0 }, screenId });

    audioStream.then(sources => {
      if (sources.length > 0) {
        navigator.mediaDevices.getUserMedia({
          audio: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: sources[0].id
            }
          }
        })
        .then(stream => {
          const audioSource = audioContext.createMediaStreamSource(stream);
          const gainNode = audioContext.createGain();

          
          gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

          audioSource.connect(gainNode);
          gainNode.connect(audioContext.destination);
        })
        .catch(error => {
          console.error('Error al obtener el flujo de audio:', error);
        });
      } else {
        console.error('No se encontraron fuentes de audio.');
      }
    })
    .catch(error => {
      console.error('Error al obtener las fuentes de audio:', error);
    });
  });
});
