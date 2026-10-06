self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            console.log('assets cached');
            // Usamos rutas relativas para evitar problemas con la subcarpeta act1
            return cache.addAll([
                './',
                './index.html',
                './script.js',
                './obj.png'
            ]);
        }).catch(err => {
            console.log('could not cache', err);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== 'v1') { 
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    console.log('intercepted');
    event.respondWith(
        caches.match(event.request).then(response => {
            console.log('request', event.request);
            console.log('response', response);
            // Escenario base del video: devolver de caché o hacer fetch
            return response || fetch(event.request);
        })
    );
});