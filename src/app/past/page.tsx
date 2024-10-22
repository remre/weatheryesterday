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
      {pastWeatherData ? ( // pastWeatherData var mı kontrolü
        <PastWeather weatherData={pastWeatherData} /> // pastWeatherData'yı gönderiyoruz
      ) : (
        <p>No past weather data available.</p> // Eğer veri yoksa mesaj göster
      )}
    </div>
  );
};

export default Past;
