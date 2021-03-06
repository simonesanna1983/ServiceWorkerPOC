
importScripts("serviceworker-cache-polyfill.js");
this.version = 2.0;

console.log("I am a sw-22-10-2020.js ver:" + this.version +
            " - Ready to do the work");


var CACHE_NAME = 'sw-22-10-2020-cache-v' + this.version;

// The files we want to cache
var urlsToCache = [
  'index.html',
  'css/style.css',
  'js/script.js',
  'imgs/img.jpeg'
];

// Set the callback for the install step
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache:' + CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
  );

});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        console.log("Got res:"+response);
        if (response) {
          console.log("Cache hit: " + JSON.stringify(response.url) );
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              console.log("return res:"+response.url + " status: "+response.status);
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have 2 stream.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

//
// Let's clean the old cache
//
self.addEventListener('activate', function(event) {
  console.log("sw-22-10-2020 have been activated. Cache name:" + CACHE_NAME);
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          console.log("Deleteing cache: " + cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

//
//
//
self.addEventListener('message', function(e) {
  var message = e.data;
  console.log("sw-22-10-2020 have just got the message:" + message);
});










