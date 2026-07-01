# Audit Visualizer

This directory is a frontend web application built with React, TypeScript, D3.js, Tailwind CSS and Vite. It turns the JSON produced by the Puppeteer audit into a bold, interactive dashboard - a hero health score, KPI cards, animated gauges, charts and sortable/filterable tables covering performance, accessibility, SEO, coverage and infrastructure diagnostics.

## Project Structure

Here is a simple overview of how this particular project is structured:

```
audit-visualizer/
├── public/
│   └── data/               # JSON copied from the Puppeteer audit
├── src/
│   ├── components/
│   │   ├── charts/         # Reusable D3 charts (Gauge, Bar, HBar, Donut)
│   │   ├── panels/         # One panel per metric (Lighthouse, Coverage, …)
│   │   └── ui/             # Card, StatCard, DataTable, Badge, tooltip
│   ├── hooks/              # useJson (fetch + error state), useChartTooltip
│   ├── lib/                # theme (colors), formatters, coverage math
│   ├── types/audit.ts      # Types for every audit JSON file
│   ├── App.tsx
│   └── main.tsx
```

## How To Use

### 1. Run Audits With Puppeteer

From the `puppeteer/` directory:

```
node audit.mjs
```

This will:

- Run accessibility, link, performance and Lighthouse audits

- Generate `.json` output in `puppeteer/audit-results/`

- Automatically copy results to `audit-visualizer/public/data/`

### 2. Start The Visualizer

From the `audit-visualizer/` directory, run the following command in your terminal to install the needed packages:

```
npm install
```

Run this command to start the application:

```
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Build For Production

If you are interested in building the application for production use, run the following command:

```
npm run build
```

The app will be compiled to the `dist/` directory.

## Requirements

The following software programs are required for this application to work correctly:

- Node.js

- Vite

- JSON audit files located at: `public/data/*.json`

## Dashboard Panels

The dashboard surfaces every dataset the audit produces:

- **Health Header:** Audited URL, timestamp and an overall health score averaged across the Lighthouse categories

- **Summary KPIs:** First Contentful Paint, First Paint, total transfer size and request count

- **Lighthouse Scores:** Animated gauges for performance, accessibility, best practices and SEO

- **Performance Timeline:** Navigation timing milestones relative to `navigationStart`

- **Accessibility Violations:** axe-core findings grouped by impact, with a sortable/filterable rule table

- **Code Coverage:** Unused JavaScript & CSS gauges plus a per-file breakdown

- **Link Status Codes:** Status-bucket donut with a filterable table of every scanned link

- **Third-Party Requests:** External domains ranked by request count

- **Console Output:** Message counts by type with a searchable log table

- **SEO Metadata:** Title, description, canonical and robots, flagging anything missing

- **JavaScript Errors:** Uncaught runtime errors captured during load

- **Cookies & Storage:** Cookie flags plus localStorage / sessionStorage counts

Charts animate on load and reveal details on hover; tables support sorting and text filtering. Panels that receive no data (e.g. no console errors) show a friendly empty state.

## Future Improvements

- Historical trend view across multiple audit runs

- Export the dashboard as PNG or PDF

- Compare two audits side by side
