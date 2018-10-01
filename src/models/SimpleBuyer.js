const Agent = require('./Agent');
const priceWithQuality = require('../sorting/priceWithQuality');

const SALARY_PERIOD = 30;
class SimpleBuyer extends Agent {
  constructor({
    maxPrice,
    qualityThreshold,
    buyingPeriod = 1,
    startingMoney,
    salary,
  }) {
    super();
    this.periodsAlive = 0;
    this.maxPrice = maxPrice;
    this.qualityThreshold = qualityThreshold;
    this.buyingPeriod = buyingPeriod;
    this.boughtThisPeriod = false;
    this.money = startingMoney;
    this.salary = salary;
  }

  act() {
    if (
      this.periodsAlive !== 0 &&
      this.periodsAlive % this.buyingPeriod === 0 &&
      !this.boughtThisPeriod
    ) {
      this.forceBuy();
      this.boughtThisPeriod = false;
    } else {
      this.boughtThisPeriod = this.tryToBuy();
    }
    if (this.periodsAlive % SALARY_PERIOD === 0) {
      this.money += this.salary;
    }
    this.periodsAlive++;
  }

  toString() {
    return `SimpleBuyer<money=${this.money.toFixed(
      2
    )}  \tmaxPrice=${this.maxPrice.toFixed(
      2
    )}\tqualityThreshold=${this.qualityThreshold.toFixed(2)}\tbuyingPeriod=${
      this.buyingPeriod
    }>`;
  }

  forceBuy() {
    const sellers = this.getWorld()
      .getAgents()
      .filter(
        (agent) =>
          agent.constructor.name === 'SimpleSeller' &&
          agent.hasProductsOnStock()
      )
      .sort(priceWithQuality);
    if (sellers.length > 0) {
      this.buyProductFrom(sellers[0]);
    } else {
      console.debug('No Products');
    }
  }

  tryToBuy() {
    const sellers = this.getWorld()
      .getAgents()
      .filter(
        (agent) =>
          agent.constructor.name === 'SimpleSeller' &&
          agent.hasProductsOnStock() &&
          agent.getProductPrice() <= this.maxPrice &&
          agent.getQuality() >= this.qualityThreshold
      )
      .sort(priceWithQuality);
    if (sellers.length > 0) {
      this.buyProductFrom(sellers[0]);
      return true;
    }
    return false;
  }

  buyProductFrom(seller) {
    if (this.money >= seller.getProductPrice()) {
      seller.buyProduct();
      this.money -= seller.getProductPrice();
    }
  }
}

module.exports = SimpleBuyer;
