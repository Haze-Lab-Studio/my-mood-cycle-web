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

Copy `.env.example` to `.env.local` (or set the same keys in Vercel) for email capture:

| Variable | Purpose |
| --- | --- |
| `MAILERLITE_API_KEY` | Private MailerLite Connect API token (server-only) |
| `MAILERLITE_GROUP_WAITLIST` | Group ID for the homepage waitlist |
| `MAILERLITE_GROUP_GUIDE` | Group ID for the Emotional Cycle Guide signup |
| `MAILERLITE_GROUP_MENSTRUAL` | Group ID for the menstrual quiz result |
| `MAILERLITE_GROUP_FOLLICULAR` | Group ID for the follicular quiz result |
| `MAILERLITE_GROUP_OVULATION` | Group ID for the ovulation quiz result |
| `MAILERLITE_GROUP_LUTEAL` | Group ID for the luteal quiz result |

Do not prefix these with `NEXT_PUBLIC_`. They are read only by `POST /api/subscribe`.

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
