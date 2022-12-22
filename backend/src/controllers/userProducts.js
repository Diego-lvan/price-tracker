const { UserProducts, Product } = require("../models");
const getMyProducts = async (req, res) => {
  const email = req.email;
  const products = await UserProducts.findAll({
    where: { email },
    attributes: [],
    include: { model: Product, attributes: ["productID", "title"] },
  });
  res.json(products);
};

module.exports = { getMyProducts };
