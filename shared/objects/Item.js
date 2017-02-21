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

    this.timeouts = [];
  }
  destructor() {
    delete this.parent[this.slug];
  }
  reborn() {
    this.pos = this.basePos.clone();
    this.angle = this.baseAngle;
    this.sideAngle = this.baseSideAngle;
  }

  update() {
    if (this.task && this.lock) {
      if (this.task === 'break') {
        this.needBreakTask = true;
        delete this.task;
      } else {
        this.needCancelTask = true;
      }
    }
    if (this.task && !this.lock) {
      this.timeouts = [];
      switch (this.task) {
        case 'hit':
          if (this.doHit) {
            this.lock = true;
            this.cb = () => {
              this.breakHit();
            }
            this.doHit();
          }
          break;
        case 'stun':
          if (this.onStun) {
            this.lock = true;
            this.onStun();
          }
        default:
      }
      delete this.task;
    }
  }

  async stage(duration, fn, opts) {
    let ak;
    for (const k in opts) {
      ak = k;
      this.animate(k, {
        end: opts[k],
        duration: duration,
        fn: fn,
      });
    }
    while (this.animations[ak]) {
      if (this.needCancelTask || this.needBreakTask) {
        this.clearAnimations();
        for (const k in this.timeouts) {
          const timeout = this.timeouts[k];
          clearTimeout(timeout);
        }
        this.timeouts = [];
        if (this.cb) {
          this.cb();
          delete this.cb;
        }
        delete this.lock;
        if (this.needBreakTask && !this.needCancelTask) {
          delete this.needCancelTask;
          delete this.needBreakTask;

          this.lock = true;
          run(async() => {
            await this.finalStage(0.2, easing.easeInOutCubic);
            delete this.lock;
          });
        } else {
          delete this.needCancelTask;
          delete this.needBreakTask;
        }

        throw 0;
      }

      await this.sleep(0);
    }
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
    delete this.lock;
  }
  breakHit() {
    delete this.parent.needNextHit;
    this.parent.finishHit();
    delete this.lock;
  }

  addImpulse(v) {
    vec3.add(this.parent.speed, v);
  }
  canNextHit() {
    this.parent.canNextHit = true;
  }

  setTimeout(time, fn) {
    this.timeouts.push(setTimeout(fn, time * 1000));
  }
}

export function shield__default__default__onStun() {
  run(async() => {
    await this.stage(0.05, easing.easeInCubic, {
      pos: {
        x: -45,
        y: -30,
      },
      angle: -120,
      sideAngle: -30,
    });

    while (true) {
      await this.stage(1, easing.easeInOutCubic, {
        pos: {
          x: -45,
          y: -30,
        },
        angle: -80,
        sideAngle: -50,
      });
      await this.stage(1, easing.easeInOutCubic, {
        pos: {
          x: -45,
          y: -30,
        },
        angle: -120,
        sideAngle: -30,
      });
    }
  });
}

export function weapon__sword__default__onStun() {
  run(async() => {
    await this.stage(0.05, easing.easeInCubic, {
      pos: new vec3({
        x: -40,
        y: 40,
      }),
      angle: 140,
      sideAngle: -30,
    });

    while (true) {
      await this.stage(1, easing.easeInOutCubic, {
        pos: new vec3({
          x: -40,
          y: 40,
        }),
        angle: 120,
        sideAngle: -50,
      });
      await this.stage(1, easing.easeInOutCubic, {
        pos: new vec3({
          x: -40,
          y: 40,
        }),
        angle: 140,
        sideAngle: -30,
      });
    }
  });
}
export function weapon__sword__default__doHit() {
  run(async() => {
    this.setTimeout(0.35, () => {
      this.addImpulse(this.parent.hitVec.multiply(600));
      this.canNextHit();
    });

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