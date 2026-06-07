# Промпты для визуального дизайна — кофейня «Зерно»

Файл для генерации макетов в ИИ (Midjourney, DALL·E, Ideogram, Figma AI, v0, Galileo, Uizard и т.п.).

**Как пользоваться:**
1. Сначала сгенерируй **блок 0** (дизайн-система) — он задаёт единый стиль для всех экранов.
2. Затем по очереди генерируй экраны **1–8**, вставляя общий контекст из блока 0 в начало каждого промпта.
3. Для мобильных версий используй дополнение из блока **9**.
4. Если результат «плывёт» — уточни: `flat UI mockup, no 3D, no glossy glass, no heavy blur`.

---

## Блок 0 — Общий контекст (вставлять в начало каждого промпта)

```
Design a one-page landing website for a fictional specialty coffee shop called "Зерно" (Zerno).

Brand mood: warm, cozy, craft coffee shop — not corporate, not hipster-minimal, not neon café.
Color palette: dark espresso brown (#2C1810), warm cream/beige (#F5F0E8), accent caramel/terracotta (#C67B4E). Optional soft olive or muted gold as secondary accent.
Typography: distinctive grotesk or soft serif for headings (e.g. Playfair Display, Cormorant, or similar feel); clean readable sans-serif for body (e.g. Inter, Source Sans).
Layout: lots of whitespace, large photography, refined typography, subtle borders — no heavy shadows, no glassmorphism, no backdrop blur, no glossy 3D effects.
Format: high-fidelity UI mockup, desktop 1440px wide, Figma-style flat design, realistic coffee shop photography as placeholders.
Language on UI: English.
```

**Негативный промпт (добавлять при необходимости):**
```
Avoid: glassmorphism, frosted glass, heavy drop shadows, neon colors, cyberpunk, fast-food style, Starbucks clone, cluttered layout, tiny unreadable text, stock photo watermarks, English-only UI if Russian is requested.
```

---

## Экран 1 — Шапка (Header / Navigation)

**Назначение:** фиксированная или полупрозрачная шапка с логотипом, якорным меню и CTA.

**Промпт:**
```
[Вставить Блок 0]

Screen: website header / navigation bar for coffee shop landing "Зерно".

Elements:
- Left: wordmark logo "Зерно" — simple elegant typography, maybe a small coffee bean or grain icon
- Center or right: anchor links — Меню, О нас, Галерея, Отзывы, Контакты
- Far right: primary CTA button "Забронировать столик" — caramel/terracotta fill, cream text, rounded corners (8–12px)
- Background: cream or semi-transparent dark overlay on hero (readable on photo background)
- Height: compact, ~72–80px
- Show header both on light cream section and over dark hero photo to demonstrate contrast

Style: minimal, premium craft café, sticky header feel, subtle bottom border or very light shadow only.
Output: isolated header component mockup + one example overlaid on hero photo.
```

**Что проверить после генерации:**
- Логотип читается на светлом и тёмном фоне
- CTA заметна, но не кричит
- Пункты меню не перегружают шапку

---

## Экран 2 — Hero (первый экран)

**Назначение:** главный экран — эмоция, заголовок, подзаголовок, CTA, фоновое фото.

**Промпт:**
```
[Вставить Блок 0]

Screen: hero section — full viewport height (100vh), first screen of landing.

Content:
- Large H1 headline in Russian: "Кофе, который будит город"
- Subheadline (1–2 lines): "Своя обжарка, specialty-зёрна и завтраки весь день в центре города"
- Primary CTA button: "Забронировать столик"
- Secondary ghost/outline button optional: "Посмотреть меню"
- Background: full-bleed warm photo — latte art close-up OR cozy café interior with natural light, wooden tables, plants
- Dark gradient overlay (bottom-left to top-right, 40–50% opacity espresso brown) for text readability
- Text aligned left or center-left, generous padding

Typography: H1 very large (48–64px feel), cream/white text on dark overlay.
No carousel, no video player UI, no parallax indicators.
Output: full hero section mockup, desktop 1440px.
```

**Альтернатива (более «интерьерный» вариант):**
```
Same as above but background = wide shot of cozy coffee shop interior, morning sunlight, customers softly blurred, focus on atmosphere not faces.
```

---

## Экран 3 — О нас / Преимущества

**Назначение:** короткий текст о кофейне + 4 карточки преимуществ.

