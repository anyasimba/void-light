preMain(async() => {
  Fighter.list = [];
});

export class Fighter extends mix(global.Fighter, MixGameObject) {
  get state() {
    return {
      pos: this.pos,
      speed: this.speed,
      inputMove: this.inputMove,
      look: this.look,
      absLook: this.absLook,

      kind: this.kind,
      size: this.size,
      scale: this.scale,
      name: this.name,

      hitSpeed: this.hitSpeed,

      ACC: this.ACC,
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
    });
  }

  constructor(owner, opts) {
    opts = opts || {};

    super({
      pos: new vec3,
      speed: new vec3,
      inputMove: new vec3,
      look: new vec3,

      kind: opts.kind,
      name: opts.name,
      size: opts.BODY_SIZE || Fighter.BODY_SIZE,
      scale: opts.SCALE,

      hitSpeed: opts.hitSpeed,

      ACC: opts.ACC || Fighter.ACC,
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
    this.balance = this.BALANCE;
    this.hp = this.HP;
    this.mp = this.MP;
    this.stamina = this.STAMINA;

    this.speed.x = 0;
    this.speed.y = 0;

    for (const k in this.children) {
      const child = this.children[k];
      if (child.reborn) {
        child.reborn();
      }
    }
  }
  onDie() {
    this.finishHit();
    this.clearSteps();
    this.emitPos();
    this.emitAll('die', {});
    this.owner.onDie();
  }

  doHit(opts) {
    if (this.stamina <= 0) {
      return;
    }
    if (this.stunTime) {
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

  update() {
    super.update();

    if (this.balanceTime) {
      this.balanceTime -= dt;
      if (this.balanceTime <= 0) {
        delete this.balanceTime;
      }
    } else {
      this.balance = Math.min(this.BALANCE, this.balance + dt * 40);
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
      this.stunTime = time;
      this.emitPos();
      this.emitAll('stun', {
        time: time,
      });
    }
  }
  addImpulse(v) {
    if (this.inHit) {
      if (this.inRoll && this.inJump) {
        v *= 120 / (this.speed.length() * 0.2 + 100);
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

  useStamina(v, time) {
    this.stamina = Math.max(this.stamina - v, 0);
    this.staminaTime = this.staminaTime || 0;
    this.staminaTime = Math.max(this.staminaTime, time);
    this.emitAll('useStamina', {
      stamina: this.stamina,
      time: this.staminaTime,
    });
  }
  useBalance(v, time) {
    this.balance = Math.max(this.balance - v, 0);
    this.balanceTime = this.balanceTime || 0;
    this.balanceTime = Math.max(this.balanceTime, time);
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


    const map = this.gameLevelZone.grid;
    const cx = Math.floor(this.pos.x / WALL_SIZE);
    const cy = Math.floor(this.pos.y / WALL_SIZE);
    const doors = this.findDoors(cx, cy);
    if (doors.length > 0) {
      this.openDoor(doors[0]);
    }
  }
  findDoors(cx, cy) {
    const doors = [];
    const map = this.gameLevelZone.grid;
    if (map[cx + 1] && map[cx + 1][cy] === 'door') {
      doors.push([cx + 1, cy]);
    }
    if (map[cx - 1] && map[cx - 1][cy] === 'door') {
      doors.push([cx - 1, cy]);
    }
    if (map[cx] && map[cx][cy + 1] === 'door') {
      doors.push([cx, cy + 1]);
    }
    if (map[cx] && map[cx][cy - 1] === 'door') {
      doors.push([cx, cy - 1]);
    }
    return doors;
  }
  openDoor(door) {
    const cx = door[0];
    const cy = door[1];
    const map = this.gameLevelZone.grid;
    this.gameLevelZone.doorsMap = this.gameLevelZone.doorsMap || {};
    const doorsMap = this.gameLevelZone.doorsMap;
    doorsMap[cx] = doorsMap[cx] || {};
    doorsMap[cx][cy] = doorsMap[cx][cy] || {
      cx: cx,
      cy: cy,
    };
    door = doorsMap[cx][cy];

    if (door.isOpening || door.isOpened) {
      return;
    }
    door.isOpened = true;
    delete map[cx][cy];
    console.log('delete', cx, cy);
    const doors = this.findDoors(cx, cy);
    for (const k in doors) {
      const nextDoor = doors[k];
      this.openDoor(nextDoor);
    }
  }

  doRoll(data) {
    const canRoll = this.stamina > 0 &&
      !this.inRoll &&
      !this.afterRollTime &&
      this.speed.length() > 0 &&
      !this.stunTime;

    if (canRoll) {
      if (this.inHit) {
        this.useStamina(8, 0.8);
      } else {
        this.useStamina(4, 0.8);
      }

      const rollData = {
        duration: 0.4,
        afterTime: 0.2,
        force: 800,
        forceInJump: 1100,
      };
      if (this.inHit && this.hitStage !== 1) {
        rollData.force = 500;
        rollData.forceInJump = 300;
      }
      this.onRoll(rollData);
      this.emitPos();
      this.emitAll('roll', rollData);
    }
  }
  doJump(data) {
    const canJump = this.stamina > 0 &&
      !this.inJump &&
      !this.inRoll &&
      !this.afterJumpTime &&
      this.speed.length() > 200 &&
      !this.stunTime;

    if (canJump) {
      if (this.inHit) {
        this.useStamina(16, 1.5);
      } else {
        this.useStamina(8, 1.5);
      }

      const jumpData = {
        duration: 0.6,
        afterTime: 0.5,
        force: 700,
      };
      if (this.inHit && this.hitStage !== 1) {
        jumpData.force = 200;
      }
      this.onJump(jumpData);
      this.emitPos();
      this.emitAll('jump', jumpData);
    }
  }
}