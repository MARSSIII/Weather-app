# Weather App

A modern web application for viewing current weather conditions, forecasts, and air quality information. The app supports location search, unit switching, theme toggling, and multilingual interface.

## Live Demo

Deployed version:
[https://gismeteo.netlify.app/](https://gismeteo.netlify.app/)

## Features

* Search weather by city name
* Current weather conditions
* Multi-day weather forecast
* Air Quality Index (AQI)
* User geolocation support
* Temperature units switching (Celsius / Fahrenheit)
* Light and dark themes
* Multilingual support (EN / RU)
* Search history
* Loading and error state handling

## Tech Stack

* React
* JavaScript (ES6+)
* Vite
* Context API
* Custom Hooks
* CSS Modules
* i18n (localization)
* Weather API (OpenWeather or similar)

## Project Structure

```
src/
├── components/        # UI components
│   ├── common/        # Loader, ErrorState, etc.
│   ├── layout/        # Header, Menu, AppShell
│   ├── search/        # Search input and suggestions
│   └── weather/       # Weather cards and forecast
├── context/           # Global state management
├── hooks/             # Custom React hooks
├── i18n/              # Localization files
├── styles/            # Component styles
├── App.jsx
└── main.jsx
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/weather-app.git
```

2. Navigate to the project directory:

```bash
cd weather-app
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

## Build for Production

```bash
npm run build
```

## Possible Improvements

* Favorite cities feature
* Hourly weather forecast
* UI animations and transitions
* Component testing
* Progressive Web App (PWA) support
