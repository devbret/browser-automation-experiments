# Puppeteer Audit

This directory contains an automated audit script for testing a given website using Puppeteer, Lighthouse and additional tools. To accomplish this, the script `audit.mjs` performs an evaluation of the website's performance, accessibility and structure.

## What The Script Does

This script performs a series of automated tests to evaluate and analyze a website from several important angles:

- **DOM Inspection:** Loads a website and reads the main heading to confirm key content is present and visible.

- **Performance Timing:** Collects detailed data about how long it takes for the page to load, which can help identify speed bottlenecks.

- **Accessibility Check:** Scans the page for accessibility issues and violations of best practices, such as missing labels or poor color contrast.

- **Broken Link Checker:** Scans every link on the page and checks whether those links work, helping you find broken or outdated URLs.

- **PDF Generation:** Creates a PDF version of your homepage, useful for sharing or archiving how the site looks at a given moment.

- **Lighthouse Report:** Runs a full Lighthouse audit, providing scores and insights for performance, SEO, accessibility, and best practices.

## Requirements

Make sure you have Node.js v18+ installed, then install the dependencies:

```
npm install puppeteer lighthouse axe-core node-fetch
```

## How To Run The Audit

Run the following command from the puppeteer directory:

```
node audit.mjs
```

## Output Files

After running the script, five files are created to show the audit results:

- `performance-timing.json`: Contains detailed information about how long your page takes to load.

- `accessibility-report.json`: Lists any accessibility issues found on your website, based on standards like WCAG.

- `link-statuses.json`: Shows all the links on your site and whether each one works or returns an error.

- `portfolio.pdf`: A print-friendly PDF version of your homepage, saved in A4 format.

- `lighthouse-report.json`: The full results of the Lighthouse audit, including performance, accessibility, SEO and more.

## Planned Enhancements

- Historical report tracking

- D3.js visualizations of audit results
