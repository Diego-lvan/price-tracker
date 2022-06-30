const router = require("express").Router();
const { addProduct } = require("../controllers/product");
const authToken = require("../middlewares/authToken");

// add product
router.post("/api/product", authToken, addProduct);

module.exports = router;
