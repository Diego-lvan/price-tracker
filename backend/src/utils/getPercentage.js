const getPercentage = (prevVal, newVal) => {
  let percentage = -Math.round(100 - (newVal * 100) / prevVal);
  return percentage;
};

module.exports = getPercentage;
