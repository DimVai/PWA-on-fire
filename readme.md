PWA with code as minimal as possible, as regards manifest + service worker, but with jQuery + Bootstrap + custom css.

https://dimvai.github.io/PWA/

What to do specifically:

1. Make your app's icon, `logo.png` (and your favicon.ico)
2. Add the `manifest.json` (change it if you like)
3. Add the `service-worker.js` (change it if you like)
4. In your `index.html` add:


In the `head` section:
```HTML
<link rel="manifest" href="manifest.json">      
<link rel="icon" href="favicon.ico" type="image/x-icon"/>
```

Anywhere:
```HTML
<script>
    window.addEventListener('load', function(event) {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js')
                .then((reg)=>console.debug('service worker registered', reg))
                .catch((err)=>console.debug('service worker not registered',err));
        }
    });
</script>
```