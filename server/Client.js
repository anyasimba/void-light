export class Client extends global.Client {
  constructor(sock) {
    super(sock);

    this.player = new Fighter(this, {
      kind: 'player',
    });

    this.emit('playerID', {
      playerID: this.player.id,
    });

    gameLevelZone.addClient(this);

    this.emit('map', {
      name: gameLevelZone.mapName,
    });

    this.registerEvents();
  }

  onDisconnect() {
    gameLevelZone.removeClient(this);

    this.player.pendingDestroy = true;

    console.log('User disconnected');
  }

  onDie() {
    this.player.hp = 100;
    this.player.gameLevelZone.rebornPlayer(this.player);
  }

  registerEvents() {
    this.on('move', data => this.onEventMove(data));
    this.on('mouseDown', data => this.onEventMouseDown(data));
    this.on('jump', data => this.onEventJump(data));
    this.on('roll', data => this.onEventRoll(data));
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

    this.player.doHit(data);
  }
  onEventJump(data) {
    this.player.doJump(data);
  }
  onEventRoll(data) {
    this.player.doRoll(data);
  }
}