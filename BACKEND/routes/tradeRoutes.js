const express = require("express");
const router = express.Router();

const { buyTrade, sellTrade, getAllTrades } =
    require("../controllers/tradeController");

router.post("/buy", buyTrade);
router.post("/sell", sellTrade);
router.get("/all", getAllTrades);

module.exports = router;