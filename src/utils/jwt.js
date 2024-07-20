const { sign, verify } = require("jsonwebtoken");
const config = require("../../config");

const createToken = (payload) => {
  return sign(payload, config.jwtSecretKey, { expiresIn: config.jwtExpiresIn });
};

const checkToken = (token, callback) => {
  verify(token, config.jwtSecretKey, callback);
};

module.exports = {
  createToken,
  checkToken,
};
