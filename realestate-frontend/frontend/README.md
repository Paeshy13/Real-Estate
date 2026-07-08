# Real Estate Listing — Frontend

Next.js 14 (App Router) + TypeScript + Tailwind CSS frontend for the real estate listing site.

## Local setup

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL to your backend URL
npm run dev
```

Visit http://localhost:3000. Make sure the backend is running (see the backend README) so listings load.

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. Go to vercel.com → **Add New Project** → import the repo.
3. Vercel auto-detects Next.js — no build config changes needed.
4. Add an environment variable:
   - `NEXT_PUBLIC_API_URL` = your Render backend URL (e.g. `https://your-backend.onrender.com`)
5. Deploy. Your site will be live at `https://your-app.vercel.app`.

## Pages

| Route | Description |
|---|---|
| `/` | Home page with featured listings |
| `/listings` | Browse/search listings with filters |
| `/listings/[id]` | Listing detail page with inquiry form |
| `/login`, `/signup` | Auth pages (buyer or agent role) |
| `/dashboard` | Agent-only page to post new listings |

## Notes
- Auth token is stored in `localStorage` for simplicity — for production, consider httpOnly cookies + a proper auth flow (e.g. NextAuth).
- Image upload: the dashboard form currently accepts a direct image URL. To let agents upload files, add the Cloudinary upload widget and pass the resulting secure URL into the same field.
- Map view: add `react-map-gl` + a Mapbox token to render listing locations on a map (not included here to keep the starter minimal).
- Update the `next.config.js` `images.remotePatterns` if you host images somewhere other than Cloudinary/Unsplash.
