'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
// import { useWeather } from '@/context/WeatherContext';
import { getWeatherIcon } from '@/utils/WeatherIcons';
interface WeatherData {
  dt: number;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;

  weather: { description: string; main: string }[];
}
interface WeatherDataProps {
  weatherData: {
    current: WeatherData;
  };
}
const convertUnixTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleDateString('en-US', options);
};
const Weather: React.FC<WeatherDataProps> = ({ weatherData }) => {
  const readableDate = convertUnixTimestamp(weatherData.current.dt);
  const icon = getWeatherIcon(weatherData.current.weather[0].main);

  return (
    <div className="flex min-h-screen w-full bg-red-600 justify-center flex-row space-x-3">
      {weatherData ? (
        <div className="flex flex-col">
          <h3>Current Weather</h3>
          <p>
            <strong>Time</strong> {readableDate}
          </p>
          <p>
            <strong>Temperature:</strong> {weatherData.current.temp}°C
          </p>
          <p>
            <strong>Feels Like:</strong> {weatherData.current.feels_like}°C
          </p>
          <p>
            <strong>Humidity:</strong> {weatherData.current.humidity}%
          </p>
          <p>
            <strong>Wind:</strong> {weatherData.current.wind_speed} m/s
          </p>

          <div className="flex w-full">
            <strong>Conditions:</strong> {weatherData.current.weather[0].description} (
            {weatherData.current.weather[0].main})
            <FontAwesomeIcon icon={icon} width={160} height={180} className="flex" />
          </div>
        </div>
      ) : (
        <p>Please enter a city to see the weather data.</p>
      )}
    </div>
  );
};

export default Weather;
