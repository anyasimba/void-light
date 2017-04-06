export class Bullet extends mix(
  global.Bullet,
  MixNativeGameObject,
  MixGameObject) {

  get state() {
    return {
      pos: this.pos,
      speed: this.speed,
      z: this.z,
    };
  }

  preCreate(opts) {
    this.body = {
      kind: 'circle',
      size: 40,
    }

    this.native = native.new__Bullet(this, opts);
  }

  constructor(owner, data) {
    super(Object.assign({
      owner,
      z: owner.z,
    }, data));

    this.owner.gameLevelZone.addObject(this);
  }
  emitPos() {
    this.emitAll('pos', {
      pos: this.pos,
      speed: this.speed,
      z: this.z,
    });
  }

  onCollision(target) {
    if (target.type === 'Bullet') {
      this.emitPos();
      target.emitPos();
      this.destructor();
      target.destructor();
      return;
    }
    if (target.type !== 'Fighter') {
      this.emitPos();
      this.destructor();
      return;
    }
    if (target === this.owner) {
      this.emitPos();
      return;
    }
    if (!this.owner.gameLevelZone) {
      return;
    }
    this.emitPos();
    this.owner.gameLevelZone.doDamage(this.owner, {
      hitVec: this.speed.unit(),
    }, target)
    this.destructor();
  }
}