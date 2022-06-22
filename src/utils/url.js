const AMAZON_BASE_URL = "https://www.amazon.com";

const getURL = (url) => {
  let newURL = url.split("/ref")[0];
  const id = newURL.split("dp/")[1].replace("/", "");
  newURL = `${AMAZON_BASE_URL}/dp/${id}`;
  return newURL;
};

const getIdFromURL = (url) => {
  const id = url.split("dp/")[1];
  return id;
};

module.exports = { getURL, getIdFromURL };
