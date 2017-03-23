export function ia_sword__doHit(opts) {
  opts = opts || {};
  const ia_sword = {
    1: function () {
      if (this.inJump || this.inRoll || this.inBlock) {
        ia_sword[10].call(this);
        return;
      }

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
          sideAngle: -210,
        });
        this.addImpulse(opts.impulse1 || 600);
      });
      this.step(time + 0.075, () => {
        const damageOpts = {
          d: 260,
          a: 70,
          impulse: opts.impulse1 || 600,
        }
        if (this.inRoll) {
          damageOpts.a = 75;
          damageOpts.d = 260;
        }
        if (this.inJump) {
          damageOpts.d = 260;
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
          pos: new vec3({
            x: -60,
            y: 60,
          }),
          angle: 135,
          vAngle: 0,
          hAngle: 0,
          sideAngle: -250,
        });
      });
      time += step1;

      const step2 = 0.15;
      this.step(time + 0.075, () => {
        const damageOpts = {
          d: 260,
          a: 70,
          impulse: opts.impulse2 || 600,
        }
        if (this.inRoll) {
          damageOpts.a = 75;
          damageOpts.d = 260;
        }
        if (this.inJump) {
          damageOpts.d = 260;
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
      if (this.inJump || this.inRoll || this.inBlock) {
        ia_sword[10].call(this);
        return;
      }

      delete this.weapon.mirror;
      this.canNextHit();

      let time = 0;

      const step1 = (opts.begin3 || 0.2) * this.hitSpeed;
      this.step(time, () => {
        this.weapon.stage(step1, easing.easeInQuad, {
          pos: new vec3({
            x: -60,
            y: 60,
          }),
          angle: 135,
          vAngle: 0,
          hAngle: 0,
          sideAngle: -20,
        });
      });
      time += step1;

      const step2 = 0.15;
      this.step(time + 0.075, () => {
        const damageOpts = {
          d: 260,
          a: 70,
          impulse: opts.impulse3 || 600,
        }
        if (this.inRoll) {
          damageOpts.a = 75;
          damageOpts.d = 260;
        }
        if (this.inJump) {
          damageOpts.d = 260;
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
    //
    10: function () {
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
          d: 260,
          a: 5,
          impulse: opts.impulse1 || 600,
        }
        if (this.inRoll) {
          damageOpts.a = 10;
          damageOpts.d = 260;
        }
        if (this.inJump) {
          damageOpts.d = 260;
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
  };

  return ia_sword;
}