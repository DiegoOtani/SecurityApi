const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async(req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    const user = await UserModel.findById(decoded.id);
    if(!user) return res.status(401).json({ error: 'Invalid token' });

    req.user.isAdmin = user.isAdmin;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  };
};

const adminMiddleware = (req, res, next) => {
  if(!req.user.isAdmin) return res.status(403).json({ error: 'Access denied' });
  next();
};

module.exports = { authMiddleware, adminMiddleware };