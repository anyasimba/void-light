export class ItemOnMap extends mix(global.ItemOnMap, MixNativeGameObject, MixGameObject) {
  get state() {
    return {
      pos: this.pos.clone(),
    };
  }

  preCreate(opts) {
    this.body = {
      kind: 'staticRect',
      w: 16,
      h: 16,
    }

    this.native = native.new__ItemOnMap(this, opts);
  }
  constructor(gameLevelZone, opts) {
    super({
      isStatic: true,

      opts: opts,

      slug: opts.slug,

      pos: new vec3(opts.mapX, opts.mapY),
      count: opts.count,
    });

    gameLevelZone.addObject(this);
  }

  checkNear(player) {
    const dx = Math.abs(this.pos.x - player.pos.x);
    const dy = Math.abs(this.pos.y - player.pos.y);
    const dw = WALL_SIZE * 2;
    const dh = WALL_SIZE * 2;
    if (dx < dw && dy < dh) {
      player.canItem = this;
    }
  }
}