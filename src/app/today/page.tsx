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
    <section className="flex flex-col items-center justify-start p-6 bg-opacity-20">
      {weatherData ? (
        <>
          <h1 className="flex text-2xl font-bold mb-4">Current Weather </h1>

          <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2 items-center sm:items-start justify-center">
            {weatherData && <Weather weatherData={weatherData} />}
            {weatherData && pastWeatherData && <WeatherComparison />}
          </div>
        </>
      ) : (
        <div>Use Search bar to look weather</div>
      )}
    </section>
  );
};

export default Today;
