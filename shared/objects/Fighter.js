export class Fighter {
  static get classID() {
    return 'Fighter';
  }

  static get ACC() {
    return 1400;
  }
  static get AIR_FRICTION() {
    return 0.95;
  }
  static get FRICTION() {
    return 2200;
  }

  static get LOOK_ROTATE_F() {
    return 0.95;
  }
  static get LOOK_ROTATE_IN_HIT_F() {
    return 0.98;
  }

  static get BODY_SIZE() {
    return 40;
  }

  get CELL_SIZE() {
    return 400;
  }

  constructor() {
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
    const move = this.inputMove.unit();
    if (!this.inHit && !this.inJump && !this.inRoll && !this.stunTime) {
      vec3.add(this.speed, move.multiply((this.ACC + this.FRICTION) * dt));
    }

    if (!this.inJump && !this.inRoll) {
      vec3.multiply(this.speed, Math.pow(this.AIR_FRICTION, dt * 60));
      if (this.speed.length() > this.FRICTION * dt) {
        vec3.subtract(this.speed, this.speed
          .unit()
          .multiply(this.FRICTION * dt));
      } else {
        this.speed.init();
      }
    } else {
      const lowDT = dt * 0.1;
      vec3.multiply(this.speed, Math.pow(this.AIR_FRICTION, lowDT * 60));
      if (this.speed.length() > this.FRICTION * lowDT) {
        vec3.subtract(this.speed, this.speed
          .unit()
          .multiply(this.FRICTION * lowDT));
      } else {
        this.speed.init();
      }
    }
    vec3.add(this.pos, this.speed.multiply(dt));

    if ((!this.inJump && !this.inRoll && !this.stunTime) || this.inHit) {
      let lookInput = this.inputMove;
      let lookF = Fighter.LOOK_ROTATE_F;
      if (this.absLook && !gameObjects[this.absLook]) {
        delete this.absLook;
      }
      if (this.absLook) {
        lookInput = gameObjects[this.absLook].pos.subtract(this.pos).unit();
      }
      if (this.inHit) {
        lookInput = this.hitVec;
        lookF = Fighter.LOOK_ROTATE_IN_HIT_F;
      }
      const lookRel = lookInput
        .subtract(this.look)
        .multiply(1 - Math.pow(1 - lookF, dt));
      vec3.add(this.look, lookRel);
    }

    if (this.staminaTime) {
      this.staminaTime -= dt;
      if (this.staminaTime <= 0) {
        delete this.staminaTime;
      }
    } else {
      this.stamina = Math.min(this.STAMINA, this.stamina + dt * 100);
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
    if (this.stunTime) {
      if (!this.inStun) {
        this.inStun = true;
        delete this.needNextHit;

        const hands = this.hands;
        for (const k in hands) {
          const hand = hands[k];
          if (hand.opts && hand.opts.onStun) {
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

    for (const k in this.timeouts) {
      const timeout = this.timeouts[k];
      timeout.time -= dt;
      if (timeout.time <= 0) {
        delete this.timeouts[k];
        timeout.fn();
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

  onJump() {
    this.speed = this.speed.unit().multiply(700);
    this.inJump = {
      time: 0,
      duration: 0.6,
      afterTime: 0.5,
    };
    this.look = this.speed.unit();
  }
  onRoll() {
    let input = this.inputMove;
    if (this.inJump) {
      input = this.look;
    }
    this.speed = input.unit().multiply(800);
    this.inRoll = {
      time: 0,
      duration: 0.4,
      afterTime: 0.2,
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