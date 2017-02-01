export class Bullet {
  static get classID() {
    return 'Bullet';
  }

  static get BODY_SIZE() {
    return 10;
  }

  update() {
    vec3.multiply(this.speed, Math.pow(1.1, dt * 60));
    vec3.add(this.pos, this.speed.multiply(dt));
  }
}