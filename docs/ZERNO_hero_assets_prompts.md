# Ассеты главного экрана (Hero) — промпты для генерации

Референс: `maket/2.png`  
Куда складывать готовые файлы: `img/assets/`

---

## Что генерируем, а что — нет

| Нужен файл? | Элемент | Как делаем |
|-------------|---------|------------|
| ✅ **Да** | Фон Hero | ИИ → `hero-bg-desktop.jpg` |
| ✅ **Да** | Фон Hero (мобайл) | ИИ → `hero-bg-mobile.jpg` |
| ✅ **Да** | Иконка логотипа (зёрнышко в круге) | ИИ → `logo-icon.png` |
| ⚠️ Опционально | Favicon | Обрезка из `logo-icon` → `favicon.png` |
| ❌ Нет | Затемнение поверх фото | CSS `linear-gradient` |
| ❌ Нет | Кнопки CTA | CSS (терракот `#C67B4E`) |
| ❌ Нет | Текст заголовка / навигация | HTML + шрифты |
| ❌ Нет | Иконка бургера | CSS или inline SVG в коде |

**Итого минимум: 3 файла** (desktop bg, mobile bg, logo icon).

---

## Структура папки

```
img/assets/
  hero-bg-desktop.jpg    ← основной фон (широкий)
  hero-bg-mobile.jpg     ← тот же интерьер, вертикальный кроп
  logo-icon.png          ← только знак, прозрачный фон
  favicon.png            ← опционально, 32×32 или 512×512
```

После сжатия при вёрстке добавим `.webp`-версии рядом — пока клади **JPG/PNG** как есть.

---

## Общий стиль (вставлять в начало каждого промпта)

```
Warm craft specialty coffee shop aesthetic. Color mood: espresso brown, cream, terracotta, natural wood, exposed brick, soft golden light. Professional lifestyle photography, not CGI, not illustration, not cartoon. No text, no logos, no watermarks, no frames, no UI mockup borders.
```

**Негативный промпт:**
```
Avoid: neon lights, Starbucks branding, fast food, cold blue lighting, HDR oversaturation, blurry faces close-up, readable faces, text overlays, logos, watermarks, 3D render, anime, stock photo watermark.
```

---

## 1. `hero-bg-desktop.jpg` — фон Hero (десктоп)

**Назначение:** full-bleed фон первого экрана, текст слева поверх затемнения.

**Размер:** минимум **1920×1080**, лучше **2400×1350** (соотношение 16:9).  
**Формат:** JPG, качество 80–85%.

**Промпт:**
```
[Общий стиль]

Wide interior photograph of a cozy specialty coffee shop, horizontal 16:9 composition.

Scene: exposed red-brown brick wall on the left and center, warm pendant Edison bulbs, dark wooden tables and chairs, large fiddle-leaf fig plant, small succulents on tables, large window on the right with soft daylight from a European city street (Kyiv or Lviv vibe, blurred).

Atmosphere: morning or late afternoon golden hour, inviting, artisan, calm. Shallow depth of field — foreground tables slightly soft, middle ground warm and readable.

Important for web layout:
- Left third of the image slightly darker and less busy (space for white headline text overlay)
- Right side can be brighter with window light
- 2–3 anonymous visitors silhouettes or softly blurred people at tables in background — no identifiable faces
- No barista posing, no product placement labels

Camera: 24mm wide angle, eye level, natural colors, subtle film grain optional.
```

**Что проверить после генерации:**
- Левая часть не перегружена деталями (там будет заголовок)
- Нет случайного текста на вывесках/меню в кадре
- Кирпич + дерево + тёплый свет — как на `maket/2.png`

---

## 2. `hero-bg-mobile.jpg` — фон Hero (мобайл)

**Назначение:** вертикальный кроп того же интерьера для телефона (360–430px ширина).

**Размер:** минимум **1080×1920** (9:16) или **1200×1600** (3:4).  
**Формат:** JPG.

**Промпт:**
```
[Общий стиль]

Vertical portrait photograph of the SAME cozy specialty coffee shop interior as the desktop hero — matching brick wall, wooden furniture, warm pendant lights, plants, window light.

Composition for mobile:
- Vertical 9:16 crop
- Main focal point in upper two-thirds: brick wall + warm lights + plant
- Lower third calmer (table edge or floor) — less visual noise
- Left-center area relatively clean for stacked headline text
- Soft blurred people optional in background only
- Same warm golden color grading as desktop version

No text, no logos, no watermarks.
```

**Совет:** если ИИ даёт другой интерьер — добавь в промпт: `same location and color grading as previous image` (в Midjourney: `--cref` на desktop-версию).

---

## 3. `logo-icon.png` — знак логотипа

**Назначение:** иконка слева от слова «Зерно» в шапке. Текст «Зерно | ZERNO» сделаем шрифтом в HTML.

**Размер:** **512×512** px (масштабируется в CSS до ~36–40px).  
**Формат:** PNG с **прозрачным фоном**.

**Промпт:**
```
Minimal line-art logo mark for a coffee shop brand "Zerno".

Design: single coffee bean shape inside a thin circular outline. Elegant, geometric, balanced. Line weight consistent, 2px feel. Color: dark espresso brown #3D2B1F on transparent background.

Style: modern craft café, not corporate, not vintage badge, not clipart. Flat vector-like icon, centered, generous padding inside the circle. No text, no wordmark, only the icon symbol.

Export: square canvas, transparent background, crisp edges suitable for web favicon and header.
```

**Альтернатива (если ИИ криво рисует линии):**
```
Simple flat icon: one stylized coffee bean, solid fill dark brown #3D2B1F, inside thin circle stroke same color, transparent background, 512x512, vector logo style, dribbble quality
```

**Что проверить:**
- Читается в маленьком размере (~32px)
- Не слишком детализированное зёрнышко
- Прозрачный фон (не белый квадрат)

---

## 4. `favicon.png` — опционально

Можно не генерировать отдельно: уменьшить `logo-icon.png` до 32×32 и 180×180 (apple-touch).

Если нужен отдельный промпт:
```
Same coffee bean in circle logo icon, simplified for 32px favicon, bold strokes, dark brown #3D2B1F, transparent background, maximum simplicity, no fine details
```

---

## Технические требования перед заливкой в `img/assets/`

| Файл | Мин. размер | Вес (цель) | Примечание |
|------|-------------|------------|------------|
| `hero-bg-desktop.jpg` | 1920×1080 | &lt; 350 KB после сжатия | Главный LCP-ресурс |
| `hero-bg-mobile.jpg` | 1080×1920 | &lt; 250 KB | `<picture>` или media в CSS |
| `logo-icon.png` | 512×512 | &lt; 30 KB | PNG-8 или оптимизированный PNG |

**Alt-текст при вёрстке (для справки):**
- Desktop/mobile bg: `Interior of Zerno specialty coffee shop with brick walls and warm lighting`
- Logo icon: `Zerno logo`

---

## Чек-лист перед стартом вёрстки

- [ ] `hero-bg-desktop.jpg` — левая зона спокойная, без текста в кадре
- [ ] `hero-bg-mobile.jpg` — тот же вайб, вертикальный кроп
- [ ] `logo-icon.png` — прозрачный фон, читается в 32px
- [ ] Все файлы лежат в `img/assets/`
- [ ] Имена файлов **точно** как в таблице выше

Когда файлы будут в `img/assets/` — можно переходить к вёрстке Hero (`index.html` + CSS).
