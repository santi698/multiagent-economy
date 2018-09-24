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

export default Agent;
