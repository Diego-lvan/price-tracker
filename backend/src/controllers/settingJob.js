const schedule = require("node-schedule");
const { Product, UserProducts } = require("../../models");
const transport = require("../utils/transportMail");
const getPercentage = require("../utils/getPercentage");
const { fetchNewPrice, updateProductPrice } = require("./product");
const { generateUrlFromId } = require("../utils/url");
require("dotenv/config");

// every two hours gets the total products and creates
// a timeout for every product between the next two hours
const setJob = async () => {
  const twoHoursExp = "0 */2 * * *";
  schedule.scheduleJob(twoHoursExp, async () => {
    const time = 1000 * 60; // two hours in milliseconds
    const amountProducts = await Product.count();
    const milliseconds = Math.round(time / amountProducts);
    const products = await Product.findAll();
    for (let i = 0; i < amountProducts; i++) {
      setTimeout(async () => {
        const updatedProduct = await fetchNewPrice(products[i].dataValues.productID);
        if (!updatedProduct) return;
        await updateProductPrice(products[i].dataValues.productID, updatedProduct.price);
        await sendEmailToUsers(updatedProduct);
      }, milliseconds * i);
    }
  });
};

const sendEmailToUsers = async ({ productID, title, price, prevPrice }) => {
  const users = await UserProducts.findAll({ where: { productID }, attributes: ["email"] });
  const url = generateUrlFromId(productID);
  console.log(url);
  users.map((user) => {
    const percentage = getPercentage(prevPrice, price);
    const options = {
      from: process.env.EMAIL_ADDRESS,
      to: user.dataValues.email,
      subject: `The price of this product has changed ${title}`,
      text: `The new price is ${price} which is ${Math.abs(percentage)}%  ${
        percentage > 0 ? "more expensive" : "cheaper"
      } \n URL: ${url} `,
    };
    transport.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
      }
    });
  });
};

setJob();
