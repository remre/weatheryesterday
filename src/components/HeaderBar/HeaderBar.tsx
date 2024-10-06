'use client';
import React, { useState } from 'react';
import { useWeather } from '@/context/WeatherContext';
import { useRouter } from 'next/navigation';
const HeaderBar = () => {
  const router = useRouter();
  const [city, setCity] = useState('');
  const { fetchWeather } = useWeather();

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
    router.push('/today');
  };

  return (
    <header className="bg-blue-500 p-4">
      <form onSubmit={handleSubmit} className="flex justify-center">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
          className="border p-2"
        />
        <button type="submit" className="bg-white text-blue-500 p-2 ml-2">
          Search
        </button>
      </form>
    </header>
  );
};

export default HeaderBar;
