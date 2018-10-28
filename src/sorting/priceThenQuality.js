module.exports = function(seller1, seller2) {
  const priceDifference = seller1.productPrice - seller2.productPrice;
  if (priceDifference !== 0) {
    return priceDifference;
  }
  return seller1.quality - seller2.quality;
};
