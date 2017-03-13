export class Item extends mix(global.Item, MixGameObject) {
  constructor(data) {
    super(data, data);
  }
  onCreate() {
    super.onCreate();

    this.opts = global[this.slug];

    this.view = this.opts.createView(
      this.parent.id === client.playerID, this.parent.kind);

    this.sx = this.view.scale.x;
    this.sy = this.view.scale.y;

    if (this.view.isHSL) {
      const ax = this.view.anchor.x;
      const ay = this.view.anchor.y;
      const sx = this.view.scale.x;
      const sy = this.view.scale.y;
      const tint = this.view.tint;
      this.view.anchor.set(0);
      this.view.scale.set(1);
      this.view.tint = 0xFFFFFF;
      const hsl = convertHSL(this.slug, this.view,
        this.parent.H,
        this.parent.S,
        this.parent.RS);
      hsl.anchor.x = ax;
      hsl.anchor.y = ay;
      hsl.scale.x = sx;
      hsl.scale.y = sy;
      hsl.tint = tint;
      this.view = hsl;
    }

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
      let vAngle = 0;
      const isInBlock = !this.parent.inJump &&
        this.parent.isBlock &&
        !this.parent.inHit &&
        this.parent.stamina > 0
      if (!isInBlock && !this.parent.inStun) {
        groupAngle = this.sideAngle;
        vAngle = 20;
      }
      this.vAngle = this.vAngle || 0;
      this.group.angle += (groupAngle - this.group.angle) *
        (1 - Math.pow(0.1, dt * 5));
      this.vAngle += (vAngle - this.vAngle) *
        (1 - Math.pow(0.1, dt * 5));
    }

    this.view.scale.x = this.sx * Math.cos(this.hAngle * Math.PI / 180);
    this.view.scale.y = this.sy * Math.cos(this.vAngle * Math.PI / 180);
    if (this.mirror) {
      this.view.scale.x = -this.view.scale.x;
    }
  }
}

export const weapon__sword__default = new class {
  createView(isHost, kind) {
    let color = 0xFFFFFF;
    if (isHost) {
      color = 0xFFFFFF;
    } else if (kind === 'player') {
      color = 0x55FF00;
    }
    const image = new Phaser.Image(game, 0, 0, 'sword');
    image.scale.x = 0.8;
    image.scale.y = 1.2;
    image.anchor.x = 0.5;
    image.anchor.y = 0.8;
    image.tint = color;
    image.smoothed = true;
    return image;
  }
  update() {
    this.view.x = this.pos.x + this.parent.moveShift + 1;
    this.view.y = this.pos.y - this.parent.moveShift * 2 + 2;
    this.view.angle = this.angle + 90;

    this.group.angle = this.sideAngle;
  }
  onStun() {
    let time = 0;

    const step1 = 0.2;
    this.parent.step(time, () => {
      this.stage(step1, easing.easeOutCubic, {
        pos: {
          x: -40,
          y: 40,
        },
        angle: 140,
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
  }
}
export const weapon__bigsword__default = new class {
  createView(isHost, kind) {
    let color = 0xFFFFFF;
    if (isHost) {
      color = 0xFFFFFF;
    } else if (kind === 'player') {
      color = 0x55FF00;
    }
    const image = new Phaser.Image(game, 0, 0, 'sword');
    image.scale.x = 0.8 * 1.5;
    image.scale.y = 1.2 * 2;
    image.anchor.x = 0.5;
    image.anchor.y = 0.8;
    image.tint = color * 0x777755 / 0xFFFFFF;
    image.smoothed = true;
    return image;
  }
  update() {
    this.view.x = this.pos.x + this.parent.moveShift + 1;
    this.view.y = this.pos.y - this.parent.moveShift * 2 + 2;
    this.view.angle = this.angle + 90;

    this.group.angle = this.sideAngle;
  }
  onStun() {
    let time = 0;

    const step1 = 0.2;
    this.parent.step(time, () => {
      this.stage(step1, easing.easeOutCubic, {
        pos: {
          x: -40,
          y: 40,
        },
        angle: 140,
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
  }
}

export const weapon__axe__default = new class {
  createView(isHost, kind) {
    let color = 0xFFFFFF;
    if (isHost) {
      color = 0xFFFFFF;
    } else if (kind === 'player') {
      color = 0x55FF00;
    }
    const image = new Phaser.Image(game, 0, 0, 'axe');
    image.scale.x = 0.8;
    image.scale.y = 1.2;
    image.anchor.x = 0.5;
    image.anchor.y = 0.8;
    image.tint = color;
    image.smoothed = true;
    return image;
  }
  update() {
    this.view.x = this.pos.x + this.parent.moveShift + 1;
    this.view.y = this.pos.y - this.parent.moveShift * 2 + 2;
    this.view.angle = this.angle + 90;

    this.group.angle = this.sideAngle;
  }
  onStun() {
    let time = 0;

    const step1 = 0.2;
    this.parent.step(time, () => {
      this.stage(step1, easing.easeOutCubic, {
        pos: {
          x: -40,
          y: 40,
        },
        angle: 140,
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
  }
}

export const shield__default__default = new class {
  createView(isHost, kind) {
    let color = 0xFFFFFF;
    if (isHost) {
      color = 0xFFFFFF;
    } else if (kind === 'player') {
      color = 0x55FF00;
    }
    const image = new Phaser.Image(game, 0, 0, 'shield');
    image.scale.x = 1.4;
    image.scale.y = 1.4;
    image.anchor.x = 0.5;
    image.anchor.y = 0.5;
    image.tint = color;
    image.smoothed = true;
    return image;
  }
  update() {
    this.view.x = this.pos.x + this.parent.moveShift + 1;
    this.view.y = this.pos.y - this.parent.moveShift * 2 + 2;
    this.view.angle = this.angle + 90;
  }
  onStun() {
    let time = 0;

    const step1 = 0.2;
    this.parent.step(time, () => {
      this.stage(step1, easing.easeOutCubic, {
        pos: {
          x: -45,
          y: -30,
        },
        angle: -120,
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