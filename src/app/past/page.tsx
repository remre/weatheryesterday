'use client';
import React from 'react';
import { useWeather } from '@/context/WeatherContext';
import { PastWeather } from '@/components/PastWeather/PastWeather';

const Past = () => {
  const { pastWeatherData, loading, error } = useWeather();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {pastWeatherData ? (
        <PastWeather weatherData={pastWeatherData} />
      ) : (
        <p>No past weather data available.</p>
      )}
    </div>
  );
};

export default Past;
