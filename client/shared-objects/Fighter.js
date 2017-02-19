export class Fighter extends mix(global.Fighter, MixGameObject) {
  static createView(isHost, kind, size) {
    let color = 0xFF4400;
    if (isHost) {
      color = 0xFFFFFF;
    } else if (kind === 'player') {
      color = 0x55FF00;
    }
    const images = [
      new Phaser.Image(game, 0, 0, 'player'),
      new Phaser.Image(game, 0, 0, 'player-back'),
    ];
    for (const k in images) {
      const image = images[k];
      image.scale.x = 0.9;
      image.scale.y = 1;
      image.anchor.x = 0.5;
      image.anchor.y = 0.5;
      image.angle = 90;
      image.tint = color;
      if (!isHost) {
        image.scale.x = 0.8;
        image.scale.y = 0.9;
      }
      image.smoothed = true;

      image.scale.x *= size / 40;
      image.scale.y *= size / 40;
    }
    return images;
  }

  constructor(data) {
    console.log(data);
    data.pos = new vec3(data.pos);
    data.speed = new vec3(data.speed);
    data.inputMove = new vec3(data.inputMove);
    data.look = new vec3(data.look);

    super(data, data);

    this.views = Fighter.createView(
      this.id === client.playerID, this.kind, this.size);
    this.group.add(this.views[0]);
    this.group.add(this.views[1]);
    this.views[1].alpha = 0;

    if (this.id === client.playerID) {
      client.player = this;
    }

    this.moveTime = 0;
  }

  onPos(data) {
    this.pos.init(data.pos);
    this.speed.init(data.speed);
    this.inputMove.init(data.inputMove);
  }

  update() {
    super.update();

    const sideVec = new vec3(this.look.y, -this.look.x, this.look.z).unit();

    this.group.x = this.pos.x + sideVec.x * this.moveShift * 3;
    this.group.y = this.pos.y + sideVec.y * this.moveShift * 3;
    this.group.angle = this.look.toAngle();
    this.group.scale.x = 1;
    this.group.scale.y = 1;
    if (this.inJump) {
      const f = Math.sin(
        (this.inJump.time / this.inJump.duration) * Math.PI) * 0.2;
      this.group.scale.x = 1 + f;
      this.group.scale.y = 1 + f;
    }

    this.views[0].alpha = 1;
    this.views[1].alpha = 0;
    if (this.inRoll) {
      const f = Math.sin(
        (this.inRoll.time / this.inRoll.duration * 2 + 0.5) * Math.PI);
      this.group.scale.x *= f;

      if (f < 0) {
        this.views[0].alpha = 0;
        this.views[1].alpha = 1;
      }
    }

    this.moveTime += this.speed.length() * dt * 0.01;
    this.moveShift = Math.sin(this.moveTime) *
      (this.speed.length() + 100) / (this.speed.length() + 200);
    if (this.inJump || this.inRoll) {
      this.moveShift = 0;
    }
  }
}