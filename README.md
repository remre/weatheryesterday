# WeatherCombineApp

[WeatherCombineApp](https://weatheryesterday.vercel.app/) is a weather application that provides current weather information, outfit recommendations based on the weather, and a comparison of today's weather with yesterday's weather.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Contributing](#contributing)
- [Live Demo](#live-demo)

## Introduction

The WeatherCombineApp is written in TypeScript as a Next.js project to show weather information using the OpenWeather API. The unique feature of this app is that it allows users to see the current weather along with a comparison to yesterday's weather, helping users understand how the weather will be today compared to yesterday. Additionally, users can find outfit recommendations based on temperature, wind, and precipitation (rain or snow).

## Technologies Used

### Core Libraries

- **Next.js** - Provides server-side rendering and built-in optimization.
- **React** and **TypeScript** - Used for building reusable, maintainable components.
- **Tailwind CSS** - Ensures responsive and efficient styling.
- **FontAwesome** - For icons.
- **OpenWeather API** - For fetching weather data.

### Development Tools

- **ESLint** and **Prettier** - For code consistency and formatting.

## Features

### Weather Information

- **Current Weather**: Displays the current weather conditions based on the user's location.
- **Hourly and Daily Forecast**: Provides detailed hourly and daily weather forecasts.

### Weather Comparison

- **Comparison with Yesterday**: Compares today's weather with yesterday's weather, highlighting differences in temperature, wind speed, and precipitation.

### Outfit Recommendations

- **Outfit Suggestions**: Based on the current weather conditions, the app suggests appropriate outfits to wear.

### Optional Date Selection

- **Past Weather Display**: Allows users to select a date range to display past weather information.

### Color Indicators

- **Extreme Weather Conditions**: Uses color indicators for extreme conditions such as high/low temperatures, heavy rain, snow, and strong winds.

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/remre/weathercombineapp.git
```

2. Install dependencies:

```sh
  cd weathercombineapp
  npm install
```

3. Set up the environment variables. Create a .env file in the root directory and add your OpenWeather API key:

```env
NEXT_PUBLIC_API_KEY=your_openweather_api_key
```

## Running the Application

To start the application in development:

```bash
npm run dev
```

Open http://localhost:3000 in your browser to view the app.

To build the application in production:

```bash
npm run build
```

## Contributing

This project is open for contributions. Feel free to fork the repository and submit pull requests.
