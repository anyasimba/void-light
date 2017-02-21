export class Item extends mix(global.Item, MixGameObject) {
  constructor(data) {
    super(data, data);
  }
  onCreate() {
    super.onCreate();

    const kind = this.kind || 'default';
    const name = this.name || 'default';

    const slug = this.type + '__' + kind + '__' + name;
    const opts = global[slug];

    this.view = opts.createView(
      this.parent.id === client.playerID, this.parent.kind);
    this.group.add(this.view);

    this.updater = opts.update;

    this.doHit = global[slug + '__doHit'];
    this.onStun = global[slug + '__onStun'];
  }

  update() {
    super.update();
    this.updater();
  }
}

export const weapon__sword__default = {
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
  },
  update() {
    this.view.x = this.pos.x + this.parent.moveShift + 1;
    this.view.y = this.pos.y - this.parent.moveShift * 2 + 2;
    this.view.angle = this.angle + 90;

    this.group.angle = this.sideAngle;
  },
};

export const shield__default__default = {
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
  },
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
  },
}