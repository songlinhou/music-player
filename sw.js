console.log("SERVICE WORKER...");

self.addEventListener("install", event=>{
    event.waitUntil(
        caches.open("v1").then(cache => {
            cache.addAll([
                './index.html',
                './swController.js'
            ]);
            console.log("Assets cached");
        })
        .catch(err => {
            console.log("could not cache:", err);
        })
    )
});