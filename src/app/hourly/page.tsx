'use client';
import React from 'react';
import { useWeather } from '@/context/WeatherContext';
import HourlyWeather from '@/components/HourlyWeather/HourlyWeather';

const Hourly = () => {
  const { weatherData, loading, error } = useWeather();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>{weatherData && <HourlyWeather hourlyData={weatherData.hourly} />}</div>;
};

export default Hourly;
