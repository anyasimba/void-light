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
    image.scale.y = 1.4;
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
    image.scale.x = 0.8;
    image.scale.y = 1.4;
    image.anchor.x = 0.5;
    image.anchor.y = 0.8;
    image.tint = multiplyTint(color, 0x777755);
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
    image.scale.y = 1.4;
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