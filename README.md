# Spendwise

[Live demo](https://spend-wise-six-zeta-37.vercel.app) · [Source repository](https://github.com/KaungHtetZaw-bot/spendwise)

Spendwise is a personal-finance application for recording income and expenses, understanding spending patterns, and staying aware of a monthly budget. It is built for the web and includes a Capacitor Android target.

## Features

- Supabase authentication, email verification, password reset, profile settings, and protected routes
- Income and expense transactions with categories, editing, deletion, and transaction history
- Dashboard balance summaries, time-range filtering, category breakdowns, and responsive charts
- Monthly budget tracking with alerts at 80% and 100% of the configured limit
- Persisted theme, language, currency, and notification preferences
- Capacitor Android configuration with native launcher, splash assets, and status-bar behavior

## Stack

- React 19 and TypeScript
- Vite, Tailwind CSS, Mantine, and Framer Motion
- Supabase for authentication and data
- TanStack Query, Zustand, React Router, Recharts, and i18next
- Capacitor for the Android build target

## Run locally

Prerequisites: Node.js and a Supabase project with the required schema and authentication configuration.

```bash
npm install
```

Create a `.env.local` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_publishable_anon_key
```

Start the application:

```bash
npm run dev
```

## Available scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Android target

After configuring Capacitor and an Android development environment, use the Capacitor workflow to sync and run the app in Android Studio. The repository contains the Android target configuration; do not commit service-role or other private Supabase credentials.

## Project status

Spendwise is a featured portfolio project. It demonstrates a complete personal-finance workflow but does not provide financial advice or bank-account integrations.
