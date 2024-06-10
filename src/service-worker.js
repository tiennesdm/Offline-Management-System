/**
 * Service Worker installation event.
 * Caches essential static assets.
 * 
 * @event install
 * @param {ExtendableEvent} event - The install event.
 */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('static-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/bundle.js',
        '/manifest.json',
      ]);
    })
  );
  self.skipWaiting();
});

/**
 * Service Worker activation event.
 * Cleans up old caches.
 * 
 * @event activate
 * @param {ExtendableEvent} event - The activate event.
 */
self.addEventListener('activate', event => {
  const cacheWhitelist = ['static-v1', 'api-cache'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

/**
 * Fetch event to handle network requests.
 * Implements a cache-first strategy for static resources and
 * a network-first strategy for API requests.
 * 
 * @event fetch
 * @param {FetchEvent} event - The fetch event.
 */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.origin === location.origin) {
    // Handle API requests
    if (url.pathname.startsWith('/graphql/')) {
      event.respondWith(
        caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return fetch(event.request).then(response => {
            const clonedResponse = response.clone();
            caches.open('api-cache').then(cache => {
              cache.put(event.request, clonedResponse);
            });
            return response;
          });
        })
      );
    } else {
      // Handle static resources with a cache-first strategy
      event.respondWith(
        caches.match(event.request).then(cachedResponse => {
          return cachedResponse || fetch(event.request).then(response => {
            return caches.open('static-v1').then(cache => {
              cache.put(event.request.url, response.clone());
              return response;
            });
          });
        })
      );
    }
  } else {
    event.respondWith(fetch(event.request));
  }
});
