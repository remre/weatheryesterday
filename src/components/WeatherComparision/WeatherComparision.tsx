// components/WeatherComparison/WeatherComparison.tsx

'use client';
import React from 'react';
import { useWeather } from '@/context/WeatherContext';

interface ComparableWeatherData {
  date: Date;
  temperature: {
    min: number;
    max: number;
    average: number;
  };
  windSpeed: number;
  precipitation: number;
}

const WeatherComparison: React.FC = () => {
  const { weatherData, pastWeatherData } = useWeather();

  if (!weatherData || !pastWeatherData) {
    return null; // Do not render if data is unavailable
  }

  // Function to map today's weather data to ComparableWeatherData
  const mapTodayWeatherData = (): ComparableWeatherData => {
    const dailyData = weatherData.daily[0];
    const averageTemp = (dailyData.temp.max + dailyData.temp.min) / 2;

    return {
      date: new Date(dailyData.dt * 1000),
      temperature: {
        min: dailyData.temp.min,
        max: dailyData.temp.max,
        average: averageTemp,
      },
      windSpeed: dailyData.wind_speed,
      precipitation: dailyData.rain || 0,
    };
  };

  // Function to map yesterday's weather data to ComparableWeatherData
  const mapYesterdayWeatherData = (): ComparableWeatherData => {
    const averageTemp = (pastWeatherData.temperature.max + pastWeatherData.temperature.min) / 2;

    return {
      date: new Date(pastWeatherData.date),
      temperature: {
        min: pastWeatherData.temperature.min,
        max: pastWeatherData.temperature.max,
        average: averageTemp,
      },
      windSpeed: pastWeatherData.wind.max.speed,
      precipitation: pastWeatherData.precipitation.total,
    };
  };

  const getTemperatureDescription = (difference: number): string => {
    const absDifference = Math.abs(difference);

    if (absDifference < 1) {
      return 'about the same temperature as yesterday';
    } else if (absDifference < 3) {
      return difference > 0 ? 'a bit warmer than yesterday' : 'a bit cooler than yesterday';
    } else if (absDifference < 5) {
      return difference > 0 ? 'warmer than yesterday' : 'cooler than yesterday';
    } else if (absDifference < 8) {
      return difference > 0 ? 'much warmer than yesterday' : 'much cooler than yesterday';
    } else {
      return difference > 0
        ? 'significantly warmer than yesterday'
        : 'significantly cooler than yesterday';
    }
  };

  const getWindSpeedDescription = (difference: number): string => {
    const absDifference = Math.abs(difference);

    if (absDifference < 2) {
      return 'similar wind speed as yesterday';
    } else if (absDifference < 5) {
      return difference > 0 ? 'a bit windier than yesterday' : 'a bit calmer than yesterday';
    } else if (absDifference < 10) {
      return difference > 0 ? 'windier than yesterday' : 'calmer than yesterday';
    } else if (absDifference < 20) {
      return difference > 0 ? 'much windier than yesterday' : 'much calmer than yesterday';
    } else {
      return difference > 0
        ? 'significantly windier than yesterday'
        : 'significantly calmer than yesterday';
    }
  };

  const getPrecipitationDescription = (todayPrecip: number, yesterdayPrecip: number): string => {
    if (todayPrecip === 0 && yesterdayPrecip === 0) {
      return 'No precipitation expected today, same as yesterday.';
    } else if (todayPrecip === 0) {
      return 'No precipitation expected today, drier than yesterday.';
    } else if (yesterdayPrecip === 0) {
      return 'Precipitation expected today, wetter than yesterday.';
    } else {
      const difference = todayPrecip - yesterdayPrecip;
      const absDifference = Math.abs(difference);

      if (absDifference < 1) {
        return 'Similar precipitation as yesterday.';
      } else if (absDifference < 5) {
        return difference > 0
          ? 'Slightly more precipitation than yesterday.'
          : 'Slightly less precipitation than yesterday.';
      } else if (absDifference < 10) {
        return difference > 0
          ? 'More precipitation than yesterday.'
          : 'Less precipitation than yesterday.';
      } else {
        return difference > 0
          ? 'Significantly more precipitation than yesterday.'
          : 'Significantly less precipitation than yesterday.';
      }
    }
  };

  // Map the data and perform comparisons
  const todayData = mapTodayWeatherData();
  const yesterdayData = mapYesterdayWeatherData();

  const temperatureDifference = Math.round(
    todayData.temperature.average - yesterdayData.temperature.average,
  );
  const windSpeedDifference = todayData.windSpeed - yesterdayData.windSpeed;

  // Generate descriptive overviews
  const temperatureDescription = getTemperatureDescription(temperatureDifference);
  const windSpeedDescription = getWindSpeedDescription(windSpeedDifference);
  const precipitationDescription = getPrecipitationDescription(
    todayData.precipitation,
    yesterdayData.precipitation,
  );

  return (
    <div className="p-6 rounded-lg shadow-md bg-white mt-4">
      <h2 className="text-xl font-bold mb-4">Weather Comparison</h2>

      <p className="text-lg">Temperature: Today is {temperatureDescription}.</p>
      <p className="text-lg">Wind Speed: {windSpeedDescription}.</p>
      <p className="text-lg">Precipitation: {precipitationDescription}</p>
    </div>
  );
};

export default WeatherComparison;
