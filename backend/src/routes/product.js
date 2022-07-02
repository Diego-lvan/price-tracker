const router = require("express").Router();
const { addProduct, getProductHistoy } = require("../controllers/product");
const authToken = require("../middlewares/authToken");

// add product
router.post("/api/product", authToken, addProduct);

// get product history
router.get("/api/getHistory/:productID", authToken, getProductHistoy);

module.exports = router;
