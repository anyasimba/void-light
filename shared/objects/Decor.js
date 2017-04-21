export class Decor {
  static get classID() {
    return 'Decor';
  }

  get CELL_SIZE_W() {
    return 1;
  }
  get CELL_SIZE_H() {
    return 1;
  }

  constructor() {
    this.type = 'Decor';
  }

  update() {
    const FRICTION = 1000;
    if (this.speed.length() > FRICTION * dt) {
      vec3.subtract(this.speed,
        this.speed
        .unit()
        .multiply(FRICTION * dt));
    } else {
      this.speed.init();
    }
    vec3.add(this.pos, this.speed.multiply(dt));
  }
}

export const decor__barrel = {
  body: {
    kind: 'circle',
    size: 150,
  },
  views: [{
    slug: 'barrel',
    target: 'middleGroup',
    ax: 0.5,
    ay: 0.5,
    sx: 0.7,
    sy: 0.7,
  }, ],
};
export const decor__barrel_top = {
  body: {
    kind: 'circle',
    size: 140,
  },
  views: [{
    slug: 'barrel-top',
    target: 'middleGroup',
    ax: 0.5,
    ay: 0.5,
    sx: 0.7,
    sy: 0.7,
  }, ],
};