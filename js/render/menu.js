import { loadMenu } from "../content.js";
import { observeRevealElements, refreshReveal } from "../reveal.js";

let activeCategory = "coffee";
let menuData = null;

function pickLocalized(item, lang, field) {
  return item[`${field}_${lang}`] || item[`${field}_uk`] || "";
}

function encodeAssetPath(path) {
  return path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function getCategoriesWithItems(data) {
  const used = new Set(data.items.map((item) => item.category));
  return data.categories.filter((category) => used.has(category.id));
}

function createMenuCard(item, lang) {
  const card = document.createElement("article");
  card.className = "menu-card";
  card.dataset.category = item.category;

  card.innerHTML = `
    <div class="menu-card__media">
      <img src="" alt="" width="280" height="280" loading="lazy">
    </div>
    <div class="menu-card__body">
      <div class="menu-card__info">
        <h3 class="menu-card__name"></h3>
        <p class="menu-card__desc"></p>
      </div>
      <span class="menu-card__price"></span>
    </div>
  `;

  const img = card.querySelector("img");
  img.src = encodeAssetPath(item.image);
  img.alt = pickLocalized(item, lang, "name");

  card.querySelector(".menu-card__name").textContent = pickLocalized(item, lang, "name");
  card.querySelector(".menu-card__desc").textContent = pickLocalized(item, lang, "desc");
  card.querySelector(".menu-card__price").textContent = pickLocalized(item, lang, "price");

  img.addEventListener("error", () => {
    img.classList.add("is-broken");
  });

  if (img.complete && img.naturalWidth === 0) {
    img.classList.add("is-broken");
  }

  return card;
}

export function filterMenu(category) {
  activeCategory = category;

  const tabButtons = document.querySelectorAll(".menu-tabs__btn");
  const menuCards = document.querySelectorAll(".menu-card");
  const menuPanel = document.getElementById("menu-panel");

  tabButtons.forEach((btn) => {
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

export async function renderMenu(lang) {
  menuData = await loadMenu();

  const title = document.getElementById("menu-title");
  const subtitle = document.getElementById("menu-subtitle");
  const tabs = document.getElementById("menu-tabs");
  const panel = document.getElementById("menu-panel");

  if (!title || !subtitle || !tabs || !panel) {
    return;
  }

  title.textContent = pickLocalized(menuData, lang, "title");
  subtitle.textContent = pickLocalized(menuData, lang, "subtitle");

  const categories = getCategoriesWithItems(menuData);
  tabs.replaceChildren();

  categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.className = "menu-tabs__btn";
    button.type = "button";
    button.role = "tab";
    button.id = `menu-tab-${category.id}`;
    button.dataset.tab = category.id;
    button.setAttribute("aria-controls", "menu-panel");
    button.setAttribute("aria-selected", "false");
    button.textContent = pickLocalized(category, lang, "label");
    if (index === 0) {
      button.classList.add("is-active");
      button.setAttribute("aria-selected", "true");
    }
    tabs.appendChild(button);
  });

  panel.replaceChildren();

  menuData.items.forEach((item) => {
    panel.appendChild(createMenuCard(item, lang));
  });

  if (!categories.some((category) => category.id === activeCategory)) {
    activeCategory = categories[0]?.id || "coffee";
  }

  filterMenu(activeCategory);

  observeRevealElements(
    [title, subtitle, tabs, ...panel.querySelectorAll(".menu-card")],
    70
  );
}

export function initMenuTabs() {
  const menuSection = document.getElementById("menu");

  if (!menuSection || menuSection.dataset.tabsReady === "true") {
    return;
  }

  menuSection.addEventListener("click", (event) => {
    const button = event.target.closest(".menu-tabs__btn");
    if (button) {
      filterMenu(button.dataset.tab);
    }
  });

  menuSection.dataset.tabsReady = "true";
}
