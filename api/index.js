const { getFuelPrices } = require('../scraper');

module.exports = async (req, res) => {
  try {
    const prices = await getFuelPrices();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: "failed" });
  }
};
