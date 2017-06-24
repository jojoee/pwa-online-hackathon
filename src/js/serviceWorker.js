var cacheAssetKey = '0.0.0',
  cacheApiKey = '1.0.0';

// app shell
var filesToCache = [
  '/',
  '/index.html',
  '/dist/css/main.min.css',
  '/dist/js/main.min.js',
];

// cache / load asset (app shell)
self.addEventListener('install', function(e) {
  console.log('serviceWorker: install');

  e.waitUntil(caches.open(cacheAssetKey).then(function(cache) {
    console.log('serviceWorker: caching app shell');
    return cache.addAll(filesToCache);
  }));
});

// cache / load API
self.addEventListener('fetch', function(e) {
  console.log('serviceWorker: fetch', e.request.url);

  var apiRoot = 'https://';
  if (e.request.url.indexOf(apiRoot) > -1) {
    // "Cache then network" strategy
    // https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
    e.respondWith(caches.open(cacheApiKey).then(function(cache) {
      return fetch(e.request).then(function(res) {
        cache.put(e.request.url, res.clone());
        return res;
      });
    }));

  } else {
    // app shell
    // "Cache, falling back to the network" offline strategy:
    // https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});

// remove old cache
self.addEventListener('activate', function(e) {
  console.log('serviceWorker: activate');

  e.waitUntil(caches.keys().then(function(keyList) {
    return Promise.all(keyList.map(function(key) {
      if (key !== cacheAssetKey && key !== cacheApiKey) {
        console.log('serviceWorker: removing old cache', key);
        return caches.delete(key);
      }
    }));
  }));

  // fix a corner case
  // https://github.com/googlecodelabs/your-first-pwapp/blob/master/final/service-worker.js#L69
  // https://davidwalsh.name/service-worker-claim
  // http://stackoverflow.com/questions/41009167/what-is-the-use-of-self-clients-claim
  return self.clients.claim();
});
