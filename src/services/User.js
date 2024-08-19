const UserModel = require('../models/UserModel');

class User {
  static async userExists(username) {
    const user = await UserModel.findOne({ username: username});
    return user;
  }

  static async register(body) {
    const user = await this.userExists(body.username);
    if(user) return { error: "Username already registered." };   

    const userCreated = await UserModel.create(body);
    return userCreated;
  }
}

module.exports = User;