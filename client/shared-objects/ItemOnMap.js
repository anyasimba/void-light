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
    this.addLight.alpha = 0.2;
    this.topGroup.add(this.addLight);
  }

  update() {
    super.update();

    this.z = this.z || 0;
    let l = Math.floor(this.z / 100.0 * 6 + 0.5);
    l = Math.max(l, 0);

    let li = Math.floor(this.z / 100.0 + 1 / 12);
    li = Math.min(li, 5);
    li = Math.max(li, 0);
    if (game.light && this.light) {
      this.light.alpha = game.layers[li]
        .sub['mix' + Math.min(l - li * 6 + 1, 7)].alpha * lightAlpha;
      const light = game.light;
      const x = (this.pos.x - game.ui.x) / light.scale.x;
      const y = (this.pos.y - game.ui.y) / light.scale.y;
      light.texture.renderXY(this.light, x, y, false);
    }
  }
}