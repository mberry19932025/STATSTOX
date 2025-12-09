// =========================
//  STATSTOX SETTINGS LOGIC
// =========================

function stxInitSettingsPage() {
  const logoutBtn = document.getElementById("logout-button");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", function () {
    stxLogout();
  });
}