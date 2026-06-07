import { DEFAULT_LANG, STORAGE_KEY, translations } from "./i18n/index.js";
import { initReveal, refreshReveal } from "./reveal.js";

const langButtons = document.querySelectorAll(".lang-switch__btn");
const i18nNodes = document.querySelectorAll("[data-i18n]");
const i18nAltNodes = document.querySelectorAll("[data-i18n-alt]");
const i18nPlaceholderNodes = document.querySelectorAll("[data-i18n-placeholder]");
const i18nAriaNodes = document.querySelectorAll("[data-i18n-aria]");
const burger = document.querySelector(".burger");
const siteNav = document.getElementById("site-nav");
const navOverlay = document.getElementById("nav-overlay");
const navPanelLinks = document.querySelectorAll(".nav__link, .nav__cta");

let currentLang = DEFAULT_LANG;

function getNavAriaLabel(isOpen) {
  const key = isOpen ? "navCloseMenu" : "navOpenMenu";
  return translations[currentLang]?.[key] || "";
}

function setLanguage(lang) {
  const strings = translations[lang];
  if (!strings) return;

  currentLang = lang;
  document.documentElement.lang = lang;

  if (strings.metaTitle) {
    document.title = strings.metaTitle;
  }

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && strings.metaDescription) {
    metaDesc.setAttribute("content", strings.metaDescription);
  }

  i18nNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (strings[key]) {
      node.textContent = strings[key];
    }
  });

  i18nAltNodes.forEach((node) => {
    const key = node.dataset.i18nAlt;
    if (strings[key]) {
      node.alt = strings[key];
    }
  });

  i18nPlaceholderNodes.forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    if (strings[key]) {
      node.placeholder = strings[key];
    }
  });

  i18nAriaNodes.forEach((node) => {
    const key = node.dataset.i18nAria;
    if (strings[key]) {
      node.setAttribute("aria-label", strings[key]);
    }
  });

  langButtons.forEach((btn) => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }

  if (burger) {
    const isOpen = burger.classList.contains("is-active");
    burger.setAttribute("aria-label", getNavAriaLabel(isOpen));
  }
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

let savedLang = DEFAULT_LANG;
try {
  savedLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
} catch {
  /* ignore */
}

setLanguage(translations[savedLang] ? savedLang : DEFAULT_LANG);

/* --------------------------------------------------------------------------
   Mobile / tablet navigation
   -------------------------------------------------------------------------- */

function setNavOpen(isOpen) {
  burger?.classList.toggle("is-active", isOpen);
  siteNav?.classList.toggle("is-open", isOpen);
  navOverlay?.classList.toggle("is-visible", isOpen);
  burger?.setAttribute("aria-expanded", String(isOpen));

  if (burger) {
    burger.setAttribute("aria-label", getNavAriaLabel(isOpen));
  }

  document.body.classList.toggle("is-nav-open", isOpen);

  if (navOverlay) {
    navOverlay.hidden = !isOpen;
  }
}

burger?.addEventListener("click", () => {
  setNavOpen(!burger.classList.contains("is-active"));
});

navOverlay?.addEventListener("click", () => {
  setNavOpen(false);
});

navPanelLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setNavOpen(false);
  });
});

window.matchMedia("(min-width: 1024px)").addEventListener("change", (event) => {
  if (event.matches) {
    setNavOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && burger?.classList.contains("is-active")) {
    setNavOpen(false);
  }
});

/* --------------------------------------------------------------------------
   Broken image fallback (placeholder gradient shows)
   -------------------------------------------------------------------------- */

document.querySelectorAll(".menu-card__media img, .gallery-item img").forEach((img) => {
  img.addEventListener("error", () => {
    img.classList.add("is-broken");
  });
  if (img.complete && img.naturalWidth === 0) {
    img.classList.add("is-broken");
  }
});

/* --------------------------------------------------------------------------
   Menu tabs
   -------------------------------------------------------------------------- */

