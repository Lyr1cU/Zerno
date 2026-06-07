const cache = new Map();

export async function loadJson(path) {
  if (cache.has(path)) {
    return cache.get(path);
  }

  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }

  const data = await response.json();
  cache.set(path, data);
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
