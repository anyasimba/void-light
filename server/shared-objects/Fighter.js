preMain(async() => {
  Fighter.list = [];
});

export class Fighter extends mix(global.Fighter, MixGameObject) {
  get state() {
    return {
      lang: this.lang,

      pos: this.pos.clone(),
      speed: this.speed.clone(),
      inputMove: this.inputMove.clone(),
      look: this.look.clone(),
      absLook: this.absLook,

      isRun: this.isRun,
      isBlock: this.isBlock,

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

      BALANCE: this.BALANCE,

      HP: this.HP,
      hp: this.hp,
      MP: this.MP,
      mp: this.mp,
      STAMINA: this.STAMINA,
      stamina: this.stamina,
    };
  }
  emitPos() {
    this.emitAll('pos', {
      pos: this.pos,
      speed: this.speed,
      inputMove: this.inputMove,
      look: this.look,
      absLook: this.absLook,

      isRun: this.isRun,
      isBlock: this.isBlock,
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

  constructor(owner, opts) {
    opts = opts || {};

    super({
      lang: opts.LANG_RU,

      pos: new vec3,
      speed: new vec3,
      inputMove: new vec3,
      look: new vec3,

      kind: opts.kind,
      name: opts.name,
      size: opts.BODY_SIZE || Fighter.BODY_SIZE,
      scale: opts.SCALE,

      moveTimeF: opts.moveTimeF,

      hitSpeed: opts.hitSpeed,
      damage: opts.damage,

      ACC: opts.ACC || Fighter.ACC,
      RUN_ACC: opts.RUN_ACC || Fighter.RUN_ACC,
      AIR_FRICTION: opts.AIR_FRICTION || Fighter.AIR_FRICTION,
      FRICTION: opts.FRICTION || Fighter.FRICTION,

      BALANCE: opts.BALANCE,
      balance: opts.BALANCE,
      HP: opts.HP,
      hp: opts.HP,
      MP: opts.MP,
      mp: opts.MP,
      STAMINA: opts.STAMINA,
      stamina: opts.STAMINA,
    });

    this.owner = owner;

    this.body = {
      kind: 'circle',
      size: this.size * this.scale,
    }

    if (this.kind === 'player') {
      ItemSword(this);
      ItemShield(this);
    }
  }
  reborn() {
    this.clearSteps();
    delete this.stunTime;
    delete this.inStun;
    delete this.waitTime;
    delete this.inWait;
    delete this.waitFor;

    this.finishHit();
    delete this.needNextHit;

    this.balance = this.BALANCE;
    this.hp = this.HP;
    this.mp = this.MP;
    this.stamina = this.STAMINA;

    this.speed.x = 0;
    this.speed.y = 0;

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

  update() {
    this.prevPos = this.pos.clone();
    super.update();

    if (this.balanceTime) {
      this.balanceTime -= dt;
      if (this.balanceTime <= 0) {
        delete this.balanceTime;
      }
    } else {
      this.balance = Math.min(this.BALANCE, this.balance + dt * 40);
    }

    if (this.rollBlockTime) {
      this.rollBlockTime -= dt;
      if (this.rollBlockTime <= 0) {
        delete this.rollBlockTime;
      }
    }
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
      vec3.add(this.speed, vec.multiply(v));
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
    this.stamina = Math.max(this.stamina - v, 0);
    this.staminaTime = this.staminaTime || 0;
    this.staminaTime = Math.max(this.staminaTime, time / this.moveTimeF);
    this.emitAll('useStamina', {
      stamina: this.stamina,
      time: this.staminaTime,
    });
  }
  useBalance(v, time) {
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

    opts.hitVec = this.hitVec.clone();

    const hitAngle = opts.hitVec.toAngle();
    opts.a1 += hitAngle;
    opts.a2 += hitAngle;
    opts.r1 *= this.scale;
    opts.r2 *= this.scale;

    this.gameLevelZone.doDamageRadialArea(this, opts);
  }

  onKeyC(opts) {
    if (!this.isInGameLevelZone()) {
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
    }
  }
  onKeyF() {
    this.isRun = !this.isRun;
    if (this.isRun) {
      this.isBlock = false;
    }
    this.emitPos();
  }
  onKeyR() {
    this.isBlock = !this.isBlock;
    if (this.isBlock) {
      this.isRun = false;
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
      if (this.inHit || this.isBlock) {
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
      if (this.inHit && this.hitStage !== 1) {
        rollData.force = 400 * (this.moveTimeF * 0.4 + 0.6);
        rollData.forceInJump = 300 * (this.moveTimeF * 0.4 + 0.6);
      }
      rollData.force *= 0.5 + Math.min(this.speed.length() / 700, 0.8);
      rollData.forceInJump *= 0.5 + Math.min(this.speed.length() / 700, 0.8);
      this.rollBlockTime = rollData.duration + 0.2;
      this.onRoll(rollData);
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
      if (this.inHit || this.isBlock) {
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
      this.onJump(jumpData);
      this.emitAll('jump', jumpData);
      this.emitPos();
    }
  }
}