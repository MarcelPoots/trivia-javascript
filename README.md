# Trivia JavaScript

A small vanilla JavaScript trivia app that fetches random questions from the Open Trivia Database (OpenTDB) API and lets the user answer them.

## Features

- Fetches a random question from the API
- Displays answer options as radio buttons
- Lets the user check whether their selected answer is correct
- Includes a category selector to request questions from a specific category
- Fetches a new question at any time

## Project structure

- `index.html` – page structure and app shell
- `styles.css` – styling for the trivia UI
- `main.js` – API calls, question rendering, and answer validation logic

## How it works

The app loads a category list from the OpenTDB categories endpoint and populates a dropdown. When the page loads, it automatically fetches a question. The user selects one of the returned answers and clicks "Check results" to see whether their choice is correct.

## Run locally

Since this is a static frontend app, you can run it in a browser directly or serve it locally.

### Option 1: open directly

Open `index.html` in a browser.

### Option 2: local web server

From the project folder, run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Notes

- The app uses the public OpenTDB API, so internet access is required.
- The app is intentionally lightweight and uses plain HTML, CSS, and JavaScript without a framework or build tool.
