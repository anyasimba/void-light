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
    game.input.keyboard.addKey(Phaser.Keyboard.C)
      .onDown.add(() => {
        this.emit('c', {});
      });
    game.input.keyboard.addKey(Phaser.Keyboard.F)
      .onDown.add(() => {
        this.emit('f', {});
      });
    game.input.keyboard.addKey(Phaser.Keyboard.R)
      .onDown.add(() => {
        this.emit('r', {});
      });
    game.input.keyboard.addKey(Phaser.Keyboard.Q)
      .onDown.add(() => {
        this.emit('q', {});
      });
    game.input.keyboard.addKey(Phaser.Keyboard.E)
      .onDown.add(() => {
        this.emit('e', {});
      });
    game.input.keyboard.addKey(Phaser.Keyboard.H)
      .onDown.add(() => {
        this.emit('h', {});
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

    window.location.reload();
  }

  readPacket(packet) {
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
  }
  onPlayerID(data) {
    this.playerID = data.playerID;
  }
  onRestart(data) {
    this.mainTheme();
    game.deads.removeAll();
    game.texts.removeAll();
  }
  onMap(data) {
    run(async() => {
      this.mapName = data.name;

      const mapData = await httpGet('maps/' + this.mapName + '.json');
      this.map = JSON.parse(mapData);

      this.w = this.map.width * WALL_SIZE;
      this.h = this.map.height * WALL_SIZE;

      const ground = this.map.layers[0];
      const grid = [];
      for (let y = 0; y < this.map.height; ++y) {
        for (let x = 0; x < this.map.width; ++x) {
          const i = y * this.map.width + x;
          const v = ground.data[i];
          const slug = mapIDs[v];
          if (slug) {
            grid[x] = grid[x] || [];
            grid[x][y] = slug;
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
      const doorView = new Phaser.TileSprite(
        game, 0, 0, WALL_SIZE, WALL_SIZE, 'door');

      console.log('loading map...');
      for (let y = 0; y < this.map.height; ++y) {
        for (let x = 0; x < this.map.width; ++x) {
          const i = y * this.map.width + x;
          const v = ground.data[i];
          const slug = mapIDs[v];

          let view;
          switch (slug) {
            case 'wall':
              view = bricksView;
              break;
            case 'door':
              view = doorView;
              break;
            default:
          }
          if (view) {
            const f = 1;
            view.tilePosition.x = -x * WALL_SIZE / f;
            view.tilePosition.y = -y * WALL_SIZE / f;
            view.tileScale.x = f;
            view.tileScale.y = f;

            const cx = Math.floor(x * WALL_SIZE / ts);
            const cy = Math.floor(y * WALL_SIZE / ts);
            textures[cx][cy].renderXY(
              view,
              x * WALL_SIZE - cx * ts,
              y * WALL_SIZE - cy * ts,
              false);
          }
        }
        await sleep(0);
      }
      console.log('done');

      for (let x = 0; x < xn; ++x) {
        for (let y = 0; y < yn; ++y) {
          const sprite = new Phaser.Sprite(
            game, x * ts, y * ts,
            textures[x][y]);
          sprite.visible = false;
          sprite.update = () => {
            if (global.client && global.client.player) {
              const cx = sprite.x + ts * 0.5;
              const cy = sprite.y + ts * 0.5;
              const dx = Math.abs(cx - client.player.pos.x);
              const dy = Math.abs(cy - client.player.pos.y);
              if (dx < ts * 2 && dy < ts) {
                sprite.visible = true;
              } else {
                sprite.visible = false;
              }
            }
          };
          game.walls.add(sprite);
        }
      }

      bricksView.destroy();
    });
  }

  onOpenDoor() {
    makeSuperMessage('ОТКРЫТО', '#2299FF');
  }

  mainTheme() {
    game.bossBackSound.stop();
    game.youDiedSound.stop();
    game.backSound.restart('', 0, 0.5, true);
  }
  bossTheme() {
    game.backSound.stop();
    game.youDiedSound.stop();
    game.bossBackSound.restart('', 0, 1, true);
  }
  diedTheme() {
    game.backSound.stop();
    game.bossBackSound.stop();
    game.youDiedSound.play('', 0, 1, false);
  }
  onBossArea() {
    game.bossAreaSound.play();
    this.bossTheme();
  }
  onBossDead() {
    game.bossDeadSound.play();
    this.mainTheme();
    makeSuperMessage('ПОБЕДА', '#FFFF22');
  }
}