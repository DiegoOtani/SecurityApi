const UserService = require('../services/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

exports.register = async(req, res) => {
  try {
    const { password, ...userData } = req.body;

    const salt = await bcrypt.genSalt(10);
    const encriptPassword = await bcrypt.hash(password, salt);

    const user = await UserService.register({ ...userData, password: encriptPassword }); 

    if(user.error) return res.status(400).json({ error: user.error });

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email }, 
      JWT_SECRET,
      {expiresIn: '1h'},
    )
    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      } ,
      token: token,
      message: "User registered successfully"
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.login = async(req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserService.userExists(username);
    if(!user) return res.status(404).json({ error: "User not found" });

    const passwordValid = await bcrypt.compare(password, user.password);
    if(!passwordValid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email }, 
      JWT_SECRET,
      {expiresIn: '1h'},
    )
    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      } ,
      token: token,
      message: "Login successful"
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
}