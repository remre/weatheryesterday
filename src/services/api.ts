// services/api.ts

export async function fetchWeatherData(lat: number, lon: number) {
  const API_KEY = '782742040ffd775b09705d608647eb18'; // Replace with your actual API key

  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );

  if (!response.ok) {
    let errorMessage = 'Failed to fetch weather data';

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (err) {
      // Fallback to generic message if response parsing fails
    }

    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data;
}