// =========================
//  STATSTOX PROFILE LOGIC
// =========================

async function stxLoadProfile() {
  const nameEl = document.getElementById("profile-username");
  const balEl = document.getElementById("profile-balance");

  if (!nameEl || !balEl) return; // not on profile page

  try {
    const data = await stxFetch("/api/me");

    if (data.username) {
      nameEl.textContent = data.username;
    }
    if (typeof data.balance === "number") {
      balEl.textContent = "$" + data.balance.toFixed(2);
    }
  } catch (err) {
    console.error(err);
  }
}