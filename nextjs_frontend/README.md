This is a [Next.js](https://nextjs.org) project bootstrapped with `create-next-app`.

## Todo Frontend

This app implements a Todo UI styled with cues from a Figma “MyProfile” mobile design (asset files under /assets). It connects to a backend at `/api/todos` for CRUD.

### Environment

Copy `.env.example` to `.env` and set:
- `NEXT_PUBLIC_BACKEND_URL` (optional): Base URL to your backend (e.g. `http://localhost:3001`). Leave empty if the frontend is reverse-proxied to the backend and can use same-origin relative paths.

### Development

```bash
npm install
npm run dev
```

Open http://localhost:3000 — root redirects to `/todos`.

### Features
- Create, list, search, filter (All / Active / Completed)
- Toggle complete, inline edit, delete
- Types and service client (`src/types/todo.ts`, `src/lib/api.ts`)

### Notes
- Styling borrows layout tokens from the Figma-exported MyProfile assets (rounded cards, underline tabs, subtle chips) while keeping a light modern theme specified in the work item.
- API contract aligns with the provided OpenAPI under the backend container.
