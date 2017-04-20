export class Bullet extends mix(global.Bullet, MixGameObject) {
  static createView() {
    const image = new Phaser.Image(game, 0, 0, 'arrow');
    image.anchor.set(0.5);
    image.scale.set(1.2);
    return image;
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
    this.view.scale.y = (0.4 + this.speed.length() / 5000) *
      this.view.scale.x;
    this.view.angle = Math.atan2(this.speed.y, this.speed.x) * 180 / Math.PI +
      90;
  }

  onPos(data) {
    this.pos.init(data.pos);
    this.speed.init(data.speed);
    this.z = data.z;
  }
}