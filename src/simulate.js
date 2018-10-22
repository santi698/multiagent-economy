const SimpleSeller = require('./models/SimpleSeller');
const SimpleBuyer = require('./models/SimpleBuyer');
const World = require('./models/World');
const random = require('./util/random')();
const Simulation = require('./models/Simulation');
const PlottingService = require('./services/PlottingService');
const ConstantPriceUpdateStrategy = require('./models/PriceUpdateStrategies')
  .ConstantPriceUpdateStrategy;

const CONSUMER_AMOUNT = 400;
const SIMULATION_STEPS = 200;

async function startSimulation() {
  const agents = [...createSellers(), ...createBuyers()];
  const world = new World(agents);
  const simulation = new Simulation(world, SIMULATION_STEPS);
  const plottingService = new PlottingService();
  plottingService.connectChartsWithSimulation(simulation);
  simulation.simulate();
}

function createBuyers() {
  return new Array(CONSUMER_AMOUNT).fill().map(() => {
    const q = random();
    return new SimpleBuyer({
      maxPrice: 5 + random() * 10,
      qualityThreshold: Math.min(0.95, q * q),
      buyingPeriod: random() > 0.5 ? 2 : 1,
      startingMoney: 200,
      salary: 200,
    });
  });
}
function createSellers() {
  return [
    new SimpleSeller({
      productName: 'Pan',
      initialProductPrice: 10,
      minPrice: 0,
      stockCapacity: 25,
      producingCapacity: 5,
      initialAccountBalance: 100,
      fixedCosts: 10,
      variableCosts: 8,
      quality: 0.97,
    }),
    new SimpleSeller({
      productName: 'Pan',
      initialProductPrice: 10,
      minPrice: 0,
      stockCapacity: 40,
      producingCapacity: 7,
      initialAccountBalance: 100,
      fixedCosts: 10,
      variableCosts: 5,
      quality: 0.75,
    }),
    new SimpleSeller({
      productName: 'Pan',
      initialProductPrice: 10,
      minPrice: 0,
      stockCapacity: 50,
      producingCapacity: 5,
      initialAccountBalance: 100,
      fixedCosts: 10,
      variableCosts: 9,
      quality: 0.5,
    }),
    new SimpleSeller({
      productName: 'Pan',
      initialProductPrice: 10,
      minPrice: 0,
      stockCapacity: 50,
      producingCapacity: 4,
      initialAccountBalance: 100,
      fixedCosts: 10,
      variableCosts: 8.5,
      quality: 0.95,
    }),
    new SimpleSeller({
      productName: 'Pan',
      initialProductPrice: 15,
      minPrice: 0,
      stockCapacity: 300,
      producingCapacity: 100,
      initialAccountBalance: 100,
      fixedCosts: 700,
      variableCosts: 9,
      quality: 0.65,
    }),
  ];
}
