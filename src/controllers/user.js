const UserService = require('../services/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const JWT_SECRET = process.env.JWT_SECRET

module.exports.register = async(req, res) => {
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
  };
};

module.exports.login = async(req, res) => {
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
  };
};

module.exports.getAllUsers = async(req, res) => {
  try {
    const users = await UserService.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getUserById = async(req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID format' });

    const user = await UserService.getById(id);
    return user.error
      ? res.status(400).json({ error: user.error })
      : res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.updateUser = async(req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;
    const user = await UserService.edit(id, data);
    user.error
      ? res.status(400).json({ error: user.error })
      : res.status(200).json({ user, message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.deleteUser = async(req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.deleteUser(id);
    return user.error
      ? res.status(400).json({ error: user.error })
      : res.status(200).json({ user, message: 'User deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error ${error}` });
  }
};

module.exports.createAdmin = async(req, res) => {
  try {
    const { username, password, ...userData } = req.body;
    
    const salt = await bcrypt.genSalt(10);
    const encriptPassword = await bcrypt.hash(password, salt);

    const admin = await UserService.createAdmin({ ...userData, username, password: encriptPassword });

    return admin.error
      ? res.status(400).json({ error: admin.error })
      : res.status(200).json({
        user:{ id: admin._id, username: admin.username, email: admin.email },
        message: 'Admin created successfully!'
      });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  };
};

exports.initializeDefaultAdmin = async () => {
  try {
    const adminExists = await UserService.checkIfAdminExists();

    if (!adminExists) {
      // Dados do administrador padrão
      const defaultAdminData = {
        name: 'Admin',
        username: 'admin',
        email: 'admin@example.com',
        phone: '1234567890',
        isAdmin: true, 
        password: 'admin123',
      };

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(defaultAdminData.password, salt);

      // Registra o administrador padrão
      const admin = await UserService.register({ ...defaultAdminData, password: hashedPassword });
      console.log("Default admin registered successfully!", admin);
    } else {
      console.log("Default admin already registered.");
    }
  } catch (error) {
    console.error("Error register admin default:", error);
  }
};