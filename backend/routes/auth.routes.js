const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // ===== VALIDATION =====
    if (!username)
      return res.status(400).json({ error: "Username is required" });

    if (!email)
      return res.status(400).json({ error: "Email is required" });

    if (!password)
      return res.status(400).json({ error: "Password is required" });

    if (password.length < 7)
      return res.status(400).json({
        error: "Password must be at least 7 characters long",
      });

    // ===== CHECK EXISTING USER =====
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).json({ error: "Email already exists" });

    const usernameExists = await User.findOne({ username });
    if (usernameExists)
      return res.status(400).json({ error: "Username already exists" });

    // ===== CREATE USER =====
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed,
    });

    // ===== TOKEN =====
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
