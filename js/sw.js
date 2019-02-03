const CACHE_NAME = 'cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

self.addEventListener('install', function(event) { //define callback for install event and decide which files you want to cache 
    event.waitUntil( //wait until installation event complete
        caches.open(CACHE_NAME) //open a cache
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache); //cache all files in array
        }).catch(function(error) {
            console.log('Error', error);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith( //pass in promise
        caches.match(event.request) //method looks at request and finds any cached results
        .then(function(response) {
            if(response) {
                console.log('got response', event.request)
                return response; //if have a matching response, return a cached value
            } else {
                console.log('Could not get response');
                return fetch(event.request) //otherwise return result of a call to fetch whcih makes network request
                .then(function(response) { //add cache for later, .then takes response from fetch
                    const clonedResponse = response.clone(); //to prevent using reponse twice clone reponse in order to have two streams
                    caches.open(CACHE_NAME).then(function(cache) { //open cache 
                        cache.put(event.request, clonedResponse); //use put method to pair request with reponse
                    })
                    return response; //return response back to fetch
                })
                .catch(function(error) {
                    console.log('Error arised during fetching', error) //log any potential errprs
                });
            }
        })
    );
});