export interface WeatherData {
  current: {
    dt: number;
    wind_speed: number;
    temp: number;
    feels_like: number;
    humidity: number;
    weather_overview: string;
    weather: { description: string; main: string }[];
  };
  hourly: { dt: number; temp: number; weather: { description: string; main: string }[] }[];
  daily: {
    dt: number;
    rain: number;
    snow: number;
    wind_speed: number;
    pop: number;
    temp: { day: number; night: number; min: number; max: number };
    weather: { description: string; main: string }[];
  }[];
}

export interface PastWeatherData {
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

export interface LocationData {
  name: string;
  state: string;
  country: string;
}
