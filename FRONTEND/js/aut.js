// =========================
//  STATSTOX AUTH LOGIC
// =========================

// Redirect user if not logged in on protected pages
function stxProtect() {
  const protectedPages = [
    "feed.html",
    "profile.html",
    "portfolio.html",
    "promos.html",
    "settings.html",
    "entries.html",
    "drafts.html"
  ];

  const current = window.location.pathname.split("/").pop();

  if (protectedPages.includes(current)) {
    const token = localStorage.getItem("stx_token");
    if (!token) {
      window.location.href = "login.html";
    }
  }
}

// LOGIN
async function stxLogin(email, password) {
  const data = await stxFetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });

  if (data && data.token) {
    localStorage.setItem("stx_token", data.token);
  }

  return data;
}

// SIGNUP
async function stxSignup(username, email, password) {
  const data = await stxFetch("/api/signup", {
    method: "POST",
    body: JSON.stringify({ username, email, password })
  });

  if (data && data.token) {
    localStorage.setItem("stx_token", data.token);
  }

  return data;
}

// LOGOUT
function stxLogout() {
  localStorage.removeItem("stx_token");
  window.location.href = "login.html";
}