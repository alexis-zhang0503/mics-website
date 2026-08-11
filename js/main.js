document.documentElement.classList.add("js");

// Hero 轮播 - 简化版
(function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  const indicators = document.querySelectorAll(".hero-indicator");
  const prevBtn = document.querySelector(".hero-nav-prev");
  const nextBtn = document.querySelector(".hero-nav-next");
  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const autoplayDelay = 3200;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function syncSlideState() {
    slides.forEach((slide, index) => {
      const isActive = index === currentIndex;
      slide.classList.toggle("hero-slide-active", isActive);
      slide.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    indicators.forEach((indicator, index) => {
      const isActive = index === currentIndex;
      indicator.classList.toggle("hero-indicator-active", isActive);
      indicator.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  function goToSlide(index) {
    const nextIndex = (index + slides.length) % slides.length;
    if (nextIndex === currentIndex) return;

    currentIndex = (index + slides.length) % slides.length;
    syncSlideState();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    if (reduceMotion) return;
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, autoplayDelay);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      startAutoplay();
    });
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      goToSlide(index);
      startAutoplay();
    });
  });

  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    heroSection.addEventListener("mouseenter", stopAutoplay);
    heroSection.addEventListener("mouseleave", startAutoplay);
  }

  syncSlideState();
  startAutoplay();
})();

// Hero 鼠标视差效果
(function initHeroParallax() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(hover: hover)").matches) return;

  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  hero.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
  });

  function animateParallax() {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;

    const activeContent = document.querySelector(".hero-slide-active .hero-content");
    const activeIndex = document.querySelector(".hero-slide-active .hero-index");

    if (activeContent) {
      activeContent.style.transform = `translate(${currentX * 8}px, ${currentY * 8}px)`;
    }
    if (activeIndex) {
      activeIndex.style.transform = `translate(${currentX * -14}px, ${currentY * -14}px)`;
    }

    requestAnimationFrame(animateParallax);
  }

  animateParallax();
})();

// 大面积 section 3D 视差（block-panel 全区域跟随鼠标微妙倾斜）
(function initBlockPanelParallax() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(hover: hover)").matches) return;

  const panels = document.querySelectorAll(".block-panel");

  panels.forEach((panel) => {
    const visual = panel.querySelector(".block-panel-visual");
    const text = panel.querySelector(".block-panel-text");
    if (!visual && !text) return;

    panel.addEventListener("mousemove", (e) => {
      const rect = panel.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (visual) {
        visual.style.transform = `translate3d(${x * 20}px, ${y * 20}px, 0) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
      }
      if (text) {
        text.style.transform = `translate3d(${x * -10}px, ${y * -10}px, 0)`;
      }
    });

    panel.addEventListener("mouseleave", () => {
      if (visual) visual.style.transform = "";
      if (text) text.style.transform = "";
    });
  });
})();

// Hero 粒子网络背景
(function initHeroNetwork() {
  const canvas = document.getElementById("hero-network");
  if (!canvas) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  const particles = [];
  const particleCount = 60;
  const maxDistance = 120;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(23, 63, 103, 0.6)";
      ctx.fill();
    }
  }

  function init() {
    resize();
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.3;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize);
  init();
  animate();
})();

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

  // 滚动进入动画
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const fadeElements = document.querySelectorAll(".fade-in-up");
    document.documentElement.classList.add("reveal-enabled");
    
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            
            // 处理 stagger 效果
            if (element.hasAttribute("data-stagger")) {
              const children = element.children;
              Array.from(children).forEach((child, index) => {
                child.style.setProperty("--fade-delay", `${index * 80}ms`);
                child.classList.add("fade-in-up");
                setTimeout(() => child.classList.add("is-visible"), 10);
              });
            } else {
              element.classList.add("is-visible");
            }
            
            fadeObserver.unobserve(element);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    fadeElements.forEach((el) => fadeObserver.observe(el));
  }

  // 研究方向卡片 3D 倾斜跟随鼠标
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && window.matchMedia("(hover: hover)").matches) {
    const tiltCards = document.querySelectorAll(".research-item");

    tiltCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }
});

// 背景视差速度差（背景比前景慢）- 优化版，带节流
(function initParallaxScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const parallaxSections = document.querySelectorAll(".hero, .block-panel-dark");
  if (parallaxSections.length === 0) return;

  let ticking = false;

  function updateParallax() {
    parallaxSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      
      if (scrollProgress >= 0 && scrollProgress <= 1) {
        const parallaxOffset = (scrollProgress - 0.5) * 100;
        
        // Hero canvas 背景视差
        const canvas = section.querySelector(".hero-canvas");
        if (canvas) {
          canvas.style.transform = `translate3d(0, ${parallaxOffset * 0.3}px, 0)`;
        }
        
        // Block panel 背景视差（如果有装饰元素）
        const visual = section.querySelector(".block-panel-visual");
        if (visual) {
          visual.style.transform = `translate3d(0, ${parallaxOffset * 0.2}px, 0)`;
        }
      }
    });
    
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true });
  updateParallax(); // 初始化
})();
