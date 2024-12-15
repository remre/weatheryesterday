import { formatTime } from '@/utils/formatdate';
import React from 'react';
import { HourlyWeatherCard } from '../WeatherCard/HourlyWeatherCard';
import { HourlyWeatherProps } from '@/types/types';

const HourlyWeather: React.FC<HourlyWeatherProps> = ({ hourlyData }) => {
  return (
    <section className="flex w-full justify-center flex-col items-center p-6">
      <h3 className="title-first mb-4">Hourly Forecast (Next 9 Hours)</h3>
      <ul className="">
        {hourlyData.slice(0, 9).map((hour, index) => {
          const time = formatTime(hour.dt);
          const iconUrl = `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`;
          const rainAmount = hour.rain ? `${hour.rain['1h']} mm/h` : `no rain`;
          const snowAmount = hour.snow ? `${hour.snow['1h']} mm/h` : `No precipitation for snow`;
          return (
            <li key={index}>
              <div className="flex flex-col py-2">
                <HourlyWeatherCard
                  time={time}
                  temp={hour.temp}
                  pop={hour.pop}
                  rainAmount={rainAmount}
                  snowAmount={snowAmount}
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

export default HourlyWeather;
