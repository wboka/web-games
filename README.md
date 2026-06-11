# html-games

A single Vite app serving a landing page and multiple browser-based mini-games.

## Structure

- `index.html` — root entry point
- `src/main.ts` — Vue app with router
- `src/App.vue` — router view
- `src/pages/Landing.vue` — landing page listing available games
- `src/games/dandelion/` — first game (Dandelions vs. Wind)
  - `App.vue` — game component
  - `components/` — game UI components
  - `style.css` — game styles
- `public/` — static assets (favicons, icons)

## Getting Started

```bash
npm install
npm run dev
```

Then open the local Vite URL (typically `http://localhost:5173`).

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build locally

## Adding New Games

To add a new game:

1. Create a new folder in `src/games/` (e.g. `src/games/my-game/`)
2. Add your game's `App.vue` component and supporting files
3. Import and add a route in `src/main.ts`
4. Add a link to the new game in `src/pages/Landing.vue`

## Dependencies

- `vue` — UI framework
- `vue-router` — client-side routing
- `@fortawesome/fontawesome-free` — icons
- `tailwindcss` — styling

## Build for Production

Vercel and similar hosts will automatically detect the Vite config and build:

```bash
npm run build
```

Output goes to `dist/`.

## Notes

- The single Vite app serves all games under different routes.
- `src/games/dandelion/style.css` contains game-specific styles.
- Add shared styles to `src/style.css`.
