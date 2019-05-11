const FILES_TO_CACHE = [
    './index.html',
    './offline.html',
    './css/desktop.css',
    './css/smartphone.css'
];
const CACHE_NAME = 'cache';

self.addEventListener('install', (evt) => {
    evt.waitUntil( 
        caches.open(CACHE_NAME).then((cache) => { 
            console.log('[ServiceWorker] Pre-caching offline page'); 
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('fetch', function(evt) {
    if (evt.request.mode !== 'navigate') 
    { // Not a page navigation, bail. 
        return; 
    } 
    // evt.respondWith( 
    //     fetch(evt.request) 
    //         .catch(() => { 
    //             return caches.open(CACHE_NAME) 
    //                 .then((cache) => { 
    //                     return cache.match('offline.html'); 
    //                 }); 
    //         }
    //     )
    // )
    evt.respondWith(
        caches.match(evt.request)
            .then(function(response){
                if (response){
                    return response;
                }
                return fetch(evt.request).then(
                    function(response) {
                      // Check if we received a valid response
                      if(!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                      }
          
                      // IMPORTANT: Clone the response. A response is a stream
                      // and because we want the browser to consume the response
                      // as well as the cache consuming the response, we need
                      // to clone it so we have two streams.
                      var responseToCache = response.clone();
          
                      caches.open(CACHE_NAME)
                        .then(function(cache) {
                          cache.put(evt.request, responseToCache);
                        });
          
                      return response;
                    }
                );
            })
    )
});

self.addEventListener('activate', (evt) => {
 evt.waitUntil( 
     caches.keys().then((keyList) => { 
         return Promise.all(keyList.map((key) => { 
             if (key !== CACHE_NAME) { 
                 console.log('[ServiceWorker] Removing old cache', key); 
                 return caches.delete(key); 
             } 
         }));
     })
 ); 
});