export class Item extends mix(global.Item, MixGameObject) {
  constructor(data) {
    super(data, data);
  }
  destructor() {
    if (this.parent.hp <= 0) {
      this.smoothDestroy = true;
    }
    super.destructor();
  }
  onCreate() {
    super.onCreate();

    this.opts = global[this.slug];

    this.view = this.opts.createView(
      this.parent.id === client.playerID, this.parent.kind);

    this.view.addTex.time = this.parent.views[0].addTex.time;

    this.sx = this.view.scale.x * this.bodyScale;
    this.sy = this.view.scale.y * this.bodyScale;

    this.group.add(this.view);
  }

  update() {
    if (!this.parent.visible) {
      return;
    }
    super.update();
    this.opts.update.call(this);

    if (this.type === 'shield') {
      let groupAngle = this.sideAngle + 100;
      const isInBlock = !this.parent.inJump &&
        this.parent.inBlock &&
        !this.parent.inHit &&
        !this.parent.waitTime &&
        !this.parent.stunTime &&
        this.parent.stamina > 0
      if (!isInBlock && !this.parent.inStun) {
        groupAngle = this.sideAngle;
      }
      this.group.angle += (groupAngle - this.group.angle) *
        (1 - Math.pow(0.1, dt * 5));
    }

    this.view.scale.x = this.sx * Math.cos(this.hAngle * Math.PI / 180);
    this.view.scale.y = this.sy * Math.cos(this.vAngle * Math.PI / 180);
    if (this.mirror) {
      this.view.scale.x = -this.view.scale.x;
    }
  }
}

const weapon__family = {
  update() {
    this.view.x = this.pos.x + this.parent.moveShift + 1;
    this.view.y = this.pos.y - this.parent.moveShift * 2 + 2;
    this.view.angle = this.angle + 90;

    this.group.angle = this.sideAngle;
  },
  onStun() {
    let time = this.parent.stunDelay || 0;

    const step1 = 0.2;
    this.parent.step(time, () => {
      this.stage(step1, easing.easeOutCubic, {
        pos: {
          x: -40,
          y: 40,
        },
        angle: 140,
        vAngle: 0,
        hAngle: 0,
        sideAngle: -30,
      });
    });
    time += step1;

    let step2FN, step3FN;
    step2FN = () => {
      const step2 = 1;
      this.stage(step2, easing.easeInOutCubic, {
        pos: {
          x: -40,
          y: 40,
        },
        angle: 120,
        sideAngle: -50,
      });
      this.parent.step(step2, step3FN);
    };
    step3FN = () => {
      const step3 = 1;
      this.stage(step3, easing.easeInOutCubic, {
        pos: {
          x: -40,
          y: 40,
        },
        angle: 120,
        sideAngle: -50,
      });
      this.parent.step(step3, step2FN);
    };
    this.parent.step(time, step2FN);
  },
}

export const weapon__sword__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  createView() {
    const image = makeHSL(hslMap['sword'], 0.5, 0.75, [
      0xFFFFFF,
      0x888888,
      0x888888,
    ]);
    image.scale.x = 0.5;
    image.scale.y = 0.5;
    return image;
  }
}
export const weapon__sword2__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  createView() {
    const image = makeHSL(hslMap['sword'], 0.5, 0.75, [
      0xAACCAA,
      0x444444,
      0x999999,
      0x999999
    ]);
    image.scale.x = 0.5;
    image.scale.y = 0.5;
    return image;
  }
}
export const weapon__bigsword__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  createView() {
    const image = makeHSL(hslMap['sword'], 0.5, 0.75, [
      0xFFFFFF,
      0x8899AA,
      0x8899AA,
      0x8899AA
    ]);
    image.scale.x = 0.5;
    image.scale.y = 0.5;
    return image;
  }
}
export const weapon__bigsword2__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  createView() {
    const image = makeHSL(hslMap['sword'], 0.5, 0.75, [
      0xCCAAFF,
      0x444444,
      0x5599FF,
      0x5599FF
    ]);
    image.scale.x = 0.5;
    image.scale.y = 0.5;
    return image;
  }
}

