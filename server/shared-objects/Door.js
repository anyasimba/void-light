export class Door extends mix(global.Door, MixNativeGameObject, MixGameObject) {
  get state() {
    return {
      pos: this.pos.clone(),
      z: this.z,
      size: this.size.clone(),
      basePos: this.basePos.clone(),
      baseSize: this.baseSize.clone(),

      isOpened: this.isOpened,
      isOpening: this.isOpening,
      isClosing: this.isClosing,
      progress: this.progress,

      isExit: this.isExit,
    };
  }

  get isOpening() {
    const t = native.Door__getIsOpening(this.native);
    if (t > 0) {
      return t;
    }
  }
  set isOpening(v) {
    native.Door__setIsOpening(this.native, v);
  }
  get isClosing() {
    const t = native.Door__getIsClosing(this.native);
    if (t > 0) {
      return t;
    }
  }
  set isClosing(v) {
    native.Door__setIsClosing(this.native, v);
  }
  get isOpened() {
    return native.Door__getIsOpened(this.native) !== 0;
  }
  set isOpened(v) {
    if (v) {
      v = 1;
    } else {
      v = 0;
    }
    native.Door__setIsOpened(this.native, v);
  }
  get basePos() {
    return new vec3(
      native.Door__getBasePosX(this.native),
      native.Door__getBasePosY(this.native));
  }
  set basePos(v) {
    native.Door__setBasePosX(this.native, v.x);
    native.Door__setBasePosY(this.native, v.y);
  }
  get size() {
    return new vec3(
      native.Door__getSizeX(this.native),
      native.Door__getSizeY(this.native));
  }
  set size(v) {
    native.Door__setSizeX(this.native, v.x);
    native.Door__setSizeY(this.native, v.y);
  }
  get baseSize() {
    return new vec3(
      native.Door__getBaseSizeX(this.native),
      native.Door__getBaseSizeY(this.native));
  }
  set baseSize(v) {
    native.Door__setBaseSizeX(this.native, v.x);
    native.Door__setBaseSizeY(this.native, v.y);
  }

  preCreate(opts) {
    this.body = {
      kind: 'staticRect',
      w: opts.size.x,
      h: opts.size.y,
      z2: 500.0 / 6.0,
    }

    this.native = native.new__Door(this);
  }

  constructor(gameLevelZone, opts) {
    super({
      isStatic: true,

      pos: new vec3(opts.mapX, opts.mapY),
      z: opts.z,
      size: new vec3(opts.mapW, opts.mapH),
      basePos: new vec3(opts.mapX, opts.mapY),
      baseSize: new vec3(opts.mapW, opts.mapH),

      isExit: opts.isExit,
      exitWay: opts.exitWay,
      target: opts.target,

      progress: 0,
    });

    gameLevelZone.addObject(this);
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
      if (dx < dw && dy < dh &&
        Math.abs(this.z + 20.0 - object.z) <= 20.0) {

        object.canOpenDoor = this;
      }
    }
  }

  breakAction() {
    if (this.isOpening) {
      this.isClosing = 4 - this.isOpening;
      this.isOpening = -1;
    } else if (this.isClosing) {
      this.isOpening = 4 - this.isClosing;
      this.isClosing = -1;
    }
    this.emitAll('break', {
      time: this.isOpening || this.isClosing,
    });
  }

  open(player) {
    if (this.isExit) {
      player.wait(3);
      player.speed.init();
      player.owner.changeZone(this.exitWay, this.target);
      delete player.canOpenDoor;
      return;
    }
    if (this.isOpening || this.isClosing) {
      return;
    }
    if (this.isOpened && !this.isClosing) {
      this.isClosing = 4;
    } else if (!this.isOpening) {
      this.isOpening = 4;
    }
    player.wait(4);
    player.speed.init();
    player.emitPos();
    player.waitFor = this;
    this.emitAll('open', {
      time: this.isOpening || this.isClosing,
    });
  }
}