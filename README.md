# Zerno — крафтова кав'ярня

Демо-сайт кав'ярні Zerno (статична вёрстка, UA/EN).

## Локальный просмотр

Сайт нельзя открывать как `file://` — ES-модули в `js/main.js` требуют HTTP-сервер (бургер-меню и форма тоже).

```bash
# Python
python -m http.server 8080

# или Node.js
npx serve .
```

Откройте http://localhost:8080

## GitHub Pages

1. Создайте репозиторий на GitHub (например `Zerno`).
2. Привяжите remote и запушьте `main`:

   ```bash
   git remote add origin https://github.com/<ваш-username>/Zerno.git
   git push -u origin main
   ```

3. В репозитории: **Settings → Pages → Build and deployment → Source** выберите **GitHub Actions** (если деплой упал с `Get Pages site failed` — это обязательный шаг).
4. После push workflow опубликует сайт по адресу:

   `https://lyr1c1.github.io/Zerno/`

## Админка (Decap CMS)

Адрес: `https://lyr1c1.github.io/Zerno/admin/` (после деплоя).

Редактируются `content/*.json`: меню, галерея, отзывы, контакты. Новые фото загружаются в `img/uploads/`.

### Локально (без GitHub-входа)

Два терминала:

```bash
# 1 — прокси для записи в репозиторий
npx decap-server

# 2 — сайт
python -m http.server 8080
```

Откройте http://localhost:8080/admin/ — вход не нужен (`local_backend: true` в `admin/config.yml`).

### Продакшн (вход через GitHub)

1. **OAuth-прокси на Vercel** — импорт репозитория [ublabs/netlify-cms-oauth](https://github.com/ublabs/netlify-cms-oauth):
   - [vercel.com/new](https://vercel.com/new) → Import Git Repository → `ublabs/netlify-cms-oauth` (или свой fork)
   - Deploy → скопируйте URL, например `https://zerno-oauth.vercel.app`

2. **GitHub OAuth App** (Settings → Developer settings → OAuth Apps):
   - Application name: `Zerno CMS`
   - Homepage URL: `https://lyr1c1.github.io/Zerno/`
   - Authorization callback URL: `https://zerno-oauth.vercel.app/callback` (ваш URL + `/callback`)

3. **Переменные в Vercel** (Project → Settings → Environment Variables):
   - `OAUTH_GITHUB_CLIENT_ID` — Client ID
   - `OAUTH_GITHUB_CLIENT_SECRET` — Client Secret
   - Redeploy после добавления переменных

4. В `admin/config.yml` замените `base_url` на URL прокси (без `/callback`).

5. У GitHub-аккаунта, которым входите в админку, должен быть **write** доступ к репозиторию `Lyr1cU/Zerno`.

После **Publish** в админке изменения попадают в `main` → GitHub Actions обновляет сайт (1–2 мин).
