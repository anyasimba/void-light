function initUpdate() {
  global.time = performance.now();

  run(async() => {
    try {
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
        global.tasks = global.tasks || {};
        for (const k in tasks) {
          const client = tasks[k];
          delete tasks[k];
          for (const k in client.tasks) {
            client.tasks[k]();
          }
          client.tasks = [];
        }

        await sleep(Math.max(1000.0 / 30.0 - performance.now() + b, 0));
      }
    } catch (e) {
      console.log(e, e.stack);
      process.exit(1);
    }
  });
}

export function main() {
  global.gameLevelZone = new GameLevelZone('1');

  initUpdate();

  global.server = Server();
  console.log('Server started');
}