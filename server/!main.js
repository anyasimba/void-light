function initUpdate() {
  global.time = performance.now();

  setInterval(() => {
    global.dt = performance.now() - time;
    global.time += dt;
    global.dt *= 0.001;

    for (const k in gameObjects) {
      const object = gameObjects[k];
      object.update();
    }
  }, 1000.0 / 60.0);
}

export function main() {
  initUpdate();

  global.gameLevelZone = new GameLevelZone({
    w: 1024,
    h: 1024,
  });

  global.server = Server();
  console.log('Server started');
}