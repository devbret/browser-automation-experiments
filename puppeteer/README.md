# Puppeteer Audit

This project is a modular, automated audit suite for testing a given website using Puppeteer, Lighthouse, axe-core and custom logic. It collects performance, accessibility, SEO, structural and behavioral insights, saving results into a single output directory for easy inspection or historical analysis.

## What the Audit Does

The main script (`audit.mjs`) orchestrates a series of modular tests that each analyze a critical part of the page:

- **DOM Inspection:** Reads the main `<h1>` element to verify that the key headline is present.

- **Performance Timing:** Captures browser `window.performance.timing` data.

- **Accessibility Check:** Uses axe-core to audit the page for WCAG accessibility violations.

- **Broken Link Checker:** Fetches every `<a href>` to confirm link status and HTTP response codes.

- **PDF Generation:** Captures the homepage layout as a clean, print-ready A4 PDF.

- **Lighthouse Report:** Runs a full Lighthouse audit.

- **JavaScript Errors:** Logs any JavaScript runtime errors encountered during rendering.

- **Console Logs:** Collects messages output by the browser console.

- **Web Vitals:** Measures first paint and similar metrics via the Performance API.

- **Third-Party Requests:** Tracks how many requests are made to third-party services.

- **Cookies And Storage:** Extracts and saves localStorage, sessionStorage and cookie data.

- **SEO Metadata:** Captures basic SEO tags like title, description, canonical URL and robots directive.

- **JavaScript And CSS Coverage:** Detects unused code using Puppeteer’s coverage tools.

- **Payload Size Estimation:** Tracks total bytes received during page load.

Each test lives in its own file in the `modules/` directory and writes results to the `audit-results/` folder.

## Requirements

Ensure you have **Node.js v18+** installed, then run:

```
npm install
```

This will install:

- puppeteer

- lighthouse

- core

- node-fetch

## How To Run The Audit

You can run the full audit using either command:

```
npm run audit

# or

node index.js
```

## Cleaning Output

To delete all generated audit files (but keep your source code) use the following command:

```
npm run clean
```

## Output Files

Files will be saved in the audit-results/ folder. Examples include:

- audit-results/headline.txt

- audit-results/performance-timing.json

- audit-results/accessibility-report.json

- audit-results/link-statuses.json

- audit-results/lighthouse-report.json

- audit-results/lighthouse-scores.json

- audit-results/portfolio.pdf

- audit-results/js-errors.json

- audit-results/console-logs.json

- audit-results/web-vitals.json

- audit-results/cookies.json

- audit-results/local-storage.json

- audit-results/session-storage.json

- audit-results/js-coverage.json

- audit-results/css-coverage.json

- audit-results/third-party-requests.json

## Planned Enhancements

- Support for historical tracking and timestamped reports

- Integration with D3.js for interactive data visualizations

- CLI options for running partial audits

- Slack or email reporting for CI workflows
