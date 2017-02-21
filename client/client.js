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

      const groundLayer = new Phaser.Group(game);
      for (let y = 0; y < this.map.height; ++y) {
        for (let x = 0; x < this.map.width; ++x) {
          const i = y * this.map.width + x;
          const v = ground.data[i];

          if (v === 1) {
            const view = new Phaser.TileSprite(
              game, 0, 0, WALL_SIZE, WALL_SIZE, 'bricks');

            const f = 1;
            view.tilePosition.x = -x * WALL_SIZE / f;
            view.tilePosition.y = -y * WALL_SIZE / f;
            view.tileScale.x = f;
            view.tileScale.y = f;

            view.x = x * WALL_SIZE;
            view.y = y * WALL_SIZE;

            groundLayer.add(view);
          }
        }
      }

      const f = 4;
      for (let x = 0; x < f; ++x) {
        for (let y = 0; y < f; ++y) {
          const ax = groundLayer.width / f * x;
          const ay = groundLayer.height / f * y;
          const groundTexture = new Phaser.RenderTexture(
            game, groundLayer.width / f, groundLayer.height / f,
            null, null, 1);
          groundTexture.renderXY(
            groundLayer, -ax, -ay);
          game.scene.add(new Phaser.Sprite(game, ax, ay, groundTexture));
        }
      }
      groundLayer.destroy();
    });
  }
}