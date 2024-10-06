'use client';
// import {
//   faSun,
//   faCloudSun,
//   faCloudRain,
//   faSnowflake,
//   faCloud,
//   faWind,
//   faPooStorm,
//   faCloudShowersHeavy,
//   faCloudSunRain,
// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// export default function Weather() {
//   return (
//     <div className="flex min-h-screen w-full bg-red-600 justify-center flex-row space-x-3">
//       <FontAwesomeIcon icon={faSun} width={60} height={80} />
//       <FontAwesomeIcon icon={faCloudSun} width={60} height={80} />
//       <FontAwesomeIcon icon={faCloudRain} width={60} height={80} />
//       <FontAwesomeIcon icon={faSnowflake} width={60} height={80} />
//       <FontAwesomeIcon icon={faWind} width={60} height={80} />
//       <FontAwesomeIcon icon={faCloud} width={60} height={80} />
//       <FontAwesomeIcon icon={faPooStorm} width={60} height={80} />

//       <FontAwesomeIcon icon={faCloudSunRain} width={60} height={80} />

//       <div className="">Weather asdasdasdadasdasdasdaPp</div>
//     </div>
//   );
// }

// components/WeatherFetcher.js
import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '@/services/api';
export default function WeatherFetcher() {
  const [weatherData, setWeatherData] = useState(null); // Holds the fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const data = await fetchWeatherData(); // Call the service to fetch data
        setWeatherData(data); // Set the fetched data
        setError(null); // Clear any previous error
      } catch (err) {
        setError(err.message); // Set the error message
      } finally {
        setLoading(false); // End loading state
      }
    };

    getWeatherData(); // Fetch data when component mounts
  }, []);

  // Handling loading, error, and success states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Extract relevant data from the API response
  const { current, hourly, daily } = weatherData;
  const currentWeather = current.weather[0];

  return (
    <div>
      <h1>Weather Data for Latitude 33.44, Longitude -94.04</h1>

      {/* Current Weather Section */}
      <div>
        <h2>Current Weather</h2>
        <p>
          <strong>Temperature:</strong> {current.temp}°C
        </p>
        <p>
          <strong>Feels Like:</strong> {current.feels_like}°C
        </p>
        <p>
          <strong>Humidity:</strong> {current.humidity}%
        </p>
        <p>
          <strong>Conditions:</strong> {currentWeather.description} ({currentWeather.main})
        </p>
      </div>

      {/* Hourly Forecast Section */}
      <div>
        <h2>Hourly Forecast (Next 5 Hours)</h2>
        <ul>
          {hourly.slice(0, 5).map((hour: any, index: number) => {
            const hourWeather = hour.weather[0];
            const time = new Date(hour.dt * 1000).toLocaleTimeString(); // Convert Unix timestamp to human-readable time
            return (
              <li key={index}>
                <p>
                  <strong>Time:</strong> {time}
                </p>
                <p>
                  <strong>Temperature:</strong> {hour.temp}°C
                </p>
                <p>
                  <strong>Conditions:</strong> {hourWeather.description} ({hourWeather.main})
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Daily Forecast Section */}
      <div>
        <h2>Daily Forecast (Next 7 Days)</h2>
        <ul>
          {daily.slice(0, 7).map((day, index) => {
            const dayWeather = day.weather[0];
            const date = new Date(day.dt * 1000).toLocaleDateString(); // Convert Unix timestamp to human-readable date
            return (
              <li key={index}>
                <p>
                  <strong>Date:</strong> {date}
                </p>
                <p>
                  <strong>Temperature:</strong> {day.temp.day}°C (Day) / {day.temp.night}°C (Night)
                </p>
                <p>
                  <strong>Conditions:</strong> {dayWeather.description} ({dayWeather.main})
                </p>
                <p>
                  <strong>Summary:</strong> {day.summary}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
