class Agent {
  init(world) {
    this.world = world;
  }
  enter() {}
  act(timeDelta) {}
  exit() {}
  getWorld() {
    return this.world;
  }
}

module.exports = Agent;
