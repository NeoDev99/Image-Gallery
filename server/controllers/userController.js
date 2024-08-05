const User = require('../models/User');

// Controller to get user profile
const getUserProfile = async (req, res) => {
  try {
      const userId = req.userId;
      const user = await User.findById(userId).select('-password'); // Exclude password
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
};

// Controller to update user profile
const updateUserProfile = async (req, res) => {
  try {
      const userId = req.userId;
      const { name, email } = req.body;

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      user.name = name || user.name;
      user.email = email || user.email;

      await user.save();

      res.json(user);
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
};

// Controller to delete user profile
const deleteUserProfile = async (req, res) => {
  try {
      const userId = req.userId;
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted' });
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile
};
