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

const generateAuthToken = (user) => {
  if (!user._id) throw new Error("User ID is missing for token generation");

  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );

  return generateToken(user._id, accessTokenExpires, config.jwt.accessSecret);
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

const verifyToken = (token, type) => {
  if (type === "accessToken") {
    return jwt.verify(token, config.jwt.accessSecret);
  } else if (type === "verify") {
    return jwt.verify(token, config.jwt.verificationSecret);
  }
  throw new Error("Invalid token type");
};

module.exports = { generateAuthToken, verifyToken, generateVerificationToken };
