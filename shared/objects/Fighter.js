export class Fighter {
  static get classID() {
    return 'Fighter';
  }

  static get ACC() {
    return 3600;
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
  }

  get hands() {
    return [this.weapon, this.shield];
  }

  update() {
    const move = this.inputMove.unit();
    if (!this.inHit && !this.inJump && !this.inRoll && !this.stunTime) {
      vec3.add(this.speed, move.multiply(this.ACC * dt));
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
      if (this.inHit) {
        lookInput = this.hitVec;
        lookF = Fighter.LOOK_ROTATE_IN_HIT_F;
      }
      const lookRel = lookInput
        .subtract(this.look)
        .multiply(1 - Math.pow(1 - lookF, dt));
      vec3.add(this.look, lookRel);
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

    if (this.needBreakHit) {
      delete this.needBreakHit;
      this.weapon.task = 'break';
    }

    if (this.stunTime) {
      if (!this.inStun) {
        this.inStun = true;
        this.weapon.task = 'stun';
        this.shield.task = 'stun';
      }
      this.stunTime -= dt;
      if (this.stunTime <= 0) {
        delete this.stunTime;
        delete this.inStun;
        this.weapon.task = 'break';
        this.shield.task = 'break';
      }
    }
  }

  onHit(opts, fromWeapon) {
    if (this.stunTime) {
      return;
    }
    if (this.canNextHit) {
      this.needNextHit = opts;
    }
    if (this.inHit) {
      return;
    }
    this.inHit = true;

    if (this.inJump) {
      this.isJumpHit = true;
    }
    if (this.inRoll) {
      this.isRollHit = true;
    }

    this.hitVec = new vec3(opts).subtract(this.pos).unit();

    if (!fromWeapon) {
      this.weapon.task = 'hit';
    }
  }
  finishHit() {
    delete this.canNextHit;
    delete this.hitVec;
    delete this.inHit;
    delete this.isJumpHit;
    delete this.isRollHit;

    if (this.needNextHit) {
      const opts = this.needNextHit;
      delete this.needNextHit;
      this.onHit(opts);
    }
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