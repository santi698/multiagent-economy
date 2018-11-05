const SimpleSeller = require('./models/SimpleSeller');
const SimpleBuyer = require('./models/SimpleBuyer');
const World = require('./models/World');
const random = require('./util/random')();
const Simulation = require('./models/Simulation');
const PlottingService = require('./services/PlottingService');
const { SeekDesiredQuantityLinear } = require('./models/PriceUpdateStrategies');

async function startSimulation() {
  const plottingService = new PlottingService();
  const agents = [...createSellers(), ...createBuyers()];
  const world = new World(agents);
  const simulationSteps = Number(
    document.getElementById('simulationSteps').value
  );
  const simulation = new Simulation(world, simulationSteps);
  plottingService.connectChartsWithSimulation(simulation);
  simulation.simulate();
}

function createBuyers() {
  const simpleConsumerAmount = Number(
    document.getElementById('simpleConsumerAmount').value
  );
  const simpleConsumers = new Array(simpleConsumerAmount).fill().map(() => {
    const q = random();
    return new SimpleBuyer({
      maxPrice: 5 + random() * 10,
      buyingPeriod: Math.round(3 + random() * 2),
      startingMoney: 250,
      salary: 250,
    });
  });
  const qualitySavvyConsumerAmount = Number(
    document.getElementById('qualitySavvyConsumerAmount').value
  );
  const qualitySavvyConsumers = new Array(qualitySavvyConsumerAmount)
    .fill()
    .map(() => {
      const q = random();
      return new SimpleBuyer({
        maxPrice: 5 + random() * 10,
        buyingPeriod: Math.round(3 + random() * 2),
        startingMoney: 250,
        salary: 250,
      });
    });
  return [...simpleConsumers, ...qualitySavvyConsumers];
}
function createSellers() {
  return [
    new SimpleSeller({
      producingCapacity: 15,
      quality: 0.95,
      priceUpdatePeriod: 7,
      variableCosts: 9,
    }),
    new SimpleSeller({
      producingCapacity: 25,
      quality: 0.9,
      priceUpdatePeriod: 7,
    }),
    new SimpleSeller({
      producingCapacity: 50,
      quality: 0.65,
      priceUpdatePeriod: 7,
    }),
  ];
}
