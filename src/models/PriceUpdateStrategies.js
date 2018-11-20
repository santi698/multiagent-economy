const Random = require('../util/Random');

const SEEK_DELTA = 0.01;

const ConstantPriceUpdateStrategy = () => ({ priceHistory }) =>
  priceHistory.slice(-1)[0];

const PriceUpdateStrategy1Old = () => {
  const random = new Random();
  return ({
    minPrice,
    priceHistory,
    quantitySoldHistory,
    producingCapacity,
  }) => {
    const lastPeriodSold = quantitySoldHistory.slice(-1)[0];
    const missedSales = lastPeriodSold - producingCapacity;
    const currentPrice = priceHistory.slice(-1)[0];
    const result =
      currentPrice +
      Math.max(
        Math.sign(missedSales) *
          Math.sqrt(Math.abs(missedSales)) *
          random.next(),
        minPrice - currentPrice
      );
    if (typeof result === 'string') {
      debugger;
    }
    return (
      currentPrice +
      Math.max(
        Math.sign(missedSales) *
          Math.sqrt(Math.abs(missedSales)) *
          random.next(),
        minPrice - currentPrice
      )
    );
  };
};

const PriceUpdateStrategy1New = () => {
  const random = new Random();
  return ({
    minPrice,
    priceHistory,
    quantitySoldHistory,
    producingCapacity,
  }) => {
    const currentPrice = priceHistory.slice(-1)[0];
    const lastPeriodSold = quantitySoldHistory.slice(-1)[0];
    const missedSales = 1 + lastPeriodSold - producingCapacity;
    return (
      currentPrice +
      Math.max(
        Math.sign(missedSales) *
          Math.sqrt(Math.abs(missedSales)) *
          0.1 *
          random.next(),
        minPrice - currentPrice
      )
    );
  };
};

const SeekDesiredQuantityConstant = () => {
  return ({
    priceHistory,
    quantitySoldHistory,
    variableCosts,
    fixedCosts,
    updatePeriod,
  }) => {
    const currentPrice = priceHistory.slice(-1)[0];
    const currentSold = quantitySoldHistory
      .slice(-updatePeriod)
      .reduce((a, b) => a + b);
    const profitPerSale =
      currentPrice - variableCosts - (updatePeriod * fixedCosts) / currentSold;
    if (profitPerSale <= 0 && currentSold == 0) {
      return currentPrice - SEEK_DELTA;
    } else if (profitPerSale <= 0) {
      return currentPrice + SEEK_DELTA;
    } else {
      const minDesiredQuantity = (updatePeriod * fixedCosts) / profitPerSale;
      const profitIndicator = currentSold - minDesiredQuantity;
      return currentPrice + Math.sign(profitIndicator) * SEEK_DELTA;
    }
  };
};

const SeekDesiredQuantityLinear = () => {
  return ({
    priceHistory,
    quantitySoldHistory,
    variableCosts,
    fixedCosts,
    producingCapacity,
    updatePeriod,
  }) => {
    const currentPrice = priceHistory.slice(-1)[0];
    const currentSold = quantitySoldHistory
      .slice(-updatePeriod)
      .reduce((a, b) => a + b);
    const profitPerSale = Math.max(0, currentPrice - variableCosts);
    const minDesiredQuantity =
      profitPerSale === 0 ? 1 : (updatePeriod * fixedCosts) / profitPerSale;
    const profitIndicator =
      (currentSold - minDesiredQuantity) / producingCapacity;
    return Math.max(variableCosts, currentPrice + profitIndicator * SEEK_DELTA);
  };
};

const TCPStrategy = (linearStep = 0.01, multiplier = 0.99) => {
  return ({
    priceHistory,
    quantitySoldHistory,
    variableCosts,
    fixedCosts,
    producingCapacity,
    updatePeriod,
  }) => {
    if (quantitySoldHistory.slice(-1)[0] >= producingCapacity) {
      return priceHistory.slice(-1)[0] + linearStep;
    }
    return priceHistory.slice(-1)[0] * multiplier;
  };
};
module.exports = {
  ConstantPriceUpdateStrategy,
  PriceUpdateStrategy1Old,
  PriceUpdateStrategy1New,
  SeekDesiredQuantityConstant,
  SeekDesiredQuantityLinear,
  TCPStrategy,
};
