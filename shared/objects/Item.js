export class Item {
  static get classID() {
    return 'Item';
  }

  onCreate() {
    this.pos = new vec3(this.pos);

    this.sideAngle = 0;

    this.basePos = this.pos.clone();
    this.baseAngle = this.angle;
    this.baseSideAngle = this.sideAngle;

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
  reborn() {
    this.pos = this.basePos.clone();
    this.angle = this.baseAngle;
    this.sideAngle = this.baseSideAngle;
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
      sideAngle: this.baseSideAngle,
    });
  }
}

export const weapon__sword__default__doHit = ia_sword__doHit();