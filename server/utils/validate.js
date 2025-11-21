const validator = require('validator');
const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

function isValidUrl(url) {
  // allow http or https
  return validator.isURL(url, { protocols: ['http','https'], require_protocol: true });
}

function isValidCode(code) {
  return CODE_REGEX.test(code);
}

module.exports = { isValidUrl, isValidCode };
