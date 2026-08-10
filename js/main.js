document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const primaryNav = document.querySelector(".primary-nav");
  const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const yearElement = document.querySelector("#current-year");

  const closeNavigation = () => {
    if (!navToggle) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.querySelector(".sr-only").textContent = "打开导航菜单";
    document.body.classList.remove("nav-open");
  };

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      navToggle.querySelector(".sr-only").textContent = isOpen ? "打开导航菜单" : "关闭导航菜单";
      document.body.classList.toggle("nav-open", !isOpen);
    });

    navLinks.forEach((link) => link.addEventListener("click", closeNavigation));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNavigation();
        navToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) closeNavigation();
    });
  }

  if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleSection) return;

        navLinks.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${visibleSection.target.id}`;
          if (isCurrent) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      },
      { rootMargin: "-25% 0px -60%", threshold: [0, 0.15, 0.4] }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
});
