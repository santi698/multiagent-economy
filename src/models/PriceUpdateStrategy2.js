function PriceUpdateStrategy2({
  quantitySold,
  currentPrice,
  fixedCosts,
  variableCosts,
}) {
  const cost = fixedCosts + quantitySold * variableCosts;
  const earnings = currentPrice * quantitySold;
  const rentability = earnings / (earnings - cost);
  return currentPrice + rentability * currentPrice;
}

module.exports = PriceUpdateStrategy2;
