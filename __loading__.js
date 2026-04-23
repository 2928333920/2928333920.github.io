pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // splash
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'block';

        // Logo
        var logo = document.createElement('img');
        logo.className = 'splash-logo';
        splash.appendChild(logo);

        // Subtitle
        var subtitle = document.createElement('div');
        subtitle.className = 'splash-subtitle';
        subtitle.textContent = '';
        // splash.appendChild(subtitle);

        // Progress bar
        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        splash.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);

        // Load logo asset
        app.once('preload:start', function () {
            var logoAsset = app.assets.find('logo_san_jose_elcentro.png', 'texture');
            if (logoAsset) {
                logo.src = logoAsset.getFileUrl();
            } else {
                console.warn('Logo asset "logo_san_jose_elcentro.png" not found.');
            }
        });
    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        splash.parentElement.removeChild(splash);
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        if (bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
        }
    };

    var createCss = function () {
        var css = [
            'body {',
            '    background-color: #FFFFFF;',
            '}',
            '',
            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #FFFFFF;',
            '}',
            '',
            '#application-splash {',
            '    position: absolute;',
            '    top: 50%;',
            '    left: 50%;',
            '    transform: translate(-50%, -50%);',
            '    text-align: center;',
            '}',
            '',
            '.splash-logo {',
            '    width: 300px;',
            '    height: auto;',
            '    display: block;',
            '    margin: 0 auto 20px auto;',
            '}',
            '',
            '.splash-subtitle {',
            '    font-family: Arial, sans-serif;',
            '    font-size: 20px;',
            '    color: #3f4e5e;',
            '    margin-bottom: 40px;',
            '}',
            '',
            '#progress-bar-container {',
            '    margin: 0 auto;',
            '    height: 2px;',
            '    width: 50%;',
            '    max-width: 600px;',
            '    background-color: #ECECEC;',
            '}',
            '',
            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #EA6725;',
            '}',
            '',
            '@media (max-width: 480px) {',
            '    .splash-logo {',
            '        width: 90%;',
            '    }',
            '    .splash-subtitle {',
            '        font-size: 16px;',
            '    }',
            '}'
        ].join('\n');

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };

    createCss();
    showSplash();

    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);

    app.on('start', hideSplash);
});
