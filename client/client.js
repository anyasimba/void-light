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
    global.keysState = keysState;
    let look = new vec3();
    let move = new vec3();
    global.look = look;
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
      const r = new vec3();
      let a = game.cameraAngle + 90;
      const cx = Math.cos(a * Math.PI / 180.0);
      const cy = -Math.sin(a * Math.PI / 180.0);
      r.x = -move.x * cy - move.y * cx;
      r.y = move.x * cx - move.y * cy;
      move = r;
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
        let needShowMenu = true;
        if (isGameMenuShowed) {
          hideGameMenu();
          needShowMenu = false;
        }
        if (isCheckpointsListShowed) {
          hideCheckpointsList();
          needShowMenu = false;
        }
        if (this.message) {
          disableMessage();
          needShowMenu = false;
        }
        if (needShowMenu) {
          showGameMenu();
        }
      });

    game.input.onDown.add(() => {
      if (!client.player) {
        return;
      }
      if (isGameMenuShowed || isCheckpointsListShowed) {
        return;
      }
      global.lmx = global.mx - client.player.pos.x;
      global.lmy = global.my - client.player.pos.y;

      const vx = mx - game.cameraPos.x;
      const vy = my - game.cameraPos.y;
      global.lvx = vx;
      global.lvy = vy;

      const image = new Phaser.Image(game, 0, 0, 'hitbar');
      image.anchor.set(0.5);
      image.scale.set(2);
      image.angle = new vec3(lmx, lmy).toAngle() + 90;
      image.alpha = 0.2;
      image.update = () => {
        image.x = game.cameraPos.x + vx;
        image.y = game.cameraPos.y + vy;
      }
      game.scene.add(image);
      game.hitbar = image;
    });
    game.input.onUp.add(() => {
      if (game.hitbar) {
        game.hitbar.destroy();
      }
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
      if (!global.lmx) {
        return;
      }
      let type = 0;
      const m = new vec3(lmx, lmy);
      const mouseD = (new vec3(mx, my)).subtract(new vec3(
        lvx + game.cameraPos.x,
        lvy + game.cameraPos.y));
      let a = m.toAngle() - mouseD.toAngle();
      if (a > 180) {
        a -= 360;
      }
      if (a < -180) {
        a += 360;
      }
      if (mouseD.length() < 40) {
        type = 0;
      } else {
        if (Math.abs(a) < 45) {
          type = 1;
        }
        if (a > 45) {
          type = 2;
        }
        if (a < -45) {
          type = 2;
        }
        if (Math.abs(a) > 135) {
          type = 3;
        }
      }
      this.emit('mouseDown', {
        'x': lvx + game.cameraPos.x,
        'y': lvy + game.cameraPos.y,
        'type': type,
      });
      delete global.lmx;
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
      if (gameObjects[id]) {
        gameObjects[id].destructor();
      }
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
  onZoneID(data) {
    this.zoneID = data.ID;
  }
  onChangeZone() {
    console.log('CLEAR ALL');
    for (const k in gameObjects) {
      const object = gameObjects[k];
      object.destructor();
    }
  }
  onRestart(data) {
    this.mainTheme();
    game.texts.removeAll();
  }
  onSoftRestart(data) {
    game.texts.removeAll();
  }
  async onMap(data) {
    this.mapName = data.name;

    for (const k in gameObjects) {
      const o = gameObjects[k];
      o.destructor();
    }

    loadingProgress(0, 'map');
    await sleep(100);

    const mapData = await httpGet('maps/' + this.mapName + '.json');
    this.map = JSON.parse(mapData);

    loadingProgress(30, 'map');
    await sleep(100);

    this.needLoadMap = true;
  }

  onItems(data) {
    gameMenuView.onItems(data);
  }

  onMessage(data) {
    makeMessage(data.message, '#AAEEFF');
    setTimeout(() => {
      disableMessage();
    }, 5000);
  }

  onCanItem(data) {
    if (data.slug === 'green-sign') {
      if (data.target === client.playerID) {
        makeMessage('Нажмите [C] чтобы убрать..', '#AAEEFF');
      } else {
        makeMessage('Нажмите [C] чтобы помочь..', '#AAEEFF');
      }
      return;
    }
    if (data.slug === 'red-sign') {
      if (data.target === client.playerID) {
        makeMessage('Нажмите [C] чтобы убрать..', '#AAEEFF');
      } else {
        makeMessage('Нажмите [C] чтобы принять вызов..', '#AAEEFF');
      }
      return;
    }
    if (data.slug === 'blue-sign') {
      if (data.target === client.playerID) {
        makeMessage('Нажмите [C] чтобы убрать..', '#AAEEFF');
      } else {
        makeMessage('Нажмите [C] чтобы принять помощь..', '#AAEEFF');
      }
      return;
    }
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
    makeMessageOption('Переместиться', '#AAEEFF', 'Neucha', -0.5, () => {
      showCheckpointsList();
    });

    makeMessageOption('Повысить уровень', '#AAEEFF', 'Neucha', 1.5, () => {
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
  }

  loadBossAudio() {
    let fmt = '.ogg';
    if (detectIE()) {
      fmt = '.mp3';
    }
    const config = {
      stage1__1: 'assets/audio/boss1__Dark Descent (Extended Cut)',
      stage1__2: 'assets/audio/boss2__TheLoomingBattle',
      stage1__3: 'assets/audio/boss3__Welcome to Com-Mecha',
      stage1__3a: 'assets/audio/boss3a__Defying Commodus',
      stage1__4: 'assets/audio/boss4__Инструментальная симфония',
      stage1__5: 'assets/audio/boss5__medieval',
      stage1__6: 'assets/audio/boss6__Brave Solders',
    }
    const mapName = this.mapName;
    this.loadingCB = () => {
      delete this.loadingCB;
      game.bossBackSound[mapName] = game.add.sound(
        'bossBack__' + mapName, 0.5, true);
      game.bossBackSound[mapName].restart('', 0, 1, true);
    }
    game.load.audio(
      'bossBack__' + mapName, config[mapName] + fmt);
    game.load.start();
  }
  mainTheme() {
    delete this.loadingCB;
    game.bossBackSound = game.bossBackSound || {};
    if (game.bossBackSound[this.mapName]) {
      game.bossBackSound[this.mapName].stop();
    }
    game.youDiedSound.stop();
    game.backSound.restart('', 0, 0.5, true);
    game.isBoss = false;
    game.preZoom = 1;
  }
  bossTheme() {
    game.backSound.stop();
    game.youDiedSound.stop();
    game.isBoss = true;
    game.preZoom = 0.8;

    game.bossBackSound = game.bossBackSound || {};
    if (!game.bossBackSound[this.mapName]) {
      this.loadBossAudio();
    } else {
      game.bossBackSound[this.mapName].restart('', 0, 1, true);
    }
  }
  diedTheme() {
    delete this.loadingCB;
    game.bossBackSound = game.bossBackSound || {};
    if (game.bossBackSound[this.mapName]) {
      game.bossBackSound[this.mapName].stop();
    }
    game.backSound.stop();
    game.isBoss = false;
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