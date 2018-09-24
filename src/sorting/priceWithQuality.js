export default function(seller1, seller2) {
  return (
    seller1.getProductPrice() / seller1.getQuality() -
    seller2.getProductPrice() / seller2.getQuality()
  );
}
