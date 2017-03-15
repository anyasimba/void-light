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

export function ia_sword__doHit(opts) {
  opts = opts || {};
  return {
    1: function () {
      delete this.weapon.mirror;
      let time = 0;

      const step1 = (opts.begin || 0.3) * this.hitSpeed;
      this.step(time, () => {
        this.canNextHit();
        this.weapon.stage(step1, easing.easeInQuad, {
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
        this.weapon.stage(step2, easing.easeOutQuad, {
          sideAngle: -200,
        });
        this.addImpulse(opts.impulse1 || 600);
      });
      this.step(time + 0.075, () => {
        const damageOpts = {
          d: 280,
          a: 75,
          impulse: opts.impulse1 || 600,
        }
        if (this.inRoll) {
          damageOpts.a = 90;
          damageOpts.d = 300;
        }
        if (this.inJump) {
          damageOpts.d = 300;
        }
        this.doDamageRadialArea(damageOpts);
      });
      time += step2 + (opts.wait || 0.3) * this.hitSpeed;

      const step3 = (opts.end || 0.2) * this.hitSpeed;
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
      this.weapon.mirror = true;
      this.canNextHit();

      let time = 0;

      const step1 = (opts.begin2 || 0.2) * this.hitSpeed;
      this.step(time, () => {
        this.weapon.stage(step1, easing.easeInQuad, {
          sideAngle: -240,
        });
      });
      time += step1;

      const step2 = 0.15;
      this.step(time + 0.075, () => {
        const damageOpts = {
          d: 280,
          a: 75,
          impulse: opts.impulse2 || 600,
        }
        if (this.inRoll) {
          damageOpts.a = 90;
          damageOpts.d = 300;
        }
        if (this.inJump) {
          damageOpts.d = 300;
        }
        this.doDamageRadialArea(damageOpts);
      });
      this.step(time, () => {
        this.addImpulse(opts.impulse2 || 600);
        this.playHit();
        this.weapon.stage(step2, easing.easeOutQuad, {
          sideAngle: -60,
        });
      });
      time += step2 + (opts.wait2 || 0.2) * this.hitSpeed;

      const step3 = (opts.end2 || 0.2) * this.hitSpeed;
      this.step(time, () => {
        this.checkNextHit(3);
        this.weapon.finalStage(step3, easing.easeInOutQuad);
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
        this.weapon.stage(step1, easing.easeInQuad, {
          sideAngle: -20,
        });
      });
      time += step1;

      const step2 = 0.15;
      this.step(time + 0.075, () => {
        const damageOpts = {
          d: 280,
          a: 75,
          impulse: opts.impulse3 || 600,
        }
        if (this.inRoll) {
          damageOpts.a = 90;
          damageOpts.d = 300;
        }
        if (this.inJump) {
          damageOpts.d = 300;
        }
        this.doDamageRadialArea(damageOpts);
      });
      this.step(time, () => {
        this.addImpulse(opts.impulse3 || 600);
        this.playHit();
        this.weapon.stage(step2, easing.easeOutQuad, {
          sideAngle: -200,
        });
      });
      time += step2 + (opts.wait3 || 0.2) * this.hitSpeed;

      const step3 = (opts.end3 || 0.2) * this.hitSpeed;
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

export function ia_axe__doHit(opts) {
  opts = opts || {};
  return {
    1: function () {
      delete this.weapon.mirror;
      let time = 0;

      const step1 = (opts.begin || 0.2) * this.hitSpeed;
      this.step(time, () => {
        this.canNextHit();
        this.weapon.stage(step1, easing.easeInQuad, {
          pos: new vec3({
            y: -30,
            x: -90,
          }),
          angle: 50,
          vAngle: 170,
          hAngle: 75,
          sideAngle: -90,
        });
      });
      time += step1;

      const step2 = 0.15;
      this.step(time, () => {
        this.playHit();
        this.weapon.stage(step2, easing.easeOutQuad, {
          pos: new vec3({
            y: 60,
            x: 0,
          }),
          angle: 90,
          vAngle: 0,
        });
        this.addImpulse(opts.impulse || 600);
      });
      this.step(time + 0.075, () => {
        const damageOpts = {
          d: 280,
          a: 15,
          impulse: opts.impulse1 || 600,
        }
        if (this.inRoll) {
          damageOpts.a = 20;
          damageOpts.d = 300;
        }
        if (this.inJump) {
          damageOpts.d = 300;
        }
        this.doDamageRadialArea(damageOpts);
      });
      time += step2 + (opts.wait || 0.2) * this.hitSpeed;

      const step3 = (opts.end || 0.2) * this.hitSpeed;
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
      this.weapon.mirror = true;
      this.canNextHit();

      let time = 0;

      const step1 = (opts.begin2 || 0.15) * this.hitSpeed;
      this.step(time, () => {
        this.weapon.stage(step1, easing.easeInQuad, {
          pos: new vec3({
            y: -30,
            x: 90,
          }),
          angle: 130,
          vAngle: 170,
          hAngle: 75,
          sideAngle: -90,
        });
      });
      time += step1;

      const step2 = 0.15;
      this.step(time, () => {
        this.playHit();
        this.weapon.stage(step2, easing.easeOutQuad, {
          pos: new vec3({
            y: 60,
            x: 0,
          }),
          angle: 90,
          vAngle: 0,
        });
        this.addImpulse(opts.impulse || 600);
      });
      this.step(time + 0.075, () => {
        const damageOpts = {
          d: 280,
          a: 15,
          impulse: opts.impulse2 || 600,
        }
        if (this.inRoll) {
          damageOpts.a = 20;
          damageOpts.d = 300;
        }
        if (this.inJump) {
          damageOpts.d = 300;
        }
        this.doDamageRadialArea(damageOpts);
      });
      time += step2 + (opts.wait2 || 0.15) * this.hitSpeed;

      const step3 = (opts.end2 || 0.2) * this.hitSpeed;
      this.step(time, () => {
        this.checkNextHit(3);
        this.weapon.finalStage(step3, easing.easeInOutQuad);
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

      const step1 = (opts.begin || 0.15) * this.hitSpeed;
      this.step(time, () => {
        this.canNextHit();
        this.weapon.stage(step1, easing.easeInQuad, {
          pos: new vec3({
            y: -30,
            x: -90,
          }),
          angle: 50,
          vAngle: 170,
          hAngle: 75,
          sideAngle: -90,
        });
      });
      time += step1;

      const step2 = 0.15;
      this.step(time, () => {
        this.playHit();
        this.weapon.stage(step2, easing.easeOutQuad, {
          pos: new vec3({
            y: 60,
            x: 0,
          }),
          angle: 90,
          vAngle: 0,
        });
        this.addImpulse(opts.impulse || 600);
      });
      this.step(time + 0.075, () => {
        const damageOpts = {
          d: 280,
          a: 15,
          impulse: opts.impulse3 || 600,
        }
        if (this.inRoll) {
          damageOpts.a = 20;
          damageOpts.d = 300;
        }
        if (this.inJump) {
          damageOpts.d = 300;
        }
        this.doDamageRadialArea(damageOpts);
      });
      time += step2 + (opts.wait2 || 0.15) * this.hitSpeed;

      const step3 = (opts.end2 || 0.2) * this.hitSpeed;
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