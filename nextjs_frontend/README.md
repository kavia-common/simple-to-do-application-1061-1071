This is a [Next.js](https://nextjs.org) project bootstrapped with `create-next-app`.

## Todo Frontend

This app implements a Todo UI styled with cues from a Figma “MyProfile” mobile design (asset files under /assets). It connects to a backend for CRUD at `/api/todos`.

## Configuration (IMPORTANT)

This project is configured for static export (`output: "export"`). That means relative API paths like `/api/todos` will hit the Next.js static host, not your backend server, and you will see HTML (404/error) instead of JSON.

To ensure the UI calls the backend Express API and receives JSON:

1) Copy `.env.example` to `.env`
2) Set the public backend base URL:
   ```
   NEXT_PUBLIC_BACKEND_URL=https://vscode-internal-26617-beta.beta01.cloud.kavia.ai:3001
   ```
   Replace with your backend URL as needed.
3) Rebuild or restart the frontend:
   ```
   npm install
   npm run dev
   # or
   npm run build && npm run start
   ```

The API client at `src/lib/api.ts` reads `NEXT_PUBLIC_BACKEND_URL` and prefixes all requests (e.g., `${NEXT_PUBLIC_BACKEND_URL}/api/todos`).

### Troubleshooting

- Symptom: The todo list shows an error and the network response is HTML (e.g., a Next.js 404 page) instead of JSON.
  - Fix: Ensure `NEXT_PUBLIC_BACKEND_URL` is set and the value points to the backend (e.g., https://…:3001). Then rebuild/restart the frontend.

- CORS: The backend includes permissive CORS. If deploying elsewhere, confirm the backend allows the frontend origin.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000 — the root redirects to `/todos`.

## Features
- Create, list, search, filter (All / Active / Completed)
- Toggle complete, inline edit, delete
- Types and service client (`src/types/todo.ts`, `src/lib/api.ts`)

## Notes
- Styling borrows layout tokens from the Figma-exported MyProfile assets (rounded cards, underline tabs, subtle chips) while keeping a light modern theme specified in the work item.
- API contract aligns with the provided OpenAPI under the backend container.
