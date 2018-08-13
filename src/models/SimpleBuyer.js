const Agent = require('./Agent');

class SimpleBuyer extends Agent {
  constructor(maxPrice) {
    super();
    this.maxPrice = maxPrice;
  }
  act() {
    const sellers = this.getWorld()
      .getAgents()
      .filter(
        (agent) =>
          agent.constructor.name === 'SimpleSeller' &&
          agent.hasProductsOnStock() &&
          agent.getProductPrice() <= this.maxPrice
      )
      .sort(
        (seller1, seller2) =>
          seller1.getProductPrice() > seller2.getProductPrice()
      );
    if (sellers.length > 0) {
      sellers[0].buyProduct();
    }
  }
  toString() {
    return `SimpleBuyer<>`;
  }
}

module.exports = SimpleBuyer;
