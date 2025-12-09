// STATSTOX PROMOS PAGE LOGIC

console.log("Promos page connected.");

document.addEventListener("DOMContentLoaded", function () {
    // If promos ever require authentication:
    if (typeof stxProtect === "function") {
        stxProtect();
    }

    // Future promo logic placeholder:
    const promoContainer = document.getElementById("promo-list");
    if (promoContainer) {
        promoContainer.innerHTML = `
            <p class="promo-message">🔥 No active promotions yet. More coming soon!</p>
        `;
    }
});