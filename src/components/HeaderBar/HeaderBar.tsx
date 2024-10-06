'use client';
import React, { useState } from 'react';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import { useWeather } from '@/context/WeatherContext';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const HeaderBar = () => {
  const { locationData } = useWeather();
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
    <header className="bg-blue-500 p-4 flex flex-row space-x-2 items-center justify-center">
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
      {locationData ? (
        <div>
          <div>
            <FontAwesomeIcon icon={faLocationDot} size="lg" className="mx-2" />
            {locationData.name}, {locationData.country}
          </div>
        </div>
      ) : (
        <h1>Weather App</h1>
      )}
    </header>
  );
};

export default HeaderBar;
