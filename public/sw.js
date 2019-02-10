'use strict';

let cacheName = 'wine-v20';

/*
 * On install event, cache known needed resources during install event
 */
self.addEventListener('install', function (event) {
    event.waitUntil(caches.open(cacheName).then(function (cache) {
    return cache.addAll([
        'index.html',
        'src/App.css',
        'src/App.js',
        'src/GoogleMapsHelper.js',
        'src/Header.js',
        'src/index.css',
        'src/index.js',
        'src/Map.js',
        'src/Menu.js',
        'src/Model.js',
        'src/Place.js',
        'src/Sidebar.js',
        "https://fonts.googleapis.com/css?family=Cinzel+Decorative|Lato"
    ]);
  }));
});



/*
 * On activate event, delete old caches and claim clients of previous service worker to accomplish
 * aggressive fetching
 */
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key.startsWith('wine') && (key != cacheName)) {
          return caches.delete(key);
        }
      }));
    })
    .then(function() {
      return self.clients.claim();
    })
  );
});


/*
 * On fetch event, check if request response pair is already in cache.  If so
 * respond with cache response.  Otherwise fetch and store request response pair
 * in cache
 */
 self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
      if ((event.request.url.indexOf('http') === 0 &&
          event.request.url.indexOf('Quota') === 0)) {
             return caches.open(cacheName).then(function(cache) {
               cache.put(event.request, response.clone());
               return response;
             });
        } else {
          return response;
        }
      });
    }));
 });
