export class ItemOnMap extends mix(global.ItemOnMap, MixGameObject) {
  get state() {
    return {
      pos: this.pos.clone(),
    };
  }

  constructor(gameLevelZone, opts) {
    super({
      isStatic: true,

      opts: opts,

      slug: opts.slug,

      pos: new vec3(opts.mapX, opts.mapY),
      count: opts.count,
    });

    this.body = {
      kind: 'staticRect',
      w: 16,
      h: 16,
    }

    gameLevelZone.addObject(this);
  }

  checkNear(object) {
    if (object.type === 'Fighter' && object.kind === 'player') {
      const dx = Math.abs(this.pos.x - object.pos.x);
      const dy = Math.abs(this.pos.y - object.pos.y);
      const dw = WALL_SIZE * 2;
      const dh = WALL_SIZE * 2;
      if (dx < dw && dy < dh) {
        object.canItem = this;
      }
    }
  }
}