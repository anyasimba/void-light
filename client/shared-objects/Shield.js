export class Shield extends mix(global.Shield, MixGameObject) {
  static createView(isHost) {
    let color = 0xAA3300;
    if (isHost) {
      color = 0xFFFFFF;
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

  constructor(data) {
    super(data, {
      pos: new vec3(data.pos),
      angle: data.angle,
      sideAngle: data.sideAngle,
    });
    this.view = Shield.createView(this.parent.id === client.playerID);
    this.group.add(this.view);
  }

  update() {
    super.update();

    this.view.x = this.pos.x + this.parent.moveShift + 1;
    this.view.y = this.pos.y - this.parent.moveShift * 2 + 2;
    this.view.angle = this.angle + 90;

    let groupAngle = this.sideAngle + 100;
    if (this.parent.inJump || this.parent.inRoll || this.parent.inHit) {
      groupAngle = this.sideAngle;
    }
    this.group.angle += (groupAngle - this.group.angle) *
      (1 - Math.pow(0.01, dt));
  }
}