// pages/today/page.tsx

'use client';
import React from 'react';
import { useWeather } from '@/context/WeatherContext';
import Weather from '@/components/Weather/Weather';
import WeatherComparison from '@/components/WeatherComparision/WeatherComparision';

const Today = () => {
  const { weatherData, pastWeatherData, loading, error } = useWeather();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center justify-center bg-blue-100">
      {weatherData && <Weather weatherData={weatherData} pastWeatherData={pastWeatherData} />}
      {/* Use the updated WeatherComparison component */}
      {weatherData && pastWeatherData && <WeatherComparison />}
    </div>
  );
};

export default Today;
