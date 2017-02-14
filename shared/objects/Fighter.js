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

  update() {
    const move = this.inputMove.unit();
    if (!this.inHit) {
      vec3.add(this.speed, move.multiply(Fighter.ACC * dt));
    }
    vec3.multiply(this.speed, Math.pow(Fighter.AIR_FRICTION, dt * 60));
    if (this.speed.length() > Fighter.FRICTION * dt) {
      vec3.subtract(this.speed, this.speed
        .unit()
        .multiply(Fighter.FRICTION * dt));
    } else {
      this.speed.init();
    }
    vec3.add(this.pos, this.speed.multiply(dt));

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

  onHit(opts) {
    if (this.canNextHit) {
      this.needNextHit = opts;
    }
    if (this.inHit) {
      return;
    }
    this.inHit = true;

    const pos = new vec3(opts);
    this.hitVec = pos
      .subtract(this.pos)
      .unit();

    this.sword.doHit();

    run(async() => {
      await this.sleep(0.35);
      vec3.add(this.speed, this.hitVec.multiply(600));
      this.canNextHit = true;
      await this.sleep(0.4);
      delete this.canNextHit;
      delete this.hitVec;
      delete this.inHit;

      if (this.needNextHit) {
        const opts = this.needNextHit;
        delete this.needNextHit;
        this.onHit(opts);
      }
    });
  }

  doDamageRadialArea() {}
}