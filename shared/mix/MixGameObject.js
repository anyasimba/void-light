export const gameObjects = {};
export let gameObjectsCount = 0;

export const MixGameObject = base => class extends base {
  constructor(id, state, ...args) {
    super(...args);

    this.id = id;

    if (this.preCreate) {
      this.preCreate(state);
    }

    for (const k in state) {
      this[k] = state[k];
    }

    this.children = [];
    this.childrenCount = 0;

    if (this.parent) {
      this.parent.children.push(this);
    } else {
      gameObjects[id] = this;
      ++gameObjectsCount;
    }

    if (this.onCreate) {
      this.onCreate();
    }

    this.animations = [];
    this.animationsCount = 0;
  }
  destructor() {
    for (let i = 0; i < this.children.length; ++i) {
      this.children[i].destructor();
      --i;
    }
    this.children.length = 0;

    if (super.destructor) {
      super.destructor();
    }
    if (this.parent) {
      this.parent.children.splice(this.parent.children.indexOf(this), 1);
    } else {
      delete gameObjects[this.id];
      --gameObjectsCount;
    }

    this.isDestroyed = true;
  }

  clearAnimations() {
    this.animations = {};
  }
  animate(k, opts) {
    if (!this.animations[k]) {
      ++this.animationsCount;
    }
    this.animations[k] = opts;
  }

  stage(duration, fn, props) {
    for (const k in props) {
      const end = props[k];
      this.animate(k, {
        duration: duration,
        fn: fn,
        end: end,
      });
    }
  }

  update() {
    for (let i = 0; i < this.children.length; ++i) {
      this.children[i].update();
    }

    if (super.update) {
      super.update();
    }

    if (!this.animationsCount) {
      return;
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
      animation.time += dt / animation.duration;
      if (animation.time >= 1) {
        animation.time = 1;
        delete this.animations[k];
        --this.animationsCount;
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
  }
}