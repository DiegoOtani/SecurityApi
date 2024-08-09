const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  user: { type: String, required: true },
  password: { type: String, required: true },
})

const UserModel = mongoose.model('User', UserSchema);

class User {
  static async userExists(email) {
    const user = await UserModel.findOne({ email: email});
    if(user) return { error: "Email already registered." };
  }

  static async register(body) {
    const userExists = await this.userExists(body.email);
    if(userExists) return { error: userExists.error };   

    const user = await UserModel.create(body);
    return user;
  }

}

module.exports = User;