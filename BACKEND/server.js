// =========================================
//  STATSTOX BACKEND SERVER (FULL VERSION)
// =========================================

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// SECRET KEY for signing JWT tokens
const SECRET = "STATSTOX_SUPER_SECRET_KEY";

// Mock user database (temporary)
let users = [];

// Mock feed data
let marketFeed = [
  { player: "Steph Curry", price: 42.5, change: "+2.1%" },
  { player: "Luka Doncic", price: 51.2, change: "-1.4%" },
  { player: "Shai Gilgeous-Alexander", price: 44.3, change: "+3.1%" },
  { player: "Jayson Tatum", price: 40.1, change: "+0.5%" }
];

// ============================
//   HELPER: AUTH MIDDLEWARE
// ============================
function authRequired(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ message: "No token provided" });

  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Invalid token" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// ============================
//  POST /api/signup
// ============================
app.post("/api/signup", (req, res) => {
  const { username, email, password } = req.body;

  // Check if user exists
  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(400).json({ message: "Email already in use" });
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password,  // (later we hash this)
    balance: 500.00
  };

  users.push(newUser);

  // Create JWT token
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

// ============================
//  POST /api/login
// ============================
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

// ============================
//  GET /api/me (protected)
// ============================
app.get("/api/me", authRequired, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    username: user.username,
    balance: user.balance
  });
});

// ============================
//  GET /api/feed
// ============================
app.get("/api/feed", (req, res) => {
  res.json(marketFeed);
});

// ============================
//  START SERVER
// ============================
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});