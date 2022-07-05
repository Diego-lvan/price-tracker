const getPercentage = (prevVal, newVal) => {
  if (newVal < prevVal) {
    return -parseFloat((100 - (newVal * 100) / prevVal).toFixed(1));
  } else {
    return parseFloat(((newVal * 100) / prevVal).toFixed(1));
  }
};

module.exports = getPercentage;
