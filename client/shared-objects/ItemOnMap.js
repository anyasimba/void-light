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

    if (data.slug === 'green-sign') {
      this.view = new Phaser.Image(game, 0, 0, 'item__green-sign');
      this.view.anchor.set(0.5);
      this.view.scale.set(1);
      this.bottomGroup.add(this.view);
    } else if (data.slug === 'red-sign') {
      this.view = new Phaser.Image(game, 0, 0, 'item__red-sign');
      this.view.anchor.set(0.5);
      this.view.scale.set(1);
      this.bottomGroup.add(this.view);
    } else if (data.slug === 'blue-sign') {
      this.view = new Phaser.Image(game, 0, 0, 'item__blue-sign');
      this.view.anchor.set(0.5);
      this.view.scale.set(1);
      this.bottomGroup.add(this.view);
    } else if (data.slug === 'blood') {
      this.view = new Phaser.Image(game, 0, 0, 'blood');
      this.view.anchor.set(0.5);
      this.view.scale.set(1);
      this.bottomGroup.add(this.view);
    } else {
      this.view = ItemOnMap.createView();
      this.middleGroup.add(this.view);
    }

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

    if (!client.player) {
      return;
    }
    this.z = this.z || 0;
    let l = Math.floor(this.z / 100.0);
    l = Math.min(l, 5);
    l = Math.max(l, 0);
    const pz = Math.floor(client.player.z / 100.0)
    if (pz === l && game.light && this.light) {
      this.light.alpha = lightAlpha;
      const light = game.light;
      const x = (this.pos.x - game.ui.x) / light.scale.x;
      const y = (this.pos.y - game.ui.y) / light.scale.y;
      light.texture.renderXY(this.light, x, y, false);
    }
  }
}