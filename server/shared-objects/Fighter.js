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
      size: opts.BODY_SIZE || Fighter.BODY_SIZE,

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
      size: this.size,
    }

    let hitSpeed = this.owner.hitSpeed || 1;

    if (this.kind === 'player') {
      ItemSword(this, hitSpeed);
      ItemShield(this);
    } else {
      ItemStage1__Mob1__RightHand(this, hitSpeed);
      ItemStage1__Mob1__LeftHand(this, hitSpeed);
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
    this.weapon.task = 'break';
    if (this.weapon2) {
      this.weapon2.task = 'break';
    }
    if (this.shield) {
      this.shield.task = 'break';
    }

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
    if (this.canNextHit) {
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

    this.weapon.task = 'hit';
    this.useStamina(this.weapon.stamina, this.weapon.staminaTime);

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
      this.balance = Math.min(this.BALANCE, this.balance + dt * 5);
    }
  }

  breakHit() {
    this.needBreakHit = true;
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

  doDamageRadialArea(opts) {
    if (this.hp <= 0) {
      return;
    }
    if (!this.gameLevelZone) {
      return;
    }

    opts.hitVec = this.hitVec.clone();

    const hitAngle = opts.hitVec.toAngle();
    opts.a1 += hitAngle;
    opts.a2 += hitAngle;

    this.gameLevelZone.doDamageRadialArea(this, opts);
  }

  doJump(data) {
    const canJump = this.stamina > 0 &&
      !this.inJump &&
      !this.Roll &&
      !this.afterJumpTime &&
      this.speed.length() > 200 &&
      !this.stunTime;
    if (canJump) {
      this.useStamina(8, 1.5);

      this.onJump(data);
      this.emitPos();
      this.emitAll('jump', {});
    }
  }
  doRoll(data) {
    const canRoll = this.stamina > 0 &&
      !this.inRoll &&
      !this.afterRollTime &&
      this.speed.length() > 0 &&
      !this.stunTime;

    if (canRoll) {
      this.useStamina(4, 0.8);

      this.onRoll(data);
      this.emitPos();
      this.emitAll('roll', {});
    }
  }
}