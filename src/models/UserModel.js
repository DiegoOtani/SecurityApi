const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
}, {
  versionKey: false,
});

const UserModel = mongoose.model('User', UserSchema);

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