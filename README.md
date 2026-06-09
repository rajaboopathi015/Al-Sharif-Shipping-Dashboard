# Shipping Container Lines Dashboard

Enterprise logistics analytics dashboard built with Next.js, TypeScript, Tailwind CSS, Recharts, and React Globe.GL.

## Features

- Icon-only sidebar navigation with sticky header & filter bar
- 4 gradient KPI cards with embedded sparkline charts
- 5-year comparison, linewise, customer, salesman & monthly analytics
- Interactive 3D rotating globe with pulsing density markers
- Combined / Import / Export trade mode toggle
- Responsive layout (desktop-first, 1440px optimized)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Globe:** react-globe.gl + Three.js
- **Icons:** Lucide React

## Project Structure

```
src/
├── app/                  # Next.js pages
├── components/
│   ├── dashboard/        # Charts, KPIs, globe, filters
│   ├── layout/           # Sidebar, header, app shell
│   └── ui/               # Shared UI primitives
├── context/              # Filter state management
└── lib/                  # Mock data & types
```
