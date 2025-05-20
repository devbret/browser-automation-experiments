# Browser Automation Experiments

A growing collection of browser automation experiments using tools like [Puppeteer](https://pptr.dev/), [Lighthouse](https://github.com/GoogleChrome/lighthouse) and [Selenium](https://www.selenium.dev/). These scripts are designed to test, analyze and interact with websites automatically, thus helping improve performance, accessibility and reliability.

## Goals

- Explore automated testing and auditing for websites

- Learn how to programmatically simulate real-world user behavior

- Analyze performance and accessibility data

- Experiment with browser automation tools for personal and professional use

## Getting Started

1. Clone the repository:

```
git clone git@github.com:devbret/browser-automation-experiments.git
cd browser-automation-experiments
```

2. Choose a tool directory and follow the README.md inside that folder to install dependencies and run the script(s).

## Technologies Used

This repo combines a modern frontend stack with powerful headless browser tools to automate web audits and turn raw results into interactive visualizations. Below is a breakdown of the core technologies that make this workflow possible, from test execution to chart rendering.

### Automation And Auditing

- **Node.js:** Runtime for executing audit scripts and handling file operations

- **Puppeteer:** Controls a headless browser to simulate user interactions and run tests

- **Lighthouse:** Generates performance, SEO, accessibility, and best practices reports

- **axe-core:** Runs in-page accessibility audits from within the browser context

- **fs & path:** Core Node.js modules used to manage file I/O and directory resolution

### Visualization And Frontend

- **React:** UI framework used to build reusable component-based visualizations

- **TypeScript:** Provides strong typing across both frontend and audit data models

- **D3.js:** Renders data-driven SVG charts for metrics like performance and accessibility

- **Vite:** Development server and build tool for fast frontend compilation

- **Tailwind CSS:** Utility-first CSS styling approach used for layout and spacing

- **JSON:** Format for structured audit data shared between the Puppeteer runner and the visualizer

## Contributions

This is a personal learning and exploration project. Pull requests and suggestions are welcome, especially for new testing ideas, automation tools or best practices.
