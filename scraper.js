async function getFuelPrices() {
  try {
    // כאן בהמשך נשים את הקוד שמושך מאתרים אמיתיים
    // כרגע זה מחזיר נתונים קבועים כדי לוודא שהאפליקציה עובדת
    return [
      { station: "דלק", price: "7.29", location: "פריסה ארצית" },
      { station: "סונול", price: "7.25", location: "תל אביב" },
      { station: "דור אלון", price: "7.21", location: "חיפה" }
    ];
  } catch (e) {
    console.error("Scraper Error:", e);
    return [];
  }
}

module.exports = { getFuelPrices };
