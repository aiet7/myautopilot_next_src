export const handleWnsData = async (symbols, locationNews, locationWeather) => {
  const stockPromises = symbols.map((symbol) => handleGetStock(symbol));

  const [initialStocks, initialNews, initialWeather] = await Promise.all([
    Promise.all(stockPromises),
    handleGetNews(locationNews),
    handleGetWeather(locationWeather),
  ]);

  return {
    initialStocks,
    initialNews,
    initialWeather,
  };
};

export const handleGetStock = async (symbol) => {
  const response = await fetch(
    `https://etech7-wf-etech7-wsn-service.azuremicroservices.io/stock?symbol=${symbol}`
  );
  return await response.json();
};

export const handleGetNews = async (locationNews) => {
  const response = await fetch(
    `https://etech7-wf-etech7-wsn-service.azuremicroservices.io/news?location=${locationNews}`
  );
  return await response.json();
};

export const handleGetWeather = async (locationWeather) => {
  const response = await fetch(
    `https://etech7-wf-etech7-wsn-service.azuremicroservices.io/weather/zip?zipCode=${locationWeather}`
  );
  return await response.json();
};
