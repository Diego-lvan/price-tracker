require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.DB_NAME,
    host: "db",
    dialect: "mysql",
  },
};
