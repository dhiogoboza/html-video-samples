var app = function () { };

app.video = null;
app.player = null;

app.checkPlayer = function() {
    setTimeout(function () {
        if (app.player != null) {
            app.loadStream();
        } else {
            app.checkPlayer();
        }
    }, 1000);
}

app.init = function () {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    // This is an asynchronous check.
    shaka.Player.probeSupport().then(function(support) {
        app.initPlayer();
    });

    app.checkPlayer();
}

app.initPlayer = function () {
    // Create a Player instance.
    app.video = /** @type {!HTMLVideoElement} */ document.getElementById('video');
    app.player = new shaka.Player(app.video);

    // Attach player to the window to make it easy to access in the JS console.
    window.player = app.player;

    // Listen for error events.
    app.player.addEventListener('error', app.onPlayerError, false);

    var fields = location.search.split('?').pop();
    fields = fields ? fields.split(';') : [];
    var params = {};
    for (var i = 0; i < fields.length; ++i) {
        var kv = fields[i].split('=');
        params[kv[0]] = kv[1];
    }

    if ('debug' in params && shaka.log) {
        shaka.log.setLevel(shaka.log.Level.DEBUG);
    }
    if ('v' in params && shaka.log) {
        shaka.log.setLevel(shaka.log.Level.V1);
    }

    app.detectEmeDrms();
};

app.detectEmeDrms = function () {
    var knownDrms = ['org.w3.clearkey', 'com.widevine.alpha', 'com.microsoft.playready', 'com.adobe.primetime', 'com.apple.fps.1_0', 'com.apple.fps.2_0', 'com.apple.fps.2_0'];

    var responseCount = 0;
    var self = this;
    function onRequestMediaKeySystemAccessResponse() {
        if (++responseCount == knownDrms.length) {
            document.getElementById('supportedDrms').innerHTML = self.supportedDrms.join(', ');
        }
    }
    this.supportedDrms = [];
    if (app.video.msSetMediaKeys && (typeof app.video.msSetMediaKeys == 'function')) {
        // IE
        knownDrms = ['com.microsoft.playready'];
        self.supportedDrms = knownDrms;
        onRequestMediaKeySystemAccessResponse();
    } else if (typeof navigator.requestMediaKeySystemAccess === 'function') {
        for (var i = 0; i < knownDrms.length; i++) {
            navigator.requestMediaKeySystemAccess(knownDrms[i], [{}]).then(function (mediaKeySystemAccess) {
                self.supportedDrms.push(mediaKeySystemAccess.keySystem);
                onRequestMediaKeySystemAccessResponse();
            }).catch(function () { onRequestMediaKeySystemAccessResponse(); });
        }
    }
}

app.loadStream = function () {
    // (re)configure the player
    var drmConfig = drmConfig = {
        drm: {
            clearKeys: {
            }
        }
    }
    drmConfig.drm.clearKeys[app.kid] = app.key;
    app.player.configure(drmConfig);

    // This is an asynchronous process.
    player.load(app.mediaUrl).then(function () {
        // This runs if the asynchronous load is successful.
        console.log('The video has now been loaded!');
    }).catch(app.onPlayerError);  // onError is executed if the asynchronous load fails.
};

app.onPlayerError = function (event) {
    console.error('Player error', event);
}

function playMedia(mediaUrl, kid, key) {
    app.mediaUrl = mediaUrl;
    app.kid = kid;
    app.key = key;

    app.init();
}
