const { formatURL, getIdFromURL, generateUrlFromId } = require("../src/utils/url");

describe("formatURL", () => {
  describe("when sending a valid url", () => {
    it("should return a formatted url", () => {
      const url = "https://www.amazon.com/Android-Processor-Tablets-1280%C3%97800-Bluetooth/dp/B0919J6LS5/ref=sr_1_3_sspa";
      const formatted = formatURL(url);
      expect(formatted).toBe("https://www.amazon.com/dp/B0919J6LS5");
    });
  });
});

describe("getIdFromURL", () => {
  describe("when sending a valid url", () => {
    it("should return the id", () => {
      const url = "https://www.amazon.com/dp/B0919J6LS5";
      const id = getIdFromURL(url);
      expect(id).toBe("B0919J6LS5");
    });
  });
});
