const schedule = require("node-schedule");
const { Product, HistoryPrices } = require("../../models");
const getUpdatedProduct = require("./scraper");
const { generateUrlFromId } = require("../utils/url");

const setJob = async () => {
  const cronExpression = "*/1 * * * * *";
  const job = schedule.scheduleJob("test", cronExpression, async () => {
    job.cancel();
    const updatedProducts = await fetchUpdatedProducts();
    await updateProductPrices(updatedProducts);
  });
};

const fetchUpdatedProducts = async () => {
  const products = await Product.findAll({ include: HistoryPrices, order: [["createdAt", "DESC"]] });
  const ans = [];
  await Promise.allSettled(
    await products.map(async (product) => {
      const last = product.dataValues.HistoryPrices.length - 1;
      const lastPrice = product.dataValues.HistoryPrices[0].dataValues.price;
      const url = generateUrlFromId(product.productID);
      const updatedProduct = await getUpdatedProduct(url, product.productID);
      if (updatedProduct.price != lastPrice) {
        console.log(updatedProduct.price, lastPrice);
        ans.push(updatedProduct);
      }
      return product;
    })
  );
  return ans;
};

const updateProductPrices = async (products) => {
  await Promise.allSettled(products.map(async ({ price, productID }) => await HistoryPrices.create({ price, productID })));
};

setJob();
