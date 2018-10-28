const SimpleSeller = require('./models/SimpleSeller');
const SimpleBuyer = require('./models/SimpleBuyer');
const World = require('./models/World');
const random = require('./util/random')();
const Simulation = require('./models/Simulation');
const PlottingService = require('./services/PlottingService');
const { SeekDesiredQuantityLinear } = require('./models/PriceUpdateStrategies');

const CONSUMER_AMOUNT = 50;
const SIMULATION_STEPS = 500;

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
      buyingPeriod: 1, // random() > 0.9 ? 2 : 1,
      startingMoney: 250,
      salary: 250,
    });
  });
}
function createSellers() {
  return [
    new SimpleSeller({
      producingCapacity: 15,
      quality: 0.75,
      priceUpdatePeriod: 7,
    }),
    new SimpleSeller({
      producingCapacity: 25,
      quality: 0.5,
      priceUpdatePeriod: 7,
    }),
    new SimpleSeller({
      producingCapacity: 50,
      quality: 0.65,
      priceUpdatePeriod: 7,
    }),
  ];
}
