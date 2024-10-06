import React from 'react';

interface DailyData {
  dt: number;
  temp: { day: number; night: number };
  weather: { description: string; main: string }[];
}

interface WeeklyWeatherProps {
  dailyData: DailyData[];
}

const WeeklyWeather: React.FC<WeeklyWeatherProps> = ({ dailyData }) => {
  return (
    <div className="text-center">
      <h3>Daily Forecast (Next 7 Days)</h3>
      <ul>
        {dailyData.slice(0, 7).map((day, index) => {
          const date = new Date(day.dt * 1000).toLocaleDateString();
          return (
            <li key={index}>
              <p>
                <strong>Date:</strong> {date}
              </p>
              <p>
                <strong>Temperature:</strong> {day.temp.day}°C (Day) / {day.temp.night}°C (Night)
              </p>
              <p>
                <strong>Conditions:</strong> {day.weather[0].description} ({day.weather[0].main})
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WeeklyWeather;