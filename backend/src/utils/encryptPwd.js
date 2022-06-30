const bcrypt = require("bcrypt");

const encryptPwd = async (pwd) => {
  const hashedPassword = await bcrypt.hash(pwd, 10);
  return hashedPassword;
};

const comparePwd = (hashedPwd, pwd) => {
  return bcrypt.compare(pwd, hashedPwd);
};

module.exports = { encryptPwd, comparePwd };
