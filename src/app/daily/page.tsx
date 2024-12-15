'use client';
import React from 'react';
import DailyWeather from '@/components/DailyWeather/DailyWeather';

import { useWeather } from '@/context/WeatherContext';

const Daily = () => {
  const { weatherData, loading, error } = useWeather();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="flex flex-col items-center justify-start p-6 bg-opacity-20">
      {weatherData ? (
        <>
          <div>
            <DailyWeather dailyData={weatherData.daily} />
          </div>
          ;
        </>
      ) : (
        <div>Use Search bar to look weather</div>
      )}
    </section>
  );
};

export default Daily;
