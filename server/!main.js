const N = 100;

function initUpdate() {
  global.time = performance.now();

  run(async() => {
    try {
      while (true) {
        global.dt = performance.now() - time;
        global.time += dt;
        console.log(dt);
        global.dt *= 0.001;
        if (dt > 1 / 20) {
          global.dt = 1 / 20;
        }

        for (let i = 0; i < N; ++i) {
          gameLevelZones[i].update();
        }

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

        await sleep(0);
      }
    } catch (e) {
      console.log(e, e.stack);
      process.exit(1);
    }
  });
}

export function main() {
  global.gameLevelZones = [];
  for (let i = 0; i < N; ++i) {
    global.gameLevelZones[i] = new GameLevelZone('stage1__1', i);
  }

  initUpdate();

  global.server = Server();
  console.log('Server started');
}