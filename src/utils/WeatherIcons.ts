import {
  faSun,
  // faCloudSun,
  faCloudRain,
  faSnowflake,
  faCloud,
  faWind,
  faSmog,
  // faMoon,
  // faCloudMoon,
  // faCloudMoonRain,
  faPooStorm,
  faCloudShowersHeavy,
  // faCloudSunRain,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export const getWeatherIcon = (condition: string): IconDefinition => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return faSun;
    case 'clouds':
      return faCloud;
    case 'rain':
      return faCloudRain;
    case 'snow':
      return faSnowflake;
    case 'thunderstorm':
      return faPooStorm;
    case 'drizzle':
      return faCloudShowersHeavy;
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'dust':
    case 'fog':
    case 'sand':
    case 'ash':
    case 'tornado':
      return faSmog;
    case 'wind':
      return faWind;
    default:
      return faSun;
  }
};
