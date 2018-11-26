const SimpleSeller = require('./models/SimpleSeller');
const SimpleBuyer = require('./models/SimpleBuyer');
const QualitySavvyBuyer = require('./models/QualitySavvyBuyer');
const World = require('./models/World');
const Random = require('./util/Random');
const Simulation = require('./models/Simulation');
const PlottingService = require('./services/PlottingService');
const PriceUpdateStrategies = require('./models/PriceUpdateStrategies');

const random = new Random();

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
    const q = random.next();
    return new SimpleBuyer({
      maxPrice: 5 + random.next() * 10,
      buyingPeriod: Math.round(3 + random.next() * 2),
      startingMoney: 0,
      salary: salary,
    });
  });
  const qualitySavvyConsumerAmount = Number(
    document.getElementById('qualitySavvyConsumerAmount').value
  );
  console.log(qualitySavvyConsumerAmount);
  const qualitySavvyConsumers = new Array(qualitySavvyConsumerAmount)
    .fill()
    .map(() => {
      const q = random.next();
      return new QualitySavvyBuyer({
        maxPrice: 5 + random.next() * 10,
        buyingPeriod: Math.round(3 + random.next() * 2),
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
      priceUpdateStrategy: PriceUpdateStrategies[
        document.getElementById('seller1Strategy').value
      ](),
      initialProductPrice: 9,
    }),
    new SimpleSeller({
      producingCapacity: Number(
        document.getElementById('seller2ProducingCapacity').value
      ),
      quality: Number(document.getElementById('seller2Quality').value),
      priceUpdatePeriod: Number(
        document.getElementById('priceUpdateFrequency').value
      ),
      priceUpdateStrategy: PriceUpdateStrategies[
        document.getElementById('seller2Strategy').value
      ](),
      initialProductPrice: 9,
    }),
    new SimpleSeller({
      producingCapacity: Number(
        document.getElementById('seller3ProducingCapacity').value
      ),
      quality: Number(document.getElementById('seller3Quality').value),
      priceUpdatePeriod: Number(
        document.getElementById('priceUpdateFrequency').value
      ),
      priceUpdateStrategy: PriceUpdateStrategies[
        document.getElementById('seller3Strategy').value
      ](),
      initialProductPrice: 9,
    }),
  ];
}