**Промпт:**
```
[Вставить Блок 0]

Screen: "О нас" / benefits section on cream (#F5F0E8) background.

Layout:
- Top: section label small caps "О нас"
- Heading: "Место, где зёрна становятся историей"
- Short paragraph (3–4 lines Russian lorem about craft roasting and cozy atmosphere)
- Below: 4 feature cards in a row (grid 4 columns on desktop):
  1. "Своя обжарка" — icon: flame/roaster
  2. "Зёрна Specialty" — icon: coffee bean
  3. "Уютная атмосфера" — icon: armchair or lamp
  4. "Завтраки весь день" — icon: croissant or plate

Card style: white or slightly darker cream background, thin border (#E8DFD0), small icon in terracotta, title bold, one-line description, generous padding, no heavy shadow.
Section padding: large vertical whitespace above and below.
Output: full section mockup.
```

---

## Экран 4 — Меню

**Назначение:** сетка карточек напитков/десертов с вкладками категорий.

**Промпт:**
```
[Вставить Блок 0]

Screen: menu section with category tabs and product cards.

Header:
- Section title: "Меню"
- Subtitle: "Напитки и выпечка из свежих ингредиентов"
- Tab pills: "Кофе" (active, terracotta) | "Десерты" (inactive, outline)

Grid: 2 rows × 4 columns = 8 menu cards. Each card:
- Square food photo (top)
- Dish name (Russian): Капучино, Раф ванильный, Фильтр-кофе, Эспрессо, Круассан, Чизкейк, Авокадо-тост, Гранола
- Short description (1 line)
- Price right-aligned: 180 ₽, 240 ₽, etc.

Card style: white background, rounded corners 12px, subtle border, photo with consistent aspect ratio 1:1.
Active tab underline or filled pill style.
Background section: white or very light cream.
Output: full menu section, show "Кофе" tab selected with coffee items visible.
```

**Дополнительный промпт — вкладка «Десерты»:**
```
Same menu section layout but "Десерты" tab active, cards show pastries and desserts instead of coffee drinks. Keep identical card structure and spacing for design consistency.
```

---

## Экран 5 — Галерея

**Назначение:** сетка 6–8 фото атмосферы кофейни.

**Промпт:**
```
[Вставить Блок 0]

Screen: photo gallery section.

Header:
- Title: "Галерея"
- Subtitle: "Интерьер, напитки и моменты, которые хочется запомнить"

Grid: masonry or uniform 3×3 grid (8 images), gap 16–24px, rounded corners 8px on photos.
Photo subjects mix: espresso being poured, pastry display, wooden bar counter, cozy corner seating, latte art top-down, hands holding cup (no identifiable faces), plants and warm lighting.

Background: dark espresso brown section OR cream with dark text — choose one cohesive with rest of site.
Optional: one image shown with lightbox overlay preview (dimmed background + enlarged center image + close X) as secondary variant.
No Instagram embed UI, no slider arrows unless minimal.
Output: gallery section mockup.
```

---

## Экран 6 — Отзывы

**Назначение:** 3 карточки отзывов, опционально слайдер.

**Промпт:**
```
[Вставить Блок 0]

Screen: customer reviews section on light cream background.

Header:
- Title: "Отзывы"
- Subtitle: "Что говорят гости"

Layout: 3 review cards in a row (or carousel with 3 visible + subtle dots below).

Each card:
- 5 gold/caramel stars
- Quote text in Russian (2–3 sentences, warm tone about coffee quality and atmosphere)
- Author name: "Анна К.", "Михаил Д.", "Елена С."
- Optional small avatar circle (abstract, no real faces)

Card style: white background, soft border, quote marks subtle in terracotta, padding 24–32px.
Optional: left/right arrow buttons for slider — minimal line icons, not bulky.
Output: reviews section with 3 cards visible.
```

---

## Экран 7 — Контакты + форма + карта

**Назначение:** адрес, часы, телефон, форма бронирования, карта, соцсети.

**Промпт:**
```
[Вставить Блок 0]

Screen: contacts section — split layout desktop.

Left column (40%):
- Title: "Контакты"
- Address with map pin icon: "г. Москва, ул. Примерная, 12"
- Hours: "Пн–Пт 8:00–22:00, Сб–Вс 9:00–23:00"
- Phone: "+7 (999) 123-45-67"
- Social icons row: Telegram, VK, Instagram — simple line icons in terracotta

Right column (60%):
- Contact/booking form titled "Забронировать столик" or "Написать нам"
- Fields: Имя (required), Телефон (required), Email (optional), Сообщение (textarea)
- Submit button: "Отправить" — terracotta primary
- Input style: cream background, dark border on focus, labels above fields, adequate touch height

Bottom full width:
- Embedded map placeholder (gray beige map tile style, pin on location) — static mockup, not real Google UI branding

Background: white section or subtle cream-to-white gradient.
Output: full contacts section with form validation states not required — default empty form only.
```

**Дополнительный промпт — состояние «Спасибо»:**
```
Same contacts form but after successful submit: form replaced by success message card — checkmark icon, "Спасибо! Мы свяжемся с вами в ближайшее время", soft green or terracotta accent, calm not flashy.
```

