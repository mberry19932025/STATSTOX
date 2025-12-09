// utils/priceEngine.js

// Generate a live "stock-style" price for each player
function calculatePlayerPrice(projection, trend) {
    let base = projection * 1.25;   // base price formula
    let movement = trend === "RISE" ? 1.10 : 0.93; // artificial rise / fall multiplier
    let volatility = (Math.random() * 0.15) + 0.95; // 5%–15% random movement

    return Number((base * movement * volatility).toFixed(2));
}

module.exports = { calculatePlayerPrice };