export const weapon__axe__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  createView() {
    const image = makeHSL(hslMap['axe'], 0.5, 0.75, [
      0xFFFFFF,
      0x888888,
      0x888888,
    ]);
    image.scale.x = 0.5;
    image.scale.y = 0.5;
    return image;
  }
}
export const weapon__axe2__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  createView() {
    const image = makeHSL(hslMap['axe'], 0.5, 0.75, [
      0xFFCCAA,
      0x444444,
      0xFF9955,
      0xFF9955
    ]);
    image.scale.x = 0.5;
    image.scale.y = 0.5;
    return image;
  }
}
export const weapon__bigaxe__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  createView() {
    const image = makeHSL(hslMap['axe'], 0.5, 0.75, [
      0xFFFFFF,
      0x8899AA,
      0x8899AA,
      0x8899AA
    ]);
    image.scale.x = 0.5;
    image.scale.y = 0.5;
    return image;
  }
}
export const weapon__bigaxe2__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  createView() {
    const image = makeHSL(hslMap['axe'], 0.5, 0.75, [
      0xFF8888,
      0x444444,
      0xFF5555,
      0xFF5555
    ]);
    image.scale.x = 0.5;
    image.scale.y = 0.5;
    return image;
  }
}
export const weapon__kopie__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  createView(isHost, kind) {
    const image = makeHSL(hslMap['kopie'], 0.5, 0.75, [
      0xFFFFFF,
      0x888888,
      0x888888,
      0x660088,
    ]);
    image.scale.x = 0.4;
    image.scale.y = 0.4;
    return image;
  }
}
export const weapon__kopie2__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  createView(isHost, kind) {
    const image = makeHSL(hslMap['kopie'], 0.5, 0.75, [
      0x000000,
      0x888888,
      0x550088,
      0x660088,
    ]);
    image.scale.x = 0.4;
    image.scale.y = 0.4;
    return image;
  }
}
export const weapon__molot__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  createView() {
    const image = makeHSL(hslMap['molot'], 0.5, 0.75, [
      0xFFFFFF,
      0x888888,
      0x888888,
      0xBB8888
    ]);
    image.scale.x = 0.6;
    image.scale.y = 0.6;
    return image;
  }
}
export const weapon__molot2__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  createView() {
    const image = makeHSL(hslMap['molot'], 0.5, 0.75, [
      0x111111,
      0x003388,
      0x003388,
      0x003388,
    ]);
    image.scale.x = 0.6;
    image.scale.y = 0.6;
    return image;
  }
}
export const weapon__bigmolot__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  createView() {
    const image = makeHSL(hslMap['molot'], 0.5, 0.75, [
      0xFFFFFF,
      0x8899AA,
      0x8899AA,
      0x8899AA
    ]);
    image.scale.x = 0.6;
    image.scale.y = 0.6;
    return image;
  }
}
export const weapon__bigmolot2__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  createView() {
    const image = makeHSL(hslMap['molot'], 0.5, 0.75, [
      0x334455,
      0x555555,
      0x555555,
      0x555555,
    ]);
    image.scale.x = 0.6;
    image.scale.y = 0.6;
    return image;
  }
}
export const weapon__dubina__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  createView() {
    const image = makeHSL(hslMap['dubina'], 0.5, 0.75, [
      0xFFFFFF,
      0x888888,
      0x888888,
      0xCCAA99,
    ]);
    image.scale.x = 0.6;
    image.scale.y = 0.6;
    return image;
  }
}
export const weapon__bigdubina__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  createView() {
    const image = makeHSL(hslMap['dubina'], 0.5, 0.75, [
      0xFFFFFF,
      0x8899AA,
      0x8899AA,
      0x8899AA
    ]);
    image.scale.x = 0.6;
    image.scale.y = 0.6;
    return image;
  }
}
export const weapon__kinjal__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  createView() {
    const image = makeHSL(hslMap['kinjal'], 0.5, 0.75, [
      0xFFFFFF,
      0x8899AA,
      0x8899AA,
      0x8899AA
    ]);
    image.scale.x = 0.9;
    image.scale.y = 0.9;
    return image;
  }
}
export const weapon__kinjal2__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  createView() {
    const image = makeHSL(hslMap['kinjal'], 0.5, 0.75, [
      0x44FF44,
      0x8899AA,
      0x8899AA,
      0x44FF44
    ]);
    image.scale.x = 0.9;
    image.scale.y = 0.9;
    return image;
  }
}

export const shield__default__default = new class {
  createView() {
    const image = makeHSL(hslMap['shield'], 0.5, 0.5, [
      0xFFFFFF,
      0x888888,
      0x888888,
    ]);
    image.scale.x = 0.8;
    image.scale.y = 0.8;
    return image;
  }
  update() {
    this.view.x = this.pos.x + this.parent.moveShift + 1;
    this.view.y = this.pos.y - this.parent.moveShift * 2 + 2;
    this.view.angle = this.angle + 90;
  }
  onStun() {
    let time = this.parent.stunDelay || 0;

    const step1 = 0.2;
    this.parent.step(time, () => {
      this.stage(step1, easing.easeOutCubic, {
        pos: {
          x: -45,
          y: -30,
        },
        angle: -120,
        vAngle: 0,
        hAngle: 0,
        sideAngle: -30,
      });
    });
    time += step1;

    let step2FN, step3FN;
    step2FN = () => {
      const step2 = 1;
      this.stage(step2, easing.easeInOutCubic, {
        pos: {
          x: -45,
          y: -30,
        },
        angle: -80,
        sideAngle: -50,
      });
      this.parent.step(step2, step3FN);
    };
    step3FN = () => {
      const step3 = 1;
      this.stage(step3, easing.easeInOutCubic, {
        pos: {
          x: -45,
          y: -30,
        },
        angle: -120,
        sideAngle: -30,
      });
      this.parent.step(step3, step2FN);
    };
    this.parent.step(time, step2FN);
  }
}

export const weapon__luk__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  get isRange() {
    return true;
  }
  createView() {
    const image = makeHSL(hslMap['luk'], 0.5, 0.5, [
      0xFFFFFF,
      0x8899AA,
      0x8899AA,
      0x8899AA
    ]);
    image.scale.x = -0.9;
    image.scale.y = 0.9;
    return image;
  }
}
export const weapon__luk2__default = new class {
  constructor() {
    this.update = weapon__family.update;
    this.onStun = weapon__family.onStun;
  }
  get isRange() {
    return true;
  }
  createView() {
    const image = makeHSL(hslMap['luk'], 0.5, 0.5, [
      0x88AAFF,
      0x4444FF,
      0x4444FF,
      0xFFFFFF
    ]);
    image.scale.x = -0.9;
    image.scale.y = 0.9;
    return image;
  }
}