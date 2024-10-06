'use client';
import React from 'react';

import { useWeather } from '@/context/WeatherContext';
import Weather from '@/components/Weather/Weather';

const Today = () => {
  const { weatherData, loading, error } = useWeather();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>{weatherData && <Weather weatherData={weatherData} />}</div>;
};

export default Today;
