import { formatDate } from '@/utils/formatdate';
import React from 'react';
import { DailyWeatherCard } from '../WeatherCard/DailyWeatherCard';
import { DailyWeatherProps } from '@/types/types';

const DailyWeather: React.FC<DailyWeatherProps> = ({ dailyData }) => {
  return (
    <section className="flex  w-full justify-center flex-col items-center p-6">
      <h3 className="title-first mb-4">Daily Forecast for Next 7 Days</h3>
      <ul>
        {dailyData.slice(0, 7).map((day, index) => {
          const date = formatDate(day.dt);
          const rainAmount = day.rain ? `${day.rain} mm/h` : `No precipitation`;
          const snowAmount = day.snow ? `${day.snow} mm/h` : `No precipitation for snow`;
          const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
          return (
            <li key={index}>
              <div className="flex flex-col py-2">
                <DailyWeatherCard
                  time={date}
                  type="Daily"
                  tempp={{
                    day: day.temp.day,
                    night: day.temp.night,
                    min: day.temp.min,
                    max: day.temp.max,
                  }}
                  rainAmount={rainAmount}
                  pop={day.pop}
                  snowAmount={snowAmount}
                  conditions={day.weather}
                  summary={day.summary}
                  iconUrl={iconUrl}
                  windSpeed={day.wind_speed}
                />
                {/* <p>
                <strong>Date:</strong> {date}
              </p>
              <p>
                <strong>Temperature:</strong> {day.temp.day}°C (Day) / {day.temp.night}°C (Night)
              </p>
              <p>
                <strong>Conditions:</strong> {day.weather[0].description} ({day.weather[0].main})
              </p>
              <p>
                <strong>Precipitation:</strong> {rainAmount}
              </p> */}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default DailyWeather;
