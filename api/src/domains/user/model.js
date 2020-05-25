const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    phone: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
  },
  { timestamps: true },
);

const UserModel = mongoose.model('user', userSchema);
exports.UserModel = UserModel;
