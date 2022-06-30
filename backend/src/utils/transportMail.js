const nodemailer = require("nodemailer");
require("dotenv/config");

const trasporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PWD,
  },
});

module.exports = trasporter;
