const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');

class TokenService {
  generateTokens =(payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken = (token) => {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken = (token) => {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      return userData;
    } catch (e) {
      return null;
    }
  }

  saveToken = async (userId, refreshToken) => {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return tokenData.save();
    }
    const token = await tokenModel.create({ refreshToken, user: userId });

    return token;
  }

  removeToken = async (refreshToken) => {
    const tokenData = await tokenModel.deleteOne({ refreshToken });

    return tokenData;
  }

  findToken = async (refreshToken) => {
    const tokenData = await tokenModel.findOne({ refreshToken });

    return tokenData;
  }
}

module.exports = new TokenService();
