# CLAUDE.md — Jolly's Gate (jollysgate)

Full feature reference: `docs/reference-spec.md`
Architectural decisions: `docs/decisions.md`

---

## What this app is

A launchpad PWA for a small group of known users (family and friends) to access
shared apps and tools. Not a public product. Simplicity is the priority.

---

## Stack

| Layer      | Choice                                                       |
|------------|--------------------------------------------------------------|
| Frontend   | React + Vite                                                 |
| Backend    | FastAPI (Python) + SQLite, self-hosted on DigitalOcean       |
| Auth       | Better Auth — magic link / OTP email only, no passwords      |
| Email      | Resend                                                       |
| Hosting    | DigitalOcean App Platform                                    |
| PWA        | vite-plugin-pwa — installable, manifest, service worker stub |

Frontend and static assets are served by the same FastAPI server in production
(same origin, no CORS needed). Vite dev proxy handles this locally.
SQLite file lives on the DigitalOcean Droplet. No external database service.

---

## Environments

| Name        | Purpose                                           |
|-------------|---------------------------------------------------|
| `local`     | `npm run dev` (client/) + `uvicorn` (server/)     |
| `preview`   | Auto-deployed per PR by DigitalOcean App Platform |
| `production`| Auto-deployed on push to `main`                   |

---

## Repo structure

```
jollysgate/
├── .github/workflows/ci.yml
├── client/                  React + Vite frontend
│   └── src/
│       ├── components/
│       ├── views/           One file per view
│       ├── hooks/
│       ├── utils/           apiFetch
│       └── state/           App state — no external state library
├── server/                  FastAPI backend
│   ├── routers/             auth.py
│   ├── tests/
│   ├── db.py                SQLite connection + schema init
│   └── main.py
├── docs/
│   ├── reference-spec.md
│   └── decisions.md
├── .env.example
├── makefile
├── requirements.txt
├── requirements-dev.txt
└── CLAUDE.md
```

---

## Conventions

### Frontend

- No client-side router. View switching via React state only.
- No external state library. A single `useAppState` hook owns all app state.
- All API calls go through `apiFetch(path, options)` — never call `fetch` directly.
- `apiFetch` prepends `apiConfig.baseUrl`, attaches `Authorization: Bearer {token}`,
  throws on non-2xx, and triggers logout on 401.
- Auth token stored in `localStorage` as `mk_token`.
- Font size on all text inputs must be 16px minimum (prevents iOS zoom on focus).
- No hover states — mobile-first, use `:active` only.

### Backend

- Every DB query must be scoped to `current_user.id` — no exceptions.
- Auth middleware runs on every protected route before any DB access.

### Naming

- Views: `PascalCase` components in `client/src/views/`
- Utils: `camelCase` functions in `client/src/utils/`
- API routes: snake_case
- DB columns: snake_case

### What NOT to do

- Do not use a client-side router
- Do not use a state management library
- Do not add hover states
- Do not make DB queries without `user_id` scoping

---

## Design tokens

```css
--color-primary:       #E8623A;
--color-primary-dark:  #C4512F;
--color-primary-light: #FBE9E3;
--color-bg:            #FAF8F5;
--color-border:        #E5E0D8;
--color-danger:        #EF4444;
--color-checked:       #9CA3AF;
--color-in-list:       #10B981;

--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;

font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial;
-webkit-font-smoothing: antialiased;
```

---

## API contract

```
POST   /auth/magic       { email } → sends OTP, no auth required
POST   /auth/verify      { email, code } → { token }

GET    /health           → { ok: true, app: "jollysgate" }
```

---

## Known bugs to fix

- `apple-touch-icon` points to `icon.svg` — add a PNG fallback for older iOS.

---

## Deferred to v2

- Offline capability (service worker data caching)
- App store wrapping (PWABuilder / Capacitor)
