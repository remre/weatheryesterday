'use client';
import React from 'react';
import DailyWeather from '@/components/DailyWeather/DailyWeather';

import { useWeather } from '@/context/WeatherContext';

const Daily = () => {
  const { weatherData, loading, error } = useWeather();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>{weatherData && <DailyWeather dailyData={weatherData.daily} />}</div>;
};

export default Daily;
