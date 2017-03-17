export class Item {
  static get classID() {
    return 'Item';
  }

  onCreate() {
    this.pos = new vec3(this.pos);

    this.sideAngle = 0;

    this.basePos = this.pos.clone();
    this.baseAngle = this.angle;
    this.baseVAngle = this.vAngle;
    this.baseHAngle = this.hAngle;
    this.baseSideAngle = this.sideAngle;

    this.animations = [];
    this.animationsCount = 0;

    if (false) {
      //
    } else if (this.type === 'weapon' && this.hand === 1) {
      this.ownerSlug = 'weapon';
    } else if (this.type === 'weapon' && this.hand === 2) {
      this.ownerSlug = 'weapon2';
    } else if (this.type === 'shield') {
      this.ownerSlug = 'shield';
    }

    this.parent[this.ownerSlug] = this;

    this.timeouts = [];

    const kind = this.kind || 'default';
    const name = this.name || 'default';

    this.slug = this.type + '__' + kind + '__' + name;
  }
  destructor() {
    delete this.parent[this.ownerSlug];
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

  reborn() {
    this.pos = this.basePos.clone();
    this.angle = this.baseAngle;
    this.vAngle = this.baseVAngle;
    this.hAngle = this.baseHAngle;
    this.sideAngle = this.baseSideAngle;
    this.sideBAngle = this.baseSideBAngle;
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
  finalStage(duration, fn) {
    this.stage(duration, fn, {
      pos: this.basePos,
      angle: this.baseAngle,
      vAngle: this.baseVAngle,
      hAngle: this.baseHAngle,
      sideAngle: this.baseSideAngle,
    });
  }

  update() {
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

export const weapon__sword__default__doHit = ia_sword__doHit();
export const weapon__bigsword__default__doHit = ia_sword__doHit({
  begin: 0.6,
  wait: 0.3,
  end: 0.4,
  impulse1: 1000,

  begin2: 0.3,
  wait2: 0.3,
  end2: 0.3,
  impulse2: 1000,

  begin3: 0.3,
  wait3: 0.3,
  end3: 0.3,
  impulse3: 1000,
});
export const weapon__axe__default__doHit = ia_axe__doHit();