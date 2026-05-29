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

  // Scroll-reveal: fade/slide sections in as they enter the viewport.
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var revealIO = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
      revealEls.forEach(function (el) { revealIO.observe(el); });
    } else {
      // No IntersectionObserver: reveal everything so nothing stays hidden.
      revealEls.forEach(function (el) { el.classList.add("in-view"); });
    }
  }

  // Scroll-spy: highlight the in-page nav link for the section in view.
  var navLinks = document.querySelectorAll(".section-nav a");
  if (navLinks.length && "IntersectionObserver" in window) {
    var linkById = {};
    navLinks.forEach(function (a) {
      linkById[a.getAttribute("href").slice(1)] = a;
    });
    var sections = [];
    Object.keys(linkById).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) { sections.push(sec); }
    });
    var setActive = function (id) {
      navLinks.forEach(function (a) { a.classList.remove("active"); });
      if (linkById[id]) { linkById[id].classList.add("active"); }
    };
    var spyIO = new IntersectionObserver(function (entries) {
      // Pick the entry nearest the top that is intersecting.
      var visible = entries.filter(function (e) { return e.isIntersecting; });
      if (visible.length) {
        visible.sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
        setActive(visible[0].target.id);
      }
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (sec) { spyIO.observe(sec); });
  }

  // Back-to-top button.
  var toTop = document.getElementById("to-top");
  if (toTop) {
    var onScroll = function () {
      if (window.pageYOffset > 400) { toTop.classList.add("visible"); }
      else { toTop.classList.remove("visible"); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
