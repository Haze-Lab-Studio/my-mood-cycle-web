# My Mood Cycle — Web

Marketing site for [My Mood Cycle](https://moodcycle.app): landing page, privacy policy, and Kit waitlist signup.

Built with [Next.js](https://nextjs.org/) (App Router), React, and Tailwind CSS v4.

## Prerequisites

- [Node.js](https://nodejs.org/) 20+ (LTS recommended)
- npm (comes with Node)

## Setup

```bash
git clone https://github.com/gabicandido/my-mood-cycle-web.git
cd my-mood-cycle-web
npm install
```

## Development

Start the dev server (default: [http://localhost:3000](http://localhost:3000)):

```bash
npm run dev
```

If styles look broken or you see webpack cache errors, use a clean dev start:

```bash
npm run dev:clean
```

After editing Kit form styles in `src/styles/kit-form-overrides.css`, sync the public CSS before testing or building:

```bash
npm run sync:kit-css
```

(`npm run build` runs this automatically via `prebuild`.)

## Build

Create a production build:

```bash
npm run build
```

Run the production server locally:

```bash
npm run start
```

## Other scripts

| Script           | Description                      |
| ---------------- | -------------------------------- |
| `npm run lint`   | Run ESLint                       |
| `npm run format` | Format with Prettier             |
| `npm run clean`  | Remove `.next` and webpack cache |
