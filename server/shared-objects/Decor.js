export class Decor extends mix(global.Decor,
  MixNativeGameObject,
  MixGameObject) {

  get state() {
    return {
      speed: this.speed,
      pos: this.pos.clone(),
      z: this.z,
      slug: this.slug,
    };
  }

  preCreate(opts) {
    const slug = opts.slug;
    if (global[slug]) {
      const data = global[slug];
      opts.isStatic = data.isStatic;
      if (data.body) {
        this.body = data.body;
      }

      this.native = native.new__Decor(this, opts);
    }
  }

  constructor(gameLevelZone, opts) {
    super({
      isStatic: true,

      pos: new vec3(opts.mapX, opts.mapY),
      z: opts.z,
      slug: opts.slug,
    });

    gameLevelZone.addObject(this);
  }
  emitPos() {
    this.emitAll('pos', {
      pos: this.pos,
      speed: this.speed,
      z: this.z,
    });
  }
  fallGood() {}
  fall() {
    this.destructor();
  }
}