const express = require("express");
const jwt = require("jsonwebtoken");
const { authorizeToken } = require("../middlewares/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// Signin route (existing)
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(400).json({ message: "User does not exist!" });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({ message: "Incorrect password!" });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ user, accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Refresh token route (new)
router.post('/token/access', (req, res) => {
  const refreshTokenHeader = req.headers["refresh-token"];
  if (!refreshTokenHeader || typeof refreshTokenHeader !== "string") {
    return res.status(401).json({
      message: "No refresh tokens found",
    });
  }

  try {
    const oldRefreshToken = refreshTokenHeader.split(" ")[1];
    const { userId } = jwt.verify(
      oldRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const newRefreshToken = jwt.sign(
      { userId: userId },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const newAccessToken = jwt.sign(
      { userId: userId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(401).json({
      message: "Refresh token cannot be verified! Please check it again.",
    });
  }
});


router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = new User({ name, email, password });
      await user.save();
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});
  
// Example of a protected route (existing)
router.get('/protected', authorizeToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Protected route accessed!", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
