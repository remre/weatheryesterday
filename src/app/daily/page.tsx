'use client';
import React from 'react';
import { useWeather } from '@/context/WeatherContext';
import DailyWeather from '@/components/DailyWeather/DailyWeather';

const Daily = () => {
  const { weatherData, loading, error } = useWeather();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>{weatherData && <DailyWeather hourlyData={weatherData.hourly} />}</div>;
};

export default Daily;
