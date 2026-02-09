# Weather Forecast App

A minimal three-day weather forecast app built with React and Vite. 

https://weatherforecast-v1.vercel.app/

## Setup

1. Clone the repository

   
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and add your OpenWeatherMap API key:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- React 18, Vite, Tailwind CSS
- React Router
- OpenWeatherMap API
- Playfair Display (Google Fonts)

## Routes

| Path        | Description              |
| ----------- | ------------------------ |
| `/`         | Home page                |
| `/about`    | About Us                 |
| `/location` | Set location             |
| `/forecast` | Three-day weather forecast |

## Environment Variables

| Variable              | Description                    |
| --------------------- | ------------------------------ |
| `VITE_WEATHER_API_KEY` | OpenWeatherMap API key        |
