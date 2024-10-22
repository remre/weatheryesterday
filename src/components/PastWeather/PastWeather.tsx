import React from 'react';

interface WeatherData {
  date: string;
  temperature: {
    min: number;
    max: number;
    afternoon: number;
    night: number;
    evening: number;
    morning: number;
  };
  humidity: {
    afternoon: number;
  };
  wind: {
    max: {
      speed: number;
      direction: number;
    };
  };
  pressure: {
    afternoon: number;
  };
}

export const PastWeather: React.FC<{ weatherData: WeatherData }> = ({ weatherData }) => {
  return (
    <div>
      {weatherData ? (
        <div>
          <div>Date: {weatherData.date}</div>
          <div>Temperature (min): {weatherData.temperature.min} °C</div>
          <div>Temperature (max): {weatherData.temperature.max} °C</div>
          <div>Temperature (afternoon): {weatherData.temperature.afternoon} °C</div>
          <div>Humidity (afternoon): {weatherData.humidity.afternoon}%</div>
          <div>Wind Speed: {weatherData.wind.max.speed} m/s</div>
          <div>Wind Direction: {weatherData.wind.max.direction}°</div>
          <div>Pressure (afternoon): {weatherData.pressure.afternoon} hPa</div>
        </div>
      ) : (
        <div>No past weather data available.</div>
      )}
    </div>
  );
};

export default PastWeather;
