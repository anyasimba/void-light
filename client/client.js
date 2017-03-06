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
      const className = packet.data[1]['class'];
      return new global[className](packet.data[1]);
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
  async onMap(data) {
    this.mapName = data.name;

    const mapData = await httpGet('maps/' + this.mapName + '.json');
    this.map = JSON.parse(mapData);

    this.needLoadMap = true;
  }

  onOpenDoor() {
    makeSuperMessage('ОТКРЫТО', '#2299FF');
  }

  onCanOpenDoor() {
    makeMessage('Нажмите [C] чтобы открыть..', '#2299FF');
  }
  onCanCloseDoor() {
    makeMessage('Нажмите [C] чтобы закрыть..', '#2299FF');
  }
  onCanTalk() {
    makeMessage('Нажмите [C] чтобы говорить..', '#2299FF');
  }
  onStopCan() {
    disableMessage();
  }

  onTalk(data) {
    const dialog = global[data.name][data.talking];
    dialog.LANG_RU = dialog.LANG_RU.replace(/ +/g, ' ');
    if (this.message) {
      disableMessage();
    }
    makeMessage(dialog.LANG_RU, '#AAEEFF', 'Neucha');
    makeMessageOption('Да', '#AAEEFF', 'Neucha', 0);
    makeMessageOption('Нет', '#AAEEFF', 'Neucha', 1);
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