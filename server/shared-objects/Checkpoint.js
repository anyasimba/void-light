export class Checkpoint extends mix(global.Checkpoint, MixNativeGameObject,
  MixGameObject) {
  get state() {
    return {
      pos: this.pos.clone(),
      size: this.size,
    };
  }

  preCreate(opts) {
    this.body = {
      kind: 'staticRect',
      w: WALL_SIZE,
      h: WALL_SIZE,
    }

    this.native = native.new__Checkpoint(this, opts);
  }
  constructor(gameLevelZone, opts) {
    super({
      isStatic: true,

      pos: new vec3(opts.mapX, opts.mapY),
      size: 400,
    });

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

  static USE(player) {
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
    player.hp = player.HP;
    player.stamina = player.STAMINA;
    player.mp = player.MP;
    player.emitParams();
  }
  use(player) {
    Checkpoint.USE(player);
    player.owner.saveParam('checkpoint', 'pos', {
      x: this.pos.x,
      y: this.pos.y,
    });
    player.owner.emit('useCheckpoint', {});

    const mobs = this.gameLevelZone.mobs;
    for (const k in mobs) {
      const mob = mobs[k];
      if (mob.target === player) {
        delete mob.target;
        delete mob.path;
        delete mob.onWay;
        delete mob.fighter.absLook;
      }
    }
    const tempMobs = this.gameLevelZone.tempMobs;
    for (const k in tempMobs) {
      const mob = tempMobs[k];
      if (mob.target === player) {
        delete mob.target;
        delete mob.path;
        delete mob.onWay;
        delete mob.fighter.absLook;
      }
    }
  }
}