const puppeteer = require("puppeteer");

const getProductData = async (url, id) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(url);
    const data = await page.evaluate(() => {
      const price = parseFloat(document.querySelector(".a-offscreen")?.textContent.replace("$", ""));
      const title = document.querySelector("#productTitle")?.textContent.trim();

      const product = { price, title };
      return product;
    });

    browser.close();

    const product = { ...data, productID: id };
    return product;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getProductData;
