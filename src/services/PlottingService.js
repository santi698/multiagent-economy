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
    const ctx1 = document.getElementById('chart1').getContext('2d');
    this.chart1 = this.createChart(ctx1, this.graphData1, 'Money by seller');
    const ctx2 = document.getElementById('chart2').getContext('2d');
    this.chart2 = this.createChart(ctx2, this.graphData2, 'Price by seller');
  }

  connectChartsWithSimulation(simulation) {
    simulation.onSimulationStepDone((world, progress) => {
      const agents = world.getAgents();
      agents.forEach((elem, index) => {
        if (elem.constructor.name !== 'SimpleSeller') {
          return;
        }
        this.addDataPoint(
          this.graphData1,
          index,
          progress,
          elem.accountBalance
        );
        this.addDataPoint(this.graphData2, index, progress, elem.productPrice);
      });
      this.chart1.update();
      this.chart2.update();
    });
  }

  resetCharts() {
    this.graphData1 = [];
    this.graphData2 = [];

    this.chart1.update();
    this.chart2.update();
  }

  addDataPoint(graphData, index, x, y) {
    graphData[index] = graphData[index] || {
      backgroundColor: COLORS[index],
      borderColor: COLORS[index],
      pointRadius: 0,
      lineTension: 0,
      label: `Seller ${index}`,
      fill: false,
    };
    graphData[index].data = graphData[index].data || [];
    graphData[index].data[x] = { x, y };
  }

  createChart(context, graphData, title) {
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
