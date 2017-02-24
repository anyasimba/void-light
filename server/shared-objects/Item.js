export class Item extends mix(global.Item, MixGameObject) {
  get state() {
    return {
      type: this.type,
      kind: this.kind,
      name: this.name,

      hand: this.hand,

      pos: this.pos,
      angle: this.angle,
      sideAngle: this.sideAngle,

      hitSpeed: this.hitSpeed,
    };
  }

  async stage(duration, fn, opts) {
    this.stageTime = 0;
    return await super.stage(duration, fn, {
      stageTime: 1,
    });
  }

  checkNextHit(i) {
    if (this.parent.needNextHit) {
      const opts = this.parent.needNextHit;
      delete this.parent.needNextHit;
      this.parent.finishHit();
      opts.hitStage = i;
      this.parent.doHit(opts);
      delete this.lock;
      return true;
    }
  }
  canNextHit() {
    if (this.parent.inHit) {
      this.parent.canNextHit = true;
    }
  }
  breakHit() {
    delete this.parent.needNextHit;
    super.breakHit();
  }
  addImpulse(v) {
    if (this.parent.hitVec) {
      vec3.add(this.parent.speed, this.parent.hitVec.multiply(v));
      this.parent.emitPos();
    }
  }
}

export function ItemSword(parent, hitSpeed) {
  return new global.Item({
    parent: parent,
    type: 'weapon',
    kind: 'sword',
    damage: 40,
    balance: 5,
    hitSpeed: hitSpeed,
    hand: 1,
    pos: {
      x: -25,
      y: 25,
    },
    angle: 15,
  });
}
export function ItemShield(parent) {
  return new global.Item({
    parent: parent,
    type: 'shield',
    hand: 2,
    pos: {
      x: -15,
      y: -30,
    },
    angle: -35,
  });
}