'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { fetchWeatherData } from '@/services/api';
import { fetchGeoData } from '@/services/apigeo';

interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    weather: { description: string; main: string }[];
  };
  hourly: { dt: number; temp: number; weather: { description: string; main: string }[] }[];
  daily: {
    dt: number;
    temp: { day: number; night: number };
    weather: { description: string; main: string }[];
  }[];
}

interface WeatherContextProps {
  weatherData: WeatherData | null;
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>;
  fetchWeather: (city: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const { lat, lon } = await fetchGeoData(city);
      const data = await fetchWeatherData(lat, lon);
      setWeatherData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData, fetchWeather, loading, error }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
