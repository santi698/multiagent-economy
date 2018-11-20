const Agent = require('./Agent');
const priceThenQuality = require('../sorting/priceThenQuality');
const Random = require('../util/Random');

const SALARY_PERIOD = 30;
class SimpleBuyer extends Agent {
  constructor({
    maxPrice,
    qualityThreshold = 0,
    buyingPeriod = 1,
    startingMoney,
    salary,
    productPreference = priceThenQuality,
  }) {
    super();
    this.randomGenerator = new Random();
    this.periodsAlive = 0;
    this.maxPrice = maxPrice;
    this.qualityThreshold = qualityThreshold;
    this.buyingPeriod = buyingPeriod;
    this.boughtThisPeriod = false;
    this.money = startingMoney;
    this.salary = salary;
    this.productPreference = productPreference;
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
      .sort(this.productPreference);
    if (sellers.length > 0) {
      const chosenSeller = this.chooseOneOfBest(sellers);
      this.buyProductFrom(chosenSeller);
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
          agent.productPrice <= this.maxPrice &&
          agent.quality >= this.qualityThreshold
      )
      .sort(this.productPreference);
    if (sellers.length > 0) {
      const chosenSeller = this.chooseOneOfBest(sellers);
      this.buyProductFrom(chosenSeller);
      return true;
    }
    return false;
  }

  chooseOneOfBest(sellers) {
    const chosenSellers = sellers.filter((s) => s.equalsByPrice(sellers[0]));
    if (chosenSellers.length === 0) {
      debugger;
    }
    const chosenIndex = Math.floor(
      this.randomGenerator.next() * chosenSellers.length
    );
    return chosenSellers[chosenIndex];
  }

  buyProductFrom(seller) {
    if (this.money >= seller.productPrice) {
      seller.buyProduct(this);
      this.money -= seller.productPrice;
    }
  }
}

module.exports = SimpleBuyer;
