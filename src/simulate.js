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

function deleteCharts() {
  const chartsContainer = document.getElementById('charts');
  while (chartsContainer.firstChild) {
    chartsContainer.firstChild.remove();
  }
}

function createBuyers() {
  const salary = Number(document.getElementById('consumerSalary').value);
  const simpleConsumerAmount = Number(
    document.getElementById('simpleConsumerAmount').value
  );
  const simpleConsumers = new Array(simpleConsumerAmount).fill().map(() => {
    const q = random();
    return new SimpleBuyer({
      maxPrice: 5 + random() * 10,
      buyingPeriod: Math.round(3 + random() * 2),
      startingMoney: 0,
      salary: salary,
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
        startingMoney: 0,
        salary: salary,
      });
    });
  return [...simpleConsumers, ...qualitySavvyConsumers];
}
function createSellers() {
  return [
    new SimpleSeller({
      producingCapacity: Number(
        document.getElementById('seller1ProducingCapacity').value
      ),
      quality: Number(document.getElementById('seller1Quality').value),
      priceUpdatePeriod: Number(
        document.getElementById('priceUpdateFrequency').value
      ),
    }),
    new SimpleSeller({
      producingCapacity: Number(
        document.getElementById('seller2ProducingCapacity').value
      ),
      quality: Number(document.getElementById('seller2Quality').value),
      priceUpdatePeriod: Number(
        document.getElementById('priceUpdateFrequency').value
      ),
    }),
    new SimpleSeller({
      producingCapacity: Number(
        document.getElementById('seller3ProducingCapacity').value
      ),
      quality: Number(document.getElementById('seller3Quality').value),
      priceUpdatePeriod: Number(
        document.getElementById('priceUpdateFrequency').value
      ),
    }),
  ];
}
