const scraper = require("../src/controllers/scraper");
jest.setTimeout(25000);

describe("getProductData", () => {
  describe("when sending a valid URL", () => {
    it("should return the correct data type", async () => {
      const url = "https://www.amazon.com/dp/B088S3V3R4";
      const product = await scraper(url, "B088S3V3R4");
      expect(typeof product.price).toBe("number");
      expect(typeof product.title).toBe("string");
      expect(typeof product.productID).toBe("string");
    });
  });
});
