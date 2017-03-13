export class ItemOnMap extends mix(global.ItemOnMap, MixGameObject) {
  static createView() {
    const graphics = new Phaser.Graphics(game, 0, 0);

    graphics.beginFill(0x88EEFF, 0.5);
    graphics.drawCircle(0, 0, 30);
    graphics.endFill();

    return graphics;
  }

  constructor(data) {
    data.pos = new vec3(data.pos);

    super(data, data);

    this.group.x = this.pos.x;
    this.group.y = this.pos.y;

    this.view = ItemOnMap.createView();
    this.middleGroup.add(this.view);

    this.light = genLight();
    this.light.scale.set(3 * this.light.f);
    this.light.tint = 0x5599FF;
    for (let i = 0; i < 2; ++i) {
      this.light.rt.renderXY(this.light.rtImage, 0, 0, false);
    }

    this.addLight = genLight();
    this.addLight.tint = 0x5599FF;
    this.addLight.scale.set(2);
    this.addLight.alpha = 0.5;
    this.infoGroup.add(this.addLight);
  }

  update() {
    super.update();

    if (game.layer.sub.light) {
      const light = game.layer.sub.light;
      const x = (this.pos.x - game.ui.x) / light.scale.x;
      const y = (this.pos.y - game.ui.y) / light.scale.y;
      light.texture.renderXY(this.light, x, y, false);
    }
  }
}