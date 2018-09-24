export default function PriceUpdateStrategy1({
  minPrice,
  currentPrice,
  quantitySold,
  producingCapacity,
}) {
  const missedSales = quantitySold - producingCapacity;
  return (currentPrice += Math.max(
    Math.sign(missedSales) * Math.sqrt(Math.abs(missedSales)) * Math.random(),
    minPrice - currentPrice
  ));
}
