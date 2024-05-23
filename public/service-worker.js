const cacheName = 'my-cache';
const assetsToCache = [
    '/',
    '/index.html',
    // Add more assets to cache here
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => cache.addAll(assetsToCache))
            .catch((error) => console.error('Error caching assets:', error))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                return new Response('Fetch error');
            })
    );
});

self.addEventListener('activate', (event) => {
});
