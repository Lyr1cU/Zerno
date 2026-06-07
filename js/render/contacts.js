import { loadContacts } from "../content.js";
import { observeRevealElements } from "../reveal.js";

const ADDRESS_ICON = `<svg class="contact-list__icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;

const SOCIAL_ICONS = {
  telegram:
    '<path d="M22 3L2 11l7 2 2 7 11-17z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  instagram:
    '<rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="7" r="1" fill="currentColor"/>',
  facebook:
    '<path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H6v4h3v8h4v-8h3l1-4h-4V9c0-.6.4-1 1-1z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
};

function pickLocalized(item, lang, field) {
  return item[`${field}_${lang}`] || item[`${field}_uk`] || "";
}

function createSocialLink(social, size) {
  const iconPath = SOCIAL_ICONS[social.id];

  if (!iconPath) {
    return null;
  }

  const link = document.createElement("a");
  link.className = "socials__link";
  link.href = social.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", social.label);
  link.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">${iconPath}</svg>`;

  return link;
}

function renderSocials(container, socials, size) {
  if (!container) {
    return;
  }

  container.replaceChildren();

  socials.forEach((social) => {
    const link = createSocialLink(social, size);

    if (link) {
      container.appendChild(link);
    }
  });
}

function renderContactList(data, lang) {
  const list = document.getElementById("contact-list");

  if (!list) {
    return;
  }

  list.replaceChildren();

  const addressItem = document.createElement("div");
  addressItem.className = "contact-list__item";
  addressItem.innerHTML = `
    <dt></dt>
    <dd>
      ${ADDRESS_ICON}
      <span></span>
    </dd>
  `;
  addressItem.querySelector("dt").textContent = pickLocalized(data, lang, "addressLabel");
  addressItem.querySelector("span").textContent = pickLocalized(data, lang, "address");
  list.appendChild(addressItem);

  const hoursItem = document.createElement("div");
  hoursItem.className = "contact-list__item";
  hoursItem.innerHTML = "<dt></dt><dd></dd>";
  hoursItem.querySelector("dt").textContent = pickLocalized(data, lang, "hoursLabel");
  hoursItem.querySelector("dd").textContent = pickLocalized(data, lang, "hours");
  list.appendChild(hoursItem);

  const phoneItem = document.createElement("div");
  phoneItem.className = "contact-list__item";
  phoneItem.innerHTML = "<dt></dt><dd><a></a></dd>";
  phoneItem.querySelector("dt").textContent = pickLocalized(data, lang, "phoneLabel");

  const phoneLink = phoneItem.querySelector("a");
  phoneLink.href = `tel:${data.phone}`;
  phoneLink.textContent = pickLocalized(data, lang, "phoneDisplay");
  list.appendChild(phoneItem);
}

export async function renderContacts(lang) {
  const data = await loadContacts();

  const title = document.getElementById("contact-title");
  const map = document.querySelector(".contact-map");

  if (!title) {
    return;
  }

  title.textContent = pickLocalized(data, lang, "title");

  if (map) {
    map.setAttribute("aria-label", pickLocalized(data, lang, "mapLabel"));
  }

  renderContactList(data, lang);
  renderSocials(document.getElementById("contact-socials"), data.socials, 22);
  renderSocials(document.getElementById("footer-socials"), data.socials, 20);

  observeRevealElements(
    [
      title,
      ...document.querySelectorAll("#contact-list .contact-list__item"),
      document.getElementById("contact-socials"),
    ],
    70
  );
}
