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
      size: Fighter.BODY_SIZE,
    }

    new Sword({
      parent: this,
      pos: {
        x: -25,
        y: 25,
      },
      angle: 15,
    });
  }

  doHit(data) {
    this.onHit(data);
    this.emitAll('hit', {
      x: data.x,
      y: data.y,
    });
  }
  onHit(data) {
    const inHit = this.inHit;
    super.onHit(data);
    if (inHit) {
      return;
    }
    this.emitAll('hit', {
      x: data.x,
      y: data.y,
    });
  }

  doDamageRadialArea(opts) {
    opts.hitVec = this.hitVec;

    const hitAngle = this.hitVec.toAngle();
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
      this.emitAll('jump', {});
    }
  }
  doRoll(data) {
    const canRoll = !this.inRoll &&
      !this.afterRollTime &&
      this.speed.length() > 0;

    if (canRoll) {
      this.onRoll(data);
      this.emitAll('roll', {});
    }
  }
}