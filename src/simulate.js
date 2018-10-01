const SimpleSeller = require('./models/SimpleSeller');
const SimpleBuyer = require('./models/SimpleBuyer');
const World = require('./models/World');
const Chart = require('chart.js');
const jQuery = require('jquery');

const CONSUMER_AMOUNT = 600;
const SIMULATION_STEPS = 200;
const COLORS = [
  '#f20000',
  '#400000',
  '#b22d2d',
  '#e6acac',
  '#f28979',
  '#59332d',
  '#b24700',
  '#662900',
  '#e6c3ac',
  '#4d4139',
  '#cc8533',
  '#ffcc00',
  '#735c00',
  '#ccc566',
  '#394020',
  '#99e600',
  '#258c00',
  '#d0ffbf',
  '#7d9973',
  '#084000',
  '#3df26d',
  '#33cc99',
  '#004d3d',
  '#39dae6',
  '#86b0b3',
  '#004759',
  '#80d5ff',
  '#296ca6',
  '#0d2133',
  '#39414d',
  '#3056bf',
  '#80a2ff',
  '#b6c6f2',
  '#0022ff',
  '#000033',
  '#b380ff',
  '#77698c',
  '#3c0059',
  '#bf00b3',
  '#ffbff2',
  '#663355',
  '#d90074',
  '#73002e',
  '#331a1d',
];

let chart = null;
let graphData = [];

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function main() {
  drawChart();
  const agents = [...createSellers(), ...createBuyers()];
  const world = new World(agents);
  agents.forEach((agent) => agent.init(world));
  let i;
  for (i = 0; i < SIMULATION_STEPS; i++) {
    console.log(`\nSimulation Step ${i} Start\n`);
    agents.forEach((elem, index) => {
      if (elem.constructor.name !== 'SimpleSeller') {
        return;
      }
      graphData[index] = graphData[index] || {
        backgroundColor: COLORS[index],
        borderColor: COLORS[index],
        pointRadius: 0,
        label: `Seller ${index}`,
        fill: false,
      };
      graphData[index].data = graphData[index].data || [];
      graphData[index].data[i] = { x: i, y: elem.accountBalance };
      console.log(graphData);
      chart.update();
    });
    agents.forEach((agent) => {
      agent.enter();
    });
    agents.forEach((agent) => {
      agent.act(1);
    });
    agents.forEach((agent) => {
      agent.exit();
    });

    // agents.forEach(
    //   (agent) =>
    //     agent.constructor.name === 'SimpleSeller' &&
    //     console.log(agent.toString())
    // );
  }
  agents.forEach((agent) => console.log(agent.toString()));
}

function drawChart() {
  ctx = document.getElementById('chart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: graphData,
    },
    options: {
      responsive: true,
      showLines: true,
      title: {
        display: true,
        text: 'Money by seller',
        fontColor: 'rgb(10, 10, 10)',
        fontSize: 16,
      },
      legend: {
        display: true,
        labels: {
          fontColor: 'rgb(10, 10, 10)',
          fontSize: 12,
        },
      },
    },
  });
}

function createBuyers() {
  return new Array(CONSUMER_AMOUNT).fill().map(() => {
    const q = Math.random();
    return new SimpleBuyer({
      maxPrice: 5 + Math.random() * 10,
      qualityThreshold: Math.min(0.95, 1 - q * q),
      buyingPeriod: Math.random() > 0.5 ? 2 : 1,
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
      producingCapacity: 50,
      initialAccountBalance: 100,
      fixedCosts: 70,
      variableCosts: 5,
      quality: 0.78,
    }),
    new SimpleSeller({
      productName: 'Pan',
      initialProductPrice: 8,
      minPrice: 8,
      stockCapacity: 100,
      producingCapacity: 15,
      initialAccountBalance: 1000,
      fixedCosts: 18,
      variableCosts: 10,
      quality: 0.6,
    }),
    new SimpleSeller({
      productName: 'Pan',
      initialProductPrice: 8,
      minPrice: 10,
      stockCapacity: 50,
      producingCapacity: 20,
      initialAccountBalance: 100,
      fixedCosts: 20,
      variableCosts: 11,
      quality: 0.85,
    }),
    new SimpleSeller({
      productName: 'Pan',
      initialProductPrice: 12,
      minPrice: 10,
      stockCapacity: 500,
      producingCapacity: 80,
      initialAccountBalance: 100,
      fixedCosts: 350,
      variableCosts: 5,
      quality: 0.72,
    }),
    new SimpleSeller({
      productName: 'Pan',
      initialProductPrice: 15,
      minPrice: 6,
      stockCapacity: 500,
      producingCapacity: 200,
      initialAccountBalance: 100,
      fixedCosts: 500,
      variableCosts: 6,
      quality: 0.65,
    }),
  ];
}

jQuery(() => main());
