'use client';
import React from 'react';
import WeeklyWeather from '@/components/WeeklyWeather/WeeklyWeather';

import { useWeather } from '@/context/WeatherContext';

const Weekly = () => {
  const { weatherData, loading, error } = useWeather();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>{weatherData && <WeeklyWeather dailyData={weatherData.daily} />}</div>;
};

export default Weekly;
