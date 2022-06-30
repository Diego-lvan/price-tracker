const schedule = require("node-schedule");
const { Product, HistoryPrices, UserProducts } = require("../../models");
const getUpdatedProduct = require("./scraper");
const { generateUrlFromId } = require("../utils/url");
const transport = require("../utils/transportMail");
require("dotenv/config");

const setJob = async () => {
  const cronExpression = "0 */2 * * *";
  schedule.scheduleJob(cronExpression, async () => {
    const updatedProducts = await fetchUpdatedProducts();
    await updateProductPrices(updatedProducts);
    await sendEmailToUsers(updatedProducts);
  });
};

const fetchUpdatedProducts = async () => {
  const products = await Product.findAll({ include: HistoryPrices, order: [[HistoryPrices, "date", "desc"]] });
  const ans = [];
  try {
    await Promise.allSettled(
      await products.map(async (product) => {
        const lastPrice = product.dataValues.HistoryPrices[0].dataValues.price;
        const url = generateUrlFromId(product.productID);
        const updatedProduct = await getUpdatedProduct(url, product.productID);
        if (updatedProduct.price != lastPrice) {
          ans.push(updatedProduct);
        }
        return product;
      })
    );
    return ans;
  } catch (error) {
    console.log(error);
  }
};

const updateProductPrices = async (products) => {
  await Promise.allSettled(products.map(async ({ price, productID }) => await HistoryPrices.create({ price, productID })));
};

const sendEmailToUsers = async (updatedProducts) => {
  updatedProducts.map(async (product) => {
    const users = await UserProducts.findAll({ where: { productID: product.productID }, attributes: ["email"] });
    users.map((user) => {
      console.log(user);
      const options = {
        from: process.env.EMAIL_ADDRESS,
        to: user.dataValues.email,
        subject: `The price of this product has changed ${product.title}`,
        text: `The new price is ${product.price}`,
      };
      transport.sendMail(options, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      });
    });
  });
};

setJob();
