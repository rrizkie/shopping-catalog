## Shopping Catalog

A simple shopping catalog app built with the Next.js App Router, featuring product listing + detail pages, wishlist, and a persistent cart.

## Getting Started

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

### Production build

```bash
npm run build
npm run start
```

## Technologies used

- **Next.js (App Router)**: UI framework (`next`)
- **React**: UI library (`react`, `react-dom`)
- **TypeScript**: static typing
- **Tailwind CSS**: styling (`tailwindcss`)
- **Redux Toolkit**: state management (`@reduxjs/toolkit`, `react-redux`)
- **redux-persist**: persisted client state for `cart` and `wishlist`
- **TanStack Query**: server-state fetching/caching (`@tanstack/react-query`)
- **Axios**: HTTP client (`axios`)
- **React Icons**: icon set (`react-icons`)

## Cart persistence & hydration handling

Persisting Redux state in a Next.js App Router app needs special care to avoid server-side rendering accessing `window`/`localStorage`, and to avoid hydration mismatches.

This project handles that as follows:

- **Client-only provider**: The root `Provider` component is a client component (`components/organism/provider/index.tsx` has `'use client'`) and is mounted from `app/layout.tsx`. This ensures Redux + persistence setup happens on the client.
- **Storage fallback on the server**: In `store/index.ts`, storage is selected like this:
  - On the **client**: `createWebStorage("local")` (uses `localStorage`)
  - On the **server**: a **noop storage** implementation (`createNoopStorage`) that returns `Promise.resolve(null)` so SSR never touches browser APIs.
- **Gate rendering until rehydration**: The provider wraps the app with `PersistGate` (`redux-persist/integration/react`). `PersistGate` delays rendering of children until persisted state is rehydrated on the client, which reduces UI flicker and avoids rendering with empty cart data during the initial client hydration.

Files to look at:

- `store/index.ts`: noop storage + `persistReducer` configs for `cart` and `wishlist`
- `components/organism/provider/index.tsx`: `ReduxProvider` + `PersistGate`
- `app/layout.tsx`: mounts the provider in the App Router root layout

