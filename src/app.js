const SimpleSeller = require('./models/SimpleSeller');
const SimpleBuyer = require('./models/SimpleBuyer');
const World = require('./models/World');

const CONSUMER_AMOUNT = 1000;
const SIMULATION_STEPS = 200;

const agents = [
  new SimpleSeller({
    productName: 'Pan',
    initialProductPrice: 10,
    minPrice: 12,
    stockCapacity: 10,
    producingCapacity: 5,
    initialAccountBalance: 100,
    fixedCosts: 10,
    variableCosts: 10,
  }),
  new SimpleSeller({
    productName: 'Pan',
    initialProductPrice: 10,
    minPrice: 11,
    stockCapacity: 25,
    producingCapacity: 5,
    initialAccountBalance: 100,
    fixedCosts: 10,
    variableCosts: 10,
  }),
  new SimpleSeller({
    productName: 'Pan',
    initialProductPrice: 10,
    minPrice: 10,
    stockCapacity: 40,
    producingCapacity: 7,
    initialAccountBalance: 100,
    fixedCosts: 10,
    variableCosts: 10,
  }),
  new SimpleSeller({
    productName: 'Pan',
    initialProductPrice: 10,
    minPrice: 11,
    stockCapacity: 50,
    producingCapacity: 5,
    initialAccountBalance: 100,
    fixedCosts: 10,
    variableCosts: 10,
  }),
  new SimpleSeller({
    productName: 'Pan',
    initialProductPrice: 10,
    minPrice: 12,
    stockCapacity: 50,
    producingCapacity: 4,
    initialAccountBalance: 100,
    fixedCosts: 10,
    variableCosts: 10,
  }),
  new SimpleSeller({
    productName: 'Pan',
    initialProductPrice: 10,
    minPrice: 13,
    stockCapacity: 20,
    producingCapacity: 3,
    initialAccountBalance: 80,
    fixedCosts: 10,
    variableCosts: 10,
  }),
  new SimpleSeller({
    productName: 'Pan',
    initialProductPrice: 10,
    minPrice: 12,
    stockCapacity: 50,
    producingCapacity: 5,
    initialAccountBalance: 100,
    fixedCosts: 10,
    variableCosts: 10,
  }),
  new SimpleSeller({
    productName: 'Pan',
    initialProductPrice: 10,
    minPrice: 11,
    stockCapacity: 50,
    producingCapacity: 5,
    initialAccountBalance: 100,
    fixedCosts: 10,
    variableCosts: 10,
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
  }),
  new SimpleSeller({
    productName: 'Pan',
    initialProductPrice: 8,
    minPrice: 10,
    stockCapacity: 50,
    producingCapacity: 10,
    initialAccountBalance: 100,
    fixedCosts: 10,
    variableCosts: 15,
  }),
  new SimpleSeller({
    productName: 'Pan',
    initialProductPrice: 12,
    minPrice: 10,
    stockCapacity: 500,
    producingCapacity: 80,
    initialAccountBalance: 100,
    fixedCosts: 95,
    variableCosts: 9,
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
  }),
  ...new Array(CONSUMER_AMOUNT)
    .fill()
    .map(() => new SimpleBuyer(5 + Math.random() * 10)),
];
const world = new World(agents);
agents.forEach((agent) => agent.init(world));
console.log(
  agents.filter((agent) => agent.constructor.name === 'SimpleBuyer').length
);

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
      agent.constructor.name === 'SimpleSeller' && console.log(agent.toString())
  );
  console.log(`\nSimulation Step ${i} End\n`);
}
