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
    this.vAngle = this.baseVAngle;
    this.hAngle = this.baseHAngle;
    this.sideAngle = this.baseSideAngle;
    this.sideBAngle = this.baseSideBAngle;
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
}

export const weapon__sword__default__doHit = ia_sword__doHit(
  0.2, 0.3, 0.2,
  1, 1, 0.8, 0.8);
export const weapon__bigsword__default__doHit = ia_sword__doHit(
  0.2, 0.1, 0.2,
  1.5, 3, 0, 1.2);
export const weapon__axe__default__doHit = ia_axe__doHit(
  0.2, 0.3, 0.2,
  1, 1, 0.8, 0.8);