preMain(async() => {
  Fighter.list = [];
});

export class Fighter extends mix(global.Fighter, MixNativeGameObject,
  MixGameObject) {
  get state() {
    return {
      lang: this.lang,

      pos: this.pos,
      speed: this.speed,
      inputMove: this.inputMove,
      absLook: this.absLook,

      inRun: this.inRun,
      inBlock: this.inBlock,

      moveTimeF: this.moveTimeF,

      kind: this.kind,
      size: this.size,
      scale: this.scale,
      name: this.name,

      hitSpeed: this.hitSpeed,

      ACC: this.ACC,
      RUN_ACC: this.RUN_ACC,
      AIR_FRICTION: this.AIR_FRICTION,
      FRICTION: this.FRICTION,
      MAX_SPEED: this.MAX_SPEED,

      LOOK_ROTATE_F: this.LOOK_ROTATE_F,
      LOOK_ROTATE_IN_HIT_F: this.LOOK_ROTATE_IN_HIT_F,

      BALANCE: this.BALANCE,

      HP: this.HP,
      hp: this.hp,
      MP: this.MP,
      mp: this.mp,
      STAMINA: this.STAMINA,
      stamina: this.stamina,

      effects: this.effects,
    };
  }
  emitPos() {
    this.emitAll('pos', {
      pos: this.pos,
      speed: this.speed,
      inputMove: this.inputMove,
      absLook: this.absLook,

      inRun: this.inRun,
      inBlock: this.inBlock,
    });
  }
  emitParams() {
    this.emitAll('params', {
      HP: this.HP,
      hp: this.hp,
      MP: this.MP,
      mp: this.mp,
      STAMINA: this.STAMINA,
      stamina: this.stamina,
      hitSpeed: this.hitSpeed,
    });
  }
  emitEffects() {
    this.emitAll('effects', {
      effects: native.Fighter__getEffects(this.native),
    });
  }

  get inputMove() {
    return new vec3(
      native.Fighter__getInputMoveX(this.native),
      native.Fighter__getInputMoveY(this.native));
  }
  set inputMove(v) {
    native.Fighter__setInputMoveX(this.native, v.x);
    native.Fighter__setInputMoveY(this.native, v.y);
  }
  get look() {
    return new vec3(
      native.Fighter__getLookX(this.native),
      native.Fighter__getLookY(this.native));
  }
  set look(v) {
    native.Fighter__setLookX(this.native, v.x);
    native.Fighter__setLookY(this.native, v.y);
  }
  get inBlock() {
    return native.Fighter__getInBlock(this.native) !== 0;
  }
  set inBlock(v) {
    if (v) {
      v = 1;
    } else {
      v = 0;
    }
    native.Fighter__setInBlock(this.native, v);
  }
  get inRun() {
    return native.Fighter__getInRun(this.native) !== 0;
  }
  set inRun(v) {
    if (v) {
      v = 1;
    } else {
      v = 0;
    }
    native.Fighter__setInRun(this.native, v);
  }
  get inRoll() {
    return native.Fighter__getInRoll(this.native) !== 0;
  }
  set inRoll(v) {
    if (v) {
      v = 1;
    } else {
      v = 0;
    }
    native.Fighter__setInRoll(this.native, v);
  }
  get afterRollTime() {
    const t = native.Fighter__getAfterRollTime(this.native);
    if (t > 0) {
      return t;
    }
  }
  set afterRollTime(v) {
    native.Fighter__setAfterRollTime(this.native, v);
  }
  get rollBlockTime() {
    const t = native.Fighter__getRollBlockTime(this.native);
    if (t > 0) {
      return t;
    }
  }
  set rollBlockTime(v) {
    native.Fighter__setRollBlockTime(this.native, v);
  }
  get inJump() {
    return native.Fighter__getInJump(this.native) !== 0;
  }
  set inJump(v) {
    if (v) {
      v = 1;
    } else {
      v = 0;
    }
    native.Fighter__setInJump(this.native, v);
  }
  get afterJumpTime() {
    const t = native.Fighter__getAfterJumpTime(this.native);
    if (t > 0) {
      return t;
    }
  }
  set afterJumpTime(v) {
    native.Fighter__setAfterJumpTime(this.native, v);
  }
  get inHit() {
    return native.Fighter__getInHit(this.native) !== 0;
  }
  set inHit(v) {
    if (v) {
      v = 1;
    } else {
      v = 0;
    }
    native.Fighter__setInHit(this.native, v);
  }
  get hitVec() {
    return new vec3(
      native.Fighter__getHitVecX(this.native),
      native.Fighter__getHitVecY(this.native));
  }
  set hitVec(v) {
    native.Fighter__setHitVecX(this.native, v.x);
    native.Fighter__setHitVecY(this.native, v.y);
  }
  get stunTime() {
    const t = native.Fighter__getStunTime(this.native);
    if (t > 0) {
      return t;
    }
  }
  set stunTime(v) {
    native.Fighter__setStunTime(this.native, v);
  }
  get waitTime() {
    const t = native.Fighter__getWaitTime(this.native);
    if (t > 0) {
      return t;
    }
  }
  set waitTime(v) {
    native.Fighter__setWaitTime(this.native, v);
  }
  get HP() {
    const r = native.Fighter__getHP(this.native);
    return r;
  }
  set HP(v) {
    native.Fighter__setHP(this.native, v);
  }
  get hp() {
    const r = native.Fighter__getHp(this.native);
    return r;
  }
  set hp(v) {
    native.Fighter__setHp(this.native, v);
  }
  get hpTime() {
    return native.Fighter__getHpTime(this.native);
  }
  set hpTime(v) {
    native.Fighter__setHpTime(this.native, v);
  }
  get STAMINA() {
    const r = native.Fighter__getSTAMINA(this.native);
    return r;
  }
  set STAMINA(v) {
    native.Fighter__setSTAMINA(this.native, v);
  }
  get stamina() {
    return native.Fighter__getStamina(this.native);
  }
  set stamina(v) {
    native.Fighter__setStamina(this.native, v);
  }
  get staminaTime() {
    return native.Fighter__getStaminaTime(this.native);
  }
  set staminaTime(v) {
    native.Fighter__setStaminaTime(this.native, v);
  }
  get MP() {
    const r = native.Fighter__getMP(this.native);
    return r;
  }
  set MP(v) {
    native.Fighter__setMP(this.native, v);
  }
  get MP() {
    const r = native.Fighter__getMP(this.native);
    return r;
  }
  set MP(v) {
    native.Fighter__setMP(this.native, v);
  }
  get mp() {
    return native.Fighter__getMp(this.native);
  }
  set mp(v) {
    native.Fighter__setMp(this.native, v);
  }
  get mpTime() {
    return native.Fighter__getMpTime(this.native);
  }
  set mpTime(v) {
    native.Fighter__setMpTime(this.native, v);
  }
  get BALANCE() {
    const r = native.Fighter__getBALANCE(this.native);
    return r;
  }
  set BALANCE(v) {
    native.Fighter__setBALANCE(this.native, v);
  }
  get balance() {
    return native.Fighter__getBalance(this.native);
  }
  set balance(v) {
    native.Fighter__setBalance(this.native, v);
  }
  get balanceTime() {
    return native.Fighter__getBalanceTime(this.native);
  }
  set balanceTime(v) {
    native.Fighter__setBalanceTime(this.native, v);
  }

  preCreate(opts) {
    this.body = {
      kind: 'circle',
      size: opts.size * opts.scale,
    }

    this.native = native.new__Fighter(this, opts);
  }

  constructor(owner, optsInput) {
    optsInput = optsInput || {};
    const opts = {};
    for (const k in optsInput) {
      opts[k] = optsInput[k];
    }

    opts.BODY_SIZE = opts.BODY_SIZE || Fighter.BODY_SIZE;

    opts.ACC = opts.ACC || Fighter.ACC;
    opts.RUN_ACC = opts.RUN_ACC || Fighter.RUN_ACC;
    opts.AIR_FRICTION = opts.AIR_FRICTION || Fighter.AIR_FRICTION;
    opts.FRICTION = opts.FRICTION || Fighter.FRICTION;
    opts.MAX_SPEED = opts.MAX_SPEED || Fighter.MAX_SPEED;

    opts.LOOK_ROTATE_F = opts.LOOK_ROTATE_F || Fighter.LOOK_ROTATE_F;
    opts.LOOK_ROTATE_IN_HIT_F = opts.LOOK_ROTATE_IN_HIT_F || Fighter.LOOK_ROTATE_IN_HIT_F;

    super({
      lang: opts.LANG_RU,

      look: new vec3,

      kind: opts.kind,
      isPlayer: opts.isPlayer,
      name: opts.name,
      size: opts.BODY_SIZE,
      scale: opts.SCALE,

      moveTimeF: opts.moveTimeF,

      hitSpeed: opts.hitSpeed,
      damage: opts.damage,
      damage_f: opts.damage_f,
      damage_d: opts.damage_d,

      ACC: opts.ACC,
      RUN_ACC: opts.RUN_ACC,
      AIR_FRICTION: opts.AIR_FRICTION,
      FRICTION: opts.FRICTION,
      MAX_SPEED: opts.MAX_SPEED,

      LOOK_ROTATE_F: opts.LOOK_ROTATE_F,
      LOOK_ROTATE_IN_HIT_F: opts.LOOK_ROTATE_IN_HIT_F,

      BALANCE: opts.BALANCE,
      balance: opts.BALANCE,
      HP: opts.HP,
      hp: opts.HP,
      MP: opts.MP,
      mp: opts.MP,
      STAMINA: opts.STAMINA,
      stamina: opts.STAMINA,

      effects: [],
    });

    this.owner = owner;

    this.updateHands();
  }
  updateHands() {
    if (!this.owner.params) {
      return;
    }
    if (!this.owner.params.items.clothed) {
      return;
    }

    if (this.weapon) {
      this.weapon.destructor();
      delete this.weapon;
    }
    if (this.weapon2) {
      this.weapon2.destructor();
      delete this.weapon2;
    }
    if (this.shield) {
      this.shield.destructor();
      delete this.shield;
    }

    const clothed = this.owner.params.items.clothed;
    const list = this.owner.params.items.list;
    if (clothed.leftHand1 && list[clothed.leftHand1]) {
      const item = global[list[clothed.leftHand1].slug];
      if (typeof global[item.SLUG] === 'function') {
        global[item.SLUG](this);
      }
    }
    if (clothed.rightHand1 && list[clothed.rightHand1]) {
      const item = global[list[clothed.rightHand1].slug];
      if (typeof global[item.SLUG] === 'function') {
        global[item.SLUG](this);
      }
    }
  }
  reborn() {
    this.clearSteps();
    delete this.stunTime;
    delete this.inStun;
    delete this.waitTime;
    delete this.inWait;
    delete this.waitFor;

    this.effects = [];


    this.finishHit();
    delete this.needNextHit;

    this.balance = this.BALANCE;
    this.hp = this.HP;
    this.mp = this.MP;
    this.stamina = this.STAMINA;

    this.inputMove = {
      x: 0,
      y: 0
    };
    this.look.init(0, 1, 0);
    this.speed.init();

    delete this.area;

    for (const k in this.children) {
      const child = this.children[k];
      if (child.reborn) {
        child.reborn();
      }
    }

    if (!this.isAlive) {
      this.isAlive = true;
      this.owner.gameLevelZone.addObject(this);
    }
  }
  onDie(source) {
    delete this.isAlive;
    this.finishHit();
    this.clearSteps();
    this.emitPos();
    this.emitAll('die', {});
    this.owner.onDie(source);
    if (!this.isAlive) {
      this.owner.gameLevelZone.removeObject(this);
    }
  }

  doHit(opts) {
    if (!this.weapon) {
      return;
    }
    if (this.stamina <= 0) {
      return;
    }
    if (this.stunTime || this.waitTime) {
      return;
    }
    if (this.inHit && this.isCanNextHit) {
      this.needNextHit = opts;
      return;
    }
    if (this.inHit) {
      return;
    }
    this.inHit = true;

    if (this.inRoll) {
      this.isRollHit = true;
    }
    if (this.inJump) {
      this.isJumpHit = true;
    }

    this.hitVec = new vec3(opts).subtract(this.pos).unit();
    this.hitStage = opts.hitStage || 1;

    this.clearSteps();
    global[this.kind + '__doHit'].call(this);

    if (this.isRollHit && this.isJumpHit) {
      this.useStamina(
        this.weapon.stamina * 2,
        this.weapon.staminaTime * 1.6);
    } else if (this.isRollHit) {
      this.useStamina(
        this.weapon.stamina * 1.3,
        this.weapon.staminaTime * 1.2);
    } else if (this.isJumpHit) {
      this.useStamina(
        this.weapon.stamina * 1.5,
        this.weapon.staminaTime * 1.4);
    } else {
      this.useStamina(this.weapon.stamina, this.weapon.staminaTime);
    }

    this.emitAll('hit', {
      hitVec: this.hitVec,
      hitStage: this.hitStage,
      isRollHit: this.isRollHit,
      isJumpHit: this.isJumpHit,
    });
  }

  checkNear(player) {
    if (this.kind !== 'mob' || !this.owner.opts.IS_NPC) {
      return;
    }

    const D = (this.body.size + player.body.size) * 0.5 + WALL_SIZE * 2;
    const d = this.pos.subtract(player.pos).length();
    if (d < D) {
      player.canTalk = this;
    }
  }

  get talkName() {
    return this.name + '__' + this.gameLevelZone.mapName;
  }
  talk(player) {
    if (!player.talking) {
      player.talking = 1;
    }
    player.owner.emit('talk', {
      name: this.talkName,
      talking: player.talking,
    });
  }

  isCanUseItem() {
    return !this.stunTime &&
      !this.waitTime;
  }
  useItem(item, cb) {
    let timeout;
    this.wait(1 / this.moveTimeF);
    this.waitFor = {
      breakAction() {
        clearTimeout(timeout);
      }
    };
    this.step(0.7 / this.moveTimeF, () => {
      cb();

      const isEffect = item.HP !== undefined ||
        item.MP !== undefined ||
        item.STAMINA !== undefined;

      const isUnique = item.STAMINA !== undefined;

      if (isEffect) {
        native.Fighter__addEffect(this.native, item, isUnique);
        this.emitEffects();
      }
    });
  }

  breakHit() {
    this.clearSteps();
    this.finishHit();
    delete this.needNextHit;
    this.emitPos();
    this.emitAll('breakHit', {});
  }
  stun(time) {
    if (this.stunTime === undefined) {
      if (this.waitTime) {
        if (this.waitFor) {
          this.waitFor.breakAction();
        }
        delete this.waitTime;
        delete this.inWait;
      }
      if (this.inHit) {
        this.breakHit();
      }
      this.clearSteps();
      this.stunTime = time / this.moveTimeF;
      this.emitPos();
      this.emitAll('stun', {
        time: time,
      });
    }
  }
  wait(time) {
    if (this.stunTime) {
      delete this.stunTime;
      delete this.inStun;
    }
    delete this.inWait;
    delete this.waitFor;
    if (this.inHit) {
      this.breakHit();
    }
    this.clearSteps();
    this.waitTime = Math.max(this.waitTime || 0, time);
    this.emitPos();
    this.emitAll('wait', {
      time: time,
    });
  }
  addImpulse(v) {
    if (this.inHit) {
      if (this.inRoll && this.inJump) {
        v *= 80 / (this.speed.length() * 0.2 + 100);
      } else if (this.inRoll || this.afterRollTime) {
        v *= 160 / (this.speed.length() * 0.1 + 100);
      } else if (this.inJump) {
        v *= 150 / (this.speed.length() * 0.25 + 100);
      }
      const vec = this.hitVec.unit();
      this.speed = this.speed.add(
        vec.multiply(v * this.scale));
      this.emitPos();
    }
  }
  checkNextHit(i) {
    if (this.needNextHit) {
      const opts = this.needNextHit;
      delete this.needNextHit;
      delete this.isCanNextHit;
      this.finishHit();
      opts.hitStage = i;
      this.doHit(opts);
    }
  }
  finishHit() {
    delete this.isCanNextHit;
    delete this.hitVec;
    delete this.hitStage;
    delete this.isJumpHit;
    delete this.isRollHit;
    this.inHit = false;
  }

  useHP(v, time) {
    this.hp = Math.max(this.hp - v, 0);
    this.hpTime = this.hpTime || 0;
    this.hpTime = Math.max(this.hpTime, time / this.moveTimeF);
    this.emitAll('useHP', {
      hp: this.hp,
      time: this.hpTime,
    });
  }
  useStamina(v, time) {
    if (this.stunTime) {
      time = 0;
    }
    this.stamina = Math.max(this.stamina - v, 0);
    this.staminaTime = Math.max(this.staminaTime || 0, time / this.moveTimeF);
    this.emitAll('useStamina', {
      stamina: this.stamina,
      time: this.staminaTime,
    });
  }
  useBalance(v, time) {
    if (this.stunTime) {
      return;
    }
    this.balance = Math.max(this.balance - v, 0);
    this.balanceTime = this.balanceTime || 0;
    this.balanceTime = Math.max(this.balanceTime, time / this.moveTimeF);
  }

  isInGameLevelZone() {
    if (this.hp <= 0) {
      return;
    }
    if (!this.gameLevelZone) {
      return;
    }
    return true;
  }
  doDamageRadialArea(opts) {
    if (!this.isInGameLevelZone()) {
      return;
    }
    if (!this.hitVec) {
      return;
    }

    opts.hitVec = this.hitVec.clone();
    opts.d *= this.scale;
    if (this.weapon && this.weapon.bodyScale) {
      opts.d *= this.weapon.bodyScale;
    }

    this.gameLevelZone.doDamageRadialArea(this, opts);
  }

  onKeyC(opts) {
    if (!this.isInGameLevelZone()) {
      return;
    }

    if (this.canItem) {
      const item = this.canItem;
      const gameLevelZone = item.gameLevelZone;
      const opts = item.opts;
      item.gameLevelZone.timeouts.push({
        time: 60,
        fn: () => {
          new ItemOnMap(gameLevelZone, opts);
        },
      });
      item.destructor();
      delete this.canItem;
      this.owner.emit('stopCan', {});

      const itemData = global[item.slug];
      if (itemData.IS_UNIQUE) {
        this.owner.params.items.list.push({
          slug: item.slug,
        });
      } else {
        let exists = false;
        for (const k in this.owner.params.items.list) {
          const subItem = this.owner.params.items.list[k];
          if (subItem.slug === item.slug) {
            ++subItem.count;
            exists = true;
            break;
          }
        }
        if (!exists) {
          this.owner.params.items.list.push({
            slug: item.slug,
            count: item.count || 1,
          });
        }
      }
      this.owner.emit('gotItem', {
        slug: item.slug,
        count: item.count,
      });
      this.owner.saveParam('items', 'list', this.owner.params.items.list);
      this.owner.emit('items', this.owner.params.items);
      return;
    }
    if (this.canOpenDoor) {
      this.canOpenDoor.open(this);
      return;
    }
    if (this.canTalk) {
      this.canTalk.talk(this);
      return;
    }
    if (this.canCheckpoint) {
      this.canCheckpoint.use(this);
      return;
    }
  }
  onKeyG() {
    this.inRun = !this.inRun;
    if (this.inRun) {
      this.inBlock = false;
    }
    this.emitPos();
  }
  onKeyR() {
    if (!this.inBlock && !this.shield) {
      return;
    }
    this.inBlock = !this.inBlock;
    if (this.inBlock) {
      this.inRun = false;
    }
    this.emitPos();
  }
  onKeyQ() {}
  onKeyE() {}
  onKeyH() {
    this.invade = true;
    this.emitAll('invade', {});
  }

  doRoll(data) {
    const canRoll = this.stamina > 0 &&
      !this.inRoll &&
      !this.afterRollTime &&
      !this.stunTime &&
      !this.waitTime;

    if (canRoll) {
      if (this.inHit || this.inBlock) {
        this.useStamina(8, 1);
      } else {
        this.useStamina(4, 1);
      }

      const rollData = {
        duration: 0.7 / this.moveTimeF,
        afterTime: 0.3 / this.moveTimeF,
        force: 800 * (this.moveTimeF * 0.4 + 0.6),
        forceInJump: 750 * (this.moveTimeF * 0.4 + 0.6),
      };
      if (this.inHit && this.hitStage === 1) {
        rollData.force = 600 * (this.moveTimeF * 0.4 + 0.6);
        rollData.forceInJump = 500 * (this.moveTimeF * 0.4 + 0.6);
      }
      if (this.inHit && this.hitStage !== 1) {
        rollData.force = 400 * (this.moveTimeF * 0.4 + 0.6);
        rollData.forceInJump = 300 * (this.moveTimeF * 0.4 + 0.6);
      }
      rollData.force *= 0.5 + Math.min(this.speed.length() / 700, 0.8);
      rollData.forceInJump *= 0.5 + Math.min(this.speed.length() / 700,
        0.8);
      this.rollBlockTime = rollData.duration + 0.1;
      native.Fighter__onRoll(this.native, rollData);
      this.emitAll('roll', rollData);
      this.emitPos();
    }
  }
  doJump(data) {
    const canJump = this.stamina > 0 &&
      !this.inJump &&
      !this.inRoll &&
      !this.afterJumpTime &&
      !this.stunTime &&
      !this.waitTime;

    if (canJump) {
      if (this.inHit || this.inBlock) {
        this.useStamina(16, 1.5);
      } else {
        this.useStamina(8, 1.5);
      }

      const jumpData = {
        duration: 0.6,
        afterTime: 0.3 / this.moveTimeF,
        force: 700 * (this.moveTimeF * 0.4 + 0.6),
      };
      if (this.inHit && this.hitStage !== 1) {
        jumpData.force = 300;
      }
      jumpData.force *= 0.5 + Math.min(this.speed.length() / 700, 0.8);
      native.Fighter__onJump(this.native, jumpData);
      this.emitAll('jump', jumpData);
      this.emitPos();
    }
  }

  step(time, fn) {
    native.Fighter__step(this.native, this.stepFN(fn), time);
  }
  clearSteps() {
    native.Fighter__clearSteps(this.native);
  }
}