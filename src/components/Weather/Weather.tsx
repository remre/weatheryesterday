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
'use client';
import React from 'react';
// import { useWeather } from '@/context/WeatherContext';

interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  weather: { description: string; main: string }[];
}
interface WeatherDataProps {
  weatherData: {
    current: WeatherData;
  };
}

const Weather: React.FC<WeatherDataProps> = ({ weatherData }) => {
  return (
    <div className="flex min-h-screen w-full bg-red-600 justify-center flex-row space-x-3">
      {weatherData ? (
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
      ) : (
        <p>Please enter a city to see the weather data.</p>
      )}
    </div>
  );
};

export default Weather;
