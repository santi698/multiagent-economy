module.exports = function(seller1, seller2) {
  return (
    seller1.productPrice / seller1.quality -
    seller2.productPrice / seller2.quality
  );
};
