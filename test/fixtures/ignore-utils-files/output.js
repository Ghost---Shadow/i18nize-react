const emailSanitizer = email => email.trim();

const textLengthEnforcer = text => text.slice(0, 100);

module.exports = {
  emailSanitizer,
  textLengthEnforcer
};
