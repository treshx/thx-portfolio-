/*
 * THX PORTFÓLIO / PRECISÃO SERENA
 * Renderização de conteúdo configurável, navegação móvel e microinterações acessíveis.
 */

(() => {
  const config = window.portfolioConfig;
  if (!config) return;

  const root = document.documentElement;
  root.dataset.mode = config.mode || "demo";

  const escapeHTML = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const assignText = (selector, value) => {
    document.querySelectorAll(selector).forEach((element) => { element.textContent = value; });
  };

  const applyTheme = () => {
    Object.entries(config.theme || {}).forEach(([key, value]) => {
      root.style.setProperty(`--${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, value);
    });
  };

  const applyMeta = () => {
    document.title = config.seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", config.seo.description);
    document.querySelector('meta[name="robots"]')?.setAttribute("content", config.seo.robots);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", config.seo.canonical);
  };

  const renderNavigation = () => {
    const links = config.navigation.map(({ label, href }) => `<a href="${escapeHTML(href)}">${escapeHTML(label)}</a>`).join("");
    document.querySelectorAll("[data-nav]").forEach((navigation) => { navigation.innerHTML = links; });
  };

  const renderProjects = () => {
    const target = document.querySelector("[data-projects]");
    target.innerHTML = config.projects.map((project) => `
      <article class="case reveal" data-project-id="${escapeHTML(project.id)}">
        <a class="case-media" href="${escapeHTML(project.demoUrl)}" target="_blank" rel="noopener" aria-label="Abrir demonstração de ${escapeHTML(project.name)}">
          <img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.imageAlt)}" loading="lazy" />
        </a>
        <div class="case-copy">
          <p class="case-meta">${escapeHTML(project.number)} / ${escapeHTML(project.category)}</p>
          <h3>${escapeHTML(project.name)}</h3>
          <p>${escapeHTML(project.description)}</p>
          <a class="case-link" href="${escapeHTML(project.demoUrl)}" target="_blank" rel="noopener">${escapeHTML(project.cta)} <span aria-hidden="true">→</span></a>
        </div>
      </article>
    `).join("");
  };

  const renderBenefits = () => {
    document.querySelector("[data-benefits]").innerHTML = config.benefits.map((benefit, index) => `
      <article class="benefit reveal">
        <span class="benefit-number">0${index + 1}</span>
        <h3>${escapeHTML(benefit.title)}</h3>
        <p>${escapeHTML(benefit.text)}</p>
      </article>
    `).join("");
  };

  const renderProcess = () => {
    document.querySelector("[data-process]").innerHTML = config.process.map((step) => `
      <li class="process-item reveal">
        <span>${escapeHTML(step.number)}</span>
        <div><h3>${escapeHTML(step.title)}</h3><p>${escapeHTML(step.text)}</p></div>
      </li>
    `).join("");
  };

  const renderFaq = () => {
    document.querySelector("[data-faq]").innerHTML = config.faq.map((item) => `
      <details class="faq-item">
        <summary>${escapeHTML(item.question)}</summary>
        <p>${escapeHTML(item.answer)}</p>
      </details>
    `).join("");
  };

  const renderContent = () => {
    assignText("[data-brand='name']", config.brand.name);
    assignText("[data-brand='shortName']", config.brand.shortName || config.brand.name);
    assignText("[data-brand='tagline']", config.brand.tagline || config.brand.descriptor);
    document.querySelectorAll(".brand[aria-label]").forEach((element) => {
      element.setAttribute("aria-label", `${config.brand.name}, início`);
    });
    Object.entries(config.hero).forEach(([key, value]) => {
      const selector = `[data-hero='${key}']`;
      if (key === "primaryCta" || key === "secondaryCta") {
        document.querySelectorAll(selector).forEach((element) => {
          element.innerHTML = `${escapeHTML(value)} <span aria-hidden="true">→</span>`;
        });
        return;
      }
      assignText(selector, value);
    });
    Object.entries(config.difference).forEach(([key, value]) => assignText(`[data-difference='${key}']`, value));
    Object.entries(config.footer).forEach(([key, value]) => assignText(`[data-footer='${key}']`, value));
    assignText("[data-contact-note]", config.contact.note);
    assignText("[data-upcoming]", config.upcoming.join(", ").replace(/, ([^,]*)$/, " e $1"));
    const contactNumber = String(config.contact.whatsappNumber || "").replace(/\D/g, "");
    const contactMessage = String(config.contact.whatsappMessage || "").trim();
    const whatsappHref = contactNumber
      ? `https://wa.me/${contactNumber}${contactMessage ? `?text=${encodeURIComponent(contactMessage)}` : ""}`
      : "";

    document.querySelectorAll("[data-contact-link]").forEach((link) => {
      const href = whatsappHref || config.contact.primaryHref || "#contato";
      link.setAttribute("href", href);
      if (href.startsWith("#")) {
        link.removeAttribute("target");
        link.removeAttribute("rel");
      } else {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener");
      }
    });
  };

  const setupMenu = () => {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".mobile-menu");
    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
      menu.hidden = true;
    };
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
      menu.hidden = isOpen;
    });
    menu.addEventListener("click", (event) => { if (event.target.matches("a")) closeMenu(); });
    window.addEventListener("resize", () => { if (window.innerWidth > 980) closeMenu(); });
  };

  const setupReveals = () => {
    const items = document.querySelectorAll(".reveal");
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
  };

  applyTheme();
  applyMeta();
  renderNavigation();
  renderProjects();
  renderBenefits();
  renderProcess();
  renderFaq();
  renderContent();
  setupMenu();
  setupReveals();
})();
