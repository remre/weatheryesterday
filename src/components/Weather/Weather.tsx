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
import React from 'react';
import { useWeather } from '@/context/WeatherContext';

const Weather = () => {
  const { weatherData, loading, error } = useWeather();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex min-h-screen w-full bg-red-600 justify-center flex-row space-x-3">
      {weatherData ? (
        <>
          <div>
            <h3>Current Weather</h3>
            <p>
              <strong>Temperature:</strong> {weatherData.current.temp}°C
            </p>
            <p>
              <strong>Feels Like:</strong> {weatherData.current.feels_like}°C
            </p>
            <p>
              <strong>Humidity:</strong> {weatherData.current.humidity}%
            </p>
            <p>
              <strong>Conditions:</strong> {weatherData.current.weather[0].description} (
              {weatherData.current.weather[0].main})
            </p>
          </div>
          <div>
            <h3>Hourly Forecast (Next 5 Hours)</h3>
            <ul>
              {weatherData.hourly.slice(0, 5).map((hour, index) => {
                const time = new Date(hour.dt * 1000).toLocaleTimeString();
                return (
                  <li key={index}>
                    <p>
                      <strong>Time:</strong> {time}
                    </p>
                    <p>
                      <strong>Temperature:</strong> {hour.temp}°C
                    </p>
                    <p>
                      <strong>Conditions:</strong> {hour.weather[0].description} (
                      {hour.weather[0].main})
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3>Daily Forecast (Next 7 Days)</h3>
            <ul>
              {weatherData.daily.slice(0, 7).map((day, index) => {
                const date = new Date(day.dt * 1000).toLocaleDateString();
                return (
                  <li key={index}>
                    <p>
                      <strong>Date:</strong> {date}
                    </p>
                    <p>
                      <strong>Temperature:</strong> {day.temp.day}°C (Day) / {day.temp.night}°C
                      (Night)
                    </p>
                    <p>
                      <strong>Conditions:</strong> {day.weather[0].description} (
                      {day.weather[0].main})
                    </p>
                    {/* <p>
                      <strong>Summary:</strong> {day.summary}
                    </p> */}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <p>Please enter a city to see the weather data.</p>
      )}
    </div>
  );
};

export default Weather;
