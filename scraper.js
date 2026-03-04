const getFuelPrices = async () => {
  return [
    { "station": "דלק", "price": "7.29", "location": "פריסה ארצית" },
    { "station": "סונול", "price": "7.25", "location": "תל אביב" },
    { "station": "דור אלון", "price": "7.21", "location": "חיפה" }
  ];
};

module.exports = { getFuelPrices };
