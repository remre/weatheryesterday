'use client';

import React, { useState } from 'react';
import { faLocationDot, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useWeather } from '@/context/WeatherContext';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const HeaderBar = () => {
  const { locationData, fetchWeather, fetchPastWeather, setLocationData } = useWeather();
  const router = useRouter();
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Selected Date:', date);
    if (!city) {
      setLocationData(null); // Clear location data if city input is empty
    }
    if (date) {
      await fetchPastWeather(city, date);
      router.push('/past');
    } else {
      await fetchWeather(city);
      router.push('/today');
    }
  };

  return (
    <header className="sm:mx-0 mx-2 bg-blue-800 p-4 flex flex-col md:flex-row items-center justify-between rounded-md space-y-4 md:space-y-0">
      <div className="flex text-white text-lg md:text-xl">
        <Link href="/">Weather Weather</Link>
      </div>
      <div className="flex flex-col md:flex-row flex-grow justify-center space-y-4 md:space-y-0 md:space-x-2 items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto"
        >
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city name"
            className="border p-2 rounded-md w-full md:w-auto"
          />
          <div className="relative flex items-center w-full md:w-auto space-x-2">
            <FontAwesomeIcon
              icon={faInfoCircle}
              size="lg"
              className="text-white ml-2 cursor-pointer"
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
            />
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              placeholder="Enter date"
              className="border p-2 rounded-md w-full md:w-auto"
            />

            {showInfo && (
              <div className="absolute top-full left-0 mt-2 w-64 p-2 bg-white text-blue-800 rounded-md shadow-lg z-10">
                Use this if you need to display weather for a specific date. It`s optional.
              </div>
            )}
          </div>
          <button type="submit" className="bg-white text-blue-500 p-2 rounded-md w-full md:w-auto">
            Search
          </button>
        </form>
        {locationData ? (
          <div className="flex items-center text-white">
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
