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

  playHit() {
    const variant = Math.floor(Math.random() * 5) + 1;
    this.parent.playSound('hit' + variant)
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
    image.tint = color;
    if (!isHost) {
      image.scale.x = 0.6;
      image.scale.y = 0.9;
    }
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
    run(async() => {
      await this.stage(0.05, easing.easeInCubic, {
        pos: new vec3({
          x: -40,
          y: 40,
        }),
        angle: 140,
        sideAngle: -30,
      });

      while (true) {
        await this.stage(1, easing.easeInOutCubic, {
          pos: new vec3({
            x: -40,
            y: 40,
          }),
          angle: 120,
          sideAngle: -50,
        });
        await this.stage(1, easing.easeInOutCubic, {
          pos: new vec3({
            x: -40,
            y: 40,
          }),
          angle: 140,
          sideAngle: -30,
        });
      }
    });
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
    if (this.parent.inJump || this.parent.inHit) {
      groupAngle = this.sideAngle;
    }
    this.group.angle += (groupAngle - this.group.angle) *
      (1 - Math.pow(0.1, dt * 10));
  }
  onStun() {
    run(async() => {
      await this.stage(0.05, easing.easeInCubic, {
        pos: {
          x: -45,
          y: -30,
        },
        angle: -120,
        sideAngle: -30,
      });

      while (true) {
        await this.stage(1, easing.easeInOutCubic, {
          pos: {
            x: -45,
            y: -30,
          },
          angle: -80,
          sideAngle: -50,
        });
        await this.stage(1, easing.easeInOutCubic, {
          pos: {
            x: -45,
            y: -30,
          },
          angle: -120,
          sideAngle: -30,
        });
      }
    });
  }
}