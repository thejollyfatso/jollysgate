# Jolly's Gate

A launchpad PWA for a small group of known users (family and friends) to access shared apps and tools.

---

## Local development

```bash
cd client
npm install
npm run dev      # http://localhost:5173
```

---

## Deployment

Pushes to `main` auto-deploy to GitHub Pages via CI. Before the first deploy, go to **Settings → Pages → Source** and select **GitHub Actions**.

The live site will be at `https://thejollyfatso.github.io/jollysgate/`.

### Switching to a custom domain

1. In `client/vite.config.js`, change the `VITE_BASE_PATH` fallback:
   ```js
   const base = process.env.VITE_BASE_PATH ?? "/";
   ```
2. Add a `CNAME` file to `client/public/` containing your domain:
   ```
   yourdomain.com
   ```
3. Point your domain's DNS to GitHub Pages (`185.199.108.153` etc.) and configure the custom domain in **Settings → Pages**.

---

## Further reading

- **[CLAUDE.md](CLAUDE.md)** — stack, conventions, design tokens
- **[docs/decisions.md](docs/decisions.md)** — architectural decisions and rationale
