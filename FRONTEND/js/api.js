// =============================================
//  STATSTOX API HELPER
// =============================================

// Backend server URL
const API_BASE = "http://localhost:3000";

// Simple wrapper around fetch
async function stxFetch(path, options = {}) {
  const token = localStorage.getItem("stx_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  // Add auth header if logged in
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  // Make request
  const response = await fetch(API_BASE + path, {
    ...options,
    headers
  });

  // Handle non-OK errors
  if (!response.ok) {
    let msg = "Request failed.";

    try {
      const err = await response.json();
      msg = err.message || msg;
    } catch (e) {
      // ignore secondary JSON errors
    }

    throw new Error(msg);
  }

  // If no content (like 204), return null
  if (response.status === 204) {
    return null;
  }

  // Return parsed JSON
  return response.json();
}