const SIMULATION_STEPS = 400;

class Simulation {
  constructor(world, simulationSteps = SIMULATION_STEPS) {
    this.world = world;
    this.simulationSteps = simulationSteps;
    this.callbacks = {
      onSimulationStepDone: [],
    };
    this.init();
    this.progress = 0;
  }

  init() {
    this.world.getAgents().forEach((agent) => agent.init(this.world));
  }

  onSimulationStepDone(callback) {
    this.callbacks.onSimulationStepDone.push(callback);
  }

  simulate() {
    console.log('Starting simulation');
    setTimeout(this.runSimulationStep.bind(this), 0);
  }

  runSimulationStep() {
    if (this.progress === this.simulationSteps) {
      return;
    }
    console.log(`\nSimulation Step ${this.progress} Start\n`);
    const agents = this.world.getAgents();
    agents.forEach((elem, index) => {
      if (elem.constructor.name !== 'SimpleSeller') {
        return;
      }
      agents.forEach((agent) => {
        agent.enter();
      });
      agents.forEach((agent) => {
        agent.act(1);
      });
      agents.forEach((agent) => {
        agent.exit();
      });
      this.callbacks.onSimulationStepDone.forEach((callback) =>
        callback(this.world, this.progress)
      );
    });
    this.progress++;
    setTimeout(this.runSimulationStep.bind(this), 0);
  }
}

module.exports = Simulation;