const menuTabButtons = document.querySelectorAll(".menu-tabs__btn");
const menuCards = document.querySelectorAll(".menu-card");
const menuPanel = document.getElementById("menu-panel");

function filterMenu(category) {
  menuTabButtons.forEach((btn) => {
    const isActive = btn.dataset.tab === category;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-selected", String(isActive));
  });

  const activeTab = document.getElementById(`menu-tab-${category}`);
  if (menuPanel && activeTab) {
    menuPanel.setAttribute("aria-labelledby", activeTab.id);
  }

  menuCards.forEach((card) => {
    const isVisible = card.dataset.category === category;
    card.classList.toggle("is-hidden", !isVisible);
    card.hidden = !isVisible;

    if (isVisible) {
      requestAnimationFrame(() => refreshReveal(card));
    }
  });
}

menuTabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterMenu(btn.dataset.tab);
  });
});

if (menuTabButtons.length && menuCards.length) {
  filterMenu("coffee");
}

/* --------------------------------------------------------------------------
   Reviews slider (desktop: all visible; arrows/dots for future mobile)
   -------------------------------------------------------------------------- */

const reviewCards = document.querySelectorAll(".review-card");
const reviewDots = document.querySelectorAll(".reviews-dots__btn");
const reviewPrev = document.querySelector(".reviews-slider__arrow--prev");
const reviewNext = document.querySelector(".reviews-slider__arrow--next");
let reviewIndex = 0;

function showReview(index) {
  reviewIndex = (index + reviewCards.length) % reviewCards.length;

  reviewCards.forEach((card, i) => {
    card.classList.toggle("is-active", i === reviewIndex);
  });

  reviewDots.forEach((dot, i) => {
    dot.classList.toggle("is-active", i === reviewIndex);
    dot.setAttribute("aria-selected", String(i === reviewIndex));
  });
}

reviewPrev?.addEventListener("click", () => showReview(reviewIndex - 1));
reviewNext?.addEventListener("click", () => showReview(reviewIndex + 1));

reviewDots.forEach((dot) => {
  dot.addEventListener("click", () => showReview(Number(dot.dataset.slide)));
});

/* --------------------------------------------------------------------------
   Gallery lightbox
   -------------------------------------------------------------------------- */

const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox?.querySelector(".lightbox__image");
const lightboxClose = lightbox?.querySelector(".lightbox__close");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    if (!lightbox || !lightboxImage || !img || img.classList.contains("is-broken")) {
      return;
    }

    lightboxImage.src = item.dataset.full || img.src;
    lightboxImage.alt = img.alt;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  if (!lightbox) return;
  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && !lightbox.hidden) {
    closeLightbox();
  }
});

/* --------------------------------------------------------------------------
   Contact form validation
   -------------------------------------------------------------------------- */

const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");

const phonePattern = /^[\d\s+()-]{7,}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getFormError(key) {
  return translations[currentLang]?.[key] || "";
}

function validateForm(formData) {
  const errors = {};
  const name = formData.get("name")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const email = formData.get("email")?.toString().trim();

  if (!name) {
    errors.name = getFormError("formErrorName");
  }

  if (!phone || !phonePattern.test(phone)) {
    errors.phone = getFormError("formErrorPhone");
  }

  if (email && !emailPattern.test(email)) {
    errors.email = getFormError("formErrorEmail");
  }

  return errors;
}

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const errors = validateForm(formData);

  contactForm.querySelectorAll("[data-error]").forEach((el) => {
    el.textContent = "";
  });

  Object.entries(errors).forEach(([field, message]) => {
    const errorEl = contactForm.querySelector(`[data-error="${field}"]`);
    if (errorEl) {
      errorEl.textContent = message;
    }
  });

  if (Object.keys(errors).length > 0) {
    formSuccess.hidden = true;
    return;
  }

  contactForm.hidden = true;
  formSuccess.hidden = false;
});

initReveal();
