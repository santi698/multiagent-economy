const Agent = require('./Agent');
const SeekDesiredQuantityConstant = require('./PriceUpdateStrategies')
  .SeekDesiredQuantityConstant;

class SimpleSeller extends Agent {
  constructor({
    quality,
    producingCapacity,
    productName = 'Pan',
    minPrice = 0,
    stockCapacity = 5 * producingCapacity,
    initialAccountBalance = producingCapacity,
    fixedCosts = Math.sqrt(producingCapacity),
    variableCosts = 10 * quality,
    initialProductPrice = variableCosts + fixedCosts / producingCapacity,
    priceUpdatePeriod = 1,
    priceUpdateStrategy = SeekDesiredQuantityConstant,
    initialStock = stockCapacity,
  }) {
    super();
    this.productName = productName;
    this.minPrice = minPrice;
    this.productPrice = initialProductPrice;
    this.priceHistory = [this.productPrice];
    this.stockCapacity = stockCapacity;
    this.productsOnStock = initialStock;
    this.producingCapacity = producingCapacity;
    this.accountBalance = initialAccountBalance;
    this.fixedCosts = fixedCosts;
    this.variableCosts = variableCosts;
    this.totalQuantitySold = 0;
    this.totalAmountSold = 0;
    this.periodQuantitySold = 0;
    this.quantitySoldHistory = [0];
    this.priceUpdateStrategy = priceUpdateStrategy;
    this.priceUpdatePeriod = priceUpdatePeriod;
    this.quality = quality;
    this.periodProduce = 0;
  }

  hasProductsOnStock() {
    return this.productsOnStock > 0;
  }

  buyProduct(buyer) {
    if (this.productsOnStock === 0) {
      return;
    }
    this.totalQuantitySold++;
    this.periodQuantitySold++;
    this.totalAmountSold += this.productPrice;
    this.accountBalance += this.productPrice;
    this.productsOnStock--;
  }

  enter() {
    const periodProduce = Math.min(
      this.stockCapacity - this.productsOnStock,
      this.producingCapacity
    );
    this.periodProduce = periodProduce;
    this.productsOnStock += periodProduce;
    this.accountBalance -= this.fixedCosts + this.variableCosts * periodProduce;
  }

  act() {}

  exit({ day }) {
    if (day % this.priceUpdatePeriod === 0) {
      this.updatePrice();
    }
    this.quantitySoldHistory.push(this.periodQuantitySold);
    this.priceHistory.push(this.productPrice);
    this.periodQuantitySold = 0;
  }

  updatePrice() {
    this.productPrice = Math.max(
      0,
      this.priceUpdateStrategy({
        minPrice: this.minPrice,
        priceHistory: this.priceHistory,
        quantitySoldHistory: this.quantitySoldHistory,
        producingCapacity: this.producingCapacity,
        fixedCosts: this.fixedCosts,
        variableCosts: this.variableCosts,
        updatePeriod: this.priceUpdatePeriod,
      })
    );
  }

  toString() {
    return `SimpleSeller<price=${this.productPrice.toFixed(
      2
    )}\tquality=${this.quality.toFixed(2)}\tproducingCapacity=${
      this.producingCapacity
    }\tstockCapacity=${this.stockCapacity}>`;
  }
}

module.exports = SimpleSeller;
