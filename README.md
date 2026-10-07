# Real Estate Listing — Backend

Node.js + Express + TypeScript + Prisma (PostgreSQL) API for the real estate listing site.

## Local setup

```bash
npm install
cp .env.example .env   # then fill in DATABASE_URL and JWT_SECRET
npx prisma migrate dev --name init
npm run dev
```

Server runs at http://localhost:4000. Health check: `GET /health`.

## Deploying to Render

1. Push this folder to a GitHub repo (as its own repo, or a subfolder with Render's "Root Directory" setting).
2. On Render: **New → PostgreSQL** — create a free Postgres instance, copy its **Internal Connection String**.
3. On Render: **New → Web Service** — connect your repo.
   - Build command: `npm install && npx prisma generate && npm run build`
   - Start command: `npm start`
4. Add environment variables in the Render dashboard:
   - `DATABASE_URL` — the Postgres connection string from step 2
   - `JWT_SECRET` — any long random string
   - `FRONTEND_URL` — your Vercel URL once deployed (e.g. `https://your-app.vercel.app`)
5. After first deploy, run migrations once. Easiest way: open the Render "Shell" tab for the service and run:
   ```bash
   npx prisma migrate deploy
   ```
6. Your API is now live at `https://your-service.onrender.com`.

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /api/auth/signup | - | Create account |
| POST | /api/auth/login | - | Log in, get JWT |
| GET | /api/listings | - | Search/browse listings (query params: minPrice, maxPrice, bedrooms, propertyType, city, page, limit) |
| GET | /api/listings/:id | - | Get one listing |
| POST | /api/listings | Agent/Admin | Create listing |
| PUT | /api/listings/:id | Agent/Admin (owner) | Update listing |
| DELETE | /api/listings/:id | Agent/Admin (owner) | Delete listing |
| GET | /api/listings/agent/mine | Agent/Admin | Get my own listings |
| POST | /api/inquiries | Any logged-in user | Send inquiry about a listing |
| GET | /api/inquiries/listing/:listingId | Agent (owner) | View inquiries for a listing |

Auth uses `Authorization: Bearer <token>` headers with the JWT returned from signup/login.

## Notes
- Image uploads: this API expects an array of already-uploaded image URLs (`images: string[]`) when creating a listing. Upload images client-side to Cloudinary (or similar) first, then pass the resulting URLs here.
- For geo-radius search, consider enabling the PostGIS extension on your Postgres instance later.
