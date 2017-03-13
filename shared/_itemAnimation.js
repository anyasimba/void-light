export function ia_sword__doHit(opts) {
  opts = opts || {};
  return {
    1: function () {
      delete this.weapon.mirror;
      let time = 0;

      const step1 = (opts.begin || 0.3) * this.hitSpeed;
      this.step(time, () => {
        this.canNextHit();
        this.weapon.stage(step1, easing.easeInCubic, {
          pos: new vec3({
            x: -60,
            y: 60,
          }),
          angle: 135,
          vAngle: 0,
          sideAngle: -60,
        });
      });
      time += step1;

      const step2 = 0.15;
      this.step(time, () => {
        this.playHit();
        this.weapon.stage(step2, easing.easeOutCubic, {
          sideAngle: -200,
        });
        this.addImpulse(opts.impulse || 600);
      });
      this.step(time + 0.075, () => {
        const damageOpts = {
          r1: 0,
          r2: 320,
          a1: -90,
          a2: 90,
          impulse: opts.impulse || 600,
        }
        if (this.inRoll) {
          damageOpts.a1 = -140;
          damageOpts.a2 = 140;
          damageOpts.r2 = 340;
        }
        if (this.inJump) {
          if (!this.inRoll) {
            damageOpts.a1 = -120;
            damageOpts.a2 = 120;
          }
          damageOpts.r2 = 340;
        }
        this.doDamageRadialArea(damageOpts);
      });
      time += step2 + (opts.wait || 0.2) * this.hitSpeed;

      const step3 = (opts.end || 0.2) * this.hitSpeed;
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
      this.weapon.mirror = true;
      this.canNextHit();

      let time = 0;

      const step1 = (opts.begin2 || 0.2) * this.hitSpeed;
      this.step(time, () => {
        this.weapon.stage(step1, easing.easeInCubic, {
          sideAngle: -240,
        });
      });
      time += step1;

      const step2 = 0.15;
      this.step(time + 0.075, () => {
        const damageOpts = {
          r1: 0,
          r2: 320,
          a1: -90,
          a2: 90,
          impulse: opts.impulse2 || 600,
        }
        if (this.inRoll) {
          damageOpts.a1 = -140;
          damageOpts.a2 = 140;
          damageOpts.r2 = 340;
        }
        if (this.inJump) {
          if (!this.inRoll) {
            damageOpts.a1 = -120;
            damageOpts.a2 = 120;
          }
          damageOpts.r2 = 340;
        }
        this.doDamageRadialArea(damageOpts);
      });
      this.step(time, () => {
        this.addImpulse(opts.impulse2 || 600);
        this.playHit();
        this.weapon.stage(step2, easing.easeOutCubic, {
          sideAngle: -60,
        });
      });
      time += step2 + (opts.wait2 || 0.1) * this.hitSpeed;

      const step3 = (opts.end2 || 0.2) * this.hitSpeed;
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
      delete this.weapon.mirror;
      this.canNextHit();

      let time = 0;

      const step1 = (opts.begin3 || 0.2) * this.hitSpeed;
      this.step(time, () => {
        this.weapon.stage(step1, easing.easeInCubic, {
          sideAngle: -20,
        });
      });
      time += step1;

      const step2 = 0.15;
      this.step(time + 0.075, () => {
        const damageOpts = {
          r1: 0,
          r2: 320,
          a1: -90,
          a2: 90,
          impulse: opts.impulse3 || 600,
        }
        if (this.inRoll) {
          damageOpts.a1 = -140;
          damageOpts.a2 = 140;
          damageOpts.r2 = 340;
        }
        if (this.inJump) {
          if (!this.inRoll) {
            damageOpts.a1 = -120;
            damageOpts.a2 = 120;
          }
          damageOpts.r2 = 340;
        }
        this.doDamageRadialArea(damageOpts);
      });
      this.step(time, () => {
        this.addImpulse(opts.impulse3 || 600);
        this.playHit();
        this.weapon.stage(step2, easing.easeOutCubic, {
          sideAngle: -200,
        });
      });
      time += step2 + (opts.wait3 || 0.1) * this.hitSpeed;

      const step3 = (opts.end3 || 0.2) * this.hitSpeed;
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
}

export function ia_axe__doHit(opts) {
  opts = opts || {};
  return {
    1: function () {
      delete this.weapon.mirror;
      let time = 0;

      const step1 = (opts.begin || 0.2) * this.hitSpeed;
      this.step(time, () => {
        this.canNextHit();
        this.weapon.stage(step1, easing.easeInCubic, {
          pos: new vec3({
            x: -60,
            y: 60,
          }),
          angle: 135,
          vAngle: 50,
          hAngle: 130,
          sideAngle: 0,
        });
      });
      time += step1;

      const step2 = 0.15;
      this.step(time, () => {
        this.playHit();
        this.weapon.stage(0.05, easing.linear, {
          pos: new vec3({
            x: 30,
            y: -30,
          }),
          vAngle: 90,
        });
        this.weapon.stage(step2, easing.easeOutCubic, {
          sideAngle: -135,
          hAngle: 70,
        });
        this.addImpulse(opts.impulse || 600);
      });
      this.step(time + 0.05, () => {
        this.weapon.stage(0.1, easing.linear, {
          pos: new vec3({
            x: -60,
            y: 60,
          }),
          vAngle: 0,
        });
      });
      this.step(time + 0.075, () => {
        const damageOpts = {
          r1: 0,
          r2: 320,
          a1: -20,
          a2: 20,
          impulse: opts.impulse2 || 600,
        }
        if (this.inRoll) {
          damageOpts.a1 = -40;
          damageOpts.a2 = 40;
          damageOpts.r2 = 340;
        }
        if (this.inJump) {
          if (!this.inRoll) {
            damageOpts.a1 = -30;
            damageOpts.a2 = 30;
          }
          damageOpts.r2 = 340;
        }
        this.doDamageRadialArea(damageOpts);
      });
      time += step2 + (opts.wait || 0.2) * this.hitSpeed;

      const step3 = (opts.end || 0.2) * this.hitSpeed;
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
      this.weapon.mirror = true;
      this.canNextHit();

      let time = 0;

      const step1 = (opts.begin2 || 0.15) * this.hitSpeed;
      this.step(time, () => {
        this.weapon.stage(step1, easing.easeInCubic, {
          vAngle: 50,
          hAngle: 130,
          sideAngle: -270,
        });
      });
      time += step1;

      const step2 = 0.15;
      this.step(time, () => {
        this.playHit();
        this.weapon.stage(0.05, easing.linear, {
          pos: new vec3({
            x: 30,
            y: -30,
          }),
          vAngle: 90,
        });
        this.weapon.stage(step2, easing.easeOutCubic, {
          sideAngle: -135,
          hAngle: 70,
        });
        this.addImpulse(opts.impulse || 600);
      });
      this.step(time + 0.05, () => {
        this.weapon.stage(0.1, easing.linear, {
          pos: new vec3({
            x: -60,
            y: 60,
          }),
          vAngle: 0,
        });
      });
      this.step(time + 0.075, () => {
        const damageOpts = {
          r1: 0,
          r2: 320,
          a1: -20,
          a2: 20,
          impulse: opts.impulse2 || 600,
        }
        if (this.inRoll) {
          damageOpts.a1 = -40;
          damageOpts.a2 = 40;
          damageOpts.r2 = 340;
        }
        if (this.inJump) {
          if (!this.inRoll) {
            damageOpts.a1 = -30;
            damageOpts.a2 = 30;
          }
          damageOpts.r2 = 340;
        }
        this.doDamageRadialArea(damageOpts);
      });
      time += step2 + (opts.wait2 || 0.1) * this.hitSpeed;

      const step3 = (opts.end2 || 0.2) * this.hitSpeed;
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
      delete this.weapon.mirror;
      this.canNextHit();

      let time = 0;

      const step1 = (opts.begin2 || 0.15) * this.hitSpeed;
      this.step(time, () => {
        this.weapon.stage(step1, easing.easeInCubic, {
          vAngle: 50,
          hAngle: 130,
          sideAngle: 0,
        });
      });
      time += step1;

      const step2 = 0.15;
      this.step(time, () => {
        this.playHit();
        this.weapon.stage(0.05, easing.linear, {
          pos: new vec3({
            x: 30,
            y: -30,
          }),
          vAngle: 90,
        });
        this.weapon.stage(step2, easing.easeOutCubic, {
          sideAngle: -135,
          hAngle: 70,
        });
        this.addImpulse(opts.impulse || 600);
      });
      this.step(time + 0.05, () => {
        this.weapon.stage(0.1, easing.linear, {
          pos: new vec3({
            x: -60,
            y: 60,
          }),
          vAngle: 0,
        });
      });
      this.step(time + 0.075, () => {
        const damageOpts = {
          r1: 0,
          r2: 320,
          a1: -20,
          a2: 20,
          impulse: opts.impulse2 || 600,
        }
        if (this.inRoll) {
          damageOpts.a1 = -40;
          damageOpts.a2 = 40;
          damageOpts.r2 = 340;
        }
        if (this.inJump) {
          if (!this.inRoll) {
            damageOpts.a1 = -30;
            damageOpts.a2 = 30;
          }
          damageOpts.r2 = 340;
        }
        this.doDamageRadialArea(damageOpts);
      });
      time += step2 + (opts.wait2 || 0.1) * this.hitSpeed;

      const step3 = (opts.end2 || 0.2) * this.hitSpeed;
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
}