---

## Экран 8 — Подвал (Footer)

**Назначение:** лого, копирайт, соцсети, ссылка наверх.

**Промпт:**
```
[Вставить Блок 0]

Screen: website footer — compact, dark espresso brown background (#2C1810), cream text.

Layout (3 columns or centered stack):
- Left: logo "Зерно" + tagline "Крафтовая кофейня"
- Center: quick links duplicate — Меню, О нас, Галерея, Отзывы, Контакты
- Right: social icons + "Наверх ↑" scroll-to-top link

Bottom bar: thin divider, copyright "© 2026 Зерно. Все права защищены."

Style: minimal, no huge footer, height ~200–240px, links hover state optional (underline terracotta).
Output: footer component on dark background.
```

---

## Блок 9 — Мобильная версия (дополнение к любому экрану)

**Добавлять в конец промпта для mobile-макета:**
```
Mobile variant: 390px width, mobile-first layout.
- Header: hamburger menu icon left or right, logo center, CTA hidden inside burger or as sticky bottom bar
- Hero: stacked text, H1 smaller (32–36px), full-width CTA button, background photo cropped vertically
- Feature cards: 1 column stack
- Menu grid: 1 column or 2 columns max
- Gallery: 2 columns
- Reviews: 1 card visible + swipe dots
- Contacts: form stacked above map, full width inputs min 44px touch height
Show mobile mockup in iPhone 14 frame optional.
```

**Отдельный промпт — мобильное меню (бургер открыт):**
```
[Вставить Блок 0]

Mobile navigation drawer open state, 390px width.
- Full-screen or slide-in panel from right, cream background
- Close X top right
- Vertical links: Меню, О нас, Галерея, Отзывы, Контакты — large tappable 48px height
- CTA button "Забронировать столик" at bottom, full width terracotta
- Slight overlay dimming hero behind drawer
Output: mobile menu open state mockup.
```

---

## Блок 10 — Полная страница (опционально)

**Если нужен один длинный макет всего лендинга:**
```
[Вставить Блок 0]

Full one-page landing scroll mockup, long vertical composition showing all sections in order:
1. Header
2. Hero
3. About / Benefits
4. Menu with tabs
5. Gallery
6. Reviews
7. Contacts + form + map
8. Footer

Single continuous design, consistent spacing rhythm between sections (80–120px section gaps).
Desktop 1440px, top-down view, Figma export style, labeled section dividers subtle.
Use for overall composition check before detailed per-section work.
```

---

## Блок 11 — Референсы для фото-контента (отдельно от UI)

Если генерируешь **фотографии** для сайта (не UI), используй эти промпты:

| Назначение | Промпт |
|------------|--------|
| Hero фон | `Cozy specialty coffee shop interior, morning golden hour light, wooden furniture, plants, shallow depth of field, warm tones, no people faces, professional food photography, 16:9` |
| Меню — капучино | `Cappuccino with latte art in ceramic cup, top-down 45 degree angle, rustic wooden table, warm natural light, craft coffee shop aesthetic` |
| Меню — круассан | `Fresh buttery croissant on plate, coffee shop counter, warm bakery lighting, shallow DOF` |
| Галерея — бар | `Coffee bar counter with espresso machine, warm ambient light, bottles and cups, inviting atmosphere, wide angle` |
| Галерея — уголок | `Cozy café corner with armchair, small table, book, cup of coffee, soft afternoon light` |

**Негатив для фото:** `no text, no logos, no watermarks, no cartoon, no oversaturated HDR`

---

## Чек-лист после генерации

- [ ] Единая палитра на всех экранах (эспрессо / крем / терракот)
- [ ] Русский текст на всех подписях и кнопках
- [ ] Нет тяжёлых blur/glass-эффектов (перформанс)
- [ ] CTA «Забронировать столик» видна на Hero и в шапке
- [ ] Мобильный вариант: бургер, одноколоночные сетки
- [ ] Достаточный контраст текста (крем на тёмном, тёмный на светлом)
- [ ] Меню: 6–8 карточек, есть вкладки Кофе / Десерты
- [ ] Форма: имя, телефон, email, сообщение
- [ ] Сохранены лучшие варианты в папку `design-references/` для вёрстки

---

## Рекомендуемый порядок работы

1. Блок 0 → один референс «настроения»
2. Экран 2 (Hero) — задаёт тон всему сайту
3. Экран 1 (Header) — подогнать под Hero
4. Экраны 3–7 — по порядку скролла
5. Экран 8 (Footer)
6. Блок 9 — мобильные версии ключевых экранов (Hero, Menu, Contacts, Burger)
7. Блок 10 — финальная склейка, если нужна общая картина

После утверждения макетов можно переходить к вёрстке по `ZERNO_demo_brief.md`.
