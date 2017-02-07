export class Sword extends mix(global.Sword, MixGameObject) {
  static createView(isHost) {
    const graphics = new Phaser.Graphics(game, 0, 0);

    let color = 0xFF9900;
    if (isHost) {
      color = 0x0099FF;
    }
    graphics.beginFill(color, 0.5);
    graphics.lineStyle(1, color, 1);
    graphics.drawRect(-20, -Sword.BODY_SIZE / 2, 100, Sword.BODY_SIZE);
    graphics.endFill();

    return graphics;
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
    this.view.angle = this.angle;

    if (this.parent.hitAngle) {
      this.group.angle = this.parent.hitAngle;
    } else if (this.parent.look.length() > 0) {
      this.group.angle = this.parent.look.toAngle();
    }
    this.group.angle += this.sideAngle;
  }
}