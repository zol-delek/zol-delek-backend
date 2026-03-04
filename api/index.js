const express = require('express');
const cors = require('cors');
const { getFuelPrices } = require('./scraper');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Zol Delek API is Live! 🚗💨'));

app.get('/api/prices', async (req, res) => {
  try {
    const prices = await getFuelPrices();
    res.json({ success: true, data: prices });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = app;
