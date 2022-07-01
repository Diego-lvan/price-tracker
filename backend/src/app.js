const express = require("express");
const cors = require("cors");
const app = express();
const { authRouter, productRouter, userProductsRouter } = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use(authRouter, productRouter, userProductsRouter);

require("./controllers/settingJob");

module.exports = app;
