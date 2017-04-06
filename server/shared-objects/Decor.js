export class Decor extends mix(global.Decor, MixGameObject) {
  get state() {
    return {
      pos: this.pos.clone(),
      z: this.z,
      slug: this.slug,
    };
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
}