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
      this.ownerSlug = 'weapon';
    } else if (this.type === 'weapon' && this.hand === 2) {
      this.ownerSlug = 'weapon2';
    } else if (this.type === 'shield') {
      this.ownerSlug = 'shield';
    }

    this.parent[this.ownerSlug] = this;

    this.timeouts = [];

    const kind = this.kind || 'default';
    const name = this.name || 'default';

    this.slug = this.type + '__' + kind + '__' + name;
  }
  destructor() {
    delete this.parent[this.ownerSlug];
  }
  reborn() {
    this.pos = this.basePos.clone();
    this.angle = this.baseAngle;
    this.sideAngle = this.baseSideAngle;
  }

  stage(duration, fn, props) {
    for (const k in props) {
      const end = props[k];
      this.animate(k, {
        duration: duration,
        fn: fn,
        end: end,
      });
    }
  }
  finalStage(duration, fn) {
    this.stage(duration, fn, {
      pos: this.basePos,
      angle: this.baseAngle,
      sideAngle: this.baseSideAngle,
    });
  }
}

export const weapon__sword__default__doHit = {
  1: function () {
    let time = 0;

    const step1 = 0.3 * this.hitSpeed;
    this.step(time, () => {
      this.canNextHit();
      this.weapon.stage(step1, easing.easeInCubic, {
        pos: new vec3({
          x: -40,
          y: 40,
        }),
        angle: 135,
        sideAngle: -50,
      });
    });
    time += step1;

    const step2 = 0.1;
    this.step(time, () => {
      this.playHit();
      this.weapon.stage(step2, easing.easeOutCubic, {
        sideAngle: -200,
      });
    });
    this.step(time + 0.05, () => {
      this.addImpulse(600);

      const damageOpts = {
        r1: 0,
        r2: 240,
        a1: -90,
        a2: 90,
      }
      if (this.inRoll) {
        damageOpts.a1 = -140;
        damageOpts.a2 = 140;
        damageOpts.r2 = 260;
      }
      if (this.inJump) {
        if (!this.inRoll) {
          damageOpts.a1 = -120;
          damageOpts.a2 = 120;
        }
        damageOpts.r2 = 260;
      }
      this.doDamageRadialArea(damageOpts);
    });
    time += step2 + 0.1 * this.hitSpeed;

    const step3 = 0.2 * this.hitSpeed;
    this.step(time, () => {
      this.checkNextHit(2);
      this.weapon.finalStage(0.2 * this.hitSpeed, easing.easeInOutCubic);
    });
    time += step3;

    this.step(time, () => {
      this.finishHit();
    });
  },
  2: function () {
    this.canNextHit();

    let time = 0;

    const step1 = 0.25 * this.hitSpeed;
    this.step(time, () => {
      this.weapon.stage(step1, easing.easeInCubic, {
        sideAngle: -240,
      });
    });
    time += step1;

    const step2 = 0.1;
    this.step(time + 0.05, () => {
      this.addImpulse(600);

      const damageOpts = {
        r1: 0,
        r2: 240,
        a1: -90,
        a2: 90,
      }
      if (this.inRoll) {
        damageOpts.a1 = -140;
        damageOpts.a2 = 140;
        damageOpts.r2 = 260;
      }
      if (this.inJump) {
        if (!this.inRoll) {
          damageOpts.a1 = -120;
          damageOpts.a2 = 120;
        }
        damageOpts.r2 = 260;
      }
      this.doDamageRadialArea(damageOpts);
    });
    this.step(time, () => {
      this.playHit();
      this.weapon.stage(step2, easing.easeOutCubic, {
        sideAngle: -50,
      });
    });
    time += step2 + 0.1 * this.hitSpeed;

    const step3 = 0.2 * this.hitSpeed;
    this.step(time, () => {
      this.checkNextHit(3);
      this.weapon.finalStage(step3, easing.easeInOutCubic);
    });
    time += step3;

    this.step(time, () => {
      this.finishHit();
    });
  },
  3: function () {
    this.canNextHit();

    let time = 0;

    const step1 = 0.25 * this.hitSpeed;
    this.step(time, () => {
      this.weapon.stage(step1, easing.easeInCubic, {
        sideAngle: -10,
      });
    });
    time += step1;

    const step2 = 0.1;
    this.step(time + 0.05, () => {
      this.addImpulse(600);

      const damageOpts = {
        r1: 0,
        r2: 240,
        a1: -90,
        a2: 90,
      }
      if (this.inRoll) {
        damageOpts.a1 = -140;
        damageOpts.a2 = 140;
        damageOpts.r2 = 260;
      }
      if (this.inJump) {
        if (!this.inRoll) {
          damageOpts.a1 = -120;
          damageOpts.a2 = 120;
        }
        damageOpts.r2 = 260;
      }
      this.doDamageRadialArea(damageOpts);
    });
    this.step(time, () => {
      this.playHit();
      this.weapon.stage(step2, easing.easeOutCubic, {
        sideAngle: -200,
      });
    });
    time += step2 + 0.1 * this.hitSpeed;

    const step3 = 0.2 * this.hitSpeed;
    this.step(time, () => {
      this.checkNextHit(2);
      this.weapon.finalStage(step3, easing.easeInOutCubic);
    });
    time += step3;

    this.step(time, () => {
      this.finishHit();
    });
  },
};

