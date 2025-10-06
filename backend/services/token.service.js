const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config");

const generateToken = (userId, expires, secret) => {
  const payload = {
    _id: userId,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, secret);
};

const generateAuthToken = async (user) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );

  const accessToken = generateToken(
    user._id,
    accessTokenExpires,
    config.jwt.accessToken
  );
  return accessToken;
};

const generateVerificationToken = async (userId) => {
  const verificationTokenExpires = moment().add(
    config.jwt.verificationExpirationMinutes,
    "minutes"
  );

  const verificationToken = generateToken(
    userId,
    verificationTokenExpires,
    config.jwt.verificationExpirationMinutes
  );
  return verificationToken;
};

const verifyToken = async (token, secret) => {
  if (secret === "sccessToken") {
    return await jwt.verify(token, config.jwt.accessSecret);
  } else if (secret === "verify") {
    return await jwt.verify(token, config.verificatonSecret);
  }
};

module.exports = { generateAuthToken, generateVerificationToken, verifyToken };
