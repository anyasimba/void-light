export class Fighter extends mix(global.Fighter, MixGameObject) {
  static createView(isHost) {

    let color = 0xFF4400;
    if (isHost) {
      color = 0xFFFFFF;
    }
    const image = new Phaser.Image(game, 0, 0, 'player');
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
    return image;
  }

  constructor(data) {
    super(data, {
      pos: new vec3(data.pos),
      speed: new vec3(data.speed),
      inputMove: new vec3(data.inputMove),
      look: new vec3(data.look),

      kind: data.kind,
    });

    this.view = Fighter.createView(this.id === client.playerID);
    this.group.add(this.view);

    if (this.id === client.playerID) {
      client.player = this;
    }
  }

  onPos(data) {
    this.pos.init(data.pos);
    this.speed.init(data.speed);
    this.inputMove.init(data.inputMove);
  }

  update() {
    super.update();

    this.group.x = this.pos.x;
    this.group.y = this.pos.y;
    this.group.angle = this.look.toAngle();
    this.group.scale.x = 1;
    this.group.scale.y = 1;
    if (this.inJump) {
      const f = Math.sin(
        (this.inJump.time / this.inJump.duration) * Math.PI) * 0.2;
      this.group.scale.x = 1 + f;
      this.group.scale.y = 1 + f;
    }
    if (this.inRoll) {
      const f = Math.sin(
        (this.inRoll.time / this.inRoll.duration * 2 + 0.5) * Math.PI);
      this.group.scale.x *= f;
    }
  }
}