function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);

  const themeToggleBtn = document.getElementById("themeToggleBtn");
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
  }

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute("content", isDark ? "#221b16" : "#fbf7f1");
  }
}

function toggleTheme() {
  const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("site-theme", nextTheme);
  applyTheme(nextTheme);
}

document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("site-theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    applyTheme(savedTheme);
  } else {
    applyTheme("light");
  }

  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = siteNav.classList.toggle("is-open");
      menuToggle.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    siteNav.querySelectorAll(".nav__link").forEach(link => {
      link.addEventListener("click", function () {
        siteNav.classList.remove("is-open");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 700) {
        siteNav.classList.remove("is-open");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      }
    });
  }
});