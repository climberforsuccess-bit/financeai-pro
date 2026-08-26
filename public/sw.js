// ============================================
// SERVICE WORKER - FinanceAI Pro PWA
// ============================================

const CACHE_NAME = 'financeai-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/app.html',
  '/auth.html',
  '/styles.css',
  '/app.js',
  '/supabase.js',
  '/payment.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

// ============================================
// INSTALL EVENT
// ============================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Some assets failed to cache:', err);
        // Continue even if some assets fail
        return Promise.resolve();
      });
    })
  );
  
  self.skipWaiting();
});

// ============================================
// ACTIVATE EVENT
// ============================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  self.clients.claim();
});

// ============================================
// FETCH EVENT - Cache-first for static, Network-first for API
// ============================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // API calls: Network-first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Offline fallback
          if (request.destination === 'document') {
            // For HTML pages, try to return a cached version
            return caches.match('/app.html').then((cached) => {
              if (cached) {
                return cached;
              }
              // Return offline page if available
              return caches.match('/index.html');
            });
          }
          // For other resources, return a generic offline response
          return new Response('Recurso no disponible', { status: 404 });
        })
    );
  }
});

// ============================================
// MESSAGE EVENT - for cache updates
// ============================================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME).then(() => {
      console.log('[SW] Cache cleared');
    });
  }
});

// ============================================
// PERIODIC BACKGROUND SYNC (optional)
// ============================================
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // Sync critical data when back online
      fetch('/api/sync-user-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timestamp: Date.now() })
      }).catch((err) => {
        console.log('[SW] Sync failed, will retry:', err);
        return Promise.reject(err);
      })
    );
  }
});

console.log('[SW] Service Worker loaded');
