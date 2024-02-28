export const convertKelvinToFahrenheit = (tempInKelvin) => {
  return Math.round(((tempInKelvin - 273.15) * 9) / 5 + 32) + "\u00B0";
};

export const convertHideIntegrationKeys = (keys) => {
  if (!keys || keys.length <= 5) return keys;
  return keys.substring(0, 5) + "*".repeat(keys.length - 5);
};

export const convertDate = (timeStamp) => {
  const date = new Date(timeStamp);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const convertTicketText = (text) => {
  let cleanedText = text.replace(/(Technician|Client):\s+\((\w{24})\):\s+/, "");
  return cleanedText;
};
