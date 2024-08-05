const express = require('express');
const router = express.Router();
const { authorizeToken } = require('../middlewares/authMiddleware');
const { getUserProfile, updateUserProfile, deleteUserProfile } = require('../controllers/userController');

// Route to get user profile
router.get('/profile', authorizeToken, getUserProfile);

// Route to update user profile
router.put('/update', authorizeToken, updateUserProfile);

// Route to delete user profile
router.delete('/delete', authorizeToken, deleteUserProfile);

module.exports = router;
