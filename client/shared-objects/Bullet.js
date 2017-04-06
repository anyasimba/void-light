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
      z: data.z,
      speed: new vec3(data.speed),
      view: Bullet.createView(),
    });
    this.middleGroup.add(this.view);
  }
  destructor() {
    super.destructor();

    this.view.destroy();
  }

  update() {
    super.update();
    this.group.x = this.pos.x;
    this.group.y = this.pos.y;
    this.view.scale.y = 3000 / (this.speed.length() + 3000);
    this.view.angle = Math.atan2(this.speed.y, this.speed.x) * 180 / Math.PI;
  }

  onPos(data) {
    this.pos.init(data.pos);
    this.speed.init(data.speed);
    this.z = data.z;
  }
}