//
export const stage1__mob1__doHit = {
  1: function () {
    let time = 0;

    const step1 = 0.3 * this.hitSpeed;
    this.step(time, () => {
      this.canNextHit();
      this.weapon.stage(step1, easing.easeInCubic, {
        pos: new vec3({
          x: -40,
          y: 40,
        }),
        angle: 135,
        sideAngle: -50,
      });
    });
    time += step1;

    const step2 = 0.1;
    this.step(time, () => {
      this.playHit();
      this.weapon.stage(step2, easing.easeOutCubic, {
        sideAngle: -200,
      });
    });
    this.step(time + 0.05, () => {
      this.addImpulse(600);

      const damageOpts = {
        r1: 0,
        r2: 300,
        a1: -90,
        a2: 90,
      }
      if (this.inRoll) {
        damageOpts.a1 = -140;
        damageOpts.a2 = 140;
        damageOpts.r2 = 350;
      }
      if (this.inJump) {
        if (!this.inRoll) {
          damageOpts.a1 = -120;
          damageOpts.a2 = 120;
        }
        damageOpts.r2 = 350;
      }
      this.doDamageRadialArea(damageOpts);
    });
    time += step2 + 0.1 * this.hitSpeed;

    const step3 = 0.2 * this.hitSpeed;
    this.step(time, () => {
      this.checkNextHit(2);
      this.weapon.finalStage(0.2 * this.hitSpeed, easing.easeInOutCubic);
    });
    time += step3;

    this.step(time, () => {
      this.finishHit();
    });
  },
  2: function () {
    this.canNextHit();

    let time = 0;

    const step1 = 0.25 * this.hitSpeed;
    this.step(time, () => {
      this.weapon.finalStage(step1, easing.easeInCubic);
      this.weapon2.stage(step1, easing.easeInCubic, {
        pos: new vec3({
          x: -40,
          y: -40,
        }),
        angle: -135,
        sideAngle: 10,
      });
    });
    time += step1;

    const step2 = 0.1;
    this.step(time + 0.05, () => {
      this.addImpulse(600);

      const damageOpts = {
        r1: 0,
        r2: 300,
        a1: -90,
        a2: 90,
      }
      if (this.inRoll) {
        damageOpts.a1 = -140;
        damageOpts.a2 = 140;
        damageOpts.r2 = 350;
      }
      if (this.inJump) {
        if (!this.inRoll) {
          damageOpts.a1 = -120;
          damageOpts.a2 = 120;
        }
        damageOpts.r2 = 350;
      }
      this.doDamageRadialArea(damageOpts);
    });
    this.step(time, () => {
      this.playHit();
      this.weapon2.stage(step2, easing.easeOutCubic, {
        sideAngle: 200,
      });
    });
    time += step2 + 0.1 * this.hitSpeed;

    const step3 = 0.2 * this.hitSpeed;
    this.step(time, () => {
      this.checkNextHit(3);
      this.weapon2.finalStage(step3, easing.easeInOutCubic);
    });
    time += step3;

    this.step(time, () => {
      this.finishHit();
    });
  },
  3: function () {
    this.canNextHit();

    let time = 0;

    const step1 = 0.25 * this.hitSpeed;
    this.step(time, () => {
      this.weapon2.finalStage(step1, easing.easeInCubic);
      this.weapon.stage(step1, easing.easeInCubic, {
        pos: new vec3({
          x: -40,
          y: 40,
        }),
        angle: 135,
        sideAngle: -10,
      });
    });
    time += step1;

    const step2 = 0.1;
    this.step(time + 0.05, () => {
      this.addImpulse(600);

      const damageOpts = {
        r1: 0,
        r2: 300,
        a1: -90,
        a2: 90,
      }
      if (this.inRoll) {
        damageOpts.a1 = -140;
        damageOpts.a2 = 140;
        damageOpts.r2 = 350;
      }
      if (this.inJump) {
        if (!this.inRoll) {
          damageOpts.a1 = -120;
          damageOpts.a2 = 120;
        }
        damageOpts.r2 = 350;
      }
      this.doDamageRadialArea(damageOpts);
    });
    this.step(time, () => {
      this.playHit();
      this.weapon.stage(step2, easing.easeOutCubic, {
        sideAngle: -200,
      });
    });
    time += step2 + 0.1 * this.hitSpeed;

    const step3 = 0.2 * this.hitSpeed;
    this.step(time, () => {
      this.checkNextHit(2);
      this.weapon.finalStage(step3, easing.easeInOutCubic);
    });
    time += step3;

    this.step(time, () => {
      this.finishHit();
    });
  },
};