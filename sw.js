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
    '/sw.js',
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