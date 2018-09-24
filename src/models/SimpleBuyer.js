import Agent from './Agent';

class SimpleBuyer extends Agent {
  constructor({ maxPrice, qualityThreshold }) {
    super();
    this.maxPrice = maxPrice;
    this.qualityThreshold = qualityThreshold;
  }
  act() {
    const sellers = this.getWorld()
      .getAgents()
      .filter(
        (agent) =>
          agent.constructor.name === 'SimpleSeller' &&
          agent.hasProductsOnStock() &&
          agent.getProductPrice() <= this.maxPrice &&
          agent.getQuality() >= this.qualityThreshold
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

export default SimpleBuyer;
