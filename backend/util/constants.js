const COOKIE_MAX_AGE = 3600000;
const JWT_TOKEN_EXPIRES = '7d';
// limiter
const TIME_LIMIT = 15 * 60 * 1000;
const MAX_LIMIT = 100;

// RegExp
const IS_URL = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s!"#$%&'()*+,:;<=>?@[\\\]`{|}~]*$/;

module.exports = {
  JWT_TOKEN_EXPIRES,
  COOKIE_MAX_AGE,
  TIME_LIMIT,
  MAX_LIMIT,
  IS_URL,
};
