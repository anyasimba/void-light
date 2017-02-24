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

    ItemSword(this, hitSpeed);
    ItemShield(this);
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
    this.shield.task = 'break';

    this.emitPos();
    this.emitAll('die', {});
    this.owner.onDie();
  }

  doHit(opts) {
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

    this.emitAll('hit', {
      hitVec: this.hitVec,
      hitStage: this.hitStage,
      isRollHit: this.isRollHit,
      isJumpHit: this.isJumpHit,
    });
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
    const canJump = !this.inJump &&
      !this.Roll &&
      !this.afterJumpTime &&
      this.speed.length() > 200 &&
      !this.stunTime;
    if (canJump) {
      this.onJump(data);
      this.emitPos();
      this.emitAll('jump', {});
    }
  }
  doRoll(data) {
    const canRoll = !this.inRoll &&
      !this.afterRollTime &&
      this.speed.length() > 0 &&
      !this.stunTime;

    if (canRoll) {
      this.onRoll(data);
      this.emitPos();
      this.emitAll('roll', {});
    }
  }
}