const cache = new Map();

function getSiteRoot() {
  const script = document.querySelector('script[type="module"][src]');

  if (script?.src) {
    return new URL("../", script.src);
  }

  return new URL("./", window.location.href);
}

export async function loadJson(path) {
  const url = new URL(path, getSiteRoot()).href;

  if (cache.has(url)) {
    return cache.get(url);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status}`);
  }

  const data = await response.json();
  cache.set(url, data);
  return data;
}

export function loadMenu() {
  return loadJson("content/menu.json");
}

export function loadGallery() {
  return loadJson("content/gallery.json");
}

export function loadReviews() {
  return loadJson("content/reviews.json");
}

export function loadContacts() {
  return loadJson("content/contacts.json");
}
