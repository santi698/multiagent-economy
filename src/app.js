import SimpleSeller from './models/SimpleSeller';
import SimpleBuyer from './models/SimpleBuyer';
import World from './models/World';

const CONSUMER_AMOUNT = 1000;
const SIMULATION_STEPS = 200;

function main() {
  const agents = [...createSellers(), ...createBuyers()];
  const world = new World(agents);
  agents.forEach((agent) => agent.init(world));
  console.log(
    agents.filter((agent) => agent.constructor.name === 'SimpleBuyer').length
  );
  let i;
  for (i = 0; i < SIMULATION_STEPS; i++) {
    console.log(`\nSimulation Step ${i} Start\n`);
    agents.forEach((agent) => {
      agent.enter();
    });
    agents.forEach((agent) => {
      agent.act(1);
    });
    agents.forEach((agent) => {
      agent.exit();
    });
    agents.forEach(
      (agent) =>
        agent.constructor.name === 'SimpleSeller' &&
        console.log(agent.toString())
    );
    console.log(`\nSimulation Step ${i} End\n`);
  }
}

function createBuyers() {
  return new Array(CONSUMER_AMOUNT).fill().map(() => {
    const q = Math.random();
    return new SimpleBuyer({
      maxPrice: 5 + Math.random() * 10,
      qualityThreshold: 1 - q * q,
    });
  });
}
function createSellers() {
  return [
    new SimpleSeller({
      productName: 'Pan',
      initialProductPrice: 10,
      minPrice: 12,
      stockCapacity: 10,
      producingCapacity: 5,
      initialAccountBalance: 100,
      fixedCosts: 10,
      variableCosts: 4,
      quality: 1,
    }),
    new SimpleSeller({
      productName: 'Pan',
      initialProductPrice: 10,
      minPrice: 11,
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
      minPrice: 10,
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
      minPrice: 11,
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
      minPrice: 12,
      stockCapacity: 50,
      producingCapacity: 4,
      initialAccountBalance: 100,
      fixedCosts: 10,
      variableCosts: 8.5,
      quality: 0.95,
    }),
    new SimpleSeller({
      productName: 'Pan',
      initialProductPrice: 10,
      minPrice: 13,
      stockCapacity: 20,
      producingCapacity: 3,
      initialAccountBalance: 80,
      fixedCosts: 15,
      variableCosts: 8,
      quality: 0.98,
    }),
    new SimpleSeller({
      productName: 'Pan',
      initialProductPrice: 10,
      minPrice: 12,
      stockCapacity: 50,
      producingCapacity: 5,
      initialAccountBalance: 100,
      fixedCosts: 25,
      variableCosts: 6,
      quality: 0.88,
    }),
    new SimpleSeller({
      productName: 'Pan',
      initialProductPrice: 10,
      minPrice: 11,
      stockCapacity: 50,
      producingCapacity: 5,
      initialAccountBalance: 100,
      fixedCosts: 5,
      variableCosts: 5,
      quality: 0.78,
    }),
    new SimpleSeller({
      productName: 'Pan',
      initialProductPrice: 8,
      minPrice: 8,
      stockCapacity: 100,
      producingCapacity: 10,
      initialAccountBalance: 1000,
      fixedCosts: 18,
      variableCosts: 14,
      quality: 0.6,
    }),
    new SimpleSeller({
      productName: 'Pan',
      initialProductPrice: 8,
      minPrice: 10,
      stockCapacity: 50,
      producingCapacity: 10,
      initialAccountBalance: 100,
      fixedCosts: 20,
      variableCosts: 12,
      quality: 0.45,
    }),
    new SimpleSeller({
      productName: 'Pan',
      initialProductPrice: 12,
      minPrice: 10,
      stockCapacity: 500,
      producingCapacity: 80,
      initialAccountBalance: 100,
      fixedCosts: 95,
      variableCosts: 5,
      quality: 0.72,
    }),
    new SimpleSeller({
      productName: 'Pan',
      initialProductPrice: 15,
      minPrice: 6,
      stockCapacity: 1000,
      producingCapacity: 500,
      initialAccountBalance: 100,
      fixedCosts: 100,
      variableCosts: 6,
      quality: 0.95,
    }),
  ];
}

main();
