(function () {
  var supported = ["en", "uk", "ru"];
  var root = document.documentElement;
  root.classList.add("js");

  function pick() {
    var fromHash = location.hash.replace("#", "");
    if (supported.indexOf(fromHash) >= 0) return fromHash;
    var langs = navigator.languages || [navigator.language || "en"];
    for (var i = 0; i < langs.length; i++) {
      var code = String(langs[i]).slice(0, 2).toLowerCase();
      if (supported.indexOf(code) >= 0) return code;
    }
    return "en";
  }

  function show(lang) {
    root.lang = lang;
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-lang") === lang);
    });
    document.querySelectorAll("nav.langs button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.value === lang));
    });
    var title = document.querySelector("[data-lang='" + lang + "'] h1");
    if (title && document.body.hasAttribute("data-title-from-h1")) document.title = title.textContent;
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("nav.langs button").forEach(function (b) {
      b.addEventListener("click", function () {
        history.replaceState(null, "", "#" + b.value);
        show(b.value);
      });
    });
    show(pick());
  });
})();
