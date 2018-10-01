module.exports = function(seller1, seller2) {
  const priceDifference = seller1.getProductPrice() - seller2.getProductPrice();
  if (priceDifference !== 0) {
    return priceDifference;
  }
  return seller1.getQuality() - seller2.getQuality();
};
