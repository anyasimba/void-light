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
      size: 200,
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
}