// components/WeatherComparison/WeatherComparison.tsx

'use client';
import React, { useState } from 'react';
import { useWeather } from '@/context/WeatherContext';
import Image from 'next/image';

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
    return null;
  }

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

  const getOutfitRecommendations = (
    temperature: number,
    precipitation: number,
    windSpeed: number,
  ) => {
    const outfits = [];

    if (temperature < 10) {
      outfits.push('/images/coat.svg');
    } else if (temperature >= 10 && temperature < 20) {
      outfits.push('/images/jacket.svg');
    } else {
      outfits.push('/images/tshirt.svg');
    }

    if (precipitation > 0) {
      outfits.push('/images/raincoat.svg');
    }

    if (windSpeed > 15) {
      outfits.push('/images/windbreaker.svg');
    }

    return outfits;
  };

  const todayData = mapTodayWeatherData();
  const yesterdayData = mapYesterdayWeatherData();

  const temperatureDifference = Math.round(
    todayData.temperature.average - yesterdayData.temperature.average,
  );
  const windSpeedDifference = todayData.windSpeed - yesterdayData.windSpeed;

  const temperatureDescription = getTemperatureDescription(temperatureDifference);
  const windSpeedDescription = getWindSpeedDescription(windSpeedDifference);
  const precipitationDescription = getPrecipitationDescription(
    todayData.precipitation,
    yesterdayData.precipitation,
  );

  const outfitRecommendations = getOutfitRecommendations(
    todayData.temperature.average,
    todayData.precipitation,
    todayData.windSpeed,
  );
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});

  const handleImageLoad = (src: string) => {
    setLoadedImages((prev) => ({ ...prev, [src]: true }));
  };

  const handleImageError = (src: string) => {
    setLoadedImages((prev) => ({ ...prev, [src]: false }));
  };

  return (
    <div className="relative p-6 rounded-lg shadow-md bg-white mt-4 ">
      <div className="opacity-80 transition-opacity duration-300">
        <h2 className="text-xl font-bold mb-4">Weather Comparison</h2>
        <p className="text-lg">Temperature: Today is {temperatureDescription}.</p>

        <p className="text-lg">Wind Speed: {windSpeedDescription}.</p>
        <p className="text-lg">Precipitation: {precipitationDescription}</p>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Recommended Outfits:</h3>
          <div className="flex space-x-4 mt-2">
            {outfitRecommendations.map((src, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image src={src} alt="Outfit Recommendation" width={50} height={50} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherComparison;
