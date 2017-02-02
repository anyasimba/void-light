export class Player {
  static get classID() {
    return 'Player';
  }

  static get ACC() {
    return 2000;
  }
  static get FRICTION() {
    return 0.92;
  }

  static get LOOK_ROTATE_F() {
    return 0.95;
  }

  static get BODY_SIZE() {
    return 40;
  }

  update() {
    const move = this.inputMove.unit();
    vec3.add(this.speed, move.multiply(this.constructor.ACC * dt));
    vec3.multiply(this.speed, Math.pow(this.constructor.FRICTION, dt * 60));
    vec3.add(this.pos, this.speed.multiply(dt));

    const lookRel = this.inputMove
      .subtract(this.look)
      .multiply(1 - Math.pow(1 - this.constructor.LOOK_ROTATE_F, dt));
    vec3.add(this.look, lookRel);
  }
}