export function ia__hands__doHit(opts) {
  opts = opts || {};
  return {
    1: function () {
      let time = 0;

      const step1 = 0.3 * this.hitSpeed;
      this.step(time, () => {
        this.canNextHit();
        this.weapon.stage(step1, easing.easeInQuad, {
          pos: new vec3({
            x: -40,
            y: 40,
          }),
          angle: 135,
          vAngle: 0,
          sideAngle: -50,
        });
      });
      time += step1;

      const step2 = 0.1;
      this.step(time, () => {
        this.playHit();
        this.weapon.stage(step2, easing.easeOutQuad, {
          sideAngle: -200,
        });
        this.addImpulse(1700);
      });
      this.step(time + 0.05, () => {
        const damageOpts = {
          d: 280,
          a: 70,
          impulse: 1700,
        }
        if (this.inRoll) {
          damageOpts.a = 80;
          damageOpts.d = 320;
        }
        if (this.inJump) {
          damageOpts.d = 320;
        }
        this.doDamageRadialArea(damageOpts);
      });
      time += step2 + 0.2 * this.hitSpeed;

      const step3 = 0.9 * this.hitSpeed;
      this.step(time, () => {
        this.checkNextHit(2);
        this.weapon.finalStage(step3, easing.easeInOutQuad);
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
        this.weapon.finalStage(step1 + 0.05 * this.hitSpeed, easing.easeInQuad);
        this.weapon2.stage(step1, easing.easeInQuad, {
          pos: new vec3({
            x: -40,
            y: -40,
          }),
          angle: -135,
          vAngle: 0,
          sideAngle: 50,
        });
      });
      time += step1;

      const step2 = 0.1;
      this.step(time + 0.05, () => {
        const damageOpts = {
          d: 280,
          a: 70,
          impulse: 1300,
        }
        if (this.inRoll) {
          damageOpts.a = 80;
          damageOpts.d = 320;
        }
        if (this.inJump) {
          damageOpts.d = 320;
        }
        this.doDamageRadialArea(damageOpts);
      });
      this.step(time, () => {
        this.addImpulse(1300);
        this.playHit();
        this.weapon2.stage(step2, easing.easeOutQuad, {
          sideAngle: 200,
        });
      });
      time += step2 + 0.2 * this.hitSpeed;

      const step3 = 0.9 * this.hitSpeed;
      this.step(time, () => {
        this.checkNextHit(3);
        this.weapon2.finalStage(step3, easing.easeInOutQuad);
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
        this.weapon2.finalStage(step1 + 0.05 * this.hitSpeed, easing.easeInQuad);
        this.weapon.stage(step1, easing.easeInQuad, {
          pos: new vec3({
            x: -40,
            y: 40,
          }),
          angle: 135,
          vAngle: 0,
          sideAngle: -50,
        });
      });
      time += step1;

      const step2 = 0.1;
      this.step(time + 0.05, () => {
        const damageOpts = {
          d: 280,
          a: 70,
          impulse: 1500,
        }
        if (this.inRoll) {
          damageOpts.a = 80;
          damageOpts.d = 320;
        }
        if (this.inJump) {
          damageOpts.d = 320;
        }
        this.doDamageRadialArea(damageOpts);
      });
      this.step(time, () => {
        this.addImpulse(1500);
        this.weapon2.finalStage(step2, easing.easeInQuad);
        this.playHit();
        this.weapon.stage(step1, easing.easeOutQuad, {
          sideAngle: -200,
        });
      });
      time += step2 + 0.2 * this.hitSpeed;

      const step3 = 0.9 * this.hitSpeed;
      this.step(time, () => {
        this.checkNextHit(2);
        this.weapon.finalStage(step3, easing.easeInOutQuad);
      });
      time += step3;

      this.step(time, () => {
        this.finishHit();
      });
    },
  };
}