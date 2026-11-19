# salagdinova.art

Архитектурное портфолио Марии Салагдиновой. EmDash (Astro) на Cloudflare: Workers + D1 + R2.
Языки: English (по умолчанию), Italiano (`/it/`), Русский (`/ru/`). Админка: `/_emdash/admin`.

## Первый запуск

1. **GitHub.** Загрузить содержимое архива в корень репозитория `aosaos-gith/salagdinova-art` (ветка `main`). Репозиторий должен быть **публичным** до конца шага 4: при установке сайт сам скачивает картинки из `seed/media/`.
2. **Cloudflare → Workers & Pages → Create → Import a repository** → выбрать `salagdinova-art`.
   - Project name: `salagdinova-art`
   - Build command: `pnpm run build`
   - Deploy command: `npx wrangler deploy`

   База D1 `salagdinova-art-db` и хранилище R2 `salagdinova-art-media` создадутся при первом деплое сами.
3. Открыть `https://salagdinova-art.<аккаунт>.workers.dev/_emdash/admin`.
4. В мастере установки: Site title — `Maria Salagdinova`, tagline — `Architecture student at Politecnico di Milano. Portfolio 2025–2026.`; в «How to start» **обязательно выбрать Sample content**: это проекты, страницы и картинки. Затем задать свой passkey. Если установка остановится посередине (картинок много), обновить страницу — она продолжится.
5. Проверить сайт. После этого репозиторий можно сделать приватным.
6. **Домен.** Workers → `salagdinova-art` → Settings → Domains & Routes → Add → Custom domain → `salagdinova.art` (и `www.salagdinova.art`). DNS домена уже должен быть в Cloudflare.
7. **Мария.** Admin → Users → Invite → её почта, роль Admin.

## Как редактировать (для Марии)

- **Projects** — проекты. Порядок на главной задаёт поле **Order** (1 — первый).
  - Тексты (Title, Place, Course, Summary, Context) переводятся отдельно: в карточке проекта справа, в блоке **Translations**, выбрать IT или RU → Edit.
  - **Cover image**, **Images**, год, преподаватели и команда общие для всех языков: замена картинки в английской версии сразу видна в итальянской и русской.
  - **Images**: у каждой картинки есть подписи на трёх языках, фон (White / Black) и размер (Full width / Wide / Half width / Narrow). Две подряд картинки «Half width» встают рядом.
- **Pages**:
  - **Home** — картинка и строка на обложке главной.
  - **About** — портрет и CV.
  - **Contact** — контакты.
- **Media** — все картинки. Сейчас они вырезаны из PDF-портфолио; заменить на оригиналы можно прямо в полях проекта.

## Разработка

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build
```

Устройство сайта и правила дизайна описаны в `AGENTS.md`.
