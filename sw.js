const CACHE_NAME = 'my-site-cache-1';
const Dynamic_cache = 'site-dynamic-cache';

let urlsToCache = [

  './css/site.css',
  './img/android-chrome-512x512.png',
  './index.html',
  './info.html'

];


// alle elementer til at skabe appen skal caches


self.addEventListener('install', function (event) {
  // Perform install steps
  console.log('installing ------------------------------------------');
  event.waitUntil(
    caches.open(CACHE_NAME)

      .then(function (cache) {
        console.log('initial cache of statics');
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (CACHE_NAME !== cacheName &&  cacheName.startsWith("my-site-cache")) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});



//      fetch    ----------------------------------------------
/* 
self.addEventListener('fetch', function (event) {

  if(event.request.destination=="image"){


  
  event.respondWith(
// returns 
    caches.open(Dynamic_cache)
      .then(function (cache) {

        cache.keys()
          .then(function (requests) {

            caches.match(requests[1])
              .then(function (response) {
                console.log(response);
return response;
              })

          })
      })


  )

}

});

 */




self.addEventListener('fetch', function (event) {

  const destination = event.request.destination;
  console.log(destination);

  switch (destination) {
    case 'style':
      return;
    case 'script':
      return;
    case 'document':
      return;

    case 'image':
      const myUrl = event.request.url;

     console.log('img: '+myUrl);
      event.respondWith(

        caches.open(Dynamic_cache).then(function (cache) {

          return cache.match(event.request)
          .then(function (response) {
         
            return (response ||
              fetch(event.request).then(function (response) {
               
                  console.log('caching');
                cache.put(event.request, response.clone());
                return response;
              })
            );
          });
        })

      );
      return;

    // All `XMLHttpRequest` or `fetch()` calls where git
    // `Request.destination` is the empty string default value

    default:

    

      return;

  }
});




/* self.addEventListener('fetch', function(event) {

  event.respondWith(

    caches.open(CACHE_NAME)
    
    .then(function(cache) {
      return cache.match(event.request)

      .then(function (response) {
if(response){
  console.log('found match');
};
return response || fetch(event.request)

        .then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })


  );
}); 

*/
