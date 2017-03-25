const N = 8;

function initUpdate() {
  global.time = performance.now();

  run(async() => {
    try {
      let minDT = 1000;
      let maxDT = 0;
      let curDT;
      setInterval(() => {
        minDT = 1000;
        maxDT = 0;
      }, 500);
      while (true) {
        global.dt = performance.now() - time;
        global.time += dt;
        minDT = Math.min(minDT, dt);
        maxDT = Math.max(maxDT, dt);
        curDT = dt;
        global.dt *= 0.001;
        if (dt > 1 / 20) {
          global.dt = 1 / 20;
        }

        for (let i = 0; i < gameZones.length; ++i) {
          gameZones[i].update();
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

        const sleepTime = Math.max(
          1000.0 / 30.0 - performance.now() + time, 0);
        //console.log(curDT, minDT, maxDT, (sleepTime * 3) + '%');
        await sleep(sleepTime);
      }
    } catch (e) {
      console.log(e, e.stack);
      process.exit(1);
    }
  });
}

export async function main() {
  global.server = Server();

  initUpdate();

  console.log('Server started');
}