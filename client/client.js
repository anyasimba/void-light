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
}