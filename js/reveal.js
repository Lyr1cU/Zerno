const STAGGER_MS = 80;
const HERO_STAGGER_MS = 130;
const OBSERVER_OPTIONS = {
  threshold: 0.12,
  rootMargin: "0px 0px -6% 0px",
};

let revealObserver = null;

function markReveal(el, delay = 0) {
  el.classList.add("reveal");
  if (delay > 0) {
    el.style.setProperty("--reveal-delay", `${delay}ms`);
  }
}

function revealHero() {
  const heroItems = document.querySelectorAll(".hero__content > *");
  heroItems.forEach((el, index) => {
    const delay = index * HERO_STAGGER_MS;
    markReveal(el, delay);
    window.setTimeout(() => {
      el.classList.add("is-visible");
    }, 80 + delay);
  });
}

function addStaggered(parentSelector, childSelector, stagger) {
  const elements = [];

  document.querySelectorAll(parentSelector).forEach((parent) => {
    const children =
      childSelector === ":scope > *"
        ? [...parent.children]
        : parent.querySelectorAll(childSelector);

    children.forEach((el, index) => {
      markReveal(el, index * stagger);
      elements.push(el);
    });
  });

  return elements;
}

function addSingles(selectors, skipInside = "") {
  const elements = [];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      if (el.closest("#menu, #gallery, #reviews, #contact")) {
        return;
      }

      if (skipInside && el.parentElement?.closest(skipInside)) {
        return;
      }
      markReveal(el);
      elements.push(el);
    });
  });

  return elements;
}

function onReveal(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

function ensureRevealObserver() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(onReveal, OBSERVER_OPTIONS);
  }
}

export function observeRevealElements(elements, stagger = 70) {
  const targets = elements.filter(Boolean);

  if (targets.length === 0) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  ensureRevealObserver();

  targets.forEach((el, index) => {
    el.classList.remove("is-visible");
    markReveal(el, index * stagger);
    revealObserver.observe(el);

    if (isInViewport(el)) {
      el.classList.add("is-visible");
      revealObserver.unobserve(el);
    }
  });
}

export function refreshReveal(el) {
  if (!el?.classList.contains("reveal") || el.classList.contains("is-visible")) {
    return;
  }

  if (isInViewport(el)) {
    el.classList.add("is-visible");
    revealObserver?.unobserve(el);
    return;
  }

  revealObserver?.observe(el);
}

export function initReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const tracked = new Set();
  const observeList = [];

  revealHero();

  document.querySelectorAll(".hero__content > *").forEach((el) => {
    tracked.add(el);
  });

  const staggered = [
    ...addStaggered(".features", ".feature-card", 90),
    ...addStaggered(".contact__grid", ":scope > *", 110),
    ...addStaggered(".footer__inner", ":scope > *", 90),
  ];

  staggered.forEach((el) => {
    if (!tracked.has(el)) {
      tracked.add(el);
      observeList.push(el);
    }
  });

  const singles = addSingles(
    [
      ".section-label",
      ".section-title",
      ".section-subtitle",
      ".about__text",
      ".contact-map",
    ],
    ".contact__info, .contact__form-wrap"
  );

  singles.forEach((el) => {
    if (!tracked.has(el)) {
      tracked.add(el);
      observeList.push(el);
    }
  });

  ensureRevealObserver();
  observeList.forEach((el) => revealObserver.observe(el));
}
