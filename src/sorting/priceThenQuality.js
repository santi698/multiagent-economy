const EPS = 1e-3;
module.exports = function(seller1, seller2) {
  const priceDifference = seller1.productPrice - seller2.productPrice;
  if (Math.abs(priceDifference) >= EPS) {
    return priceDifference;
  }
  return seller1.quality - seller2.quality;
};
