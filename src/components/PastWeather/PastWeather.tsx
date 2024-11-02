import React from 'react';
import { WeatherCard } from '../WeatherCard/WeatherCard';
import { PastWeatherData } from '@/types/types';

export const PastWeather: React.FC<{ weatherData: PastWeatherData }> = ({ weatherData }) => {
  const rainAmount = weatherData.precipitation.total
    ? `${weatherData.precipitation.total} mm/h`
    : `no rain`;
  return (
    <div>
      {weatherData ? (
        <div className="mt-4 flex w-full items-center justify-center">
          <WeatherCard
            time={weatherData.date}
            type="Yesterday"
            tempp={{
              max: weatherData.temperature.max,
              min: weatherData.temperature.min,
              day: weatherData.temperature.afternoon,
              night: weatherData.temperature.night,
            }}
            rainAmount={rainAmount}
            windSpeed={weatherData.wind.max.speed}
          />
        </div>
      ) : (
        <div>No past weather data available.</div>
      )}
    </div>
  );
};

export default PastWeather;
