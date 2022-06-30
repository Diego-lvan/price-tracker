const express = require("express");
const cors = require("cors");
const app = express();
const { authRouter, productRouter } = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use(authRouter, productRouter);

require("./controllers/settingJob");

module.exports = app;
