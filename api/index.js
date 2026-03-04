const express = require('express');
const app = express();
const { getFuelPrices } = require('../scraper');
app.get('/api/prices', async (req, res) => {
  try {
    const prices = await getFuelPrices();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: "failed" });
  }
});
module.exports = app;
