# Zerno — крафтова кав'ярня

Демо-сайт кав'ярні Zerno (статична вёрстка, UA/EN).

## Локальный просмотр

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
