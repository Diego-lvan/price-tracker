const { comparePwd } = require("../utils/encryptPwd");
const { User } = require("../../models");
const validatePwd = async (req, res, next) => {
  const { email, pwd } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ msg: "wrong credentials" });

  const pwdMatches = await comparePwd(user.pwd, pwd);
  if (pwdMatches) return next();
  res.status(401).json({ msg: "wrong credentials" });
};

module.exports = validatePwd;
