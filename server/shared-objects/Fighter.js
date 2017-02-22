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

      kind: this.kind,
      size: this.size,

      ACC: this.ACC,
      AIR_FRICTION: this.AIR_FRICTION,
      FRICTION: this.FRICTION,

      BALANCE: this.BALANCE,

      HP: this.HP,
      MP: this.MP,
      STAMINA: this.STAMINA,
    };
  }
  emitPos() {
    this.emitAll('pos', {
      pos: this.pos,
      speed: this.speed,
      inputMove: this.inputMove,
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

    let hitSpeed = 1.5;
    if (this.kind === 'mob') {
      hitSpeed = 2;
    }

    ItemSword(this, hitSpeed);
    ItemShield(this);
  }
  reborn() {
    this.balance = this.BALANCE;
    this.hp = this.HP;
    this.mp = this.MP;
    this.stamina = this.STAMINA;
  }
  onDie() {
    this.emitPos();
    this.emitAll('die', {});
    this.owner.onDie();
  }

  doHit(data) {
    this.onHit(data);
    this.emitPos();
    this.emitAll('hit', {
      x: data.x,
      y: data.y,
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
        time: time
      });
    }
  }

  doDamageRadialArea(opts) {
    if (this.hp <= 0) {
      return;
    }
    opts.hitVec = this.hitVec.clone();

    const hitAngle = opts.hitVec.toAngle();
    opts.a1 += hitAngle;
    opts.a2 += hitAngle;

    if (this.gameLevelZone) {
      this.emitPos();
      this.gameLevelZone.doDamageRadialArea(this, opts);
    }
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