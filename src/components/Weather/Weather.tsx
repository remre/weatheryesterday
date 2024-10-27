'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { getWeatherIcon } from '@/utils/WeatherIcons';
import { formatDate } from '@/utils/formatdate';
import Image from 'next/image';

interface WeatherData {
  dt: number;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;

  weather: { description: string; main: string; icon?: string }[];
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
  precipitation: {
    total: number;
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

interface WeatherCardProps {
  time?: string; // For hourly weather
  date?: string; // For daily weather
  temp: number; // Current or daily temperature
  feelsLike?: number; // For current weather
  humidity?: number; // For current weather
  windSpeed?: number; // For current weather
  weather_overview?: string; // For current weather
  conditions: {
    description: string;
    main: string;
  }[]; // Weather conditions
  rainAmount?: string; // Rain amount for forecasts
  pop?: number; // Probability of precipitation
  iconUrl?: string; // Weather icon URL
  type: 'Current' | 'Hourly' | 'Daily';
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  time,
  date,
  temp,
  feelsLike,
  humidity,
  windSpeed,
  weather_overview,
  conditions,
  rainAmount,
  pop,
  iconUrl,
  type,
}) => {
  return (
    <div
      className={` p-6 rounded-lg shadow-md bg-white transition-transform transform  flex flex-col`}
    >
      <h1>{type} Weather</h1>
      <div className="flex flex-col mb-4">
        {time && (
          <p className="text-lg font-semibold text-gray-700">
            <strong>Time:</strong> {time}
          </p>
        )}
        {date && (
          <p className="text-lg font-semibold text-gray-700">
            <strong>Date:</strong> {date}
          </p>
        )}
      </div>
      <p className="text-3xl font-bold text-blue-600">
        <strong>Temperature:</strong> {Math.round(temp)}°C
      </p>
      {feelsLike !== undefined && (
        <p className="text-lg text-gray-600">
          <strong>Feels Like:</strong> {Math.round(feelsLike)}°C
        </p>
      )}
      {humidity !== undefined && (
        <p className="text-lg text-gray-600">
          <strong>Humidity:</strong> {humidity}%
        </p>
      )}
      {weather_overview !== undefined && (
        <p className="text-lg text-gray-600">
          <strong>Weather Overview:</strong> {weather_overview}
        </p>
      )}
      {windSpeed !== undefined && (
        <p className="text-lg text-gray-600">
          <strong>Wind:</strong> {windSpeed} km/h
        </p>
      )}
      {pop !== undefined && (
        <p className="text-lg text-gray-600">
          <strong>Rain Probability:</strong> {pop}%
        </p>
      )}
      {rainAmount && (
        <p className="text-lg text-gray-600">
          <strong>Precipitation:</strong> {rainAmount}
        </p>
      )}
      {conditions && (
        <div className=" items-center mt-4 ">
          <strong>Conditions:</strong>
          <span className="ml-2">
            {conditions[0].description} ({conditions[0].main})
          </span>
          {iconUrl && (
            <Image
              src={iconUrl}
              alt="Weather Icon"
              width={40}
              height={40}
              className="ml-2 w-full"
            />
          )}
          {/* <FontAwesomeIcon
            icon={getWeatherIcon(conditions[0].main)}
            width={70}
            height={70}
            className="ml-2"
          /> */}
        </div>
      )}
    </div>
  );
};

interface WeatherDataProps {
  weatherData: {
    current: WeatherData;
  };
  pastWeatherData?: PastWeatherData | null; // Geçmiş hava durumu verileri için yeni alan
}

const Weather: React.FC<WeatherDataProps> = ({ weatherData, pastWeatherData }) => {
  const readableDate = formatDate(weatherData.current.dt);
  // const icon = getWeatherIcon(weatherData.current.weather[0].main);
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`;

  return (
    <div className="flex min-h-screen w-full bg-red-600 justify-center flex-row space-x-3">
      {weatherData ? (
        <div className="flex flex-col py-2">
          <WeatherCard
            time={readableDate}
            type="Current"
            temp={weatherData.current.temp}
            feelsLike={weatherData.current.feels_like}
            humidity={weatherData.current.humidity}
            windSpeed={weatherData.current.wind_speed}
            conditions={weatherData.current.weather}
            iconUrl={iconUrl} // URL for the current weather icon
          />

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
                <strong>Temperature: morning</strong> {pastWeatherData.temperature.morning}°C
              </p>
              <p>
                <strong>Temperature: afternoon</strong> {pastWeatherData.temperature.afternoon}°C
              </p>
              <p>
                <strong>Temperature: evening</strong> {pastWeatherData.temperature.evening}°C
              </p>
              <p>
                <strong>Precipitation:</strong> {pastWeatherData.precipitation.total}%
              </p>
              <p>
                <strong>Wind:</strong> {pastWeatherData.wind.max.speed} m/s
              </p>
              <p>
                <strong>Pressure:</strong> {pastWeatherData.pressure.afternoon}
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
