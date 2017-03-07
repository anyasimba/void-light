preMain(async() => {
  Client.createID = function () {
    this.__lastID = this.__lastID || 0;
    ++this.__lastID;
    return this.__lastID;
  }
})

export function parseCookies(rc) {
  const list = {};

  rc && rc.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));
  });

  return list;
}

export class Client extends global.Client {
  constructor(sock) {
    super(sock);

    const cookies = parseCookies(sock.request.headers.cookie);
    if (cookies.params) {
      cookies.params = cookies.params.split('%3A').join(':');
    }
    this.params = JSON.parse(cookies.params || '{}');
    console.log(this.params);

    this.netID = Client.createID();

    this.tasks = [];

    this.on('login', data => this.onLogin(data));
  }

  saveParam(slug, key, value) {
    this.params[slug] = this.params[slug] || {};
    this.params[slug][key] = value;
    this.emit('saveParam', {
      slug: slug,
      key: key,
      value: value,
    });
  }

  onLogin(data) {
    if (this.username || !data.username) {
      return;
    }
    if (data.username.length > 24) {
      return;
    }
    this.username = data.username;
    this.login();
  }

  login() {
    this.saveParam('items', 'heal__regular', 3);

    this.player = new Fighter(this, {
      kind: 'player',
      name: this.username,

      hitSpeed: 1,
      DAMAGE: 40,

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

    console.log('User login', this.username);
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
    if (this.gameLevelZone) {
      this.gameLevelZone.removeClient(this);
    }

    if (this.player) {
      this.player.pendingDestroy = true;
    }

    console.log('User disconnected', this.username);
  }

  onDie() {
    if (!this.player.invade) {
      this.gameLevelZone.restartTime = 6;
    } else {
      setTimeout(() => {
        delete this.player.invade;
        this.gameLevelZone.rebornPlayer(this.player);
        this.player.reborn();
        this.emit('restart', {});
        this.player.emitParams();
        this.player.emitPos();
      }, 6000);
    }
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
    this.on('h', data => this.onEventH(data));
    this.on('talk', data => this.onTalk(data));
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
  onEventH(data) {
    try {
      this.player.onKeyH(data);
    } catch (e) {
      console.log(e, e.stack);
      process.exit(1);
    }
  }

  onTalk(data) {
    try {
      if (typeof data.variant !== 'number') {
        return;
      }
      if (!this.player.canTalk || !this.player.talking) {
        return;
      }
      const npc = global[this.player.canTalk.talkName];
      if (!npc || !npc[this.player.talking + ''][data.variant + '']) {
        return;
      }
      const answer = npc[this.player.talking + ''][data.variant + ''];
      this.player.talking = answer[1];
      if (!this.player.talking) {
        delete this.player.talking;
        delete this.player.canTalk;
        delete this.player.canDoor;
        this.emit('stopCan', {});
      } else {
        this.player.canTalk.talk(this.player);
      }
    } catch (e) {
      console.log(e, e.stack);
      process.exit(1);
    }
  }
}