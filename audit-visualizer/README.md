# Audit Visualizer

This directory is a frontend web application built with React, TypeScript, D3.js and Vite. It visualizes web audit results produced by a Puppeteer-based automation script, providing interactive charts for performance, accessibility, SEO and infrastructure diagnostics.

## Project Structure

```
audit-visualizer/
├── public/
│   └── data/
├── src/
│   ├── components/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── app.css
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

From the `audit-visualizer/` directory:

```
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Build For Production

```
npm run build
```

The app will be compiled to the `dist/` directory.

## Requirements

- Node.js

- Vite

- JSON audit files located at: `public/data/*.json`

## Charts Included

The Audit Visualizer displays five key datasets from your web audit:

- **Accessibility Violations:** This chart groups accessibility issues by impact level based on results from axe-core.

- **Lighthouse Scores:** See how your site scores across core Lighthouse categories like performance, SEO, accessibility and best practices.

- **Link Status Codes:** Quickly understand which links are working (200), broken or behaving unexpectedly.

- **Third-Party Request Volume:** Visualize how many external requests are made to domains like Google Fonts, Photobucket or others.

- **Performance Timing Metrics:** This chart shows DOM and network-related timestamps relative to connectStart, giving you a clear sense of your site’s load phases.

Each dataset is rendered as a clean, interactive D3 chart that makes the raw data easy to explore and compare.

## Future Improvements

- Tooltip overlays and drill-down views

- Filtering and search for violations or link errors

- Tabbed or dashboard-style layout

- Export snapshots as PNG or PDF
