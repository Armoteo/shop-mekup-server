const { Schema, model } = require('mongoose');

const TokenSchema = new Schema({
  refreshToken: { required: true, type: String },
  user: { ref: 'User', type: Schema.Types.ObjectId },
});

module.exports = model('Token', TokenSchema);
