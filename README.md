# Browser Automation Experiments

![Screenshot from the Web Audit Visualizer tool within this repo.](https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/4fbfb7dd-0433-4102-89c8-77716879b84d.png)

Automate website testing, analysis, auditing and interaction workflows to help improve performance, accessibility, usability and overall reliability.

## Overview

A collection of browser automation experiments for testing, auditing and interacting with websites programmatically. This repo brings together tools like Puppeteer, Lighthouse, Selenium and axe-core to simulate real user behavior, evaluate site performance and inspect accessibility issues. The project is designed as both a learning environment and a reusable toolkit for understanding how automated browser scripts can improve the reliability, quality and maintainability of modern websites.

This collection of tools also explores how raw automation data can be transformed into useful visual insights. Using a frontend stack including React, TypeScript, D3.js, Vite and Tailwind CSS, the project supports interactive visualization of performance, accessibility and SEO metrics. Overall, this repository serves as a hands-on sandbox for experimenting with browser automation, web auditing and data-driven reporting for both personal growth and professional development.

## Technologies Used

This repo combines a modern frontend stack with powerful headless browser tools to automate web audits and turn raw results into interactive visualizations. Below is a breakdown of the core technologies making this workflow possible, from test execution to chart rendering.

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

## Initial Set Up

1. Clone the repository: `git clone git@github.com:devbret/browser-automation-experiments.git`

2. Open or enter the newly created directory: `cd browser-automation-experiments`

3. Choose a tool directory and follow the `README.md` inside each folder to install dependencies and run the script(s)

## Other Considerations

This project repo is intended to demonstrate an ability to do the following:

- Automate website testing and auditing workflows using tools like Puppeteer, Lighthouse, Selenium and axe-core

- Simulate real-world browser interactions to evaluate website performance, accessibility, SEO and reliability

- Transform raw browser automation and audit data into interactive visualizations using React, TypeScript, D3.js and Vite

If you have any questions or would like to collaborate, please reach out either on GitHub or via [my website](https://bretbernhoft.com/).
