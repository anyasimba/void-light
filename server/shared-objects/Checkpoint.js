export class Checkpoint extends mix(global.Checkpoint, MixGameObject) {
  get state() {
    return {
      pos: this.pos.clone(),
      size: this.size,
    };
  }

  constructor(gameLevelZone, opts) {
    super({
      isStatic: true,

      pos: new vec3(opts.mapX, opts.mapY),
      size: 400,
    });

    this.body = {
      kind: 'staticRect',
      w: WALL_SIZE,
      h: WALL_SIZE,
    }

    gameLevelZone.addObject(this);
  }

  checkNear(object) {
    if (object.type === 'Fighter' && object.kind === 'player') {
      const dx = Math.abs(this.pos.x - object.pos.x);
      const dy = Math.abs(this.pos.y - object.pos.y);
      if (Math.sqrt(dx * dx + dy * dy) < this.size) {
        object.canCheckpoint = this;
      }
    }
  }

  use(player) {
    let exists;
    for (const k in player.owner.params.items.list) {
      const i = player.owner.params.items.list[k];
      if (i.slug === 'item__heal__regular') {
        exists = true;
        i.count = 3;
      }
    }
    if (!exists) {
      player.owner.params.items.list.push({
        slug: 'item__heal__regular',
        count: 3,
      });
    }
    player.owner.saveParam('items', 'list', player.owner.params.items.list);
    player.owner.emit('items', player.owner.params.items);
    player.owner.saveParam('checkpoint', 'pos', {
      x: this.pos.x,
      y: this.pos.y,
    });
    player.owner.emit('useCheckpoint', {});
    this.gameLevelZone.restart();
  }
}