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
      cookies.params = cookies.params.split('%2C').join(',');
    }
    this.params = JSON.parse(cookies.params || '{}');

    if (!this.params.items) {
      this.saveParam('items', 'heal__regular', 3);
    }

    let hasChange;
    let fighterParams = this.params.fighter || {};
    fighterParams = fighterParams.params || {};

    if (fighterParams.username !== cookies.username) {
      hasChange = true;
      fighterParams.username = cookies.username;
    }
    for (const k in PLAYER_PARAMS) {
      const param = PLAYER_PARAMS[k];
      if (!fighterParams[param]) {
        hasChange = true;
        fighterParams[param] = 0;
      }
    }
    if (!fighterParams.level) {
      hasChange = true;
      fighterParams.level = 16;
    }
    if (!fighterParams.voidsCount) {
      hasChange = true;
      fighterParams.voidsCount = 0;
    }
    if (hasChange) {
      this.saveParam('fighter', 'params', fighterParams);
    }

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
    this.player = {};
    this.updateFighter();
    this.player = new Fighter(this, Object.assign({
      kind: 'player',
      name: this.username,

      BALANCE: 10,
      MP: 100,

      SCALE: 1,
    }, this.player));

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

  onDie(source) {
    if (!this.player.invade) {
      this.params.fighter.params.voidsCount = 0;
      this.saveParam('fighter', 'params', this.params.fighter.params);

      this.gameLevelZone.restartTime = 6;
      this.gameLevelZone.restartFull = true;
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
    this.on('upLevel', data => this.onUpLevel(data));
    this.on('incParam', data => this.onIncParam(data));
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

  onUpLevel(data) {
    try {
      if (!this.player.canCheckpoint) {
        return;
      }
      const params = this.params.fighter.params;
      const need = levelLimit(params.level);
      const exists = params.voidsCount;
      if (exists < need) {
        return;
      }
      params.voidsCount -= need;
      params.level += 1;
      this.saveParam('fighter', 'params', params);
    } catch (e) {
      console.log(e, e.stack);
      process.exit(1);
    }
  }

  onIncParam(data) {
    try {
      if (!PLAYER_PARAMS[data.i]) {
        return;
      }
      const params = this.params.fighter.params;
      let total = 0;
      for (let i = 0; i < PLAYER_PARAMS.length; ++i) {
        const param = PLAYER_PARAMS[i];
        total += params[param];
      }
      if (total < params.level - 1) {
        params[PLAYER_PARAMS[data.i]] += 1;
        this.saveParam('fighter', 'params', params);
        this.updateFighter();
      }
    } catch (e) {
      console.log(e, e.stack);
      process.exit(1);
    }
  }

  updateFighter() {
    const params = this.params.fighter.params;
    this.player.HP = 60 + params.Health * 4;
    this.player.STAMINA = 20 + params.Endurance * 2;
    this.player.damage = 10 + this.getStep(
      params.Strength, 10, 2, 30, 1, 50, 0.5, 0.25);
    this.player.hitSpeed = 0.9 + 0.5 / (this.getStep(
      params.Dexterity, 10, 0.1, 30, 0.3, 50, 0.5, 1) * 0.1 + 1);
    if (this.player.emitParams) {
      this.player.emitParams();
    }
  }
  getStep(x, l1, f1, l2, f2, l3, f3, f4) {
    if (x <= l1) {
      return x * f1;
    }
    if (x <= l2) {
      return x * f2 + l1 * f1;
    }
    if (x <= l3) {
      return x * f3 + (l2 - l1) * f2 + l1 * f1;
    }
    return x * f4 + (l3 - l2) * f3 + (l2 - l1) * f2 + l1 * f1;
  }
}