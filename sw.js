const V='scan-v6',CORE=['./','./index.html','./manifest.json','./icon-180.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(caches.match(e.request).then(m=>{const n=fetch(e.request).then(r=>{if(r&&(r.status===200||r.type==='opaque'))caches.open(V).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>m);return m||n}))});
