# Selenium Audit

This directory contains scripts using Selenium WebDriver to interact with websites via the Python programming language.

## What This Script Does

- Launches a Chrome browser

- Visits the specified website

- Extracts and prints the main `<h1>` headline

- Closes the browser after a brief delay

## Setup Instructions

Below are the required steps for launching this application.

### 1. Create/Activate A Virtual Environment

First, open a terminal in this directory and run the following command to create a virtual environment:

```
python3 -m venv venv
```

Then activate the virtual environment with this command:

```
source venv/bin/activate
```

### 2. Install Dependencies

Install the required Python dependencies using this command:

```
pip install -r requirements.txt
```

### 3. Adjust And Run The Script

Edit the URL on line 7 of the Python script to point at the website you would like to visit. Once confirmed, run the program with this command in your terminal:

```
python3 audit.py
```
