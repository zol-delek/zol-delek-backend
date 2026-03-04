async function getFuelPrices() {
  return [
    { station: "דלק", price: "7.29", location: "פריסה ארצית" },
    { station: "סונול", price: "7.25", location: "תל אביב" }
  ];
}
module.exports = { getFuelPrices };
