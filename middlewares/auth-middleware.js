const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service');

module.exports = function authMiddleware(req, res, next) {
  let value;
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      value = next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      value = next(ApiError.UnauthorizedError());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      value = next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    value = next(ApiError.UnauthorizedError());
  }

  return value;
};
