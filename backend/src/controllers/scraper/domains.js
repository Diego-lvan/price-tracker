const cheerio = require("cheerio");
const axios = require("axios");

class WebsiteHandler {
  constructor(url) {
    this.url = url;
    this.info = null;
    this.$ = null;
  }

  async getInfo() {
    try {
      axios.defaults.headers.get["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0";

      const html = await axios.get(this.url);
      this.$ = cheerio.load(html.data);
    } catch (error) {
      console.log(error);
    }
  }

  getPrice() {}
  getProductTitle() {}
  getProductID() {}
}

class AmazonHandler extends WebsiteHandler {
  constructor(url) {
    super(url);
  }

  getProductTitle() {
    try {
      const title = this.$("#title").text().trim();
      return title;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  getPrice() {
    try {
      const price = Number.parseFloat(this.$(".a-offscreen").first().text().replace("$", ""));
      return price;
    } catch (error) {
      return null;
    }
  }

  getProductID() {
    this.formatURL();
    const id = this.url.split("dp/")[1] ?? "";
    if (id.length != 10) return "";
    return id;
  }

  formatURL() {
    let newURL = url.split("/ref")[0];
    const id = newURL.split("dp/")[1]?.replace("/", "");
    if (!id) return "";
    newURL = `${AMAZON_BASE_URL}/dp/${id}`;
    this.url = newURL;
  }

  getProductInfo() {
    const price = this.getPrice();
    const title = this.getProductTitle();
    return { price, title };
  }
}

module.exports = { AmazonHandler };
