'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { getWeatherIcon } from '@/utils/WeatherIcons';
import { formatDate } from '@/utils/formatdate';

interface WeatherData {
  dt: number;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;

  weather: { description: string; main: string }[];
}
interface PastWeatherData {
  date: string;
  temperature: {
    min: number;
    max: number;
    afternoon: number;
    night: number;
    evening: number;
    morning: number;
  };
  humidity: {
    afternoon: number;
  };
  wind: {
    max: {
      speed: number;
      direction: number;
    };
  };
  pressure: {
    afternoon: number;
  };
}

interface WeatherDataProps {
  weatherData: {
    current: WeatherData;
  };
  pastWeatherData?: PastWeatherData; // Geçmiş hava durumu verileri için yeni alan
}

const Weather: React.FC<WeatherDataProps> = ({ weatherData, pastWeatherData }) => {
  const readableDate = formatDate(weatherData.current.dt);
  const icon = getWeatherIcon(weatherData.current.weather[0].main);

  return (
    <div className="flex min-h-screen w-full bg-red-600 justify-center flex-row space-x-3">
      {weatherData ? (
        <div className="flex flex-col">
          <h3>Current Weather</h3>
          <p>
            <strong>Time:</strong> {readableDate}
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

          {/* Geçmiş hava durumu verileri burada gösterilecek */}
          {pastWeatherData && (
            <div className="mt-4">
              <h1>Yesterday`s Weather</h1>
              <p>
                <strong>Temperature ,max:</strong> {pastWeatherData.temperature.max}°C
              </p>
              <p>
                <strong>Temperature: min</strong> {pastWeatherData.temperature.min}°C
              </p>
              <p>
                <strong>Feels Like:</strong> {pastWeatherData.date}°C
              </p>
              <p>
                <strong>Humidity:</strong> {pastWeatherData.wind.max.speed}%
              </p>
              <p>
                <strong>Wind:</strong> {pastWeatherData.pressure.afternoon} m/s
              </p>
            </div>
          )}
        </div>
      ) : (
        <p>Please enter a city to see the weather data.</p>
      )}
    </div>
  );
};

export default Weather;
