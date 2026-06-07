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

3. В репозитории: **Settings → Pages → Build and deployment → Source** выберите **GitHub Actions**.
4. После первого push workflow опубликует сайт по адресу:

   `https://<ваш-username>.github.io/Zerno/`
