const V='wsg-v1',A=["./", "./index.html", "./offline.html", "./manifest.webmanifest", "./css/styles.css", "./js/speeches-data.js", "./js/voice-engine.js", "./js/app.js", "./icons/icon-192.png", "./icons/icon-512.png", "./favicon.svg"];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(A))));
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
if(r.mode==='navigate'){e.respondWith(fetch(r).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html')).then(m=>m||caches.match('./offline.html'))));return}
e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{const c=x.clone();caches.open(V).then(ch=>ch.put(r,c));return x})))});