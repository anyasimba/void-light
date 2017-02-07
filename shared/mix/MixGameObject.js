export const gameObjects = {};
export let gameObjectsCount = 0;

export const MixGameObject = base => class extends base {
  constructor(id, state, ...args) {
    super(...args);

    this.id = id;

    for (const k in state) {
      this[k] = state[k];
    }

    this.children = {};
    this.childrenCount = 0;

    if (this.parent) {
      this.parent.children[id] = this;
      ++this.parent.childrenCount;
    } else {
      gameObjects[id] = this;
      ++gameObjectsCount;
    }

    this.animations = {};

    this.timeSpeed = 1;

    if (this.onCreate) {
      this.onCreate();
    }
  }
  destructor() {
    for (const k in this.children) {
      const child = this.children[k];
      if (child.destructor) {
        child.destructor();
      }
    }
    if (super.destructor) {
      super.destructor();
    }
    if (this.parent) {
      delete this.parent[this.id];
      --this.parent.childrenCount;
    } else {
      delete gameObjects[this.id];
      --gameObjectsCount;
    }

    this.isDestroyed = true;
  }

  async waitAnimation(k) {
    return new Promise(async r => {
      while (this.animations[k]) {
        await sleep(0);
      }
      return r();
    });
  }

  async animate(k, opts) {
    this.animations[k] = opts;
    return await this.waitAnimation(k);
  }

  async sleep(time) {
    return await sleep(time * 1000 / this.calcTimeSpeed());
  }

  calcTimeSpeed() {
    if (this.parent) {
      return this.timeSpeed * this.parent.calcTimeSpeed();
    }
    return this.timeSpeed;
  }

  update() {
    if (this.pendingDestroy) {
      return this.destructor();
    }

    for (const id in this.children) {
      const child = this.children[id];
      child.update();
    }

    for (const k in this.animations) {
      const animation = this.animations[k];
      if (!animation.time) {
        animation.time = 0;
      }
      if (!animation.start) {
        if (typeof this[k] !== 'number') {
          animation.start = this[k].clone();
        } else {
          animation.start = this[k];
        }
      }
      if (!animation.duration) {
        animation.duration = 1;
      }
      animation.time += dt / animation.duration * this.calcTimeSpeed();
      if (animation.time >= 1) {
        animation.time = 1;
        delete this.animations[k];
      }
      if (typeof this[k] !== 'number') {
        const t = animation.fn(animation.time);
        this[k].x = animation.start.x + t *
          (animation.end.x - animation.start.x);
        this[k].y = animation.start.y + t *
          (animation.end.y - animation.start.y);
        this[k].z = animation.start.z + t *
          (animation.end.z - animation.start.z);
      } else {
        this[k] = animation.start + animation.fn(animation.time) *
          (animation.end - animation.start);
      }
    }

    if (super.update) {
      super.update();
    }
  }
}