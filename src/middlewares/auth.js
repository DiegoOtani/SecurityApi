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

const verifyUserId = (req, res, next) => {
  const paramsId = req.params.id;
  const userId = req.user.id;

  if(userId !== paramsId) return res.status(403).json({ error: "Access denied. You can only access or modify your own data." });
  next();
};

const securityAdminInfo = (req, res, next) => {
  if(req.body.isAdmin !== undefined) delete req.body.isAdmin;
  next();
};

const checkAdminModification = async (req, res, next) => {
  try {
    const paramsId = req.params.id;

    const userToModify = await UserModel.findById(paramsId);

    userToModify && userToModify.isAdmin 
      ? res.status(403).json({ error: "Access denied. You cannot modify admin users." })
      : next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { authMiddleware, adminMiddleware, verifyUserId, securityAdminInfo, checkAdminModification };