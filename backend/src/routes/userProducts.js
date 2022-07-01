const router = require("express").Router();
const authToken = require("../middlewares/authToken");
const { getMyProducts } = require("../controllers/userProducts");

router.get("/api/getMyProducts", authToken, getMyProducts);

module.exports = router;
