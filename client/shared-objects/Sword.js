export class Sword extends mix(global.Sword, MixGameObject) {
  static createView() {
    const graphics = new Phaser.Graphics(game, 0, 0);

    graphics.beginFill(0xFF9900, 0.5);
    graphics.lineStyle(1, 0xFF9900, 1);
    graphics.drawRect(-20, -2, 100, 4);
    graphics.endFill();

    return graphics;
  }

  constructor(data) {
    super(data, {
      pos: new vec3(data.pos),
      angle: data.angle,
      view: Sword.createView(),
    });
    this.group.add(this.view);
  }

  update() {
    super.update();

    this.view.x = this.pos.x;
    this.view.y = this.pos.y;
    this.view.angle = this.angle;

    if (this.parent.look.length() > 0) {
      this.group.angle = this.parent.look.toAngle();
    }
  }
}