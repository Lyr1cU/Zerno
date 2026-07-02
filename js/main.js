import { DEFAULT_LANG, STORAGE_KEY, translations } from "./i18n/index.js";
import { initReveal } from "./reveal.js";
import { initGalleryLightbox, renderGallery } from "./render/gallery.js";
import { initMenuTabs, renderMenu } from "./render/menu.js";
import { renderContacts } from "./render/contacts.js";
import { initReviewsSlider, renderReviews } from "./render/reviews.js";

const langButtons = document.querySelectorAll(".lang-switch__btn");
const i18nNodes = document.querySelectorAll("[data-i18n]");
const i18nAltNodes = document.querySelectorAll("[data-i18n-alt]");
const i18nPlaceholderNodes = document.querySelectorAll("[data-i18n-placeholder]");
const i18nAriaNodes = document.querySelectorAll("[data-i18n-aria]");
const burger = document.querySelector(".burger");
const siteNav = document.getElementById("site-nav");
const navOverlay = document.getElementById("nav-overlay");
const navPanelLinks = document.querySelectorAll(".nav__link, .nav__cta");

let navScrollLockY = 0;
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
  btn.addEventListener("click", async () => {
    setLanguage(btn.dataset.lang);
    await Promise.all([
      renderMenu(btn.dataset.lang),
      renderGallery(btn.dataset.lang),
      renderReviews(btn.dataset.lang),
      renderContacts(btn.dataset.lang),
    ]);
  });
});

let savedLang = DEFAULT_LANG;
try {
  savedLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
} catch {
  /* ignore */
}

const initialLang = translations[savedLang] ? savedLang : DEFAULT_LANG;
setLanguage(initialLang);

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

  // Scroll lock via position: fixed (body overflow: hidden breaks sticky header on iOS).
  // behavior: "instant" is required because of scroll-behavior: smooth on html.
  if (isOpen) {
    navScrollLockY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${navScrollLockY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    return;
  }

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  window.scrollTo({ top: navScrollLockY, behavior: "instant" });
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

/* --------------------------------------------------------------------------
   Gallery lightbox
   -------------------------------------------------------------------------- */

const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox?.querySelector(".lightbox__image");
const lightboxClose = lightbox?.querySelector(".lightbox__close");

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

function showContentError(containerId, message) {
  const container = document.getElementById(containerId);

  if (container) {
    container.innerHTML = `<p class="content-error">${message}</p>`;
  }
}

async function bootstrap() {
  initMenuTabs();
  initGalleryLightbox();
  initReviewsSlider();
  initReveal();

  const contentError =
    "Не вдалося завантажити дані. Запустіть сайт через локальний сервер (не file://).";

  try {
    await renderMenu(currentLang);
  } catch (error) {
    console.error("Failed to render menu:", error);
    showContentError("menu-panel", contentError);
  }

  try {
    await renderGallery(currentLang);
  } catch (error) {
    console.error("Failed to render gallery:", error);
    showContentError("gallery-grid", contentError);
  }

  try {
    await renderReviews(currentLang);
  } catch (error) {
    console.error("Failed to render reviews:", error);
    showContentError("reviews-track", contentError);
  }

  try {
    await renderContacts(currentLang);
  } catch (error) {
    console.error("Failed to render contacts:", error);
    showContentError("contact-list", contentError);
  }
}

bootstrap();
