/*
 * THX PORTFÓLIO / PRECISÃO SERENA MODERNA
 * Renderização de conteúdo configurável, navegação móvel em drawer, acordeão fluido e microinterações.
 */

(function () {
  "use strict";

  var config = /** @type {any} */ (window).portfolioConfig;
  if (!config) return;

  var root = document.documentElement;
  if (root) {
    root.setAttribute("data-mode", config.mode || "demo");
  }

  /**
   * @param {any} str
   * @returns {string}
   */
  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /**
   * @param {string} selector
   * @param {string} value
   */
  function assignText(selector, value) {
    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
      elements[i].textContent = value;
    }
  }

  function applyTheme() {
    if (!config.theme || !root) return;
    Object.keys(config.theme).forEach(function (key) {
      var cssVarName = "--" + key.replace(/[A-Z]/g, function (letter) {
        return "-" + letter.toLowerCase();
      });
      root.style.setProperty(cssVarName, config.theme[key]);
    });
  }

  function applyMeta() {
    if (config.seo) {
      if (config.seo.title) document.title = config.seo.title;
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && config.seo.description) metaDesc.setAttribute("content", config.seo.description);
      var metaRobots = document.querySelector('meta[name="robots"]');
      if (metaRobots && config.seo.robots) metaRobots.setAttribute("content", config.seo.robots);
      var linkCanonical = document.querySelector('link[rel="canonical"]');
      if (linkCanonical && config.seo.canonical) linkCanonical.setAttribute("href", config.seo.canonical);
    }
  }

  function renderNavigation() {
    if (!config.navigation) return;
    var html = config.navigation.map(function (/** @type {any} */ item) {
      return '<a href="' + escapeHtml(item.href) + '">' + escapeHtml(item.label) + '</a>';
    }).join("");
    var navs = document.querySelectorAll("[data-nav]");
    for (var i = 0; i < navs.length; i++) {
      navs[i].innerHTML = html;
    }
  }

  function renderProjects() {
    var target = document.querySelector("[data-projects]");
    if (!target || !config.projects) return;

    var html = config.projects.map(function (/** @type {any} */ project, /** @type {number} */ idx) {
      return [
        '<article class="case reveal" data-project-id="' + escapeHtml(project.id) + '" style="--stagger-idx: ' + idx + '">',
        '  <a class="case-media mockup-window" href="' + escapeHtml(project.demoUrl) + '" target="_blank" rel="noopener" aria-label="Abrir demonstração de ' + escapeHtml(project.name) + '">',
        '    <div class="mockup-bar" aria-hidden="true">',
        '      <div class="mockup-dots"><span></span><span></span><span></span></div>',
        '      <span class="mockup-url">' + escapeHtml(project.id) + '.thx.demo</span>',
        '      <span class="mockup-action">Ver Demo ↗</span>',
        '    </div>',
        '    <div class="mockup-screen">',
        '      <img src="' + escapeHtml(project.image) + '" alt="' + escapeHtml(project.imageAlt) + '" loading="lazy" />',
        '    </div>',
        '  </a>',
        '  <div class="case-copy">',
        '    <div class="case-tags">',
        '      <span class="case-tag">' + escapeHtml(project.number) + '</span>',
        '      <span class="case-tag case-tag--category">' + escapeHtml(project.category) + '</span>',
        '    </div>',
        '    <h3>' + escapeHtml(project.name) + '</h3>',
        '    <p>' + escapeHtml(project.description) + '</p>',
        '    <a class="case-link" href="' + escapeHtml(project.demoUrl) + '" target="_blank" rel="noopener">',
        '      <span>' + escapeHtml(project.cta) + '</span>',
        '      <svg class="arrow-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">',
        '        <path d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
        '      </svg>',
        '    </a>',
        '  </div>',
        '</article>'
      ].join("\n");
    }).join("");

    target.innerHTML = html;
  }

  var benefitIcons = [
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
  ];

  function renderBenefits() {
    var target = document.querySelector("[data-benefits]");
    if (!target || !config.benefits) return;

    var html = config.benefits.map(function (/** @type {any} */ benefit, /** @type {number} */ index) {
      var icon = benefitIcons[index] || benefitIcons[0];
      return [
        '<article class="benefit reveal" style="--stagger-idx: ' + index + '">',
        '  <div class="benefit-top">',
        '    <div class="benefit-icon-box" aria-hidden="true">' + icon + '</div>',
        '    <span class="benefit-number">0' + (index + 1) + '</span>',
        '  </div>',
        '  <h3>' + escapeHtml(benefit.title) + '</h3>',
        '  <p>' + escapeHtml(benefit.text) + '</p>',
        '</article>'
      ].join("\n");
    }).join("");

    target.innerHTML = html;
  }

  function renderProcess() {
    var target = document.querySelector("[data-process]");
    if (!target || !config.process) return;

    var html = config.process.map(function (/** @type {any} */ step, /** @type {number} */ idx) {
      return [
        '<li class="process-item reveal" style="--stagger-idx: ' + idx + '">',
        '  <span>' + escapeHtml(step.number) + '</span>',
        '  <div><h3>' + escapeHtml(step.title) + '</h3><p>' + escapeHtml(step.text) + '</p></div>',
        '</li>'
      ].join("\n");
    }).join("");

    target.innerHTML = html;
  }

  function renderFaq() {
    var target = document.querySelector("[data-faq]");
    if (!target || !config.faq) return;

    var html = config.faq.map(function (/** @type {any} */ item, /** @type {number} */ idx) {
      return [
        '<details class="faq-item reveal" style="--stagger-idx: ' + idx + '">',
        '  <summary>',
        '    <span>' + escapeHtml(item.question) + '</span>',
        '    <span class="faq-icon-wrap" aria-hidden="true">+</span>',
        '  </summary>',
        '  <div class="faq-content">',
        '    <p>' + escapeHtml(item.answer) + '</p>',
        '  </div>',
        '</details>'
      ].join("\n");
    }).join("");

    target.innerHTML = html;
  }

  function renderContent() {
    if (config.brand) {
      assignText("[data-brand='name']", config.brand.name || "");
      assignText("[data-brand='shortName']", config.brand.shortName || config.brand.name || "");
      assignText("[data-brand='tagline']", config.brand.tagline || config.brand.descriptor || "");
      var brandElements = document.querySelectorAll(".brand[aria-label]");
      for (var b = 0; b < brandElements.length; b++) {
        brandElements[b].setAttribute("aria-label", (config.brand.name || "THX") + ", início");
      }
    }

    if (config.hero) {
      Object.keys(config.hero).forEach(function (key) {
        var selector = "[data-hero='" + key + "']";
        var value = config.hero[key];
        if (key === "primaryCta" || key === "secondaryCta") {
          var links = document.querySelectorAll(selector);
          for (var l = 0; l < links.length; l++) {
            var span = links[l].querySelector("span");
            if (span) span.textContent = value;
          }
          return;
        }
        assignText(selector, value);
      });
    }

    if (config.difference) {
      Object.keys(config.difference).forEach(function (key) {
        assignText("[data-difference='" + key + "']", config.difference[key]);
      });
    }

    if (config.footer) {
      Object.keys(config.footer).forEach(function (key) {
        assignText("[data-footer='" + key + "']", config.footer[key]);
      });
    }

    if (config.contact) {
      assignText("[data-contact-note]", config.contact.note || "");
    }

    if (config.upcoming && Array.isArray(config.upcoming)) {
      var upcomingStr = config.upcoming.join(", ").replace(/, ([^,]*)$/, " e $1");
      assignText("[data-upcoming]", upcomingStr);
    }

    var contactNumber = String((config.contact && config.contact.whatsappNumber) || "").replace(/\D/g, "");
    var contactMessage = String((config.contact && config.contact.whatsappMessage) || "").trim();
    var whatsappHref = contactNumber
      ? "https://wa.me/" + contactNumber + (contactMessage ? "?text=" + encodeURIComponent(contactMessage) : "")
      : "";

    var contactLinks = document.querySelectorAll("[data-contact-link]");
    for (var c = 0; c < contactLinks.length; c++) {
      var link = contactLinks[c];
      var href = whatsappHref || (config.contact && config.contact.primaryHref) || "#contato";
      link.setAttribute("href", href);
      if (href.indexOf("#") === 0) {
        link.removeAttribute("target");
        link.removeAttribute("rel");
      } else {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener");
      }
    }
  }

  function setupHeaderAndScroll() {
    var headerWrap = document.getElementById("header-wrap");
    var floatingCta = document.getElementById("floating-cta");

    function onScroll() {
      var scrollY = window.scrollY || window.pageYOffset || 0;
      if (headerWrap) {
        if (scrollY > 20) {
          headerWrap.classList.add("is-scrolled");
        } else {
          headerWrap.classList.remove("is-scrolled");
        }
      }
      if (floatingCta) {
        if (scrollY > 300) {
          floatingCta.classList.add("is-visible");
        } else {
          floatingCta.classList.remove("is-visible");
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function setupMenu() {
    var toggle = /** @type {HTMLElement|null} */ (document.querySelector(".menu-toggle"));
    var drawer = /** @type {HTMLElement|null} */ (document.querySelector(".mobile-menu-drawer"));
    var backdrop = /** @type {HTMLElement|null} */ (document.querySelector(".mobile-menu-backdrop"));
    var closeBtn = /** @type {HTMLElement|null} */ (document.querySelector(".mobile-menu-close"));
    if (!toggle || !drawer) return;

    var toggleEl = toggle;
    var drawerEl = drawer;

    function openMenu() {
      if (!toggleEl || !drawerEl) return;
      toggleEl.setAttribute("aria-expanded", "true");
      toggleEl.setAttribute("aria-label", "Fechar menu");
      drawerEl.hidden = false;
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(function () {
          if (!drawerEl) return;
          drawerEl.classList.add("is-active");
          if (backdrop) backdrop.classList.add("is-active");
          if (document.body) document.body.style.overflow = "hidden";
        });
      } else {
        drawerEl.classList.add("is-active");
        if (backdrop) backdrop.classList.add("is-active");
        if (document.body) document.body.style.overflow = "hidden";
      }
    }

    function closeMenu() {
      if (!toggleEl || !drawerEl) return;
      toggleEl.setAttribute("aria-expanded", "false");
      toggleEl.setAttribute("aria-label", "Abrir menu");
      drawerEl.classList.remove("is-active");
      if (backdrop) backdrop.classList.remove("is-active");
      if (document.body) document.body.style.overflow = "";
      setTimeout(function () {
        if (toggleEl && drawerEl && toggleEl.getAttribute("aria-expanded") === "false") {
          drawerEl.hidden = true;
        }
      }, 320);
    }

    toggleEl.addEventListener("click", function () {
      if (!toggleEl) return;
      var isOpen = toggleEl.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    if (backdrop) backdrop.addEventListener("click", closeMenu);

    drawerEl.addEventListener("click", function (event) {
      var target = /** @type {Node|null} */ (event.target);
      while (target && target !== drawerEl) {
        if (target instanceof HTMLElement && target.tagName === "A") {
          closeMenu();
          break;
        }
        target = target.parentNode;
      }
    });

    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggleEl && toggleEl.getAttribute("aria-expanded") === "true") {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024 && toggleEl && toggleEl.getAttribute("aria-expanded") === "true") {
        closeMenu();
      }
    });
  }

  function setupFaq() {
    var items = /** @type {NodeListOf<HTMLDetailsElement>} */ (document.querySelectorAll(".faq-item"));
    for (var i = 0; i < items.length; i++) {
      (function (item) {
        item.addEventListener("toggle", function () {
          if (item.open) {
            for (var j = 0; j < items.length; j++) {
              if (items[j] !== item && items[j].open) {
                items[j].open = false;
              }
            }
          }
        });
      })(items[i]);
    }
  }

  function setupReveals() {
    var items = document.querySelectorAll(".reveal");
    if (!window.matchMedia || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches || !("IntersectionObserver" in window)) {
      for (var i = 0; i < items.length; i++) {
        items[i].classList.add("is-visible");
      }
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var item = /** @type {HTMLElement} */ (entry.target);
          var staggerIdx = parseInt(item.style.getPropertyValue("--stagger-idx") || "0", 10);
          var delay = Math.min(staggerIdx * 80, 400);
          if (delay > 0) {
            setTimeout(function () {
              item.classList.add("is-visible");
            }, delay);
          } else {
            item.classList.add("is-visible");
          }
          observer.unobserve(item);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

    for (var k = 0; k < items.length; k++) {
      observer.observe(items[k]);
    }
  }

  applyTheme();
  applyMeta();
  renderNavigation();
  renderProjects();
  renderBenefits();
  renderProcess();
  renderFaq();
  renderContent();
  setupHeaderAndScroll();
  setupMenu();
  setupFaq();
  setupReveals();
})();

