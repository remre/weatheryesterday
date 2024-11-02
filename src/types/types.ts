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

export interface CurrentWeatherData {
  dt: number;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  rain?: { '1h'?: number };
  weather: { description: string; main: string; icon?: string }[];
}
export interface WeatherDataProps {
  weatherData: {
    current: CurrentWeatherData;
  };
  // pastWeatherData?: PastWeatherData | null;
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

export interface HourlyData {
  dt: number;
  temp: number;
  rain?: { '1h'?: number };
  snow: number;
  pop: number;

  weather: { description: string; main: string; icon: string }[];
}

export interface DailyWeatherProps {
  hourlyData: HourlyData[];
}

export interface WeatherCardProps {
  time?: string; // For hourly weather
  date?: string; // For daily weather
  summary?: string;
  temp?: number; // Current or daily temperature
  tempp?: { day?: number; night?: number; min?: number; max?: number };
  feelsLike?: number; // For current weather
  humidity?: number; // For current weather
  windSpeed?: number; // For current weather
  weather_overview?: string; // For current weather
  conditions?: {
    description: string;
    main: string;
  }[]; // Weather conditions
  rainAmount?: string;
  snowAmount?: string;
  pop?: number; // Probability of precipitation
  iconUrl?: string; // Weather icon URL
  type: 'Current' | 'Hourly' | 'Daily' | 'Yesterday';
}

interface DailyData {
  dt: number;
  temp: { day: number; night: number; min: number; max: number };
  weather: { description: string; main: string; icon: string }[];
  snow: number;
  summary: string;
  rain: number;
  pop: number;
  wind_speed: number;
}

export interface WeeklyWeatherProps {
  dailyData: DailyData[];
}
