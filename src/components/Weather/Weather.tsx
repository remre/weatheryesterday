'use client';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
// import { getWeatherIcon } from '@/utils/WeatherIcons';
import { formatDate } from '@/utils/formatdate';
import { WeatherCard } from '../WeatherCard/WeatherCard';
import { WeatherDataProps } from '@/types/types';

const Weather: React.FC<WeatherDataProps> = ({ weatherData }) => {
  const currentDate = new Date(weatherData.current.dt * 1000);
  const dayBeforeDate = new Date(currentDate);
  dayBeforeDate.setDate(currentDate.getDate() - 1);
  const readableDateToday = formatDate(currentDate.getTime() / 1000);
  // const readableDateYesterday = formatDate(dayBeforeDate.getTime() / 1000);
  // const icon = getWeatherIcon(weatherData.current.weather[0].main);
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`;
  const rainAmount =
    weatherData.current.rain && weatherData.current.rain['1h']
      ? `${weatherData.current.rain['1h']} mm/h`
      : ``;
  console.log(
    'rainamont ',
    weatherData.current.rain ? weatherData.current.rain['1h'] : 'No rain data',
  );
  return (
    <section className="flex  justify-center flex-row space-x-3 ">
      {weatherData ? (
        <div className="flex flex-col ">
          <WeatherCard
            time={readableDateToday}
            type="Current"
            rainAmount={rainAmount}
            temp={weatherData.current.temp}
            feelsLike={weatherData.current.feels_like}
            humidity={weatherData.current.humidity}
            windSpeed={weatherData.current.wind_speed}
            conditions={weatherData.current.weather}
            iconUrl={iconUrl} // URL for the current weather icon
          />

          {/* Geçmiş hava durumu verileri burada gösterilecek */}
          {/* {pastWeatherData && (
            <div className="mt-4">
              <WeatherCard
                time={readableDateYesterday}
                type="Yesterday"
                tempp={{
                  max: pastWeatherData.temperature.max,
                  min: pastWeatherData.temperature.min,
                  day: pastWeatherData.temperature.afternoon,
                  night: pastWeatherData.temperature.night,
                }}
                pop={pastWeatherData.precipitation.total}
                windSpeed={pastWeatherData.wind.max.speed}
              />
            </div>
          )} */}
        </div>
      ) : (
        <p>Please enter a city to see the weather data.</p>
      )}
    </section>
  );
};

export default Weather;
