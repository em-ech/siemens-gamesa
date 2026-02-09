# Siemens Gamesa Intelligence Hub

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Components-000000?logo=shadcnui&logoColor=white)

## Overview

The **Siemens Gamesa Intelligence Hub** is an AI-powered wind farm analytics platform for predictive maintenance and CO2 emissions optimization. It combines machine learning predictions with interactive dashboards to help wind energy operators reduce downtime, prevent failures, and lower their carbon footprint.

## Pain Points

| Problem | Impact |
|---------|--------|
| **Reactive maintenance** | Turbine failures cause unplanned downtime and expensive emergency repairs |
| **No emissions visibility** | Operators lack tools to model and reduce their energy mix's carbon intensity |
| **Disconnected tools** | Risk assessment, alerts, and emissions data live in separate systems |

## Solution

- **Predictive risk scoring** — ML models analyze turbine sensor data to predict days-to-failure and assign risk scores before breakdowns occur
- **Automated alerting** — High-priority maintenance alerts are generated and dispatched to field teams automatically
- **CO2 impact modeling** — An interactive dashboard lets operators adjust their energy mix and see real-time emission intensity calculations based on IPCC/NREL data
- **Unified platform** — All analytics live under one roof: turbine health, maintenance alerts, and emissions optimization

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  React Frontend                  │
│                (React Router SPA)                │
├─────────────┬───────────────┬───────────────────┤
│  Home (/)   │ Turbines      │ Emissions         │
│  Landing &  │ (/turbines)   │ (/emissions)      │
│  Navigation │ Risk Dashboard│ CO2 Calculator    │
├─────────────┴───────────────┴───────────────────┤
│              Component Layer                     │
│  Navigation · FileUpload · ResultsDashboard     │
│  AlertsList · NotificationDialog                │
├─────────────────────────────────────────────────┤
│               Data Layer                         │
│  CSV Parsing · Mock ML Models · Emission Factors│
│  Turbine Results Data                           │
├─────────────────────────────────────────────────┤
│            Future: Supabase Backend              │
│       Auth · PostgreSQL · Edge Functions         │
└─────────────────────────────────────────────────┘
```

## Key Features

- **Wind Turbine Risk Assessment** — Dashboard with predicted days-to-failure, risk scores, and status badges for each turbine
- **Maintenance Alerts** — Automated high/medium priority alerts with probability scores and model attribution
- **CSV Data Upload** — Drag-and-drop CSV upload with validation, parsed through mock ML pipelines
- **CO2 Emissions Calculator** — Interactive sliders to configure energy mix (solar, wind, hydro, nuclear, biomass, gas, oil, coal) with real-time intensity scoring
- **Carbon Cost Estimation** — Annual emissions and carbon cost projections based on configurable pricing
- **Siemens Service Recommendations** — AI-suggested services (audits, ISO monitoring, demand response, battery storage) based on emission band
- **Lazy-Loaded Routes** — Code-split pages for optimized initial bundle size

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework with hooks and lazy loading |
| **TypeScript** | Type-safe development |
| **Vite** | Build tool with HMR and code splitting |
| **Tailwind CSS** | Utility-first styling with custom design tokens |
| **shadcn/ui** | Accessible component library (Card, Badge, Dialog, Slider, Table) |
| **React Router** | Client-side routing |
| **TanStack Query** | Async state management (prepared for API integration) |
| **Lucide React** | Icon library |

## Getting Started

### Prerequisites

- Node.js 18+ and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Clone the repository
git clone https://github.com/your-org/siemens-gamesa.git

# Navigate to the project directory
cd siemens-gamesa

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build

```sh
npm run build    # Production build
npm run preview  # Preview production build locally
```

## Project Structure

```
src/
├── assets/                 # Static assets (images)
├── components/
│   ├── ui/                 # shadcn/ui primitives (Badge, Card, Dialog, etc.)
│   ├── AlertsList.tsx      # Maintenance alert cards with severity badges
│   ├── FileUpload.tsx      # CSV drag-and-drop upload with validation
│   ├── Navigation.tsx      # Top navigation bar
│   ├── NotificationDialog.tsx  # Email alert dialog
│   └── ResultsDashboard.tsx    # Turbine risk assessment table + summary cards
├── data/
│   ├── turbineResults.ts   # Mock regression results and alert data
│   └── wind_turbine_maintenance_test_data.csv
├── hooks/
│   └── use-toast.ts        # Toast notification hook
├── pages/
│   ├── Home.tsx            # Landing page with feature cards
│   ├── Index.tsx           # Turbines dashboard (risk table + alerts)
│   ├── Emissions.tsx       # CO2 emissions calculator and recommendations
│   └── NotFound.tsx        # 404 page
├── App.tsx                 # Root component with lazy-loaded routes
└── main.tsx                # Entry point
```
