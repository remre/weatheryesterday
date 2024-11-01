import React from 'react';
import { WeatherCard } from '../Weather/Weather';
interface WeatherData {
  date: string;
  temperature: {
    min: number;
    max: number;
    afternoon: number;
    night: number;
    evening: number;
    morning: number;
  };
  precipitation: { total: number };
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

export const PastWeather: React.FC<{ weatherData: WeatherData }> = ({ weatherData }) => {
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
