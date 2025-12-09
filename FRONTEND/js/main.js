console.log("STATSTOX Frontend Connected.");

document.addEventListener("DOMContentLoaded", function () {
  // Protect any pages that require login
  stxProtect();

  // ------------- LOGIN PAGE -------------
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;

      try {
        await stxLogin(email, password);
        alert("Welcome back to STATSTOX!");
        window.location.href = "feed.html";
      } catch (err) {
        alert(err.message);
      }
    });
  }

  // ------------- SIGNUP PAGE -------------
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const username = document.getElementById("signup-username").value.trim();
      const email = document.getElementById("signup-email").value.trim();
      const password = document.getElementById("signup-password").value;

      try {
        await stxSignup(username, email, password);
        alert("Account created!");
        window.location.href = "feed.html";
      } catch (err) {
        alert(err.message);
      }
    });
  }

  // ------------- PAGE-SPECIFIC LOADERS -------------
  const page = window.location.pathname.split("/").pop();

  if (page === "feed.html") {
    stxLoadFeed();
  }

  if (page === "profile.html") {
    stxLoadProfile();
  }

  if (page === "settings.html") {
    stxInitSettingsPage();
  }
});