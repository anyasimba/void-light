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

    this.emit('login', {
      username: getCookie('username'),
    });

    let keys = [
      ['w', getCookie('key__w') || Phaser.Keyboard.W],
      ['a', getCookie('key__a') || Phaser.Keyboard.A],
      ['s', getCookie('key__s') || Phaser.Keyboard.S],
      ['d', getCookie('key__d') || Phaser.Keyboard.D],
    ];
    const keysState = {};
    let look = new vec3();
    let move = new vec3();
    const emitMove = () => {
      move.init();
      if (keysState.w) {
        move.y -= 1;
      }
      if (keysState.s) {
        move.y += 1;
      }
      if (keysState.a) {
        move.x -= 1;
      }
      if (keysState.d) {
        move.x += 1;
      }
      if (look.length() > 0) {
        const l = look.unit();
        const r = new vec3();
        r.x = -move.x * l.y - move.y * l.x;
        r.y = move.x * l.x - move.y * l.y;
        move = r;
      }
      this.emit('move', move);
    };
    for (const set of keys) {
      const key = game.input.keyboard.addKey(set[1]);
      key.onDown.add(() => {
        keysState[set[0]] = true;
        emitMove();
      });
      key.onUp.add(() => {
        keysState[set[0]] = false;
        emitMove();
      });
    }

    game.input.keyboard.addKey(
        getCookie('key__space') || Phaser.Keyboard.SPACEBAR)
      .onDown.add(() => {
        this.emit('jump', {});
      });
    game.input.keyboard.addKey(
        getCookie('key__shift') || Phaser.Keyboard.SHIFT)
      .onDown.add(() => {
        this.emit('roll', {});
      });
    game.input.keyboard.addKey(Phaser.Keyboard.C)
      .onDown.add(() => {
        this.emit('c', {});
      });
    game.input.keyboard.addKey(getCookie('key__f') || Phaser.Keyboard.F)
      .onDown.add(() => {
        if (barItems.curItem !== undefined) {
          this.emit('f', {
            i: barItems.curItem,
          });
        }
      });
    game.input.keyboard.addKey(getCookie('key__g') || Phaser.Keyboard.G)
      .onDown.add(() => {
        this.emit('g', {});
      });
    game.input.keyboard.addKey(getCookie('key__r') || Phaser.Keyboard.R)
      .onDown.add(() => {
        this.emit('r', {});
      });
    game.input.keyboard.addKey(getCookie('key__q') || Phaser.Keyboard.Q)
      .onDown.add(() => {
        prevBarItem();
      });
    game.input.keyboard.addKey(getCookie('key__e') || Phaser.Keyboard.E)
      .onDown.add(() => {
        nextBarItem();
      });
    game.input.keyboard.addKey(Phaser.Keyboard.H)
      .onDown.add(() => {
        this.emit('h', {});
      });

    game.input.keyboard.addKey(Phaser.Keyboard.ESC)
      .onDown.add(() => {
        if (this.message) {
          disableMessage();
          return;
        }
        showGameMenu();
      });

    game.input.onDown.add(() => {
      if (global.mouseCapture) {
        global.mouseCapture();
      }
      if (global.mouseAction) {
        if (global.mouseAction.active) {
          global.mouseAction();
          delete global.mouseAction;
          return;
        } else {
          global.mouseAction.active = true;
        }
      }
      if (global.mouseCapture) {
        return;
      }
      this.emit('mouseDown', {
        'x': mx,
        'y': my,
      });
    });

    let lookInterval = false;
    const lookKey = game.input.keyboard.addKey(
      getCookie('key__y') || Phaser.Keyboard.Y);
    lookKey.onDown.add(() => {
      if (lookInterval) {
        clearInterval(lookInterval);
        lookInterval = false;
        look.init();
        return;
      }
      lookInterval = setInterval(() => {
        look = new vec3(
            global.mx,
            global.my)
          .subtract(this.player.pos);
        emitMove();
      }, 100);
    });

    game.input.keyboard.addKey(getCookie('key__p') || Phaser.Keyboard.P)
      .onDown.add(() => {
        if (move.length() > 0) {
          this.emit('mouseDown', {
            'x': this.player.pos.x + move.x * 100,
            'y': this.player.pos.y + move.y * 100,
          });
          return;
        }
        this.emit('mouseDown', {
          'x': this.player.pos.x + this.player.look.x * 100,
          'y': this.player.pos.y + this.player.look.y * 100,
        });
      });

    this.params = {};
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

    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }

  readPacket(packet) {
    const id = packet.data[1].id;
    const parentID = packet.data[1].parentID;
    let name = packet.data[0];
    const data = {};
    for (const k in packet.data[1]) {
      data[k] = packet.data[1][k];
    }
    if (name === 'new') {
      const className = packet.data[1]['class'];
      return new global[className](data);
    }

    if (id) {
      let object;
      if (parentID) {
        const parent = gameObjects[parentID];
        for (let i = 0; i < parent.children.length; ++i) {
          if (parent.children[i].id === id) {
            object = parent.children[i];
            break;
          }
        }
      } else {
        object = gameObjects[id];
      }
      if (object) {
        if (name === 'delete') {
          object.destructor();
        } else {
          name = name[0].toUpperCase() + name.substring(1);
          object['on' + name].call(object, data);
        }
      }
    } else {
      name = name[0].toUpperCase() + name.substring(1);
      this['on' + name].call(this, data);
    }
  }
  onPlayerID(data) {
    this.playerID = data.playerID;
  }
  onRestart(data) {
    this.mainTheme();
    game.layer.sub.deads.removeAll();
    game.texts.removeAll();
  }
  onSoftRestart(data) {
    game.layer.sub.deads.removeAll();
    game.texts.removeAll();
  }
  async onMap(data) {
    this.mapName = data.name;

    const mapData = await httpGet('maps/' + this.mapName + '.json');
    this.map = JSON.parse(mapData);

    this.needLoadMap = true;
  }

  onItems(data) {
    gameMenuView.onItems(data);
  }

  onOpenDoor() {
    makeSuperMessage('ОТКРЫТО', '#2299FF');
  }

  onCanItem() {
    makeMessage('Нажмите [C] чтобы поднять..', '#AAEEFF');
  }
  onCanOpenDoor() {
    makeMessage('Нажмите [C] чтобы открыть..', '#AAEEFF');
  }
  onCanCloseDoor() {
    makeMessage('Нажмите [C] чтобы закрыть..', '#AAEEFF');
  }
  onCanTalk() {
    makeMessage('Нажмите [C] чтобы говорить..', '#AAEEFF');
  }
  onCanCheckpoint() {
    makeMessage('Нажмите [C] чтобы отдохнуть..', '#AAEEFF');
  }
  onStopCan() {
    disableMessage();
    if (this.nextMessage) {
      clearTimeout(this.nextMessage);
      delete this.nextMessage;
    }
  }

  onGotItem(data) {
    disableMessage();
    let text = '(Вы поднимаете „' +
      global['client__' + data.slug].LANG_RU + '“';
    if (data.count) {
      text += ', ' + data.count + 'шт.';
    }
    text += ')';
    makeMessage(text, '#EEEEEE');
    this.nextMessage = setTimeout(() => {
      delete this.nextMessage;
      disableMessage();
    }, 800);
  }

  onTalk(data) {
    const dialog = global[data.name][data.talking];
    const lang = dialog.LANG_RU.replace(/ +/g, ' ').slice(1, -2);
    makeMessage(lang, '#AAEEFF', 'Neucha');
    const answers = [];
    for (let i = 1; i <= 6; ++i) {
      if (dialog[i]) {
        answers.push(dialog[i]);
      }
    }
    const n = answers.length - 1;
    for (const k in answers) {
      const a = dialog[parseInt(k) + 1];
      let i = 0.5;
      if (n > 0) {
        i = k / n;
      }
      makeMessageOption(a[0], '#AAEEFF', 'Neucha', i, () => {
        this.emit('talk', {
          variant: parseInt(k) + 1,
        })
      });
    }
  }

  onUseCheckpoint() {
    makeMessage('Душа прикреплена к кольцу', '#AAEEFF', 'Neucha');
    makeMessageOption('Переместиться', '#AAAAAA', 'Neucha', -1, () => {});

    makeMessageOption('Повысить уровень', '#AAEEFF', 'Neucha', 0.5, () => {
      const voidsCount = levelLimit(this.params.fighter.params.level);
      makeMessage(`Повысить уровень за ${voidsCount} пустоты?`,
        '#AAEEFF', 'Neucha');
      makeMessageOption('Да', '#AAEEFF', 'Neucha', 0, () => {
        if (voidsCount > this.params.fighter.params.voidsCount) {
          makeMessage('Недостаточно пустоты..', '#FFAAAA',
            'Neucha');
          this.nextMessage = setTimeout(() => {
            delete this.nextMessage;
            this.onUseCheckpoint();
          }, 1500);
          return;
        }

        this.emit('upLevel', {});
        showGameMenu(true);
        gameMenuView.switch(0);
        makeMessage('Повышен уровень..', '#FFEEAA', 'Neucha');
        this.nextMessage = setTimeout(() => {
          delete this.nextMessage;
          this.onUseCheckpoint();
        }, 800);
      });
      makeMessageOption('Нет', '#AAEEFF', 'Neucha', 1, () => {
        this.onUseCheckpoint();
      });
    });

    makeMessageOption('Отдать свету', '#AAAAAA', 'Neucha', 2, () => {});
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

  onParam(data) {
    this.params[data.slug] = this.params[data.slug] || {};
    this.params[data.slug][data.key] = data.value;
  }

  onOtherClient() {
    makeMessage('Кто-то играет за вас..', '#FFAAAA', 'Neucha');
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }
}