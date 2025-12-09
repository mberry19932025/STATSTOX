const express = require("express");
const router = express.Router();

const { getMarketData } = require("../controllers/marketController");

router.get("/players", getMarketData);

module.exports = router;