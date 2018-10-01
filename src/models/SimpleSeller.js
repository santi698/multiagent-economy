const Agent = require('./Agent');
const PriceUpdateStrategy1 = require('./PriceUpdateStrategy1');

class SimpleSeller extends Agent {
  constructor({
    productName,
    initialProductPrice,
    quality,
    minPrice,
    stockCapacity,
    producingCapacity,
    initialAccountBalance,
    fixedCosts,
    variableCosts,
    priceUpdateStrategy = PriceUpdateStrategy1,
    initialStock = stockCapacity,
  }) {
    super();
    this.productName = productName;
    this.minPrice = minPrice;
    this.productPrice = initialProductPrice;
    this.stockCapacity = stockCapacity;
    this.productsOnStock = initialStock;
    this.producingCapacity = producingCapacity;
    this.accountBalance = initialAccountBalance;
    this.fixedCosts = fixedCosts;
    this.variableCosts = variableCosts;
    this.totalQuantitySold = 0;
    this.totalAmountSold = 0;
    this.periodQuantitySold = 0;
    this.priceUpdateStrategy = priceUpdateStrategy;
    this.quality = quality;
  }

  getProduct() {
    return this.productName;
  }

  getProductPrice() {
    return this.productPrice;
  }

  getQuality() {
    return this.quality;
  }

  hasProductsOnStock() {
    return this.productsOnStock > 0;
  }

  buyProduct() {
    if (this.productsOnStock == 0) {
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
    this.productsOnStock += periodProduce;
    this.accountBalance -= this.fixedCosts + this.variableCosts * periodProduce;
  }

  act(delta) {}

  exit() {
    this.productPrice = this.priceUpdateStrategy({
      minPrice: this.minPrice,
      currentPrice: this.productPrice,
      quantitySold: this.periodQuantitySold,
      producingCapacity: this.producingCapacity,
      fixedCosts: this.fixedCosts,
      variableCosts: this.variableCosts,
    });
    this.periodQuantitySold = 0;
  }

  toString() {
    return `SimpleSeller<
  stock=${this.productsOnStock}/${this.stockCapacity}
  price=${this.productPrice.toFixed(2)}\tquality=${this.quality.toFixed(
      2
    )}\ttotalSold=${this.totalQuantitySold}
  accountBalance=${this.accountBalance.toFixed(2)}
>`;
  }
}

module.exports = SimpleSeller;
