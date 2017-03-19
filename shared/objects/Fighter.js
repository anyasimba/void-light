export class Fighter {
  static get classID() {
    return 'Fighter';
  }

  static get ACC() {
    return 400;
  }
  static get RUN_ACC() {
    return 550;
  }
  static get AIR_FRICTION() {
    return 0.02;
  }
  static get FRICTION() {
    return 400;
  }
  static get MAX_SPEED() {
    return 2000;
  }

  static get LOOK_ROTATE_F() {
    return 0.94;
  }
  static get LOOK_ROTATE_IN_HIT_F() {
    return 0.999;
  }

  static get BODY_SIZE() {
    return 40;
  }

  get CELL_SIZE_W() {
    return 300;
  }
  get CELL_SIZE_H() {
    return 300;
  }

  constructor() {
    this.type = 'Fighter';

    this.ACC = Fighter.ACC;
    this.AIR_FRICTION = Fighter.AIR_FRICTION;
    this.FRICTION = Fighter.FRICTION;

    this.timeouts = [];
  }

  get hands() {
    return [
      this.weapon,
      this.weapon2 || this.shield
    ];
  }

  step(time, fn) {
    this.timeouts.push({
      fn: fn,
      time: time,
    });
  }
  clearSteps() {
    this.timeouts = [];
    const hands = this.hands;
    for (const k in hands) {
      const hand = hands[k];
      if (hand) {
        hand.clearAnimations();
      }
    }
  }

  update() {
    let AIR_FRICTION_F = 1;
    if (this.inJump || this.inRoll) {
      AIR_FRICTION_F *= 0.2 / this.moveTimeF;
    }
    const AIR_FRICTION = Math.pow(this.AIR_FRICTION, AIR_FRICTION_F);
    const AIR_F = Math.pow(AIR_FRICTION, dt);
    const A_AIR_F = (1 - AIR_F) / (1 - AIR_FRICTION);

    vec3.multiply(this.speed, AIR_F);

    const isMove = this.inputMove.length() > 0 &&
      !this.inHit &&
      !this.inJump &&
      !this.inRoll &&
      !this.stunTime &&
      !this.waitTime;
    if (isMove) {
      let a = 0;
      if (this.inRun) {
        this.stamina -= dt * 5;
        this.staminaTime = Math.max(this.staminaTime || 0, 0.05);
        if (this.stamina <= 0) {
          this.stamina = 0;
          this.staminaTime = Math.max(this.staminaTime, 0.5);
          a = this.RUN_ACC * 0.5;
        } else {
          a = this.RUN_ACC;
        }
      } else if (this.inBlock) {
        a = this.ACC * 0.8;
      } else {
        a = this.ACC;
      }

      vec3.add(this.speed,
        this.inputMove
        .unit()
        .multiply((a + this.FRICTION) * A_AIR_F));
    }

    let FRICTION_F = 1.0;
    if (this.inJump) {
      FRICTION_F = 0.0;
    } else if (this.inRoll) {
      FRICTION_F = 0.5;
    }
    if (this.speed.length() > this.FRICTION * A_AIR_F * FRICTION_F) {
      vec3.subtract(this.speed,
        this.speed
        .unit()
        .multiply(this.FRICTION * A_AIR_F * FRICTION_F));
    } else {
      this.speed.init();
    }

    if (this.speed.length() > this.MAX_SPEED) {
      this.speed = this.speed.unit().multiply(this.MAX_SPEED);
    }
    vec3.add(this.pos, this.speed.multiply(dt));

    const isChangeLook =
      (!this.inJump && !this.inRoll && !this.stunTime && !this.waitTime) ||
      this.inHit;

    if (isChangeLook) {
      let lookInput = this.inputMove;
      let lookF = this.LOOK_ROTATE_F;
      if (this.absLook && !gameObjects[this.absLook]) {
        delete this.absLook;
      }
      if (this.absLook) {
        lookInput = gameObjects[this.absLook].pos.subtract(this.pos).unit();
      }
      if (this.inHit) {
        lookInput = this.hitVec;
        lookF = this.LOOK_ROTATE_IN_HIT_F;
      }
      if (lookInput.length() > 0.05) {
        const lookRel = lookInput
          .subtract(this.look)
          .multiply(1 - Math.pow(1 - lookF, dt));
        vec3.add(this.look, lookRel);
      }
    }

    if (this.hpTime) {
      this.hpTime -= dt;
      if (this.hpTime <= 0) {
        delete this.hpTime;
      }
    } else {
      this.hp = Math.min(this.HP, this.hp + dt * 0.25);
    }
    if (this.staminaTime) {
      this.staminaTime -= dt;
      if (this.staminaTime <= 0) {
        delete this.staminaTime;
      }
    } else {
      this.stamina = Math.min(this.STAMINA,
        this.stamina + dt * 15 * this.moveTimeF * (1 + this.STAMINA * 0.01)
      );
    }
    if (this.inRoll) {
      this.inRoll.time += dt;
      if (this.inRoll.time >= this.inRoll.duration) {
        this.afterRollTime = this.inRoll.afterTime;
        delete this.inRoll;
      }
    }
    if (this.afterRollTime) {
      this.afterRollTime -= dt;
      if (this.afterRollTime <= 0) {
        delete this.afterRollTime;
      }
    }
    if (this.inJump) {
      this.inJump.time += dt;
      if (this.inJump.time >= this.inJump.duration) {
        this.afterJumpTime = this.inJump.afterTime;
        delete this.inJump;
      }
    }
    if (this.afterJumpTime) {
      this.afterJumpTime -= dt;
      if (this.afterJumpTime <= 0) {
        delete this.afterJumpTime;
      }
    }
    if (this.stunTime !== undefined) {
      if (!this.inStun) {
        this.inStun = true;
        this.staminaTime = this.stunTime * 0.5;
        delete this.needNextHit;

        const hands = this.hands;
        for (const k in hands) {
          const hand = hands[k];
          if (hand && hand.opts && hand.opts.onStun) {
            hand.opts.onStun.call(hand);
          }
        }
      }
      this.stunTime -= dt;
      if (this.stunTime <= 0) {
        delete this.stunTime;
        delete this.inStun;
        if (!this.inHit) {
          this.clearSteps();
          const hands = this.hands;
          for (const k in hands) {
            const hand = hands[k];
            if (hand) {
              hand.finalStage(0.2, easing.easeInOutCubic);
            }
          }
        }
      }
    }
    if (this.waitTime) {
      if (!this.inWait) {
        this.inWait = true;
        delete this.needNextHit;

        this.clearSteps();
        const hands = this.hands;
        for (const k in hands) {
          const hand = hands[k];
          if (hand) {
            hand.finalStage(0.2, easing.easeInOutCubic);
            hand.stage(0.2, easing.easeInOutCubic, {
              vAngle: 40,
            });
          }
        }
      }
      this.waitTime -= dt;
      if (this.waitTime <= 0) {
        delete this.waitTime;
        delete this.inWait;

        this.clearSteps();
        const hands = this.hands;
        for (const k in hands) {
          const hand = hands[k];
          if (hand) {
            hand.finalStage(0.2, easing.easeInOutCubic);
          }
        }
      }
    }

    for (const k in this.timeouts) {
      const timeout = this.timeouts[k];
      if (timeout) {
        timeout.time -= dt;
        if (timeout.time <= 0) {
          delete this.timeouts[k];
          timeout.fn();
        }
      }
    }

    if (this.effects) {
      let i = 0;
      while (this.effects[i]) {
        const eff = this.effects[i];
        eff.time = eff.time || eff.DURATION;
        eff.time -= dt;
        if (eff.time <= 0) {
          this.effects.splice(i, 1);
        } else {
          ++i;

          if (eff.HP) {
            this.hp = Math.min(
              this.HP,
              this.hp + dt * eff.HP / eff.DURATION);
          }
          if (eff.MP) {
            this.mp = Math.min(
              this.MP,
              this.mp + dt * eff.MP / eff.DURATION);
          }
          if (eff.STAMINA) {
            this.stamina = Math.min(
              this.STAMINA,
              this.stamina + dt * eff.STAMINA / eff.DURATION);
          }
        }
      }
    }
  }

  addImpulse() {}
  canNextHit() {
    this.isCanNextHit = true;
  }
  playHit() {}
  checkNextHit() {}

  finishHit() {
    delete this.isCanNextHit;
    delete this.hitVec;
    delete this.hitStage;
    delete this.inHit;
    delete this.isJumpHit;
    delete this.isRollHit;
  }

  doDamageRadialArea() {}

  onRoll(data) {
    let input = this.inputMove;
    if (this.inJump || this.inHit || this.speed.length() === 0) {
      input = this.look;
    }
    if (this.inJump) {
      this.speed = input.unit().multiply(data.forceInJump);
    } else {
      this.speed = input.unit().multiply(data.force);
    }
    this.inRoll = {
      time: 0,
      duration: data.duration,
      afterTime: data.afterTime,
    };
    this.look = this.speed.unit();
  }
  onJump(data) {
    if (this.speed.length() === 0) {
      this.speed = this.look.unit().multiply(data.force);
    } else {
      this.speed = this.speed.unit().multiply(data.force);
    }
    this.inJump = {
      time: 0,
      duration: data.duration,
      afterTime: data.afterTime,
    };
    this.look = this.speed.unit();
  }
}

export function player__doHit() {
  if (this.weapon) {
    global[this.weapon.slug + '__doHit'][this.hitStage].call(this);
  }
}
export function mob__doHit() {
  global[this.name + '__doHit'][this.hitStage].call(this);
}