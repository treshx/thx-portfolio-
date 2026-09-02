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
      if (item.disabled || !item.href) {
        return '<span class="nav-placeholder" aria-disabled="true">' + escapeHtml(item.label) + '</span>';
      }
      return '<a href="' + escapeHtml(item.href) + '">' + escapeHtml(item.label) + '</a>';
    }).join("");
    var navs = document.querySelectorAll("[data-nav]");
    for (var i = 0; i < navs.length; i++) {
      navs[i].innerHTML = html;
    }
  }

  function renderFaq() {
    var target = document.querySelector("[data-faq]");
    if (!target || !config.faq) return;

    var html = config.faq.map(function (/** @type {any} */ item, /** @type {number} */ idx) {
      var number = ("0" + (idx + 1)).slice(-2);
      var answerId = "faq-answer-" + number;
      var questionId = "faq-question-" + number;
      return [
        '<li class="faq-item" data-faq-item>',
        '  <button class="faq-question" type="button" id="' + questionId + '" aria-expanded="false" aria-controls="' + answerId + '">',
        '    <span class="faq-row-number">' + number + '</span>',
        '    <span class="faq-row-question">' + escapeHtml(item.question) + '</span>',
        '    <span class="faq-row-category">' + escapeHtml(item.category || "") + '</span>',
        '    <span class="faq-row-arrow" aria-hidden="true">↗</span>',
        '  </button>',
        '  <div class="faq-answer" id="' + answerId + '" role="region" aria-labelledby="' + questionId + '" hidden>',
        '    <div class="faq-answer-inner">',
        '      <p class="faq-answer-copy">' + escapeHtml(item.answer) + '</p>',
        item.cta ? '      <p class="faq-answer-cta">' + escapeHtml(item.cta) + '</p>' : '',
        '    </div>',
        '  </div>',
        '</li>'
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
        if (key === "titleLines" || key === "titleAccent") return;
        if (key === "title" && Array.isArray(config.hero.titleLines)) {
          var title = document.querySelector(selector);
          if (title) {
            title.textContent = "";
            for (var t = 0; t < config.hero.titleLines.length; t++) {
              var titleLine = document.createElement("span");
              var lineText = String(config.hero.titleLines[t]);
              var accentText = String(config.hero.titleAccent || "");
              if (accentText && lineText.slice(-accentText.length) === accentText) {
                titleLine.appendChild(document.createTextNode(lineText.slice(0, -accentText.length)));
                var accent = document.createElement("span");
                accent.className = "hero-online-detail";
                accent.textContent = accentText;
                titleLine.appendChild(accent);
              } else {
                titleLine.textContent = lineText;
              }
              title.appendChild(titleLine);
            }
          }
          return;
        }
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
    var inertTargets = document.querySelectorAll(".site-header-wrap, main, .site-footer, #floating-cta");

    function setBackgroundInert(isInert) {
      for (var i = 0; i < inertTargets.length; i++) {
        if (isInert) {
          inertTargets[i].setAttribute("inert", "");
        } else {
          inertTargets[i].removeAttribute("inert");
        }
      }
    }

    function activateMenu() {
      if (!drawerEl) return;
      drawerEl.classList.add("is-active");
      if (backdrop) backdrop.classList.add("is-active");
      if (document.body) document.body.style.overflow = "hidden";
      setBackgroundInert(true);
      var firstControl = /** @type {HTMLElement|null} */ (drawerEl.querySelector("button, a[href]"));
      if (firstControl) firstControl.focus();
    }

    function openMenu() {
      if (!toggleEl || !drawerEl) return;
      toggleEl.setAttribute("aria-expanded", "true");
      toggleEl.setAttribute("aria-label", "Fechar menu");
      drawerEl.hidden = false;
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(activateMenu);
      } else {
        activateMenu();
      }
    }

    function closeMenu(restoreFocus) {
      if (!toggleEl || !drawerEl) return;
      toggleEl.setAttribute("aria-expanded", "false");
      toggleEl.setAttribute("aria-label", "Abrir menu");
      drawerEl.classList.remove("is-active");
      if (backdrop) backdrop.classList.remove("is-active");
      if (document.body) document.body.style.overflow = "";
      setBackgroundInert(false);
      if (restoreFocus !== false) toggleEl.focus();
      setTimeout(function () {
        if (toggleEl && drawerEl && toggleEl.getAttribute("aria-expanded") === "false") {
          drawerEl.hidden = true;
          if (restoreFocus === false) toggleEl.focus({ preventScroll: true });
        }
      }, 320);
    }

    toggleEl.addEventListener("click", function () {
      if (!toggleEl) return;
      var isOpen = toggleEl.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu(true);
      } else {
        openMenu();
      }
    });

    if (closeBtn) closeBtn.addEventListener("click", function () { closeMenu(true); });
    if (backdrop) backdrop.addEventListener("click", function () { closeMenu(true); });

    drawerEl.addEventListener("click", function (event) {
      var target = /** @type {Node|null} */ (event.target);
      while (target && target !== drawerEl) {
        if (target instanceof HTMLElement && target.tagName === "A") {
          closeMenu(false);
          break;
        }
        target = target.parentNode;
      }
    });

    window.addEventListener("keydown", function (event) {
      if (!toggleEl || toggleEl.getAttribute("aria-expanded") !== "true") return;
      if (event.key === "Escape") {
        closeMenu(true);
        return;
      }
      if (event.key === "Tab") {
        var focusable = drawerEl.querySelectorAll("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])");
        if (!focusable.length) return;
        var first = /** @type {HTMLElement} */ (focusable[0]);
        var last = /** @type {HTMLElement} */ (focusable[focusable.length - 1]);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024 && toggleEl && toggleEl.getAttribute("aria-expanded") === "true") {
        closeMenu(true);
      }
    });
  }

  function setupFaq() {
    var section = /** @type {HTMLElement|null} */ (document.querySelector("[data-faq-section]"));
    var list = /** @type {HTMLElement|null} */ (section && section.querySelector("[data-faq]"));
    var panel = /** @type {HTMLElement|null} */ (section && section.querySelector("[data-faq-floating]"));
    var panelCard = /** @type {HTMLElement|null} */ (panel && panel.querySelector("[data-faq-floating-card]"));
    var panelNumber = /** @type {HTMLElement|null} */ (panel && panel.querySelector("[data-faq-floating-number]"));
    var panelCategory = /** @type {HTMLElement|null} */ (panel && panel.querySelector("[data-faq-floating-category]"));
    var panelAnswer = /** @type {HTMLElement|null} */ (panel && panel.querySelector("[data-faq-floating-answer]"));
    var panelCta = /** @type {HTMLElement|null} */ (panel && panel.querySelector("[data-faq-floating-cta]"));
    if (!section || !list || !panel || !panelCard || !window.matchMedia) return;

    var items = /** @type {NodeListOf<HTMLElement>} */ (list.querySelectorAll("[data-faq-item]"));
    if (!items.length) return;

    var floatingQuery = window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    var reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    var activeItem = /** @type {HTMLElement|null} */ (null);
    var panelVisible = false;
    var pointerInside = false;
    var frameId = 0;
    var swapTimer = 0;
    var targetX = 0;
    var targetY = 0;
    var currentX = 0;
    var currentY = 0;
    var lastPointerX = window.innerWidth * 0.5;
    var lastPointerY = window.innerHeight * 0.5;
    var followFactor = 0.13;

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function getButton(item) {
      return /** @type {HTMLButtonElement|null} */ (item.querySelector(".faq-question"));
    }

    function getAnswer(item) {
      return /** @type {HTMLElement|null} */ (item.querySelector(".faq-answer"));
    }

    function closeInline(item, immediate) {
      var button = getButton(item);
      var answer = getAnswer(item);
      if (!button || !answer) return;
      button.setAttribute("aria-expanded", "false");
      answer.classList.remove("is-open");
      if (answer._faqCloseTimer) window.clearTimeout(answer._faqCloseTimer);
      if (immediate || reducedQuery.matches) {
        answer.hidden = true;
      } else {
        answer._faqCloseTimer = window.setTimeout(function () {
          if (!answer.classList.contains("is-open")) answer.hidden = true;
        }, 310);
      }
    }

    function openInline(item) {
      var button = getButton(item);
      var answer = getAnswer(item);
      if (!button || !answer) return;

      for (var i = 0; i < items.length; i++) {
        if (items[i] !== item) {
          items[i].classList.remove("is-active");
          closeInline(items[i], reducedQuery.matches);
        }
      }

      if (answer._faqCloseTimer) window.clearTimeout(answer._faqCloseTimer);
      answer.hidden = false;
      void answer.offsetHeight;
      answer.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
      item.classList.add("is-active");
      activeItem = item;
    }

    function toggleInline(item) {
      var button = getButton(item);
      if (!button) return;
      if (button.getAttribute("aria-expanded") === "true") {
        activeItem = null;
        item.classList.remove("is-active");
        closeInline(item, reducedQuery.matches);
      } else {
        openInline(item);
      }
    }

    function applyPanelPosition() {
      panel.style.setProperty("--faq-panel-x", currentX.toFixed(2) + "px");
      panel.style.setProperty("--faq-panel-y", currentY.toFixed(2) + "px");
    }

    function paintPanel() {
      frameId = 0;
      if (!panelVisible || document.hidden || !floatingQuery.matches) return;

      currentX += (targetX - currentX) * followFactor;
      currentY += (targetY - currentY) * followFactor;
      applyPanelPosition();

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        requestPanelFrame();
      }
    }

    function requestPanelFrame() {
      if (panelVisible && !document.hidden && floatingQuery.matches && !frameId) {
        frameId = window.requestAnimationFrame(paintPanel);
      }
    }

    function updatePanelTarget(clientX, clientY, snap) {
      if (!floatingQuery.matches || !activeItem) return;
      lastPointerX = clientX;
      lastPointerY = clientY;

      var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      var panelRect = panelCard.getBoundingClientRect();
      var panelWidth = panelRect.width || 320;
      var panelHeight = panelRect.height || 220;
      var edge = 16;

      /* ─ Y: âncora pura no centro da pergunta ativa (sem influência do cursor) ─ */
      var itemRect = activeItem.getBoundingClientRect();
      var baseY = itemRect.top + itemRect.height * 0.5 - panelHeight * 0.5;

      /* ─ X: segue o cursor horizontalmente ─ */
      var x = clientX + 28;
      if (x + panelWidth + edge > viewportWidth) x = clientX - panelWidth - 28;

      targetX = clamp(x, edge, Math.max(edge, viewportWidth - panelWidth - edge));
      targetY = clamp(baseY, edge, Math.max(edge, viewportHeight - panelHeight - edge));

      if (snap) {
        currentX = targetX;
        currentY = targetY;
        applyPanelPosition();
      } else {
        requestPanelFrame();
      }
    }

    function writePanelContent(item) {
      var number = item.querySelector(".faq-row-number");
      var category = item.querySelector(".faq-row-category");
      var answer = item.querySelector(".faq-answer-copy");
      var cta = item.querySelector(".faq-answer-cta");
      if (panelNumber) panelNumber.textContent = number ? number.textContent : "";
      if (panelCategory) panelCategory.textContent = category ? category.textContent : "";
      if (panelAnswer) panelAnswer.textContent = answer ? answer.textContent : "";
      if (panelCta) {
        panelCta.textContent = cta ? cta.textContent : "";
        panelCta.hidden = !cta;
      }
    }

    function swapPanelContent(item, immediate) {
      if (swapTimer) window.clearTimeout(swapTimer);
      if (immediate) {
        writePanelContent(item);
        return;
      }
      panelCard.classList.add("is-swapping");
      swapTimer = window.setTimeout(function () {
        writePanelContent(item);
        panelCard.classList.remove("is-swapping");
        updatePanelTarget(lastPointerX, lastPointerY, false);
      }, 90);
    }

    function activateFloating(item, clientX, clientY, fromPointer) {
      if (!floatingQuery.matches) return;
      var firstActivation = !panelVisible;
      var changedItem = activeItem !== item;

      for (var i = 0; i < items.length; i++) {
        items[i].classList.toggle("is-active", items[i] === item);
        closeInline(items[i], true);
      }

      activeItem = item;
      if (changedItem) swapPanelContent(item, firstActivation);
      panelVisible = true;
      panel.classList.add("is-visible");
      panel.setAttribute("aria-hidden", "false");

      updatePanelTarget(clientX, clientY, firstActivation);
    }

    function hideFloating() {
      panelVisible = false;
      panel.classList.remove("is-visible");
      panel.setAttribute("aria-hidden", "true");
      panelCard.classList.remove("is-swapping");
      if (swapTimer) {
        window.clearTimeout(swapTimer);
        swapTimer = 0;
      }
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
      activeItem = null;
      for (var i = 0; i < items.length; i++) items[i].classList.remove("is-active");
    }

    function resetFaqMode() {
      hideFloating();
      pointerInside = false;
      for (var i = 0; i < items.length; i++) closeInline(items[i], true);
    }

    for (var i = 0; i < items.length; i++) {
      (function (item) {
        var button = getButton(item);
        if (!button) return;

        button.addEventListener("pointerenter", function (event) {
          if (!floatingQuery.matches) return;
          pointerInside = true;
          activateFloating(item, event.clientX, event.clientY, true);
        });

        button.addEventListener("focus", function () {
          if (floatingQuery.matches && (!pointerInside || !panelVisible)) {
            activateFloating(item, 0, 0, false);
          }
        });

        button.addEventListener("click", function (event) {
          if (floatingQuery.matches) {
            event.preventDefault();
            activateFloating(item, lastPointerX, lastPointerY, pointerInside);
          } else {
            toggleInline(item);
          }
        });

        button.addEventListener("keydown", function (event) {
          if (event.key === "Escape" && floatingQuery.matches) {
            hideFloating();
            button.blur();
          }
        });
      })(items[i]);
    }

    list.addEventListener("pointermove", function (event) {
      if (!floatingQuery.matches || !panelVisible) return;
      pointerInside = true;
      updatePanelTarget(event.clientX, event.clientY, false);
    });

    list.addEventListener("pointerleave", function () {
      pointerInside = false;
      if (!list.contains(document.activeElement)) hideFloating();
    });

    list.addEventListener("focusout", function () {
      window.setTimeout(function () {
        if (!pointerInside && !list.contains(document.activeElement)) hideFloating();
      }, 0);
    });

    window.addEventListener("resize", function () {
      if (panelVisible && floatingQuery.matches) {
        updatePanelTarget(lastPointerX, lastPointerY, false);
      }
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden && frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      } else {
        requestPanelFrame();
      }
    });

    if (floatingQuery.addEventListener) floatingQuery.addEventListener("change", resetFaqMode);
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

  function setupProcessJourney() {
    var section = /** @type {HTMLElement|null} */ (document.querySelector("[data-process-journey]"));
    if (!section) return;

    var steps = /** @type {NodeListOf<HTMLElement>} */ (section.querySelectorAll("[data-process-step]"));
    var trajectory = /** @type {HTMLElement|null} */ (section.querySelector(".process-trajectory"));
    if (!steps.length || !trajectory) return;

    var supportsMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!supportsMotion) {
      section.style.setProperty("--process-progress", "1");
      for (var i = 0; i < steps.length; i++) steps[i].classList.add("is-active");
      return;
    }

    var activeIndex = -1;
    var frameId = 0;

    function setActive(index) {
      if (index === activeIndex) return;
      activeIndex = index;
      for (var i = 0; i < steps.length; i++) {
        steps[i].classList.toggle("is-active", i === index);
      }
    }

    function updateJourney() {
      frameId = 0;
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      var trajectoryRect = trajectory.getBoundingClientRect();
      var progressStart = viewportHeight * 0.72;
      var progressEnd = viewportHeight * 0.65; /* era 0.22 — corrigido: o ponto final do path (59% da altura da trajetória) precisa estar visível ao completar */
      var progressRange = Math.max(trajectoryRect.height + progressStart - progressEnd, 1);
      var progress = (progressStart - trajectoryRect.top) / progressRange;
      progress = Math.max(0, Math.min(1, progress));
      section.style.setProperty("--process-progress", progress.toFixed(4));

      if (trajectoryRect.bottom > 0 && trajectoryRect.top < viewportHeight) {
        var viewportCenter = viewportHeight * 0.5;
        var closestIndex = 0;
        var closestDistance = Infinity;
        for (var i = 0; i < steps.length; i++) {
          var stepRect = steps[i].getBoundingClientRect();
          var stepCenter = stepRect.top + (stepRect.height * 0.5);
          var distance = Math.abs(stepCenter - viewportCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = i;
          }
        }
        setActive(closestIndex);
      }
    }

    function requestUpdate() {
      if (!frameId) frameId = window.requestAnimationFrame(updateJourney);
    }

    setActive(0);
    updateJourney();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
  }

  function setupFounderExperience() {
    var section = /** @type {HTMLElement|null} */ (document.querySelector("[data-founder]"));
    var visual = /** @type {HTMLElement|null} */ (section && section.querySelector("[data-founder-visual]"));
    if (!section || !visual || !window.matchMedia) return;

    var motionQuery = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    var pointerQuery = window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    var sectionVisible = false;
    var frameId = 0;
    var targetX = 0;
    var targetY = 0;
    var currentX = 0;
    var currentY = 0;
    var currentGlowX = 0;
    var currentGlowY = 0;
    var currentPhotoScroll = 0;
    var currentWordScroll = 0;
    var pointerFactor = 0.08;
    var glowFactor = 0.06;
    var scrollFactor = 0.1;

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function applyMotion() {
      visual.style.setProperty("--founder-pointer-photo-x", (currentX * 5.5).toFixed(2) + "px");
      visual.style.setProperty("--founder-pointer-photo-y", (currentY * 5.5).toFixed(2) + "px");
      visual.style.setProperty("--founder-scroll-photo-y", currentPhotoScroll.toFixed(2) + "px");
      visual.style.setProperty("--founder-pointer-word-x", (currentX * -11).toFixed(2) + "px");
      visual.style.setProperty("--founder-pointer-word-y", (currentY * -11).toFixed(2) + "px");
      visual.style.setProperty("--founder-scroll-word-y", currentWordScroll.toFixed(2) + "px");
      visual.style.setProperty("--founder-pointer-glow-x", (currentGlowX * 36).toFixed(2) + "px");
      visual.style.setProperty("--founder-pointer-glow-y", (currentGlowY * 28).toFixed(2) + "px");
    }

    function resetMotion() {
      targetX = 0;
      targetY = 0;
      currentX = 0;
      currentY = 0;
      currentGlowX = 0;
      currentGlowY = 0;
      currentPhotoScroll = 0;
      currentWordScroll = 0;
      applyMotion();
    }

    function paint() {
      frameId = 0;
      if (!sectionVisible || document.hidden || !motionQuery.matches) {
        if (!motionQuery.matches) resetMotion();
        return;
      }

      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      var sectionRect = section.getBoundingClientRect();
      var sectionCenter = sectionRect.top + (sectionRect.height * 0.5);
      var viewportCenter = viewportHeight * 0.5;
      var travel = Math.max((viewportHeight + sectionRect.height) * 0.5, 1);
      var scrollRatio = clamp((viewportCenter - sectionCenter) / travel, -1, 1);
      var targetPhotoScroll = scrollRatio * 6.5;
      var targetWordScroll = scrollRatio * -10;

      if (!pointerQuery.matches) {
        targetX = 0;
        targetY = 0;
      }

      currentX += (targetX - currentX) * pointerFactor;
      currentY += (targetY - currentY) * pointerFactor;
      currentGlowX += (targetX - currentGlowX) * glowFactor;
      currentGlowY += (targetY - currentGlowY) * glowFactor;
      currentPhotoScroll += (targetPhotoScroll - currentPhotoScroll) * scrollFactor;
      currentWordScroll += (targetWordScroll - currentWordScroll) * scrollFactor;
      applyMotion();

      var pointerDelta = Math.max(
        Math.abs(targetX - currentX),
        Math.abs(targetY - currentY),
        Math.abs(targetX - currentGlowX),
        Math.abs(targetY - currentGlowY)
      );
      var scrollDelta = Math.max(
        Math.abs(targetPhotoScroll - currentPhotoScroll),
        Math.abs(targetWordScroll - currentWordScroll)
      );
      if (pointerDelta > 0.001 || scrollDelta > 0.01) requestPaint();
    }

    function requestPaint() {
      if (sectionVisible && !document.hidden && motionQuery.matches && !frameId) {
        frameId = window.requestAnimationFrame(paint);
      }
    }

    function handlePointerMove(event) {
      if (!sectionVisible || !pointerQuery.matches) return;
      var rect = visual.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetX = clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
      targetY = clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
      requestPaint();
    }

    function handlePointerLeave() {
      targetX = 0;
      targetY = 0;
      requestPaint();
    }

    function handleVisibility() {
      if (document.hidden && frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      } else {
        requestPaint();
      }
    }

    function handleMotionChange() {
      if (!motionQuery.matches) {
        if (frameId) {
          window.cancelAnimationFrame(frameId);
          frameId = 0;
        }
        resetMotion();
      } else {
        requestPaint();
      }
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        sectionVisible = Boolean(entries[0] && entries[0].isIntersecting);
        if (sectionVisible) {
          requestPaint();
        } else {
          if (frameId) {
            window.cancelAnimationFrame(frameId);
            frameId = 0;
          }
          resetMotion();
        }
      }, { threshold: 0, rootMargin: "160px 0px" });
      observer.observe(section);
    } else {
      sectionVisible = true;
      requestPaint();
    }

    visual.addEventListener("pointerenter", handlePointerMove);
    visual.addEventListener("pointermove", handlePointerMove);
    visual.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("scroll", requestPaint, { passive: true });
    window.addEventListener("resize", handleMotionChange);
    document.addEventListener("visibilitychange", handleVisibility);
    if (motionQuery.addEventListener) motionQuery.addEventListener("change", handleMotionChange);
  }

  function setupPossibilities() {
    var section = /** @type {HTMLElement|null} */ (document.querySelector("[data-possibilities]"));
    var stage = /** @type {HTMLElement|null} */ (document.querySelector("[data-possibility-stage]"));
    if (!section || !stage || !window.matchMedia) return;

    var panels = /** @type {NodeListOf<HTMLElement>} */ (section.querySelectorAll("[data-possibility-panel]"));
    var tabs = /** @type {NodeListOf<HTMLButtonElement>} */ (section.querySelectorAll("[data-possibility-index]"));
    var previews = /** @type {NodeListOf<HTMLElement>} */ (section.querySelectorAll(".possibility-preview"));
    var progressBar = /** @type {HTMLElement|null} */ (section.querySelector(".possibilities-progress b"));
    if (!panels.length || panels.length !== tabs.length || !progressBar) return;

    var motionQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    var reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    var autoplayQuery = window.matchMedia(
      "(min-width: 1100px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    var autoplayDuration = 6000;
    var activeIndex = 0;
    var frameId = 0;
    var autoplayTimerId = 0;
    var autoplayStartedAt = 0;
    var autoplayRemaining = autoplayDuration;
    var autoplayCycleActive = false;
    var manualLocked = false;
    var pointerInside = false;
    var focusInside = false;
    var sectionVisible = false;
    var stageVisible = false;
    var windowFocused = document.hasFocus();
    var pointerBounds = /** @type {DOMRect|null} */ (null);
    var targetTiltX = 0;
    var targetTiltY = 0;
    var targetParallaxX = 0;
    var targetParallaxY = 0;
    var currentTiltX = 0;
    var currentTiltY = 0;
    var currentParallaxX = 0;
    var currentParallaxY = 0;
    var activePreview = /** @type {HTMLElement|null} */ (null);

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function clearPreviewStyles(preview) {
      preview.style.removeProperty("--possibility-tilt-x");
      preview.style.removeProperty("--possibility-tilt-y");
      preview.style.removeProperty("--possibility-parallax-x");
      preview.style.removeProperty("--possibility-parallax-y");
      preview.style.removeProperty("--possibility-light-x");
      preview.style.removeProperty("--possibility-light-y");
    }

    function resetPointerMotion() {
      pointerBounds = null;
      targetTiltX = targetTiltY = targetParallaxX = targetParallaxY = 0;
      currentTiltX = currentTiltY = currentParallaxX = currentParallaxY = 0;
    }

    function setActive(nextIndex, moveFocus) {
      if (activePreview) clearPreviewStyles(activePreview);
      resetPointerMotion();
      activeIndex = clamp(nextIndex, 0, panels.length - 1);

      for (var i = 0; i < panels.length; i++) {
        var isActive = i === activeIndex;
        panels[i].classList.toggle("is-active", isActive);
        panels[i].classList.toggle("is-before", i < activeIndex);
        panels[i].classList.toggle("is-after", i > activeIndex);
        panels[i].setAttribute("aria-hidden", isActive ? "false" : "true");
        panels[i].inert = !isActive;

        tabs[i].classList.toggle("is-active", isActive);
        tabs[i].setAttribute("aria-selected", isActive ? "true" : "false");
        tabs[i].tabIndex = isActive ? 0 : -1;
      }

      activePreview = previews[activeIndex] || null;
      section.style.setProperty("--possibility-progress", ((activeIndex + 1) / panels.length).toFixed(4));

      if (moveFocus) {
        tabs[activeIndex].focus();
        tabs[activeIndex].scrollIntoView({
          behavior: reducedMotionQuery.matches ? "auto" : "smooth",
          block: "nearest",
          inline: "center"
        });
      }
    }

    function canAutoplay() {
      return autoplayQuery.matches &&
        sectionVisible &&
        stageVisible &&
        !manualLocked &&
        !pointerInside &&
        !focusInside &&
        !document.hidden &&
        windowFocused;
    }

    function clearAutoplayTimer() {
      if (!autoplayTimerId) return;
      clearTimeout(autoplayTimerId);
      autoplayTimerId = 0;
    }

    function restartAutoplayProgress() {
      section.classList.remove("is-autoplaying", "is-autoplay-paused");
      void progressBar.offsetWidth;
      section.classList.add("is-autoplaying");
    }

    function stopAutoplay() {
      clearAutoplayTimer();
      autoplayCycleActive = false;
      autoplayRemaining = autoplayDuration;
      section.classList.remove("is-autoplaying", "is-autoplay-paused");
    }

    function pauseAutoplay() {
      if (autoplayTimerId) {
        autoplayRemaining = Math.max(80, autoplayRemaining - (performance.now() - autoplayStartedAt));
        clearAutoplayTimer();
      }
      if (autoplayCycleActive) section.classList.add("is-autoplay-paused");
    }

    function advanceAutoplay() {
      autoplayTimerId = 0;
      autoplayRemaining = autoplayDuration;
      setActive((activeIndex + 1) % panels.length, false);
      restartAutoplayProgress();
      scheduleAutoplay();
    }

    function scheduleAutoplay() {
      if (!canAutoplay()) {
        pauseAutoplay();
        return;
      }
      if (autoplayTimerId) return;

      if (!autoplayCycleActive) {
        autoplayCycleActive = true;
        autoplayRemaining = autoplayDuration;
        restartAutoplayProgress();
      } else {
        section.classList.remove("is-autoplay-paused");
      }

      autoplayStartedAt = performance.now();
      autoplayTimerId = window.setTimeout(advanceAutoplay, autoplayRemaining);
    }

    function updateAutoplay() {
      if (canAutoplay()) {
        scheduleAutoplay();
      } else {
        pauseAutoplay();
      }
    }

    function schedulePaint() {
      if (motionQuery.matches && !frameId) frameId = requestAnimationFrame(paint);
    }

    function paint() {
      frameId = 0;
      if (!motionQuery.matches || !activePreview) return;

      currentTiltX += (targetTiltX - currentTiltX) * 0.16;
      currentTiltY += (targetTiltY - currentTiltY) * 0.16;
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.16;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.16;

      activePreview.style.setProperty("--possibility-tilt-x", currentTiltX.toFixed(3) + "deg");
      activePreview.style.setProperty("--possibility-tilt-y", currentTiltY.toFixed(3) + "deg");
      activePreview.style.setProperty("--possibility-parallax-x", currentParallaxX.toFixed(2) + "px");
      activePreview.style.setProperty("--possibility-parallax-y", currentParallaxY.toFixed(2) + "px");
      activePreview.style.setProperty("--possibility-light-x", (50 + currentParallaxX * 3).toFixed(2) + "%");
      activePreview.style.setProperty("--possibility-light-y", (50 + currentParallaxY * 3).toFixed(2) + "%");

      if (Math.abs(targetTiltX - currentTiltX) > 0.01 ||
          Math.abs(targetTiltY - currentTiltY) > 0.01 ||
          Math.abs(targetParallaxX - currentParallaxX) > 0.03 ||
          Math.abs(targetParallaxY - currentParallaxY) > 0.03) {
        schedulePaint();
      }
    }

    for (var tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
      (function (index) {
        tabs[index].addEventListener("click", function () {
          manualLocked = autoplayQuery.matches;
          stopAutoplay();
          setActive(index, false);
        });

        tabs[index].addEventListener("keydown", function (event) {
          var nextIndex = activeIndex;
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            nextIndex = (activeIndex + 1) % tabs.length;
          } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
          } else if (event.key === "Home") {
            nextIndex = 0;
          } else if (event.key === "End") {
            nextIndex = tabs.length - 1;
          } else {
            return;
          }

          event.preventDefault();
          stopAutoplay();
          setActive(nextIndex, true);
        });
      })(tabIndex);
    }

    for (var previewIndex = 0; previewIndex < previews.length; previewIndex++) {
      previews[previewIndex].addEventListener("pointerenter", function () {
        if (!motionQuery.matches || this !== activePreview) return;
        pointerBounds = this.getBoundingClientRect();
      }, { passive: true });

      previews[previewIndex].addEventListener("pointermove", function (event) {
        if (!motionQuery.matches || this !== activePreview) return;
        if (!pointerBounds) pointerBounds = this.getBoundingClientRect();
        var normalizedX = clamp(((event.clientX - pointerBounds.left) / pointerBounds.width) * 2 - 1, -1, 1);
        var normalizedY = clamp(((event.clientY - pointerBounds.top) / pointerBounds.height) * 2 - 1, -1, 1);
        targetTiltX = normalizedY * -1.05;
        targetTiltY = normalizedX * 1.35;
        targetParallaxX = normalizedX * 5;
        targetParallaxY = normalizedY * 4;
        schedulePaint();
      }, { passive: true });

      previews[previewIndex].addEventListener("pointerleave", function () {
        if (this !== activePreview) return;
        pointerBounds = null;
        targetTiltX = targetTiltY = targetParallaxX = targetParallaxY = 0;
        schedulePaint();
      }, { passive: true });
    }

    function updateMotionPreference() {
      resetPointerMotion();
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
      for (var i = 0; i < previews.length; i++) clearPreviewStyles(previews[i]);
    }

    stage.addEventListener("pointerenter", function () {
      pointerInside = true;
      updateAutoplay();
    }, { passive: true });

    stage.addEventListener("pointerleave", function () {
      pointerInside = false;
      updateAutoplay();
    }, { passive: true });

    section.addEventListener("focusin", function () {
      focusInside = true;
      updateAutoplay();
    });

    section.addEventListener("focusout", function () {
      window.setTimeout(function () {
        focusInside = section.contains(document.activeElement);
        updateAutoplay();
      }, 0);
    });

    document.addEventListener("visibilitychange", function () {
      updateAutoplay();
    });

    window.addEventListener("blur", function () {
      windowFocused = false;
      updateAutoplay();
    });

    window.addEventListener("focus", function () {
      windowFocused = true;
      updateAutoplay();
    });

    window.addEventListener("pagehide", function () {
      stopAutoplay();
    });

    window.addEventListener("pageshow", function () {
      windowFocused = document.hasFocus();
      updateAutoplay();
    });

    if ("IntersectionObserver" in window) {
      var autoplayObserver = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
          if (entry.target === section) {
            sectionVisible = entry.isIntersecting;
            if (!sectionVisible) {
              manualLocked = false;
              stopAutoplay();
            }
          } else if (entry.target === stage) {
            stageVisible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
          }
        }
        updateAutoplay();
      }, { threshold: [0, 0.2] });

      autoplayObserver.observe(section);
      autoplayObserver.observe(stage);
    }

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", updateMotionPreference);
    } else if (motionQuery.addListener) {
      motionQuery.addListener(updateMotionPreference);
    }

    if (autoplayQuery.addEventListener) {
      autoplayQuery.addEventListener("change", function () {
        if (!autoplayQuery.matches) stopAutoplay();
        updateAutoplay();
      });
    } else if (autoplayQuery.addListener) {
      autoplayQuery.addListener(function () {
        if (!autoplayQuery.matches) stopAutoplay();
        updateAutoplay();
      });
    }

    window.addEventListener("resize", function () {
      pointerBounds = null;
    }, { passive: true });

    section.classList.add("is-interactive");
    setActive(0, false);
  }
  function setupHeroPointer() {
    var hero = /** @type {HTMLElement|null} */ (document.querySelector(".hero"));
    var field = /** @type {HTMLElement|null} */ (document.querySelector(".hero-cursor-field"));
    var supportsPointer = window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    if (!hero || !field || !supportsPointer) return;

    var bounds = /** @type {DOMRect|null} */ (null);
    var rafId = 0;
    var currentX = 0;
    var currentY = 0;
    var targetX = 0;
    var targetY = 0;
    var fieldRadius = 360;
    var gridActivity = 0;
    var gridActivityTarget = 0;

    var paint = function () {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      gridActivity += (gridActivityTarget - gridActivity) * 0.18;
      gridActivityTarget *= 0.84;

      field.style.transform = "translate3d(" + (currentX - fieldRadius) + "px," + (currentY - fieldRadius) + "px,0)";
      field.style.setProperty("--hero-grid-offset-x", (fieldRadius - currentX) + "px");
      field.style.setProperty("--hero-grid-offset-y", (fieldRadius - currentY) + "px");
      field.style.setProperty("--hero-grid-opacity", (0.03 + gridActivity * 0.075).toFixed(3));
      field.style.setProperty("--hero-glow-opacity", (0.14 + gridActivity * 0.04).toFixed(3));

      if (Math.abs(targetX - currentX) > 0.2 || Math.abs(targetY - currentY) > 0.2 ||
          gridActivity > 0.004 || gridActivityTarget > 0.004) {
        rafId = requestAnimationFrame(paint);
      } else {
        rafId = 0;
      }
    };

    var setTarget = function (event) {
      if (!bounds) bounds = hero.getBoundingClientRect();
      var nextX = event.clientX - bounds.left;
      var nextY = event.clientY - bounds.top;
      var deltaX = nextX - targetX;
      var deltaY = nextY - targetY;
      var movement = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 18, 1);
      gridActivityTarget = Math.max(gridActivityTarget, movement);
      targetX = nextX;
      targetY = nextY;
      if (!rafId) rafId = requestAnimationFrame(paint);
    };

    hero.addEventListener("pointerenter", function (event) {
      bounds = hero.getBoundingClientRect();
      currentX = targetX = event.clientX - bounds.left;
      currentY = targetY = event.clientY - bounds.top;
      gridActivity = 0;
      gridActivityTarget = 0;
      field.style.transform = "translate3d(" + (currentX - fieldRadius) + "px," + (currentY - fieldRadius) + "px,0)";
      field.style.setProperty("--hero-grid-offset-x", (fieldRadius - currentX) + "px");
      field.style.setProperty("--hero-grid-offset-y", (fieldRadius - currentY) + "px");
      field.style.setProperty("--hero-grid-opacity", "0.03");
      field.style.setProperty("--hero-glow-opacity", "0.14");
      hero.classList.add("is-pointer-active");
    }, { passive: true });

    hero.addEventListener("pointermove", setTarget, { passive: true });

    hero.addEventListener("pointerleave", function () {
      hero.classList.remove("is-pointer-active");
      bounds = null;
      gridActivity = 0;
      gridActivityTarget = 0;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }, { passive: true });

    window.addEventListener("resize", function () {
      bounds = null;
    }, { passive: true });

    window.addEventListener("scroll", function () {
      bounds = null;
    }, { passive: true });
  }

  function setupIntro() {
    var intro = /** @type {HTMLElement|null} */ (document.getElementById("intro-screen"));
    var canvas = /** @type {HTMLCanvasElement|null} */ (document.getElementById("intro-canvas"));
    if (!intro) return;

    var isReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var isMobile = window.matchMedia && window.matchMedia("(max-width: 1024px) and (hover: none) and (pointer: coarse)").matches;
    var rafId = 0;
    var resizeRafId = 0;
    var introFinished = false;
    var resizeHandler = null;
    var visibilityHandler = null;

    if (canvas && canvas.getContext) {
      var ctx = canvas.getContext("2d");
      if (ctx) {
        var width = window.innerWidth;
        var height = window.innerHeight;
        var dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
        var time = 0;
        var step = 10;
        var inverseStep = 0;
        var sampleXs = [];
        var nodeGlowCanvas = /** @type {HTMLCanvasElement|null} */ (null);
        var fullCircle = Math.PI * 2;

        /** @type {Array<any>} */
        var curves = [];

        var buildSamples = function () {
          step = isMobile ? (width < 680 ? 18 : 16) : (width < 680 ? 14 : 10);
          if (isMobile) inverseStep = 1 / step;
          sampleXs = [];
          for (var x = 0; x <= width + step; x += step) {
            sampleXs.push(x);
          }
        };

        var buildNodeGlow = function () {
          if (!isMobile) return;

          var glowSize = 28;
          nodeGlowCanvas = document.createElement("canvas");
          nodeGlowCanvas.width = Math.ceil(glowSize * dpr);
          nodeGlowCanvas.height = Math.ceil(glowSize * dpr);

          var glowCtx = nodeGlowCanvas.getContext("2d");
          if (!glowCtx) {
            nodeGlowCanvas = null;
            return;
          }

          glowCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
          glowCtx.fillStyle = "rgba(196, 181, 253, 0.98)";
          glowCtx.shadowColor = "rgba(139, 92, 246, 0.85)";
          glowCtx.shadowBlur = 8;
          glowCtx.beginPath();
          glowCtx.arc(glowSize / 2, glowSize / 2, 2, 0, fullCircle);
          glowCtx.fill();
        };

        var initCurves = function () {
          var count = isMobile ? (width < 680 ? 10 : 14) : (width < 680 ? 12 : 20);
          curves = [];
          for (var i = 0; i < count; i++) {
            var progress = i / (count - 1);
            var isAccent = (i % 3 === 0);
            var isHighlight = (i % 5 === 0);

            var color = "rgba(46, 16, 101, 0.48)";
            var widthVal = 0.9;
            if (isHighlight) {
              color = "rgba(167, 139, 250, 0.88)";
              widthVal = 1.4;
            } else if (isAccent) {
              color = "rgba(124, 58, 237, 0.68)";
              widthVal = 1.1;
            }

            var curve = {
              baseY: height * (0.05 + progress * 0.9),
              slant: (progress - 0.5) * (height * 0.18),
              freq1: 0.0016 + (i % 4) * 0.0004,
              freq2: 0.0032 + (i % 3) * 0.0006,
              freq3: 0.0008 + (i % 2) * 0.0003,
              amp1: 22 + (i % 3) * 12,
              amp2: 12 + (i % 4) * 8,
              amp3: 28 + (i % 5) * 10,
              speed1: 0.004 + (i % 3) * 0.0012,
              speed2: -0.003 - (i % 2) * 0.001,
              speed3: 0.002 + (i % 4) * 0.0008,
              phase1: i * 0.55,
              phase2: i * 0.9,
              phase3: i * 0.35,
              color: color,
              lineWidth: widthVal,
              hasNode: (i % 4 === 1 || i % 4 === 2),
              nodeProgress: (i * 0.23) % 1,
              nodeSpeed: 0.0015 + (i % 3) * 0.0008
            };

            if (isMobile) {
              curve.hasNode = i >= 1 && i <= 10 && (i - 1) % 3 === 0;
              curve.nodeSpeed *= 0.75;
              curve.baseSamples = new Float32Array(sampleXs.length);
              curve.waveSamples1 = new Float32Array(sampleXs.length);
              curve.waveSamples2 = new Float32Array(sampleXs.length);
              curve.waveSamples3 = new Float32Array(sampleXs.length);

              for (var sampleIndex = 0; sampleIndex < sampleXs.length; sampleIndex++) {
                var sampleX = sampleXs[sampleIndex];
                curve.baseSamples[sampleIndex] = curve.baseY + curve.slant * (sampleX / width - 0.5);
                curve.waveSamples1[sampleIndex] = sampleX * curve.freq1 + curve.phase1;
                curve.waveSamples2[sampleIndex] = sampleX * curve.freq2 + curve.phase2;
                curve.waveSamples3[sampleIndex] = (sampleX * 0.4 + curve.baseY) * curve.freq3 + curve.phase3;
              }
            }

            curves.push(curve);
          }
        };

        var resize = function () {
          if (!canvas || !ctx) return;
          width = window.innerWidth;
          height = window.innerHeight;
          dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
          canvas.width = Math.floor(width * dpr);
          canvas.height = Math.floor(height * dpr);
          canvas.style.width = width + "px";
          canvas.style.height = height + "px";
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          buildSamples();
          buildNodeGlow();
          initCurves();
        };

        resize();
        resizeHandler = function () {
          if (resizeRafId || introFinished) return;
          resizeRafId = requestAnimationFrame(function () {
            resizeRafId = 0;
            resize();
          });
        };
        window.addEventListener("resize", resizeHandler, { passive: true });

        var render = function () {
          rafId = 0;
          if (!ctx || !canvas) return;
          ctx.clearRect(0, 0, width, height);

          time += 1;

          for (var c = 0; c < curves.length; c++) {
            var curve = curves[c];
            ctx.beginPath();
            ctx.strokeStyle = curve.color;
            ctx.lineWidth = curve.lineWidth;

            var nodeX = 0;
            var nodeY = 0;
            var targetNodeX = curve.nodeProgress * width;
            var nodeSampleIndex = -1;
            var nodeNextSampleIndex = -1;
            var nodeSampleProgress = 0;
            var nodeSampleY = 0;
            var nodeNextSampleY = 0;
            if (isMobile && curve.hasNode && targetNodeX >= 0 && targetNodeX <= width + step) {
              nodeSampleIndex = Math.min(sampleXs.length - 1, Math.floor(targetNodeX * inverseStep));
              nodeNextSampleIndex = Math.min(sampleXs.length - 1, nodeSampleIndex + 1);
              nodeSampleProgress = (targetNodeX - sampleXs[nodeSampleIndex]) * inverseStep;
            }

            for (var sampleIndex = 0; sampleIndex < sampleXs.length; sampleIndex++) {
              var x = sampleXs[sampleIndex];
              var y;

              if (isMobile) {
                y = curve.baseSamples[sampleIndex] +
                  Math.sin(curve.waveSamples1[sampleIndex] + time * curve.speed1) * curve.amp1 +
                  Math.cos(curve.waveSamples2[sampleIndex] + time * curve.speed2) * curve.amp2 +
                  Math.sin(curve.waveSamples3[sampleIndex] + time * curve.speed3) * curve.amp3;
              } else {
                var xProgress = x / width;
                y = curve.baseY +
                  curve.slant * (xProgress - 0.5) +
                  Math.sin(x * curve.freq1 + time * curve.speed1 + curve.phase1) * curve.amp1 +
                  Math.cos(x * curve.freq2 + time * curve.speed2 + curve.phase2) * curve.amp2 +
                  Math.sin((x * 0.4 + curve.baseY) * curve.freq3 + time * curve.speed3 + curve.phase3) * curve.amp3;
              }

              if (sampleIndex === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }

              if (isMobile && curve.hasNode) {
                if (sampleIndex === nodeSampleIndex) nodeSampleY = y;
                if (sampleIndex === nodeNextSampleIndex) nodeNextSampleY = y;
              } else if (curve.hasNode && Math.abs(x - targetNodeX) <= step) {
                nodeX = x;
                nodeY = y;
              }
            }

            if (isMobile && nodeSampleIndex >= 0) {
              nodeX = targetNodeX;
              nodeY = nodeSampleY + (nodeNextSampleY - nodeSampleY) * nodeSampleProgress;
            }
            ctx.stroke();

            // Desenho sutil de pontos de energia (nós luminosos na linha)
            if (curve.hasNode && nodeX > 0) {
              if (isMobile && nodeGlowCanvas) {
                ctx.drawImage(nodeGlowCanvas, nodeX - 14, nodeY - 14, 28, 28);
              } else {
                ctx.beginPath();
                ctx.arc(nodeX, nodeY, 2, 0, fullCircle);
                ctx.fillStyle = "rgba(196, 181, 253, 0.98)";
                ctx.shadowColor = "rgba(139, 92, 246, 0.85)";
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowBlur = 0;
              }

              curve.nodeProgress += curve.nodeSpeed;
              if (curve.nodeProgress > 1.05) {
                curve.nodeProgress = -0.05;
              }
            }
          }

          if (!isReduced && !introFinished && !document.hidden) {
            rafId = requestAnimationFrame(render);
          }
        };

        visibilityHandler = function () {
          if (document.hidden) {
            if (rafId) {
              cancelAnimationFrame(rafId);
              rafId = 0;
            }
          } else if (!isReduced && !introFinished && !rafId) {
            rafId = requestAnimationFrame(render);
          }
        };
        document.addEventListener("visibilitychange", visibilityHandler);

        if (isReduced) {
          render();
        } else {
          rafId = requestAnimationFrame(render);
        }
      }
    }

    var liftDelay = isReduced ? 200 : 1800;
    var finishDelay = liftDelay + (isReduced ? 300 : 900);

    if (document.body) document.body.style.overflow = "hidden";

    setTimeout(function () {
      if (intro) intro.classList.add("is-lifting");
    }, liftDelay);

    setTimeout(function () {
      introFinished = true;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      if (resizeRafId) {
        cancelAnimationFrame(resizeRafId);
        resizeRafId = 0;
      }
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      if (visibilityHandler) document.removeEventListener("visibilitychange", visibilityHandler);
      if (intro) {
        intro.hidden = true;
        intro.style.display = "none";
      }
      if (document.body) document.body.style.overflow = "";
    }, finishDelay);
  }

  applyTheme();
  applyMeta();
  renderNavigation();
  renderFaq();
  renderContent();
  setupHeaderAndScroll();
  setupMenu();
  setupFaq();
  setupReveals();
  setupProcessJourney();
  setupFounderExperience();
  setupPossibilities();
  setupHeroPointer();
  setupIntro();
})();
