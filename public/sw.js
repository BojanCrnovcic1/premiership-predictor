const CACHE_NAME = "premiership-predictor-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/logo192.png",
  "/logo512.png",
];

// Instalacija Service Worker-a i keširanje osnova
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }),
  );
  self.skipWaiting();
});

// Aktivacija i čišćenje starog keša
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Presretanje mrežnih zahtjeva (Network First sa Cache fallback-om)
self.addEventListener("fetch", (event) => {
  // Ignorišemo API pozive ka NestJS backendu da se ne keširaju zastarjeli podaci
  if (event.request.url.includes("/api")) {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    }),
  );
});
