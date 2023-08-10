self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('push', (event) => {
  const data = event.data?.json();
  const options = {
    body: data.body,
    icon: '/logo512.png',
    badge: '/logo192.png',
    requireInteraction: true,
  };
  event.waitUntil(self.registration.showNotification(data?.title, options));
});
