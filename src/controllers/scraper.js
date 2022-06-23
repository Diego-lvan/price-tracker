const puppeteer = require("puppeteer");

const getProductData = async (url, id) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);
  const data = await page.evaluate(() => {
    const price = parseFloat(document.querySelector(".a-offscreen").textContent.replace("$", ""));
    const title = document.querySelector("#productTitle").textContent.trim();

    const product = { price, title };
    return product;
  });

  browser.close();

  const product = { ...data, productID: id };
  return product;
};

module.exports = getProductData;
