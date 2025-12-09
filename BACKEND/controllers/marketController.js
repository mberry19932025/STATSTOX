// controllers/marketController.js
const { calculatePlayerPrice } = require("../utils/priceEngine");

const fakePlayers = [
    {
        id: 1,
        name: "Nikola Jokic",
        team: "DEN",
        stat: "Rebounds",
        projection: 12,
        trend: "RISE"
    }
];

exports.getMarketData = (req, res) => {
    const playersWithPrices = fakePlayers.map(p => ({
        ...p,
        price: calculatePlayerPrice(p.projection, p.trend)
    }));

    res.json({
        status: "success",
        marketVersion: "v1.0",
        timestamp: Date.now(),
        data: playersWithPrices
    });
};