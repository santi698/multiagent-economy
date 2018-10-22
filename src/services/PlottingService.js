const Chart = require('chart.js');

const COLORS = [
  '#d32f2f',
  '#f06292',
  '#ab47bc',
  '#283593',
  '#42a5f5',
  '#81d4fa',
  '#64ffda',
  '#4caf50',
  '#76ff03',
  '#ffee58',
  '#ff6f00',
  '#8d6e63',
  '#546e7a',
];

class PlottingService {
  constructor() {
    this.graphData1 = [];
    this.graphData2 = [];
    this.graphData3 = [];
    this.graphData4 = [];
    this.chartsContainer = document.getElementById('charts');
    this.chart1 = this.createChart(this.graphData1, 'Money by seller');
    this.chart2 = this.createChart(this.graphData2, 'Price by seller');
    this.chart3 = this.createChart(this.graphData3, '% produce sold by seller');
    this.chart4 = this.createChart(this.graphData4, 'Profit');
  }

  connectChartsWithSimulation(simulation) {
    simulation.onSimulationStepDone((world, progress) => {
      const agents = world.getAgents();
      agents.forEach((agent, index) => {
        if (agent.constructor.name !== 'SimpleSeller') {
          return;
        }
        this.addDataPoint(
          this.graphData1,
          `Seller ${index}. ${agent.toString()}`,
          index,
          progress,
          agent.accountBalance
        );
        this.addDataPoint(
          this.graphData2,
          `Seller ${index}. ${agent.toString()}`,
          index,
          progress,
          agent.productPrice
        );
        this.addDataPoint(
          this.graphData3,
          `Seller ${index}. ${agent.toString()}`,
          index,
          progress,
          agent.periodQuantitySold / agent.producingCapacity
        );
        this.addDataPoint(
          this.graphData4,
          `Seller ${index}. ${agent.toString()}`,
          index,
          progress,
          agent.productPrice * agent.periodQuantitySold - agent.variableCosts * agent.periodProduce - agent.fixedCosts
        );
      });
      this.chart1.update();
      this.chart2.update();
      this.chart3.update();
      this.chart4.update();
    });
  }

  resetCharts() {
    this.graphData1 = [];
    this.graphData2 = [];
    this.graphData3 = [];
    this.graphData4 = [];

    this.chart1.update();
    this.chart2.update();
    this.chart3.update();
    this.chart4.update();
  }

  addDataPoint(graphData, label, index, x, y) {
    graphData[index] = graphData[index] || {
      backgroundColor: COLORS[index],
      borderColor: COLORS[index],
      pointRadius: 0,
      lineTension: 0,
      label: label,
      fill: false,
    };
    graphData[index].data = graphData[index].data || [];
    graphData[index].data[x] = { x, y };
  }

  createChart(graphData, title) {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 150;
    this.chartsContainer.append(canvas);
    const context = canvas.getContext('2d');
    return new Chart(context, {
      type: 'scatter',
      data: {
        datasets: graphData,
      },
      options: {
        responsive: true,
        showLines: true,
        animation: {
          duration: 100,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                min: 0,
                max: SIMULATION_STEPS,
              },
            },
          ],
        },
        title: {
          display: true,
          text: title,
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
}

module.exports = PlottingService;
