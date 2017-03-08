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
      this.addImpulse(1700);

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

    const step3 = 0.9 * this.hitSpeed;
    this.step(time, () => {
      this.checkNextHit(2);
      this.weapon.finalStage(step3, easing.easeInOutCubic);
    });
    time += step3;

    this.step(time, () => {
      this.finishHit();
    });
  },
  2: function () {
    this.canNextHit();

    let time = 0;

    const step1 = 0.1 * this.hitSpeed;
    this.step(time, () => {
      this.canNextHit();
      this.weapon.finalStage(step1 + 0.05 * this.hitSpeed, easing.easeInCubic);
      this.weapon2.stage(step1, easing.easeInCubic, {
        pos: new vec3({
          x: -40,
          y: -40,
        }),
        angle: -135,
        sideAngle: 50,
      });
    });
    time += step1;

    const step2 = 0.1;
    this.step(time + 0.05, () => {
      this.addImpulse(1300);

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

    const step3 = 0.9 * this.hitSpeed;
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

    const step1 = 0.1 * this.hitSpeed;
    this.step(time, () => {
      this.canNextHit();
      this.weapon2.finalStage(step1 + 0.05 * this.hitSpeed, easing.easeInCubic);
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
    this.step(time + 0.05, () => {
      this.addImpulse(1500);

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
      this.weapon2.finalStage(step2, easing.easeInCubic);
      this.playHit();
      this.weapon.stage(step1, easing.easeOutCubic, {
        sideAngle: -200,
      });
    });
    time += step2 + 0.1 * this.hitSpeed;

    const step3 = 0.9 * this.hitSpeed;
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

export const stage1__mob2__doHit = ia_sword__doHit({
  begin: 0.5,
  wait: 0.2,
  end: 1,
  impulse: 1800,
  begin2: 0.3,
  wait2: 0,
  end2: 1,
  impulse2: 1500,
  begin3: 0.5,
  wait3: 0,
  end3: 1,
  impulse3: 1600,
});
export const stage1__boss1__doHit = ia_sword__doHit({
  begin: 0.7,
  wait: 0.4,
  end: 1,
  impulse: 1500,
  begin2: 0,
  wait2: 0.7,
  end2: 1,
  impulse2: 500,
  begin3: 0,
  wait3: 0.5,
  end3: 1,
  impulse3: 500,
});