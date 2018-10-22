const random = require('../util/random')('mango');

const ConstantPriceUpdateStrategy = ({ currentPrice }) => currentPrice;

function PriceUpdateStrategy1Old({
  minPrice,
  currentPrice,
  quantitySold,
  producingCapacity,
}) {
  const missedSales = quantitySold - producingCapacity;
  return (currentPrice += Math.max(
    Math.sign(missedSales) * Math.sqrt(Math.abs(missedSales)) * random(),
    minPrice - currentPrice
  ));
}

function PriceUpdateStrategy1New({
  minPrice,
  currentPrice,
  quantitySold,
  producingCapacity,
}) {
  const missedSales = 1 + quantitySold - producingCapacity;
  return (currentPrice += Math.max(
    Math.sign(missedSales) * Math.sqrt(Math.abs(missedSales)) * 0.1 * random(),
    minPrice - currentPrice
  ));
}

module.exports = {
  ConstantPriceUpdateStrategy,
  PriceUpdateStrategy1Old,
  PriceUpdateStrategy1New,
};
