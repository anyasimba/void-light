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
    } else if (this.type === 'shield') {
      this.ownerSlug = 'shield';
    }

    this.parent[this.ownerSlug] = this;

    this.timeouts = [];

    const kind = this.kind || 'default';
    const name = this.name || 'default';

    this.slug = this.type + '__' + kind + '__' + name;
    this.doHit = global[this.slug + '__doHit'];
  }
  destructor() {
    delete this.parent[this.ownerSlug];
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
          if (this.doHit && this.doHit[this.parent.hitStage]) {
            this.lock = true;
            this.cb = nextTask => {
              this.breakHit(nextTask);
            }
            this.doHit[this.parent.hitStage].call(this);
          }
          break;
        case 'stun':
          if (this.opts && this.opts.onStun) {
            this.lock = true;
            this.opts.onStun.call(this);
          }
          break;
        default:
      }
      delete this.task;
    }

    for (const k in this.timeouts) {
      const timeout = this.timeouts[k];
      timeout.time -= dt;
      if (timeout.time <= 0) {
        delete this.timeouts[k];
        timeout.fn();
      }
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
        this.timeouts = [];
        if (this.cb) {
          this.cb(this.task);
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
  setTimeout(time, fn) {
    this.timeouts.push({
      fn: fn,
      time: time,
    });
  }

  checkNextHit(i) {}
  canNextHit() {}
  breakHit(nextTask) {
    if (nextTask !== 'hit') {
      this.parent.finishHit();
    }
    delete this.lock;
  }
  finishHit() {
    this.parent.finishHit();
    delete this.lock;
  }
  playHit() {}
  addImpulse(v) {}
}

export const weapon__sword__default__doHit = {
  1: function () {
    run(async() => {
      this.setTimeout(0.3 * this.hitSpeed + 0.05, () => {
        this.addImpulse(600);
        this.canNextHit();

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
      });

      await this.stage(0.3 * this.hitSpeed, easing.easeInCubic, {
        pos: new vec3({
          x: -40,
          y: 40,
        }),
        angle: 135,
        sideAngle: -50,
      });
      this.playHit();
      await this.stage(0.1, easing.easeOutCubic, {
        sideAngle: -200,
      });
      await this.sleep(0.1 * this.hitSpeed);

      if (this.checkNextHit(2)) {
        return;
      }

      await this.finalStage(0.2 * this.hitSpeed, easing.easeInOutCubic);
      this.finishHit();
    });
  },
  2: function () {
    this.parent.canNextHit = true;

    run(async() => {
      this.setTimeout(0.25 * this.hitSpeed + 0.05, () => {
        this.addImpulse(600);

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
      });

      await this.stage(0.25 * this.hitSpeed, easing.easeInCubic, {
        sideAngle: -240,
      });
      this.playHit();
      await this.stage(0.1, easing.easeOutCubic, {
        sideAngle: -50,
      });
      await this.sleep(0.1 * this.hitSpeed);

      if (this.checkNextHit(3)) {
        return;
      }

      await this.finalStage(0.2 * this.hitSpeed, easing.easeInOutCubic);
      this.finishHit();
    });
  },
  3: function () {
    this.parent.canNextHit = true;

    run(async() => {
      this.setTimeout(0.25 * this.hitSpeed + 0.05, () => {
        this.addImpulse(600);

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
      });

      await this.stage(0.25 * this.hitSpeed, easing.easeInCubic, {
        sideAngle: -10,
      });
      this.playHit();
      await this.stage(0.1, easing.easeOutCubic, {
        sideAngle: -200,
      });
      await this.sleep(0.1 * this.hitSpeed);

      if (this.checkNextHit(2)) {
        return;
      }

      await this.finalStage(0.2 * this.hitSpeed, easing.easeInOutCubic);
      this.finishHit();
    });
  },
}