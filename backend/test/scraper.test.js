const scraper = require("../src/controllers/scraper");
jest.useFakeTimers();
jest.setTimeout(25000);

describe("getProductData", () => {
  describe("when sending a valid URL", () => {
    it("should return the correct data type", async () => {
      const url = "https://www.amazon.com/gp/product/B08SVS99Q5/";
      const product = await scraper(url, "B08SVS99Q5");
      console.log(product);
      expect(typeof product.price).toBe("number");
      expect(typeof product.title).toBe("string");
      expect(typeof product.productID).toBe("string");
    });
  });
});
