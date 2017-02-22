function initUpdate() {
  global.time = performance.now();

  run(async() => {
    while (true) {
      global.dt = performance.now() - time;
      global.time += dt;
      global.dt *= 0.001;

      let b = performance.now();
      for (const id in gameObjects) {
        const object = gameObjects[id];
        object.update();
      }

      gameLevelZone.update();

      global.packets = global.packets || {};
      for (const k in packets) {
        const client = packets[k];
        delete packets[k];
        client.__sock.emit('p', client.packets);
        delete client.packets;
      }

      await sleep(Math.max(1000.0 / 60.0 - performance.now() + b, 0));
    }
  });
}

export function main() {
  global.gameLevelZone = new GameLevelZone('1');

  initUpdate();

  global.server = Server();
  console.log('Server started');
}