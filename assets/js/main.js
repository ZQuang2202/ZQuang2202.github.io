/* Theme toggle + small page touches.
   The initial theme is set as early as possible by the inline script in
   <head> (to avoid a flash); this file wires up the toggle button. */
(function () {
  "use strict";

  var root = document.documentElement;

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var icon = document.querySelector("#theme-toggle i");
    if (icon) {
      icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
  }

  // Sync the toggle icon to whatever the inline script already applied.
  applyTheme(currentTheme());

  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* storage may be unavailable (private mode) — ignore */
      }
    });
  }

  // Footer year.
  var year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Visitor counter via Abacus (free, no sign-up, CORS-enabled). Increments on
  // each page view and shows the total. Fails silently if the service is down.
  var countEl = document.getElementById("visit-count");
  if (countEl) {
    fetch("https://abacus.jasoncameron.dev/hit/zquang2202-github-io/visits")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var n = data && (data.value != null ? data.value : data.count);
        if (n != null && !isNaN(n)) {
          countEl.textContent = Number(n).toLocaleString();
          var wrap = document.getElementById("visits");
          if (wrap) { wrap.hidden = false; }
        }
      })
      .catch(function () { /* counter unavailable — leave hidden */ });
  }
})();
