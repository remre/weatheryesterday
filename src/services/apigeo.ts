export async function fetchGeoData(city: string) {
  const API_KEY = '782742040ffd775b09705d608647eb18'; // Replace with your actual API key
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`,
  );

  if (!response.ok) {
    let errorMessage = 'Failed to fetch geolocation data';

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (err) {
      // Fallback to generic message if parsing fails
    }

    throw new Error(errorMessage);
  }

  const data = await response.json();

  // We're assuming that the first result is the desired location
  if (data.length === 0) {
    throw new Error('City not found');
  }

  const { lat, lon, name, state, country } = data[0]; // Get the latitude and longitude of the city
  return { lat, lon, name, state, country };
}
