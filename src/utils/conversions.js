export const convertKelvinToFahrenheit = (tempInKelvin) => {
  return Math.round(((tempInKelvin - 273.15) * 9) / 5 + 32) + "\u00B0";
};
