export class Door extends mix(global.Door, MixGameObject) {
  get state() {
    return {
      pos: this.pos,
      size: this.size,

      progress: this.progress,
    };
  }

  constructor(gameLevelZone, opts) {
    super({
      isStatic: true,

      pos: new vec3(opts.mapX, opts.mapY),
      size: new vec3(opts.mapW, opts.mapH),

      progress: 0,
    });

    this.body = {
      kind: 'staticRect',
      w: this.size.x,
      h: this.size.y,
    }

    gameLevelZone.addObject(this);
  }

  update() {
    super.update();

    this.body.w = this.size.x;
    this.body.h = this.size.y;
  }

  checkNear(object) {
    if (object.type === 'Fighter' && object.kind === 'player') {
      const dx = Math.abs(this.pos.x - object.pos.x);
      const dy = Math.abs(this.pos.y - object.pos.y);
      const dw = this.size.x * 0.5 + WALL_SIZE;
      const dh = this.size.y * 0.5 + WALL_SIZE;
      console.log(dx, dw, dy, dh);
      if (dx < dw && dy < dh) {
        object.canOpenDoor = this;
      }
    }
  }

  open(player) {
    if (this.isOpened && !this.isClosing) {
      this.isClosing = 10;
    } else if (!this.isOpening) {
      this.isOpening = 10;
    }
    this.emitAll('open', {
      time: this.isOpening || this.isClosing,
    });
  }
}