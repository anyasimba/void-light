export function ia_top(
  begin, wait, end, imp,
  a, da, d,
  ba, ha1, ha2, va1, va2, faceA1, faceA2) {

  return function (afterBlock) {
    if (this.hitStage > 1) {
      this.weaponMirror = !this.weaponMirror;
    } else if (this.hitStage !== 0) {
      delete this.weaponMirror;
    }
    let weapon1 = this.weapon;
    let hand = 1;
    weapon1.mirror = this.weaponMirror;
    let weapon2;
    if (this.weapon2) {
      delete weapon1.mirror;
      if (this.weaponMirror) {
        hand = 2;
        weapon1 = this.weapon2;
        weapon2 = this.weapon;
      } else {
        weapon2 = this.weapon2;
      }
      weapon2.finalStage(begin * this.hitSpeed, easing.easeInQuad);
    }
    let time = 0;

    let ba_ = ba;
    let faceA1_ = faceA1;
    let faceA2_ = faceA2;
    if (this.weaponMirror) {
      ba_ = -ba;
      faceA1_ = -faceA1;
      faceA2_ = -faceA2;
    }

    if (afterBlock) {
      const step0 = 0.2;
      this.step(time, () => {
        weapon1.stage(step0, easing.easeOutQuad, {
          pos: new vec3({
            y: 60,
            x: 0,
          }),
          angle: 90,
          vAngle: 0,
          hAngle: ha2,
          sideAngle: (-90 - faceA2_ + (da - a) * Math.sign(faceA1_)),
        });
        this.stage(step0, easing.easeOutQuad, {
          angle: faceA2_,
        });
      });
      time += step0;
    } else {
      if (this.checkBlock({
          d: d,
          a: a,
          da: da * Math.sign(faceA1_),
          impulse: imp,
          hand: hand,
        })) {
        return;
      }
    }

    const step1 = begin * this.hitSpeed;
    this.step(time, () => {
      this.canNextHit();
      weapon1.stage(step1, easing.easeInQuad, {
        pos: new vec3({
          y: -30,
          x: -90 * Math.sign(faceA1_),
        }),
        angle: (90 + ba_),
        vAngle: va1,
        hAngle: ha1,
        sideAngle: (-90 + (da + a) * Math.sign(faceA1_)) - faceA1_,
      });
      this.stage(step1, easing.easeInQuad, {
        angle: faceA1_,
      });
    });
    time += step1;

    const step2 = 0.15;
    this.step(time, () => {
      this.playHit();
      weapon1.stage(step2, easing.easeOutQuad, {
        pos: new vec3({
          y: 60,
          x: 0,
        }),
        angle: 90,
        vAngle: 0,
        hAngle: ha2,
        sideAngle: (-90 + (da - a) * Math.sign(faceA1_)) - faceA2_,
      });
      this.stage(step2, easing.easeOutQuad, {
        angle: faceA2_,
      });
      this.addImpulse(imp);
    });
    this.step(time + 0.075, () => {
      this.doDamageRadialArea({
        d: d,
        a: a,
        da: da * Math.sign(faceA1_),
        impulse: imp,
        hand: hand,
      });
    });
    time += step2 + wait * this.hitSpeed;

    const step3 = end * this.hitSpeed;
    this.step(time, () => {
      weapon1.finalStage(step3, easing.easeInOutQuad);
      this.finalStage(step3, easing.easeInOutQuad);
      this.checkNextHit(this.hitStage + 1);
    });
    time += step3;

    this.step(time, () => {
      this.finishHit();
    });
  }
}
export function ia_forward(
  begin, wait, end, imp,
  a, da, d,
  ba, ha1, ha2, va1, va2, faceA1, faceA2) {

  return function (afterBlock) {
    if (this.hitStage > 1) {
      this.weaponMirror = !this.weaponMirror;
    } else if (this.hitStage !== 0) {
      delete this.weaponMirror;
    }
    let weapon1 = this.weapon;
    let hand = 1;
    weapon1.mirror = this.weaponMirror;
    let weapon2;
    if (this.weapon2) {
      delete weapon1.mirror;
      if (this.weaponMirror) {
        hand = 2;
        weapon1 = this.weapon2;
        weapon2 = this.weapon;
      } else {
        weapon2 = this.weapon2;
      }
      weapon2.finalStage(begin * this.hitSpeed, easing.easeInQuad);
    }
    let time = 0;

    let ba_ = ba;
    let faceA1_ = faceA1;
    let faceA2_ = faceA2;
    if (this.weaponMirror) {
      ba_ = -ba;
      faceA1_ = -faceA1;
      faceA2_ = -faceA2;
    }

    if (afterBlock) {
      const step0 = 0.2;
      this.step(time, () => {
        weapon1.stage(step0, easing.easeOutQuad, {
          pos: new vec3({
            y: 60,
            x: 0,
          }),
          angle: 90,
          vAngle: 0,
          hAngle: ha2,
          sideAngle: -90 - faceA2_ + da * Math.sign(faceA1_),
        });
        this.stage(step0, easing.easeOutQuad, {
          angle: faceA2_,
        });
      });
      time += step0;
    } else {
      if (this.checkBlock({
          d: d,
          a: a,
          da: da * Math.sign(faceA1_),
          impulse: imp,
          hand: hand,
        })) {
        return;
      }
    }

    const step1 = begin * this.hitSpeed;
    this.step(time, () => {
      this.canNextHit();
      weapon1.stage(step1, easing.easeInQuad, {
        pos: new vec3({
          y: -30,
          x: -90 * Math.sign(ba_),
        }),
        angle: 90 - ba_,
        vAngle: va1,
        hAngle: ha1,
        sideAngle: -90 - faceA1_,
      });
      this.stage(step1, easing.easeInQuad, {
        angle: faceA1_,
      });
    });
    time += step1;

    const step2 = 0.15;
    this.step(time, () => {
      this.playHit();
      weapon1.stage(step2, easing.easeOutQuad, {
        pos: new vec3({
          y: 60,
          x: 0,
        }),
        angle: 90,
        vAngle: 0,
        hAngle: ha2,
        sideAngle: -90 - faceA2_ + da * Math.sign(faceA1_),
      });
      this.stage(step2, easing.easeOutQuad, {
        angle: faceA2_,
      });
      this.addImpulse(imp);
    });
    this.step(time + 0.075, () => {
      this.doDamageRadialArea({
        d: d,
        a: a,
        da: da * Math.sign(faceA1_),
        impulse: imp,
        hand: hand,
      });
    });
    time += step2 + wait * this.hitSpeed;

    const step3 = end * this.hitSpeed;
    this.step(time, () => {
      weapon1.finalStage(step3, easing.easeInOutQuad);
      this.finalStage(step3, easing.easeInOutQuad);
      this.checkNextHit(this.hitStage + 1);
    });
    time += step3;

    this.step(time, () => {
      this.finishHit();
    });
  }
}
export function ia_side(
  begin, wait, end, imp,
  a, da, d,
  ha1, ha2, va1, va2, faceA1, faceA2) {

  return function (afterBlock) {
    if (this.hitStage > 1) {
      this.weaponMirror = !this.weaponMirror;
    } else if (this.hitStage !== 0) {
      delete this.weaponMirror;
    }
    let weapon1 = this.weapon;
    let hand = 1;
    weapon1.mirror = this.weaponMirror;
    let weapon2;
    if (this.weapon2) {
      delete weapon1.mirror;
      if (this.weaponMirror) {
        hand = 2;
        weapon1 = this.weapon2;
        weapon2 = this.weapon;
      } else {
        weapon2 = this.weapon2;
      }
      weapon2.finalStage(begin * this.hitSpeed, easing.easeInQuad);
    }
    let time = 0;
    let faceA1_ = faceA1;
    let faceA2_ = faceA2;
    if (this.weaponMirror) {
      faceA1_ = -faceA1;
      faceA2_ = -faceA2;
    }

    if (afterBlock) {
      const step0 = 0.2;
      this.step(time, () => {
        let y = 60;
        let angle = 135;
        let sideAngle = -135;
        if (hand === 2) {
          y = -y;
          angle = -angle;
          sideAngle = -sideAngle;
        }
        sideAngle += -faceA2_ + (da - a) * Math.sign(faceA1_);
        weapon1.stage(step0, easing.easeOutQuad, {
          pos: new vec3({
            x: -60,
            y: y,
          }),
          angle: angle,
          vAngle: va2,
          hAngle: ha2,
          sideAngle: sideAngle,
        });
        this.stage(step0, easing.easeOutQuad, {
          angle: faceA2_,
        });
      });
      time += step0;
    } else {
      if (this.checkBlock({
          d: d,
          a: a,
          da: da * Math.sign(faceA1_),
          impulse: imp,
          hand: hand,
        })) {
        return;
      }
    }

    const step1 = begin * this.hitSpeed;
    this.step(time, () => {
      this.canNextHit();
      let y = 60;
      let angle = 135;
      let sideAngle = -135;
      if (hand === 2) {
        y = -y;
        angle = -angle;
        sideAngle = -sideAngle;
      }
      sideAngle += -faceA2_ + (da + a) * Math.sign(faceA1_);
      weapon1.stage(step1, easing.easeInQuad, {
        pos: new vec3({
          x: -60,
          y: y,
        }),
        angle: angle,
        vAngle: va1,
        hAngle: ha1,
        sideAngle: sideAngle,
      });
      this.stage(step1, easing.easeInQuad, {
        angle: faceA1_,
      });
    });
    time += step1;

    const step2 = 0.15;
    this.step(time, () => {
      this.playHit();
      let sideAngle = -135;
      if (hand === 2) {
        sideAngle = -sideAngle;
      }
      sideAngle += -faceA2_ + (da - a) * Math.sign(faceA1_);
      weapon1.stage(step2, easing.easeOutQuad, {
        sideAngle: sideAngle,
        vAngle: va2,
        hAngle: ha2,
      });
      this.stage(step2, easing.easeOutQuad, {
        angle: faceA2_,
      });
      this.addImpulse(imp);
    });
    this.step(time + 0.075, () => {
      this.doDamageRadialArea({
        d: d,
        a: a,
        da: da * Math.sign(faceA1_),
        impulse: imp,
        hand: hand,
      });
    });
    time += step2 + wait * this.hitSpeed;

    const step3 = end * this.hitSpeed;
    this.step(time, () => {
      weapon1.finalStage(step3, easing.easeInOutQuad);
      this.finalStage(step3, easing.easeInOutQuad);
      this.checkNextHit(this.hitStage + 1);
    });
    time += step3;

    this.step(time, () => {
      this.finishHit();
    });
  }
}
export function ia_backstep(
  begin, wait, end, imp,
  a, da, d,
  ba, ha1, ha2, va1, va2, faceA1, faceA2) {

  return function (afterBlock) {
    if (this.hitStage > 1) {
      this.weaponMirror = !this.weaponMirror;
    } else if (this.hitStage !== 0) {
      delete this.weaponMirror;
    }
    let weapon1 = this.weapon;
    weapon1.mirror = this.weaponMirror;
    let hand = 1;
    weapon1.mirror = this.weaponMirror;
    let weapon2;
    if (this.weapon2) {
      delete weapon1.mirror;
      if (this.weaponMirror) {
        hand = 2;
        weapon1 = this.weapon2;
        weapon2 = this.weapon;
      } else {
        weapon2 = this.weapon2;
      }
      weapon2.finalStage(begin * this.hitSpeed, easing.easeInQuad);
    }
    let time = 0;

    let ba_ = ba;
    let faceA1_ = faceA1;
    let faceA2_ = faceA2;
    if (this.weaponMirror) {
      ba_ = -ba;
      faceA1_ = -faceA1;
      faceA2_ = -faceA2;
    }

    const step1 = begin * this.hitSpeed;
    this.step(time, () => {
      weapon1.stage(step1, easing.easeInQuad, {
        pos: new vec3({
          x: 0,
          y: 60,
        }),
        angle: 90 - ba_,
        vAngle: va1,
        hAngle: ha1,
        sideAngle: -90 - faceA1_,
      });
      this.stage(step1, easing.easeInQuad, {
        angle: faceA1_,
      });
    });
    time += step1 + 0.2;

    const step2 = 0.15;
    this.step(time, () => {
      this.playHit();
      weapon1.stage(step2, easing.easeOutQuad, {
        pos: new vec3({
          x: 0,
          y: 60,
        }),
        angle: 90,
        vAngle: va2,
        hAngle: ha2,
        sideAngle: -90 - faceA2_ + da * Math.sign(faceA1_),
      });
      this.stage(step2, easing.easeOutQuad, {
        angle: faceA2_,
      });
      this.addImpulse(imp);
    });
    this.step(time + 0.05, () => {
      this.doDamageRadialArea({
        d: d,
        a: a,
        da: da * Math.sign(faceA1_),
        impulse: imp,
        hand: hand,
      });
    });
    time += step2 + wait * this.hitSpeed + 0.5;

    const step3 = end * this.hitSpeed;
    this.step(time, () => {
      weapon1.finalStage(step3, easing.easeInOutQuad);
      this.finalStage(step3, easing.easeInOutQuad);
      this.checkNextHit(this.hitStage + 1);
    });
    time += step3;

    this.step(time, () => {
      this.finishHit();
    });
  }
}

export function ia_luk() {
  return function () {
    let time = 0;

    const step1 = 0.1 * this.hitSpeed;
    this.step(time, () => {
      this.weapon.stage(step1, easing.easeInQuad, {
        pos: new vec3({
          x: 0,
          y: 0,
        }),
        angle: 0,
        vAngle: 0,
        hAngle: 0,
        sideAngle: -90,
      });
    });
    time += step1 + 0.2;

    const step2 = 0.1;
    this.step(time, () => {
      this.createBullet();
    });
    time += step2;

    const step3 = 0.2 * this.hitSpeed;
    this.step(time, () => {
      this.weapon.finalStage(step3, easing.easeInOutQuad);
      this.checkNextHit(this.hitStage + 1);
    });
    time += step3;

    this.step(time, () => {
      this.finishHit();
    });
  }
}