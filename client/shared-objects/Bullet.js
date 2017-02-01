export class Bullet extends mix(global.Bullet, MixGameObject) {
  static createView() {
    const graphics = new Phaser.Graphics(game, 0, 0);

    graphics.beginFill(0xFF9900, 0.5);
    graphics.lineStyle(4, 0xFF9900, 1.2);
    graphics.drawCircle(0, 0, Bullet.BODY_SIZE);
    graphics.endFill();

    return graphics;
  }

  constructor(data) {
    super(data, {
      pos: new vec3(data.pos),
      speed: new vec3(data.speed),
      view: Bullet.createView(),
    });
    this.group.add(this.view);
  }
  destructor() {
    super.destructor();

    this.view.destroy();
  }

  update() {
    super.update();

    this.view.x = this.pos.x;
    this.view.y = this.pos.y;
    this.view.scale.y = 3000 / (this.speed.length() + 3000);
    this.view.angle = Math.atan2(this.speed.y, this.speed.x) * 180 / Math.PI;
  }

  onPos(data) {
    this.pos.init(data.pos);
    this.speed.init(data.speed);
  }
}