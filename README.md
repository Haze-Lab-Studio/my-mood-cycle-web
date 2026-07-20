# My Mood Cycle — Web

Marketing site for [My Mood Cycle](https://mymoodcycle.com): landing page and privacy policy.

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

| Script           | Description                              |
| ---------------- | ---------------------------------------- |
| `npm run lint`   | Run ESLint                               |
| `npm run format` | Format with Prettier                     |
| `npm run clean`  | Remove `.next`, webpack cache, and `out` |
