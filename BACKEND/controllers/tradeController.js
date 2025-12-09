// BACKEND/controllers/tradeController.js

// temporary in-memory storage
let activeTrades = [];

// BUY trade
exports.buyTrade = (req, res) => {
  const { playerId, playerName, price } = req.body;

  if (!playerId || !playerName || !price) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields for BUY trade.",
    });
  }

  const trade = {
    id: activeTrades.length + 1,
    type: "BUY",
    playerId,
    playerName,
    price,
    timestamp: Date.now(),
  };

  activeTrades.push(trade);

  res.json({
    status: "success",
    message: "Buy trade executed",
    trade,
  });
};

// SELL trade
exports.sellTrade = (req, res) => {
  const { playerId, playerName, price } = req.body;

  if (!playerId || !playerName || !price) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields for SELL trade.",
    });
  }

  const trade = {
    id: activeTrades.length + 1,
    type: "SELL",
    playerId,
    playerName,
    price,
    timestamp: Date.now(),
  };

  activeTrades.push(trade);

  res.json({
    status: "success",
    message: "Sell trade executed",
    trade,
  });
};

// GET all trades
exports.getAllTrades = (req, res) => {
  res.json({
    status: "success",
    activeTrades,
  });
};