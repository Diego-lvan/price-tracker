const { User } = require("../models");
const { encryptPwd } = require("../utils/encryptPwd");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const createUser = async (req, res, next) => {
  try {
    const { email, pwd, name } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.json({ msg: "user already exists" });
    const hashedPwd = await encryptPwd(pwd);
    await User.create({ email, pwd: hashedPwd, name });
    next();
  } catch (error) {
    res.sendStatus(400);
  }
};

const loginUser = async (req, res) => {
  const { email } = req.body;
  try {
    const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: `Bearer ${accessToken}`, email });
  } catch (error) {
    res.json(error);
  }
};

module.exports = { createUser, loginUser };
