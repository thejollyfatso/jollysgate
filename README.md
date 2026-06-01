# Jolly's Gate

A launchpad PWA for a small group of known users (family and friends) to access shared apps and tools.

---

## Local development

### Frontend

```bash
cd client
npm install
npm run dev      # http://localhost:5173
```

### Backend

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements-dev.txt
.venv/bin/uvicorn server.main:app --reload --port 8000
```

The Vite dev proxy forwards `/api` and `/events` to `http://localhost:8000`,
so run both servers simultaneously during development.

Verify the backend is up: `curl http://localhost:8000/health`

---

## Further reading

- **[CLAUDE.md](CLAUDE.md)** — stack, conventions, API contract, design tokens
- **[docs/reference-spec.md](docs/reference-spec.md)** — full feature inventory
- **[docs/decisions.md](docs/decisions.md)** — architectural decisions and rationale
