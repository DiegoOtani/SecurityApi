const express = require('express');
const { completeUser, loginUser, validate} = require('../middlewares/User');
const { register, login, createAdmin , updateUser, deleteUser, getAllUsers, getUserById} = require('../controllers/user');
const { authMiddleware, adminMiddleware, verifyUserId, securityAdminInfo, checkAdminModification } = require('../middlewares/auth')

const router = express.Router();

// Login routes
router.post('/register', completeUser(), validate, securityAdminInfo, register);
router.post('/login', loginUser(), validate, login);

// User profile routes
router.get('/myProfile/:id', authMiddleware, verifyUserId, getUserById);
router.put('/myProfile/:id', authMiddleware, verifyUserId, securityAdminInfo, updateUser);
router.delete('/myProfile/:id', authMiddleware, verifyUserId, deleteUser);

// Admin routes
router.get('/', authMiddleware, adminMiddleware, getAllUsers);
router.put('/:id', authMiddleware, adminMiddleware, checkAdminModification, updateUser);
router.delete('/:id', authMiddleware, adminMiddleware, checkAdminModification, deleteUser);

// Create admin route
router.post('/admin', authMiddleware, adminMiddleware, createAdmin);

module.exports = router;