import { loadGallery } from "../content.js";
import { observeRevealElements } from "../reveal.js";

const LAYOUT_SIZES = {
  normal: { width: 400, height: 320 },
  tall: { width: 400, height: 500 },
  wide: { width: 800, height: 400 },
};

function pickLocalized(item, lang, field) {
  return item[`${field}_${lang}`] || item[`${field}_uk`] || "";
}

function encodeAssetPath(path) {
  return path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function attachBrokenImageFallback(img) {
  img.addEventListener("error", () => {
    img.classList.add("is-broken");
  });

  if (img.complete && img.naturalWidth === 0) {
    img.classList.add("is-broken");
  }
}

function createGalleryItem(item, lang) {
  const layout = LAYOUT_SIZES[item.layout] ? item.layout : "normal";
  const { width, height } = LAYOUT_SIZES[layout];

  const button = document.createElement("button");
  button.className = "gallery-item";
  button.type = "button";

  if (layout === "tall") {
    button.classList.add("gallery-item--tall");
  }

  if (layout === "wide") {
    button.classList.add("gallery-item--wide");
  }

  const imagePath = encodeAssetPath(item.image);
  button.dataset.full = imagePath;

  const img = document.createElement("img");
  img.src = imagePath;
  img.alt = pickLocalized(item, lang, "alt");
  img.width = width;
  img.height = height;
  img.loading = "lazy";

  attachBrokenImageFallback(img);
  button.appendChild(img);

  return button;
}

export async function renderGallery(lang) {
  const data = await loadGallery();

  const title = document.getElementById("gallery-title");
  const subtitle = document.getElementById("gallery-subtitle");
  const grid = document.getElementById("gallery-grid");

  if (!title || !subtitle || !grid) {
    return;
  }

  title.textContent = pickLocalized(data, lang, "title");
  subtitle.textContent = pickLocalized(data, lang, "subtitle");

  grid.replaceChildren();

  data.items.forEach((item) => {
    grid.appendChild(createGalleryItem(item, lang));
  });

  observeRevealElements(
    [title, subtitle, ...grid.querySelectorAll(".gallery-item")],
    55
  );
}

export function initGalleryLightbox() {
  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = lightbox?.querySelector(".lightbox__image");

  if (!gallery || !lightbox || !lightboxImage || gallery.dataset.lightboxReady === "true") {
    return;
  }

  gallery.addEventListener("click", (event) => {
    const item = event.target.closest(".gallery-item");

    if (!item) {
      return;
    }

    const img = item.querySelector("img");

    if (!img || img.classList.contains("is-broken")) {
      return;
    }

    lightboxImage.src = item.dataset.full || img.src;
    lightboxImage.alt = img.alt;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  });

  gallery.dataset.lightboxReady = "true";
}
