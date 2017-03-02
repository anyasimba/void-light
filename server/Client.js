preMain(async() => {
  Client.createID = function () {
    this.__lastID = this.__lastID || 0;
    ++this.__lastID;
    return this.__lastID;
  }
})

export class Client extends global.Client {
  constructor(sock) {
    super(sock);

    this.netID = Client.createID();

    this.tasks = [];

    this.player = new Fighter(this, {
      kind: 'player',

      hitSpeed: 1,
      DAMAGE: 400,

      BALANCE: 10,
      HP: 100,
      MP: 100,
      STAMINA: 50,

      SCALE: 1,
    });

    this.emit('playerID', {
      playerID: this.player.id,
    });

    this.gameLevelZone = gameLevelZone;
    this.gameLevelZone.addClient(this);

    this.emit('map', {
      name: this.gameLevelZone.mapName,
    });

    this.registerEvents();
  }

  emit(event, data) {
    this.packets = this.packets || [];
    this.packets.push([event, data]);

    global.packets = global.packets || {};
    packets[this.netID] = this;
  }
  run(task) {
    this.tasks.push(task);
    global.tasks = global.tasks || {}
    tasks[this.netID] = this;
  }

  onDisconnect() {
    gameLevelZone.removeClient(this);

    this.player.pendingDestroy = true;

    console.log('User disconnected');
  }

  onDie() {
    this.gameLevelZone.restartTime = 6;
  }

  registerEvents() {
    this.on('move', data => this.onEventMove(data));
    this.on('mouseDown', data => this.onEventMouseDown(data));
    this.on('jump', data => this.onEventJump(data));
    this.on('roll', data => this.onEventRoll(data));
    this.on('c', data => this.onEventC(data));
    this.on('r', data => this.onEventR(data));
    this.on('f', data => this.onEventF(data));
    this.on('q', data => this.onEventQ(data));
    this.on('e', data => this.onEventE(data));
  }

  /**
   * Events
   */
  onEventMove(data) {
    const keys = ['w', 'a', 's', 'd'];

    for (const key of keys) {
      if (typeof data[key] === 'boolean') {
        this[key] = data[key];
      }
    }

    this.player.inputMove.init();
    if (this.w) {
      this.player.inputMove.y -= 1;
    }
    if (this.a) {
      this.player.inputMove.x -= 1;
    }
    if (this.s) {
      this.player.inputMove.y += 1;
    }
    if (this.d) {
      this.player.inputMove.x += 1;
    }

    this.player.emitPos();
  }
  onEventMouseDown(data) {
    if (typeof data.x !== 'number') {
      return;
    }
    if (typeof data.y !== 'number') {
      return;
    }
    try {
      this.player.doHit(data);
    } catch (e) {
      console.log(e, e.stack);
      process.exit(1);
    }
  }
  onEventJump(data) {
    try {
      this.player.doJump(data);
    } catch (e) {
      console.log(e, e.stack);
      process.exit(1);
    }
  }
  onEventRoll(data) {
    try {
      this.player.doRoll(data);
    } catch (e) {
      console.log(e, e.stack);
      process.exit(1);
    }
  }
  onEventC(data) {
    try {
      this.player.onKeyC(data);
    } catch (e) {
      console.log(e, e.stack);
      process.exit(1);
    }
  }
  onEventR(data) {
    try {
      this.player.onKeyR(data);
    } catch (e) {
      console.log(e, e.stack);
      process.exit(1);
    }
  }
  onEventF(data) {
    try {
      this.player.onKeyF(data);
    } catch (e) {
      console.log(e, e.stack);
      process.exit(1);
    }
  }
  onEventQ(data) {
    try {
      this.player.onKeyQ(data);
    } catch (e) {
      console.log(e, e.stack);
      process.exit(1);
    }
  }
  onEventE(data) {
    try {
      this.player.onKeyE(data);
    } catch (e) {
      console.log(e, e.stack);
      process.exit(1);
    }
  }
}