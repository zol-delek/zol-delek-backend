const stations = require('../stations.json');

// מרחק בין שתי נקודות GPS בקילומטרים (Haversine)
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// מחירים לפי רשת (יתעדכנו מה-scraper בעתיד)
const pricesByBrand = {
  paz:   { gasoline_95: 6.89, diesel: 6.42 },
  sonol: { gasoline_95: 6.87, diesel: 6.40 },
  delek: { gasoline_95: 6.85, diesel: 6.38 },
  ten:   { gasoline_95: 6.80, diesel: 6.35 }
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { lat, lng, radius = 5 } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "missing lat/lng parameters" });
  }

  const userLat = parseFloat(lat);
  const userLng = parseFloat(lng);
  const maxRadius = parseFloat(radius);

  const nearby = stations
    .map(station => ({
      ...station,
      distance: getDistance(userLat, userLng, station.lat, station.lng),
      prices: pricesByBrand[station.brand] || null
    }))
    .filter(s => s.distance <= maxRadius)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 10)
    .map(s => ({
      ...s,
      distance: Math.round(s.distance * 10) / 10
    }));

  res.json({ stations: nearby, total: nearby.length });
};
