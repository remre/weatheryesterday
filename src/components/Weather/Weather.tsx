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
  summary?: string;
  temp?: number; // Current or daily temperature
  tempp?: { day?: number; night?: number; min?: number; max?: number };
  feelsLike?: number; // For current weather
  humidity?: number; // For current weather
  windSpeed?: number; // For current weather
  weather_overview?: string; // For current weather
  conditions?: {
    description: string;
    main: string;
  }[]; // Weather conditions
  rainAmount?: string;
  snowAmount?: string;
  pop?: number; // Probability of precipitation
  iconUrl?: string; // Weather icon URL
  type: 'Current' | 'Hourly' | 'Daily' | 'Yesterday';
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  time,
  temp,
  summary,
  tempp,
  feelsLike,
  humidity,
  windSpeed,
  weather_overview,
  conditions,
  rainAmount,
  snowAmount,
  pop,
  iconUrl,
  type,
}) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-md bg-white bg-opacity-90 transition-transform transform justify-center  flex ${
        type === 'Hourly' ? 'flex-row items-center space-x-2' : 'flex-col'
      } space-y-2`}
    >
      {/* <h1>{type} Weather</h1>
      <div className="flex flex-col"> */}
      {time && <p className="text-lg font-semibold text-gray-700  mr-2">{time}</p>}
      {/* {date && (
          <p className="text-lg font-semibold text-gray-700">
            <strong>Date:</strong> {date}
          </p>
        )} */}
      {/* </div> */}
      <hr className="my-4 border-gray-300" />
      <div className="flex flex-row items-center pt-2">
        {temp !== undefined && (
          <p className="text-3xl font-bold text-blue-600">{Math.round(temp)}°C</p>
        )}
        {iconUrl && (
          <Image src={iconUrl} alt="Weather Icon" width={40} height={40} className=" w-14 mx-4" />
        )}
        {tempp && (
          <div className="flex-col flex">
            <div className="flex flex-row">
              <p className="text-3xl font-bold text-yellow-400">
                <strong>Temperature:</strong> {Math.round(tempp.day)}°C /
              </p>
              <p className="text-xl font-bold text-blue-900  flex items-end">
                &nbsp;{Math.round(tempp.night)} °C
              </p>
            </div>

            {/* <p className="text-3xl font-bold text-blue-800">
            <strong>Night Temperature:</strong>°C
          </p> */}
          </div>
        )}
      </div>
      {tempp?.max && (
        <div className="flex flex-row">
          <p className="text-xl font-bold text-black  ">Min: &nbsp;{Math.round(tempp.min)} °C</p>
          <p className="text-xl font-bold text-black  ">
            &nbsp; Max: &nbsp;{Math.round(tempp.max)} °C
          </p>
        </div>
      )}

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
          <strong>Rain Probability:</strong> {pop * 100}%
        </p>
      )}
      {rainAmount && (
        <p className="text-lg text-gray-600">
          {' '}
          <strong>Rain: </strong>
          {rainAmount}
        </p>
      )}
      {snowAmount && (
        <p className="text-lg text-gray-600">
          <strong>Snow: </strong>
          {snowAmount}
        </p>
      )}
      {summary && (
        <p className="text-lg font-semibold text-gray-700">
          <strong>Summary:</strong> {summary}
        </p>
      )}
      {conditions && (
        <div className=" items-center  flex flex-row">
          <strong>Conditions:</strong>
          <span className="ml-2 min-w-20 ">{conditions[0].description}</span>
          {/* ({conditions[0].main}) */}

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
  const currentDate = new Date(weatherData.current.dt * 1000);
  const dayBeforeDate = new Date(currentDate);
  dayBeforeDate.setDate(currentDate.getDate() - 1);
  const readableDateToday = formatDate(currentDate.getTime() / 1000);
  const readableDateYesterday = formatDate(dayBeforeDate.getTime() / 1000);
  // const icon = getWeatherIcon(weatherData.current.weather[0].main);
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`;

  return (
    <div className="flex  justify-center flex-row space-x-3">
      {weatherData ? (
        <div className="flex flex-col ">
          <WeatherCard
            time={readableDateToday}
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
              <WeatherCard
                time={readableDateYesterday}
                type="Yesterday"
                tempp={{
                  max: pastWeatherData.temperature.max,
                  min: pastWeatherData.temperature.min,
                  day: pastWeatherData.temperature.afternoon,
                  night: pastWeatherData.temperature.night,
                }}
                pop={pastWeatherData.precipitation.total}
                windSpeed={pastWeatherData.wind.max.speed}
              />
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
