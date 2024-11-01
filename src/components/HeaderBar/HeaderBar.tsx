// src/components/HeaderBar/HeaderBar.tsx
'use client';

import React, { useState } from 'react';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useWeather } from '@/context/WeatherContext';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const HeaderBar = () => {
  const { locationData, fetchWeather, fetchPastWeather } = useWeather();
  const router = useRouter();
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Selected Date:', date);
    if (date) {
      await fetchPastWeather(city, date);
      router.push('/past');
    } else {
      await fetchWeather(city);
      router.push('/today');
    }
  };

  return (
    <header className="bg-blue-500 p-4 flex flex-row items-center justify-between">
      <div className="flex">
        <Link href="/">Weather Weather</Link>
      </div>
      <div className="flex flex-grow justify-center space-x-2 items-center">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city name"
            className="border p-2"
          />
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            placeholder="Enter date"
            className="border p-2"
          />
          <button type="submit" className="bg-white text-blue-500 p-2">
            Search
          </button>
        </form>
        {locationData ? (
          <div className="flex items-center">
            <FontAwesomeIcon icon={faLocationDot} size="lg" className="mx-2" />
            {locationData.name}, {locationData.country}
          </div>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
};

export default HeaderBar;
