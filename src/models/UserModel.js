const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
})

const UserModel = mongoose.model('User', UserSchema);

class User {
  static async userExists(username) {
    const user = await UserModel.findOne({ username: username});
    return user ? { error: "Username already registered." } : null;
  }

  static async register(body) {
    const userExists = await this.userExists(body.username);
    if(userExists) return { error: userExists.error };   

    const user = await UserModel.create(body);
    return user;
  }

}

module.exports = User;