const SimpleBuyer = require('./SimpleBuyer');
const priceWithQuality = require('../sorting/priceWithQuality');

class QualitySavvyBuyer extends SimpleBuyer {
  constructor(options) {
    super({
      ...options,
      qualityThreshold: 0.9,
      productPreference: priceWithQuality,
    });
  }
}

module.exports = QualitySavvyBuyer;
