function initUpdate() {
  global.time = performance.now();

  setInterval(() => {
    global.dt = performance.now() - time;
    global.time += dt;
    global.dt *= 0.001;

    for (const id in gameObjects) {
      const object = gameObjects[id];
      object.update();
    }

    gameLevelZone.update();
    gameLevelZone.updateLow();
  }, 1000.0 / 60.0);
}

export function main() {
  global.gameLevelZone = new GameLevelZone('1');

  initUpdate();

  global.server = Server();
  console.log('Server started');
}