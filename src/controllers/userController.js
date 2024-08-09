const UserModel = require('../models/UserModel');

exports.register = async(req, res) => {
  try {
    const user = await UserModel.register(req.body); 
    if (user.error) {
      return res.status(400).json({ error: user.error });
    }
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
