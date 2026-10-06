let registration = null;

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        // Usamos ruta relativa
        navigator.serviceWorker.register('./sw.js')
            .then(res => {
                console.log('service worker successfully registered');
                registration = res;
            })
            .catch(err => {
                console.log('could not register service worker', err);
            });
    }
}

registerServiceWorker();

window.addEventListener('click', () => {
    fetch('obj.png')
        .then(res => {
            console.log('from script.js I got the response', res);
        });
});