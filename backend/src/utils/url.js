const AMAZON_BASE_URL = "https://www.amazon.com";

const formatURL = (url) => {
  let newURL = url.split("/ref")[0];
  const id = newURL.split("dp/")[1]?.replace("/", "");
  if (!id) return "";
  newURL = `${AMAZON_BASE_URL}/dp/${id}`;
  return newURL;
};

const getIdFromURL = (url) => {
  const id = url.split("dp/")[1] ?? "";
  if (id.length != 10) return "";
  return id;
};

const generateUrlFromId = (id) => {
  const url = `${AMAZON_BASE_URL}/dp/${id}`;
  return url;
};

module.exports = { formatURL, getIdFromURL, generateUrlFromId };
