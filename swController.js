let registration = null;

function registerServiceWorker(){
    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('./sw.js', {scope: './'})
        .then(res => {
            registration = res;
            console.log("service worker successfully registered");
        })
        .catch(err => {
            console.log("service worker cannot be registered");
        });
    }
}

function unregisterServiceWorker(){
    navigator.serviceWorker.getRegistrations().then(regs => {
        regs.forEach(reg => {
            reg.unregister();
            console.log("service worker unregistered:", reg);
        })
    })
    .catch(err => {
        console.log("cannot unregister service:", err);
    });
}

function serviceWorkerInit(){
    registerServiceWorker();
}