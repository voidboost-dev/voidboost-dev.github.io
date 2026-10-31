(function () {
    var supported = ['en', 'uk', 'ru'];
    var root = document.documentElement;
    root.classList.add('js');

    function fromHash() {
        var code = location.hash.replace('#', '');
        return supported.indexOf(code) >= 0 ? code : null;
    }

    function pick() {
        var hashed = fromHash();
        if (hashed) return hashed;
        var langs = navigator.languages || [navigator.language || 'en'];
        for (var i = 0; i < langs.length; i++) {
            var code = String(langs[i]).slice(0, 2).toLowerCase();
            if (supported.indexOf(code) >= 0) return code;
        }
        return 'en';
    }

    function show(lang) {
        root.lang = lang;
        var active = null;
        document.querySelectorAll('[data-lang]').forEach(function (el) {
            var on = el.getAttribute('data-lang') === lang;
            el.classList.toggle('active', on);
            if (on && !active) active = el;
        });
        document.querySelectorAll('nav.langs button').forEach(function (b) {
            b.setAttribute('aria-pressed', String(b.value === lang));
        });
        if (active && active.hasAttribute('data-title'))
            document.title = active.getAttribute('data-title');
        // Keep the chosen language when moving between pages of the site
        document.querySelectorAll('a[data-keep-lang]').forEach(function (a) {
            a.hash = lang;
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('nav.langs button').forEach(function (b) {
            b.addEventListener('click', function () {
                history.replaceState(null, '', '#' + b.value);
                show(b.value);
            });
        });
        window.addEventListener('hashchange', function () {
            var hashed = fromHash();
            if (hashed) show(hashed);
        });
        show(pick());
    });
})();
