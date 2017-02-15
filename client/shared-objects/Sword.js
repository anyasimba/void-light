export class Sword extends mix(global.Sword, MixGameObject) {
  static createView(isHost) {
    let color = 0xAA3300;
    if (isHost) {
      color = 0xFFFFFF;
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

  constructor(data) {
    super(data, {
      pos: new vec3(data.pos),
      angle: data.angle,
      sideAngle: data.sideAngle,
    });
    this.view = Sword.createView(this.parent.id === client.playerID);
    this.group.add(this.view);
  }

  update() {
    super.update();

    this.view.x = this.pos.x;
    this.view.y = this.pos.y;
    this.view.angle = this.angle + 90;

    this.group.angle = this.parent.look.toAngle() + this.sideAngle;
  }
}