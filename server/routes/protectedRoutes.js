const express = require("express");
const { authorizeToken } = require("../middlewares/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// Example of a protected route
router.get("/protected", authorizeToken, async (req, res) => {
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

