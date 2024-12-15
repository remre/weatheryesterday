'use client';
import React from 'react';
import { useWeather } from '@/context/WeatherContext';
import HourlyWeather from '@/components/HourlyWeather/HourlyWeather';

const Hourly = () => {
  const { weatherData, loading, error } = useWeather();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="flex flex-col items-center justify-start p-6 bg-opacity-20">
      {weatherData ? (
        <>
          <div>
            <HourlyWeather hourlyData={weatherData.hourly} />
          </div>
          ;
        </>
      ) : (
        <div>Use Search bar to look weather</div>
      )}
    </section>
  );
};

export default Hourly;
