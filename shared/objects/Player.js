export class Player {
  static get classID() {
    return 'Player';
  }

  static get ACC() {
    return 3000;
  }
  static get FRICTION() {
    return 0.85;
  }

  static get LOOK_ROTATE_F() {
    return 0.95;
  }

  static get BODY_SIZE() {
    return 40;
  }

  update() {
    const move = this.inputMove.unit();
    if (!this.inHit) {
      vec3.add(this.speed, move.multiply(this.constructor.ACC * dt));
    }
    vec3.multiply(this.speed, Math.pow(this.constructor.FRICTION, dt * 60));
    vec3.add(this.pos, this.speed.multiply(dt));

    const lookRel = this.inputMove
      .subtract(this.look)
      .multiply(1 - Math.pow(1 - this.constructor.LOOK_ROTATE_F, dt));
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
    this.hitAngle = pos
      .subtract(this.pos)
      .toAngle();

    this.sword.doHit();

    run(async() => {
      await this.sleep(0.35);
      this.canNextHit = true;
      await this.sleep(0.4);
      delete this.canNextHit;
      delete this.hitAngle;
      delete this.inHit;

      if (this.needNextHit) {
        const opts = this.needNextHit;
        delete this.needNextHit;
        this.onHit(opts);
      }
    });
  }
}