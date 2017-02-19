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
    super({
      pos: new vec3,
      speed: new vec3,
      inputMove: new vec3,
      look: new vec3,

      kind: opts.kind,
      size: opts.BODY_SIZE || Fighter.BODY_SIZE,
    });
    this.owner = owner;

    opts = opts || {};
    this.ACC = opts.ACC || this.ACC;
    this.AIR_FRICTION = opts.AIR_FRICTION || this.AIR_FRICTION;
    this.FRICTION = opts.FRICTION || this.FRICTION;
    this.DAMAGE = opts.DAMAGE || 60;

    this.hp = 100;
    this.mp = 100;

    this.body = {
      kind: 'circle',
      size: this.size,
    }

    ItemSword(this);
    ItemShield(this);
  }

  doHit(data) {
    this.onHit(data);
    this.emitAll('hit', {
      x: data.x,
      y: data.y,
    });
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
      this.gameLevelZone.doDamageRadialArea(this, opts);
    }
  }

  doJump(data) {
    const canJump = !this.inJump &&
      !this.Roll &&
      !this.afterJumpTime &&
      this.speed.length() > 200;
    if (canJump) {
      this.onJump(data);
      this.emitPos();
      this.emitAll('jump', {});
    }
  }
  doRoll(data) {
    const canRoll = !this.inRoll &&
      !this.afterRollTime &&
      this.speed.length() > 0;

    if (canRoll) {
      this.onRoll(data);
      this.emitPos();
      this.emitAll('roll', {});
    }
  }
}