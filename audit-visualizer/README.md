# Audit Visualizer

This directory is a frontend web application built with React, TypeScript, D3.js and Vite. It visualizes web audit results produced by a Puppeteer-based automation script, providing interactive charts for performance, accessibility, SEO and infrastructure diagnostics.

## Project Structure

Here is a simple overview of how this particular project is structured:

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

## Charts Included

The Audit Visualizer displays five key datasets from your web audit:

- **Accessibility Violations:** This chart groups accessibility issues by impact level based on results from axe-core

- **Lighthouse Scores:** See how your site scores across core Lighthouse categories like performance, SEO, accessibility and best practices

- **Link Status Codes:** Quickly understand which links are working, broken or behaving unexpectedly

- **Third-Party Request Volume:** Visualize how many external requests are made to domains like Google Fonts, Photobucket or others

- **Performance Timing Metrics:** Shows DOM and network-related timestamps relative to connectStart, giving you a clear sense of your site’s load phases

Each dataset is rendered as a clean, interactive D3 chart making the raw data easy to explore and compare.

## Future Improvements

- Tooltip overlays and drill-down views

- Filtering and search for violations or link errors

- Tabbed or dashboard-style layout

- Export snapshots as PNG or PDF
