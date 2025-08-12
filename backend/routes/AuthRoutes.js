import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/userSchema.js';

import { authMiddleware } from '../authMiddleware.js';


const router = express.Router();

// In AuthRoutes.js

router.get('/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, user: req.user });
});
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    
    // Find user
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Check if refresh token expired
    if (new Date() > new Date(user.refreshTokenExpires)) {
      return res.status(403).json({ message: "Refresh token expired" });
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: '15m' }
    );

    res.json({ token: newAccessToken });

  } catch (err) {
    console.error("Refresh error:", err);
    res.status(403).json({ message: "Invalid refresh token" });
  }
});
// Register new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Incoming data:", username, email, password);

    const hashedPassword = await bcrypt.hash(password, 10);
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    console.error("Register Error:", err); // 🔥 This will show the real issue
    res.status(500).json({ msg: "Server error" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(400).json({ message: "Email not found" });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Generate token with consistent payload
    const token = jwt.sign(
      {
        userId: user._id.toString(), // Ensure this matches authMiddleware
        email: user.email
      },
      process.env.SECRET_KEY,
      { expiresIn: '24h' } // Extended expiry for testing
    );

    console.log("Generated token for:", user.email); // Debug log
    res.json({ token, user: { id: user._id, email: user.email } });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;