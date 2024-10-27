import { formatTime } from '@/utils/formatdate';
import React from 'react';
import { WeatherCard } from '../Weather/Weather';

interface HourlyData {
  dt: number;
  temp: number;
  rain: number;
  pop: number;
  weather: { description: string; main: string }[];
}

interface DailyWeatherProps {
  hourlyData: HourlyData[];
}

const DailyWeather: React.FC<DailyWeatherProps> = ({ hourlyData }) => {
  return (
    <div className="flex min-h-screen w-full bg-green-600 justify-center flex-row space-x-3">
      {/* <h3>Hourly   Forecast (Next 9 Hours)</h3> */}
      <ul>
        {hourlyData.slice(0, 9).map((hour, index) => {
          const time = formatTime(hour.dt);
          const rainAmount = hour.rain ? `${hour.rain} mm/h` : `No precipitation`;
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
                  type="Daily"
                  temp={hour.temp}
                  pop={hour.pop}
                  rainAmount={rainAmount}
                  conditions={hour.weather}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DailyWeather;
