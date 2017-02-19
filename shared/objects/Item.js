export class Item {
  static get classID() {
    return 'Item';
  }

  onCreate() {
    this.pos = new vec3(this.pos);

    this.sideAngle = 0;

    this.basePos = this.pos.clone();
    this.baseAngle = this.angle;
    this.baseSideAngle = this.sideAngle;

    if (false) {
      //
    } else if (this.type === 'weapon' && this.hand === 1) {
      this.slug = 'weapon';
    } else if (this.type === 'shield') {
      this.slug = 'shield';
    }

    this.parent[this.slug] = this;
  }
  destructor() {
    delete this.parent[this.slug];
  }
  reborn() {
    this.pos = this.basePos.clone();
    this.angle = this.baseAngle;
    this.sideAngle = this.baseSideAngle;
    console.log('reborn');
  }

  async stage(duration, fn, opts) {
    for (const k in opts) {
      this.animate(k, {
        end: opts[k],
        duration: duration,
        fn: fn,
      });
    }
    await this.sleep(duration);
  }
  async finalStage(duration, fn) {
    await this.stage(duration, fn, {
      pos: this.basePos,
      angle: this.baseAngle,
      sideAngle: this.baseSideAngle,
    });
  }

  checkNextHit(fn) {
    if (this.parent.needNextHit) {
      const opts = this.parent.needNextHit;
      delete this.parent.needNextHit;
      this.parent.finishHit();
      this.parent.onHit(opts, true);
      fn.call(this);
      return true;
    }
  }
  finishHit() {
    this.parent.finishHit();
  }
}


export function weapon__sword__default__doHit() {
  run(async() => {
    await this.sleep(0.35);
    vec3.add(this.parent.speed, this.parent.hitVec.multiply(600));
    this.parent.canNextHit = true;
  });

  run(async() => {
    await this.stage(0.3, easing.easeInCubic, {
      pos: new vec3({
        x: -40,
        y: 40,
      }),
      angle: 135,
      sideAngle: -50,
    });

    await this.stage(0.1, easing.easeOutCubic, {
      sideAngle: -200,
    });

    const damageOpts = {
      r1: 0,
      r2: 240,
      a1: -90,
      a2: 90,
    }
    if (this.parent.inRoll) {
      damageOpts.a1 = -140;
      damageOpts.a2 = 140;
      damageOpts.r2 = 260;
    }
    if (this.parent.inJump) {
      if (!this.parent.inRoll) {
        damageOpts.a1 = -120;
        damageOpts.a2 = 120;
      }
      damageOpts.r2 = 260;
    }
    this.parent.doDamageRadialArea(damageOpts);

    await this.sleep(0.1);

    if (this.checkNextHit(weapon__sword__default__doHit__2)) {
      return;
    }

    await this.finalStage(0.2, easing.easeInOutCubic);
    this.finishHit();
  });
}
export function weapon__sword__default__doHit__2() {
  this.parent.canNextHit = true;

  run(async() => {
    await this.stage(0.25, easing.easeInCubic, {
      sideAngle: -240,
    });
    vec3.add(this.parent.speed, this.parent.hitVec.multiply(600));
    await this.stage(0.1, easing.easeOutCubic, {
      sideAngle: -50,
    });

    const damageOpts = {
      r1: 0,
      r2: 240,
      a1: -90,
      a2: 90,
    }
    if (this.parent.inRoll) {
      damageOpts.a1 = -140;
      damageOpts.a2 = 140;
      damageOpts.r2 = 260;
    }
    if (this.parent.inJump) {
      if (!this.parent.inRoll) {
        damageOpts.a1 = -120;
        damageOpts.a2 = 120;
      }
      damageOpts.r2 = 260;
    }
    this.parent.doDamageRadialArea(damageOpts);

    await this.sleep(0.1);

    if (this.checkNextHit(weapon__sword__default__doHit__3)) {
      return;
    }

    await this.finalStage(0.2, easing.easeInOutCubic);
    this.finishHit();
  });
}
export function weapon__sword__default__doHit__3() {
  this.parent.canNextHit = true;

  run(async() => {
    await this.stage(0.25, easing.easeInCubic, {
      sideAngle: -10,
    });
    vec3.add(this.parent.speed, this.parent.hitVec.multiply(600));
    await this.stage(0.1, easing.easeOutCubic, {
      sideAngle: -200,
    });

    const damageOpts = {
      r1: 0,
      r2: 240,
      a1: -90,
      a2: 90,
    }
    if (this.parent.inRoll) {
      damageOpts.a1 = -140;
      damageOpts.a2 = 140;
      damageOpts.r2 = 260;
    }
    if (this.parent.inJump) {
      if (!this.parent.inRoll) {
        damageOpts.a1 = -120;
        damageOpts.a2 = 120;
      }
      damageOpts.r2 = 260;
    }
    this.parent.doDamageRadialArea(damageOpts);

    await this.sleep(0.1);

    if (this.checkNextHit(weapon__sword__default__doHit__2)) {
      return;
    }

    await this.finalStage(0.2, easing.easeInOutCubic);
    this.finishHit();
  });
}
export function ItemSword(parent) {
  return new global.Item({
    parent: parent,
    type: 'weapon',
    kind: 'sword',
    hand: 1,
    pos: {
      x: -25,
      y: 25,
    },
    angle: 15,
    doHit: weapon__sword__default__doHit,
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