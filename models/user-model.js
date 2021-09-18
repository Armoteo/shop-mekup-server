const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  activationLink: { type: String },
  email: { required: true, type: String, unique: true },
  isActivated: { default: false, type: Boolean },
  password: { required: true, type: String },
});

module.exports = model('User', UserSchema);
