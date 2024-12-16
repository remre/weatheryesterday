export const getOutfitRecommendations = (
  temperature: number,
  precipitation: number,
  windSpeed: number,
) => {
  const outfits = [];

  if (temperature < 10) {
    outfits.push({ src: '/images/coat.svg', name: 'Coat' });
  } else if (temperature >= 10 && temperature < 20) {
    outfits.push({ src: '/images/jacket.svg', name: 'Jacket' });
  } else {
    outfits.push({ src: '/images/tshirt.svg', name: 'T-shirt' });
  }

  if (precipitation > 0) {
    outfits.push({ src: '/images/raincoat.svg', name: 'Raincoat' });
  }

  if (windSpeed > 15) {
    outfits.push({ src: '/images/windbreaker.svg', name: 'Windbreaker' });
  }

  return outfits;
};
