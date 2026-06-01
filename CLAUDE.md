# CLAUDE.md — Jolly's Gate (jollysgate)

Architectural decisions: `docs/decisions.md`

---

## What this app is

A frontend-only launchpad PWA for a small group of known users (family and
friends). It is the home screen for a family of productivity PWAs. Users see
app tiles on the home screen; tapping a tile navigates into that app via Vite
module federation in the same window.

---

## Stack

| Layer       | Choice                                                        |
|-------------|---------------------------------------------------------------|
| Frontend    | React + Vite (frontend only — no backend)                    |
| Routing     | react-router-dom v7 — URL routing for native back gesture     |
| Federation  | @originjs/vite-plugin-federation — host, mounts remote apps  |
| PWA         | vite-plugin-pwa — installable, manifest, service worker       |
| Hosting     | TBD (static hosting)                                          |

---

## Environments

| Name        | Purpose                                       |
|-------------|-----------------------------------------------|
| `local`     | `npm run dev` (client/)                       |
| `production`| Push to `main` — CI builds, deploy TBD        |

---

## Repo structure

```
jollysgate/
├── .github/workflows/ci.yml
├── client/
│   ├── public/
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   └── src/
│       ├── main.jsx          entry
│       ├── index.css         global reset + CSS vars
│       ├── App.jsx           BrowserRouter + routes
│       ├── components/
│       │   └── AppTile.jsx
│       └── views/
│           ├── Home.jsx      launchpad home screen
│           └── FoodApp.jsx   nf4lm federation wrapper
├── docs/
│   └── decisions.md
├── makefile
└── CLAUDE.md
```

---

## Remotes (federation)

| App key | Exposed module | Remote entry URL                                              |
|---------|---------------|---------------------------------------------------------------|
| `nf4lm` | `./App`       | https://nf4lm.deleonanddeleon.com/assets/remoteEntry.js       |

To add a new app: add a row to the `remotes` object in `vite.config.js`, add
an `AppTile` entry in `client/src/views/Home.jsx`, and create a view wrapper
in `client/src/views/`.

---

## Routing

| Path      | View       | Notes                                |
|-----------|------------|--------------------------------------|
| `/`       | `Home`     | app tile grid                        |
| `/food/*` | `FoodApp`  | renders nf4lm via module federation  |

Back button / back gesture returns to `/` via native browser history.

---

## Conventions

### Frontend

- URL-based routing via react-router-dom — back gesture works natively.
- No external state library — local React state only.
- No API calls — this app has no backend.
- Font size on all text inputs must be 16px minimum (prevents iOS zoom on focus).
- No hover states — mobile-first, use `:active` / pointer events only.

### Naming

- Views: `PascalCase` components in `client/src/views/`
- Components: `PascalCase` components in `client/src/components/`

### What NOT to do

- Do not add a backend or auth layer
- Do not add a state management library
- Do not add hover states

---

## Design tokens

```css
--color-primary:       #E8623A;
--color-primary-dark:  #C4512F;
--color-primary-light: #FBE9E3;
--color-bg:            #FAF8F5;
--color-border:        #E5E0D8;
--color-danger:        #EF4444;

--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;

font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial;
-webkit-font-smoothing: antialiased;
```

---

## Deferred

- Offline capability (service worker data caching)
- App store wrapping (PWABuilder / Capacitor)
- Replace placeholder PNG icons with designed assets
