const puppeteer = require("puppeteer");
const { getURL, getIdFromURL } = require("../utils/url");

const getProductData = async (url) => {
  url = getURL(url);

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

  const id = getIdFromURL(url);
  const product = { ...data, id };
  console.log(product);
  return product;
};

getProductData(
  "https://www.amazon.com/Cable-Matters-Splitter-Y-Cable-Inches/dp/B00L1K1OIA/ref=pd_rhf_ee_s_pd_crcd_sccl_1_1/134-7146298-0844539?pd_rd_w=54lqb&content-id=amzn1.sym.cee83ff1-8fc1-4533-a3f5-bf3d998f4558&pf_rd_p=cee83ff1-8fc1-4533-a3f5-bf3d998f4558&pf_rd_r=JCNBBZX8TB1WABAZYG06&pd_rd_wg=Xr2gl&pd_rd_r=f80a7e8a-72a7-4f44-ad6e-39639890e9b3&pd_rd_i=B00L1K1OIA&psc=1"
);
