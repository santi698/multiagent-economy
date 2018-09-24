import Agent from './Agent';
import PriceUpdateStrategy1 from './PriceUpdateStrategy1';

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
      productPrice=${this.productPrice}
      quality=${this.quality}
      accountBalance=${this.accountBalance}
    >`;
  }
}

export default SimpleSeller;