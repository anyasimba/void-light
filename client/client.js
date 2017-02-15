export class Client extends global.Client {
  constructor() {
    super();

    this.sock.onevent = packet => {
      const id = packet.data[1].id;
      const parentID = packet.data[1].parentID;
      let name = packet.data[0];

      if (name === 'new') {
        return new global[packet.data[1]['class']](packet.data[1]);
      }
      if (name === 'delete') {
        const object = gameObjects[id];
        if (object) {
          gameObjects[id].destructor();
        }
        return;
      }

      name = name[0].toUpperCase() + name.substring(1);
      if (id) {
        let object;
        if (parentID) {
          object = gameObjects[parentID].children[id];
        } else {
          object = gameObjects[id];
        }
        if (object) {
          object['on' + name].call(object, packet.data[1]);
        }
      } else {
        this['on' + name].call(this, packet.data[1]);
      }
    };

    let keys = [
      ['w', Phaser.Keyboard.W],
      ['a', Phaser.Keyboard.A],
      ['s', Phaser.Keyboard.S],
      ['d', Phaser.Keyboard.D],
    ];
    for (const set of keys) {
      const key = game.input.keyboard.addKey(set[1]);
      key.onDown.add(() => {
        this.emit('move', {
          [set[0]]: true,
        });
      });
      key.onUp.add(() => {
        this.emit('move', {
          [set[0]]: false,
        });
      });
    }

    game.input.onDown.add(() => {
      this.emit('mouseDown', {
        'x': mx,
        'y': my,
      });
    });
  }

  onConnect() {
    console.log('Client connected');
  }
  onDisconnect() {
    console.log('Client disconnected');

    for (const k in gameObjects) {
      const object = gameObjects[k];
      object.destructor();
    }
  }

  onPlayerID(data) {
    this.playerID = data.playerID;
  }
  onMap(data) {
    run(async() => {
      this.mapName = data.name;

      const mapData = await httpGet('maps/' + this.mapName + '.json');
      this.map = JSON.parse(mapData);

      this.w = this.map.width * 32;
      this.h = this.map.height * 32;

      const ground = this.map.layers[0];
      const grid = [];
      for (let y = 0; y < this.map.height; ++y) {
        for (let x = 0; x < this.map.width; ++x) {
          const i = y * this.map.width + x;
          const v = ground.data[i];

          if (v === 1) {
            grid[x] = grid[x] || [];
            grid[x][y] = true;
          }
        }
      }
      for (let y = 0; y < this.map.height; ++y) {
        for (let x = 0; x < this.map.width; ++x) {
          const i = y * this.map.width + x;
          const v = ground.data[i];

          if (v === 1) {
            const view = new Phaser.Graphics(game, 0, 0);
            const a = game.stage.backgroundColor;
            view.beginFill(0x111111 + a, 1);
            view.drawRect(0, 0, WALL_SIZE, WALL_SIZE);
            view.endFill();

            view.lineStyle(3, 0x222222 + a, 1);
            if (!grid[x + 1] || !grid[x + 1][y]) {
              view.moveTo(WALL_SIZE, 0);
              view.lineTo(WALL_SIZE, WALL_SIZE);
            }
            view.lineStyle(3, 0x333333 + a, 1);
            if (!grid[x - 1] || !grid[x - 1][y]) {
              view.moveTo(0, 0);
              view.lineTo(0, WALL_SIZE);
            }
            view.lineStyle(3, 0x222222 + a, 1);
            if (!grid[x] || !grid[x][y + 1]) {
              view.moveTo(0, WALL_SIZE);
              view.lineTo(WALL_SIZE, WALL_SIZE);
            }
            view.lineStyle(3, 0x333333 + a, 1);
            if (!grid[x] || !grid[x][y - 1]) {
              view.moveTo(0, 0);
              view.lineTo(WALL_SIZE, 0);
            }
            view.endFill();


            view.x = x * WALL_SIZE;
            view.y = y * WALL_SIZE;

            game.scene.add(view);
          }
        }
      }
    });
  }
}