import { formatTime } from '@/utils/formatdate';
import React from 'react';

interface HourlyData {
  dt: number;
  temp: number;
  weather: { description: string; main: string }[];
}

interface DailyWeatherProps {
  hourlyData: HourlyData[];
}

const DailyWeather: React.FC<DailyWeatherProps> = ({ hourlyData }) => {
  return (
    <div className="text-center">
      <h3>Hourly Forecast (Next 9 Hours)</h3>
      <ul>
        {hourlyData.slice(0, 9).map((hour, index) => {
          const time = formatTime(hour.dt);
          return (
            <li key={index}>
              <p>
                <strong>Time:</strong> {time}
              </p>
              <p>
                <strong>Temperature:</strong> {hour.temp}°C
              </p>
              <p>
                <strong>Conditions:</strong> {hour.weather[0].description} ({hour.weather[0].main})
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DailyWeather;
