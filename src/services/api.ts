export async function fetchWeatherData() {
  const API_KEY = '782742040ffd775b09705d608647eb18';
  const lat = 33.44;
  const lon = -94.04;

  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );

  if (!response.ok) {
    let errorMessage = 'Failed to fetch data';

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
