export class Decor extends mix(global.Decor, MixGameObject) {
  get state() {
    return {
      pos: this.pos.clone(),
      slug: this.slug,
    };
  }

  constructor(gameLevelZone, opts) {
    super({
      isStatic: true,

      pos: new vec3(opts.mapX, opts.mapY),
      slug: opts.slug,
    });

    gameLevelZone.addObject(this);
  }
}