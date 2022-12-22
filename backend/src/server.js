const app = require("./app");
const { sequelize } = require("./models");
require("dotenv/config");

app.listen(process.env.PORT, async () => {
  await sequelize.sync();
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});
