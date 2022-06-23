const { Product, UserProducts, HistoryPrices } = require("../../models");
const { getURL, getIdFromURL } = require("../utils/url");
const getProductData = require("./scraper");

const addProduct = async (req, res, next) => {
  let { url } = req.body;
  url = getURL(url);
  const productID = getIdFromURL(url);

  let product = await Product.findOne({ where: { productID } });
  //product has not been added
  if (!product) {
    product = await getProductData(url, productID);
    await Product.create({ productID, title: product.title });
    await HistoryPrices.create({ productID, price: product.price });
  }
  // add product to user's list
  await addProductToList(productID, req.email);
  res.json({ product });
};

const addProductToList = async (productID, email) => {
  const userProduct = await UserProducts.findOne({ where: { email, productID } });
  if (!userProduct) {
    UserProducts.create({ email, productID });
  }
};

module.exports = { addProduct };
