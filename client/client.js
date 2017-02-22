export class Client extends global.Client {
  constructor() {
    super();

    this.packets = [];

    this.sock.onevent = packet => {
      for (const k in packet.data[1]) {
        const p = packet.data[1][k];
        this.readPacket({
          data: p,
        });
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

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      .onDown.add(() => {
        this.emit('jump', {});
      });
    game.input.keyboard.addKey(Phaser.Keyboard.SHIFT)
      .onDown.add(() => {
        this.emit('roll', {});
      });

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

  readPacket(packet) {
    const id = packet.data[1].id;
    const parentID = packet.data[1].parentID;
    let name = packet.data[0];
    const packetTime = packet.data[1].packetTime;

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
  }
  onPlayerID(data) {
    this.playerID = data.playerID;
  }
  onDie(data) {
    game.levelSound.restart();
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

      const ts = WALL_SIZE * 20;
      const xn = Math.ceil(this.map.width * WALL_SIZE / ts);
      const yn = Math.ceil(this.map.height * WALL_SIZE / ts);
      const textures = [];

      for (let x = 0; x < xn; ++x) {
        for (let y = 0; y < yn; ++y) {
          const tex = new Phaser.RenderTexture(
            game, ts, ts, null, null, 1);

          textures[x] = textures[x] || [];
          textures[x][y] = tex;
        }
      }

      const bricksView = new Phaser.TileSprite(
        game, 0, 0, WALL_SIZE, WALL_SIZE, 'bricks');

      for (let y = 0; y < this.map.height; ++y) {
        for (let x = 0; x < this.map.width; ++x) {
          const i = y * this.map.width + x;
          const v = ground.data[i];

          if (v === 1) {
            const f = 1;
            bricksView.tilePosition.x = -x * WALL_SIZE / f;
            bricksView.tilePosition.y = -y * WALL_SIZE / f;
            bricksView.tileScale.x = f;
            bricksView.tileScale.y = f;

            const cx = Math.floor(x * WALL_SIZE / ts);
            const cy = Math.floor(y * WALL_SIZE / ts);
            textures[cx][cy].renderXY(
              bricksView,
              x * WALL_SIZE - cx * ts,
              y * WALL_SIZE - cy * ts,
              false);
          }
        }
      }

      for (let x = 0; x < xn; ++x) {
        for (let y = 0; y < yn; ++y) {
          game.scene.add(new Phaser.Sprite(game, x * ts, y * ts,
            textures[x][y]));
        }
      }

      bricksView.destroy();
    });
  }
}