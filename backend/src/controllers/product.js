const { Product, UserProducts, HistoryPrices } = require("../models");
const { formatURL, getIdFromURL, generateUrlFromId } = require("../utils/url");
const getUpdatedProduct = require("./scraper");
const getProductData = require("./scraper");

const addProduct = async (req, res, next) => {
  let { url } = req.body;
  url = formatURL(url);
  const productID = getIdFromURL(url);
  if (!productID) return res.status(400).json({ msg: "bad request" });
  try {
    let product = await Product.findOne({ where: { productID } });
    //product has not been added
    if (!product) {
      product = await getProductData(url, productID);
      if (!product?.title || product?.price) return res.status(400).json({ msg: "Something went wrong" });
      await Product.create({ productID, title: product.title });
      await HistoryPrices.create({ productID, price: product.price });
    }
    // add product to user's list
    await addProductToList(productID, req.email);
    res.json({ product });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const addProductToList = async (productID, email) => {
  const userProduct = await UserProducts.findOne({ where: { email, productID } });
  if (!userProduct) {
    UserProducts.create({ email, productID });
  }
};

const getProductHistoy = async (req, res) => {
  const { productID } = req.params;
  try {
    const history = await HistoryPrices.findAll({ where: { productID }, attributes: ["date", "price"] });
    res.json({ history });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const fetchNewPrice = async (productID) => {
  const product = await Product.findAll({
    where: { productID },
    include: HistoryPrices,
    order: [[HistoryPrices, "date", "desc"]],
  });
  try {
    const prevPrice = product[0].dataValues.HistoryPrices[0].dataValues.price;
    const url = generateUrlFromId(productID);
    const updatedProduct = await getUpdatedProduct(url, productID);
    if (updatedProduct.price != prevPrice) {
      return { prevPrice, ...updatedProduct };
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

const updateProductPrice = async (productID, price) => {
  await HistoryPrices.create({ price, productID });
};

module.exports = { addProduct, getProductHistoy, updateProductPrice, fetchNewPrice };
