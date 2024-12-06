import { formatTime } from '@/utils/formatdate';
import React from 'react';
import { WeatherCard } from '../WeatherCard/WeatherCard';

import { DailyWeatherProps } from '@/types/types';

const DailyWeather: React.FC<DailyWeatherProps> = ({ hourlyData }) => {
  return (
    <section className="flex  w-full justify-center flex-col items-center p-6">
      <h3 className="text-2xl font-bold text-black mb-4">Hourly Forecast (Next 9 Hours)</h3>
      <ul className="">
        {hourlyData.slice(0, 9).map((hour, index) => {
          const time = formatTime(hour.dt);
          const iconUrl = `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`;
          const rainAmount = hour.rain ? `${hour.rain['1h']} mm/h` : `no rain`;
          const SnowAmount = hour.snow ? `${hour.snow} mm/h` : `No precipitation for snow`;
          return (
            <li key={index}>
              {/* <p>
                <strong>Time:</strong> {time}
              </p>
              <p>
                <strong>Temperature:</strong> {hour.temp}°C
              </p>
              <p>
                <strong>Rain :</strong> {hour.pop}
              </p>

              <p>
                <strong>{rainAmount}</strong>
              </p>

              <p>No precipitation</p>

              <p>
                <strong>Conditions:</strong> {hour.weather[0].description} ({hour.weather[0].main})
              </p> */}
              <div className="flex flex-col py-2">
                <WeatherCard
                  time={time}
                  type="Hourly"
                  temp={hour.temp}
                  pop={hour.pop}
                  rainAmount={rainAmount}
                  snowAmount={SnowAmount}
                  conditions={hour.weather}
                  iconUrl={iconUrl}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default DailyWeather;
