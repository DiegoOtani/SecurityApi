const UserModel = require('../models/UserModel');

class User {
  static async checkIfAdminExists() {
    const admin = await UserModel.findOne({ isAdmin: true });
    return admin !== null; 
  }

  static async userExists(username) {
    const user = await UserModel.findOne({ username: username});
    return user;
  };

  static async register(body) {
    const user = await this.userExists(body.username);
    if(user) return { error: "Username already registered." };   

    const userCreated = await UserModel.create(body);
    return userCreated;
  };

  static async createAdmin(body) {
    const user = await this.userExists(body.username);
    if(user) return { error: 'Username already registered' };

    const adminCreated = await UserModel.create({ ...body, isAdmin: true });
    return adminCreated;
  };
}

module.exports = User;