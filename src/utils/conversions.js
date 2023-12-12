export const convertKelvinToFahrenheit = (tempInKelvin) => {
  return Math.round(((tempInKelvin - 273.15) * 9) / 5 + 32) + "\u00B0";
};

export const convertHideIntegrationKeys = (keys) => {
  if (!keys || keys.length <= 5) return keys;
  return keys.substring(0, 5) + "*".repeat(keys.length - 5);
};
