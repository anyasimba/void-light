preMain(async() => {
  Client.createID = function () {
    this.__lastID = this.__lastID || 0;
    ++this.__lastID;
    return this.__lastID;
  }
});

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

    if (!this.params.items || !this.params.items.list) {
      this.saveParam('items', 'list', [{
        slug: 'item__heal__regular',
        count: 3,
      }, {
        slug: 'item__heal__stone',
        count: 10,
      }, {
        slug: 'item__stamina__stone',
        count: 20,
      }, {
        slug: 'item__sword',
      }, {
        slug: 'item__axe',
      }, {
        slug: 'item__shield',
      }, ]);
      this.saveParam('items', 'clothed', {
        '0': 0,
        '1': 1,
        '2': 2,
        'leftHand1': 5,
        'rightHand1': 3,
      });
    }

    this.emit('items', this.params.items);

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
      fighterParams.level = 1;

      if (cookies.role === 'Knight') {
        fighterParams.level = 16;
        fighterParams.Health = 7;
        fighterParams.Strength = 2;
        fighterParams.Endurance = 2;
        fighterParams.Willpower = 4;
      }
      if (cookies.role === 'Warrior') {
        fighterParams.level = 16;
        fighterParams.Strength = 7;
        fighterParams.Dexterity = 5;
        fighterParams.Endurance = 2;
        fighterParams.Willpower = 1;
      }
      if (cookies.role === 'Lier') {
        fighterParams.level = 16;
        fighterParams.Dexterity = 5;
        fighterParams.Endurance = 6;
        fighterParams.Willpower = 4;
      }
      fighterParams.level = 999;
      fighterParams.Endurance = 100;
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

    this.on('login', data => this.onLogin(this.validate(data)));
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

      this.gameLevelZone.restartTime = 5;
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

  validate(data) {
    if (typeof data !== 'object') {
      return {};
    }
    return data;
  }

  registerEvents() {
    this.on('move', data => this.onEventMove(this.validate(data)));
    this.on('mouseDown', data => this.onEventMouseDown(this.validate(data)));
    this.on('jump', data => this.onEventJump(this.validate(data)));
    this.on('roll', data => this.onEventRoll(this.validate(data)));
    this.on('c', data => this.onEventC(this.validate(data)));
    this.on('r', data => this.onEventR(this.validate(data)));
    this.on('f', data => this.onEventF(this.validate(data)));
    this.on('g', data => this.onEventG(this.validate(data)));
    this.on('h', data => this.onEventH(this.validate(data)));
    this.on('talk', data => this.onTalk(this.validate(data)));
    this.on('upLevel', data => this.onUpLevel(this.validate(data)));
    this.on('incParam', data => this.onIncParam(this.validate(data)));
    this.on('clothe', data => this.onClothe(this.validate(data)));
  }

  /**
   * Events
   */
  onEventMove(data) {
    if (typeof data.x !== 'number' || isNaN(data.x)) {
      return;
    }
    if (typeof data.y !== 'number' || isNaN(data.y)) {
      return;
    }

    this.player.inputMove.x = data.x;
    this.player.inputMove.y = data.y;
    if (this.player.inputMove.length() > 0) {
      vec3.unit(this.player.inputMove);
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
      if (!this.player.isCanUseItem()) {
        return;
      }
      if (!this.player.isAlive) {
        return;
      }
      if (typeof data.i !== 'number') {
        return;
      }
      this.params.items.clothed = this.params.items.clothed || [];
      if (this.params.items.clothed[data.i] === undefined) {
        return;
      }
      const i = this.params.items.clothed[data.i];
      const item = this.params.items.list[i];
      const itemData = global[item.slug];

      let canUse = true;
      if (item.count === 0) {
        canUse = false;
      }

      if (canUse) {
        this.player.useItem(itemData, () => {
          if (item.count !== undefined && item.count > 0) {
            --item.count;
          }
          if (item.count <= 0 && !itemData.IS_KEEP) {
            this.params.items.list.splice(i, 1);
            delete this.params.items.clothed[data.i];
            for (let j = 0; j < 8; ++j) {
              const k = this.params.items.clothed[j];
              if (k && k > i) {
                --this.params.items.clothed[j];
              }
            }
          }
          this.saveParam('items', 'list', this.params.items.list);
          this.saveParam('items', 'clothed', this.params.items.clothed);
          this.emit('items', this.params.items);
        });
      }
    } catch (e) {
      console.log(e, e.stack);
      process.exit(1);
    }
  }
  onEventG(data) {
    try {
      this.player.onKeyG(data);
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
  onClothe(data) {
    try {
      if (data.item !== undefined && typeof data.item !== 'number') {
        return;
      }
      if (data.item !== undefined && !this.params.items.list[data.item]) {
        return;
      }
      if (typeof data.k !== 'string') {
        return;
      }
      let isValid = false;
      for (let i = 0; i < 8; ++i) {
        if (i + '' === data.k) {
          isValid = true;
          break;
        }
      }
      if (data.k === 'leftHand1') {
        isValid = true;
      }
      if (data.k === 'rightHand1') {
        isValid = true;
      }
      if (data.k === 'leftHand2') {
        isValid = true;
      }
      if (data.k === 'rightHand2') {
        isValid = true;
      }

      if (!isValid) {
        return;
      }

      if (data.item !== undefined) {
        const item = global[this.params.items.list[data.item].slug];

        if (data.k === 'leftHand1' || data.k === 'leftHand2') {
          if (!item.SHIELD) {
            return;
          }
        }
        if (data.k === 'rightHand1' || data.k === 'rightHand2') {
          if (!item.WEAPON) {
            return;
          }
        }

        this.params.items.clothed = this.params.items.clothed || {};
        for (let i = 0; i < 8; ++i) {
          if (this.params.items.clothed[i + ''] === data.item) {
            delete this.params.items.clothed[i + ''];
          }
        }

        this.params.items.clothed[data.k] = data.item;
      } else {
        delete this.params.items.clothed[data.k];
      }
      this.player.updateHands();
      this.saveParam('items', 'clothed', this.params.items.clothed);
      this.emit('items', this.params.items);
    } catch (e) {
      console.log(e, e.stack);
      process.exit(1);
    }
  }

  updateFighter() {
    const params = this.params.fighter.params;
    this.player.moveTimeF = 1 + this.getStep(
      params.Endurance, 10, 4, 30, 2, 50, 1, 0.25) * 0.004;
    this.player.HP = 60 + params.Health * 4;
    this.player.STAMINA = 30 + params.Endurance * 0.5 + params.Willpower *
      4;
    this.player.damage_f = this.getStep(
      params.Strength, 10, 2, 30, 1, 50, 0.5, 0.25) * 0.6;
    this.player.damage_d = this.getStep(
      params.Dexterity, 10, 2, 30, 1, 50, 0.5, 0.25) * 0.3;
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