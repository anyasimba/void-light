export class Door extends mix(global.Door, MixGameObject) {
  get state() {
    return {
      pos: this.pos.clone(),
      size: this.size.clone(),
      basePos: this.basePos.clone(),
      baseSize: this.baseSize.clone(),

      isOpened: this.isOpened,
      isOpening: this.isOpening,
      isClosing: this.isClosing,
      progress: this.progress,
    };
  }

  constructor(gameLevelZone, opts) {
    super({
      isStatic: true,

      pos: new vec3(opts.mapX, opts.mapY),
      size: new vec3(opts.mapW, opts.mapH),
      basePos: new vec3(opts.mapX, opts.mapY),
      baseSize: new vec3(opts.mapW, opts.mapH),

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
    if (this.isOpening || this.isClosing) {
      return;
    }
    if (object.type === 'Fighter' && object.kind === 'player') {
      const dx = Math.abs(this.pos.x - object.pos.x);
      const dy = Math.abs(this.pos.y - object.pos.y);
      const dw = this.size.x * 0.5 + WALL_SIZE;
      const dh = this.size.y * 0.5 + WALL_SIZE;
      if (dx < dw && dy < dh) {
        object.canOpenDoor = this;
      }
    }
  }

  breakAction() {
    if (this.isOpening) {
      this.isClosing = 4 - this.isOpening;
      delete this.isOpening;
    } else if (this.isClosing) {
      this.isOpening = 4 - this.isClosing;
      delete this.isClosing;
    }
    this.emitAll('break', {
      time: this.isOpening || this.isClosing,
    });
  }

  open(player) {
    if (this.isOpening || this.isClosing) {
      return;
    }
    if (this.isOpened && !this.isClosing) {
      this.isClosing = 4;
    } else if (!this.isOpening) {
      this.isOpening = 4;
    }
    player.wait(4);
    player.waitFor = this;
    this.emitAll('open', {
      time: this.isOpening || this.isClosing,
    });
  }
}