export class Item extends mix(global.Item, MixGameObject) {
  constructor(data) {
    super(data, data);
  }
  onCreate() {
    super.onCreate();

    this.opts = global[this.slug];

    this.view = this.opts.createView(
      this.parent.id === client.playerID, this.parent.kind);
    this.group.add(this.view);
  }

  update() {
    super.update();
    this.opts.update.call(this);
  }
}

export const weapon__sword__default = new class {
  createView(isHost, kind) {
    let color = 0xAA3300;
    if (isHost) {
      color = 0xFFFFFF;
    } else if (kind === 'player') {
      color = 0x55FF00;
    }
    const image = new Phaser.Image(game, 0, 0, 'sword');
    image.scale.x = 0.7;
    image.scale.y = 1;
    image.anchor.x = 0.5;
    image.anchor.y = 0.8;
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
    let color = 0xAA3300;
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

    let groupAngle = this.sideAngle + 100;
    const isInBlock = !this.parent.inJump &&
      !this.parent.inHit &&
      this.parent.stamina > 0
    if (!isInBlock && !this.parent.inStun) {
      groupAngle = this.sideAngle;
    }
    this.group.angle += (groupAngle - this.group.angle) *
      (1 - Math.pow(0.1, dt * 5));
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