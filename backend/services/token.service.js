const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config");

// Helper to generate JWT
const generateToken = (userId, expires, secret) => {
  const payload = {
    _id: userId,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, secret);
};

// Generate access token
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, "minutes");
  const accessToken = generateToken(user._id, accessTokenExpires, config.jwt.accessSecret);
  return accessToken;
};

// Generate email verification token
const generateVerificationToken = async (userId) => {
  const verificationTokenExpires = moment().add(
    config.jwt.verificationExpirationMinutes,
    "minutes"
  );
  const verificationToken = generateToken(
    userId,
    verificationTokenExpires,
    config.jwt.verificationSecret
  );
  return verificationToken;
};

// Verify token
const verifyToken = async (token, type) => {
  if (type === "accessToken") {
    return jwt.verify(token, config.jwt.accessSecret);
  } else if (type === "verify") {
    return jwt.verify(token, config.jwt.verificationSecret);
  } else {
    throw new Error("Invalid token type");
  }
};

module.exports = { generateAuthTokens, generateVerificationToken, verifyToken };
