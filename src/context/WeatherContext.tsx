/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { fetchWeatherData, fetchPastWeatherData } from '@/services/api';
import { fetchGeoData } from '@/services/apigeo';

interface WeatherData {
  current: {
    dt: number;
    wind_speed: number;
    temp: number;
    feels_like: number;
    humidity: number;
    rain: { '1h': number };
    weather_overview: string;
    weather: { description: string; main: string }[];
  };

  hourly: {
    dt: number;
    temp: number;
    rain?: { '1h'?: number };
    snow?: { '1h'?: number };
    pop: number;
    weather: { description: string; main: string; icon: string }[];
  }[];
  daily: {
    dt: number;
    rain: number;
    summary: string;
    snow: number;
    wind_speed: number;
    pop: number;
    temp: { day: number; night: number; min: number; max: number };
    weather: { description: string; main: string; icon: string }[];
  }[];
}

interface PastWeatherData {
  date: string;
  temperature: {
    min: number;
    max: number;
    afternoon: number;
    night: number;
    evening: number;
    morning: number;
  };
  precipitation: {
    total: number;
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

interface LocationData {
  name: string;
  state: string;
  country: string;
}

interface WeatherContextProps {
  weatherData: WeatherData | null;
  pastWeatherData: PastWeatherData | null; // Yeni alan
  locationData: LocationData | null;
  setLocationData: React.Dispatch<React.SetStateAction<LocationData | null>>;
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>;
  setPastWeatherData: React.Dispatch<React.SetStateAction<PastWeatherData | null>>; // Yeni fonksiyon
  // fetchYesterdayWeather: (city: string) => Promise<void>;
  fetchWeather: (city: string) => Promise<void>;
  fetchPastWeather: (city: string, date: string) => Promise<void>; // Yeni fonksiyon
  loading: boolean;
  error: string | null;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [pastWeatherData, setPastWeatherData] = useState<PastWeatherData | null>(null);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    const date = new Date();
    date.setDate(date.getDate() - 1); // Correctly set the date to yesterday
    console.log('Yesterday:', date);

    const formattedDate = date.toISOString().split('T')[0];

    try {
      const { lat, lon, name, state, country } = await fetchGeoData(city);
      const data = await fetchWeatherData(lat, lon);
      const pastData = await fetchPastWeatherData(lat, lon, formattedDate);
      setWeatherData(data);
      setPastWeatherData(pastData);
      setLocationData({ name, state, country });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPastWeather = async (city: string, date: string) => {
    setLoading(true);
    setError(null);

    try {
      const { lat, lon } = await fetchGeoData(city);
      const data = await fetchPastWeatherData(lat, lon, date);

      // Map the API response to our PastWeatherData structure
      setPastWeatherData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        pastWeatherData,
        locationData,
        setLocationData,
        setWeatherData,
        setPastWeatherData,
        fetchWeather,
        fetchPastWeather,
        loading,
        error,
      }}
    >
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
