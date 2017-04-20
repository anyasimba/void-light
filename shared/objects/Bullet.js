export class Bullet {
  static get classID() {
    return 'Bullet';
  }

  static get BODY_SIZE() {
    return 40;
  }

  get CELL_SIZE() {
    return 100;
  }
  get FRICTION() {
    return 4000;
  }

  constructor() {
    this.type = 'Bullet';
  }

  update() {
    if (this.speed.length() > this.FRICTION * dt) {
      vec3.subtract(this.speed,
        this.speed
        .unit()
        .multiply(this.FRICTION * dt));
    } else {
      this.speed.init();
    }
    vec3.add(this.pos, this.speed.multiply(dt));
  }
}