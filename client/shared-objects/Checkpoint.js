export class Checkpoint extends mix(global.Checkpoint, MixGameObject) {
  static createView() {
    const view = new Phaser.Image(
      game, 0, 0, 'checkpoint');
    view.anchor.set(0.5);
    return view;
  }

  constructor(data) {
    data.pos = new vec3(data.pos);

    super(data, data);

    this.group.x = this.pos.x;
    this.group.y = this.pos.y;

    this.view = Checkpoint.createView();
    this.view2 = Checkpoint.createView();
    this.view3 = Checkpoint.createView();
    this.view4 = Checkpoint.createView();

    const f = 0.8;
    this.view.scale.x = 0.4 * f;
    this.view.scale.y = 0.4 * f;
    this.view2.scale.x = -0.6 * f;
    this.view2.scale.y = 0.6 * f;

    this.view3.scale.x = -1.9 * f;
    this.view3.scale.y = 1.9 * f;
    this.view4.scale.x = 1.2 * f;
    this.view4.scale.y = 1.2 * f;

    this.view.alpha = 1;
    this.view2.alpha = 1;
    this.view3.alpha = 1;
    this.view4.alpha = 1;

    this.view3.angle += 45;
    this.view4.angle -= 45;

    this.bottomGroup.add(this.view);
    this.middleGroup.add(this.view2);
    this.topGroup.add(this.view3);
    this.topGroup.add(this.view4);
  }

  update() {
    super.update();

    const dt = global.dt * 10;

    this.view.angle += dt * 5;

    this.view2.x = Math.cos(this.view.angle * Math.PI / 180) * 40;
    this.view2.y = Math.sin(this.view.angle * Math.PI / 180) * 40;
    this.view2.angle -= dt * 4;

    this.view3.x =
      this.view2.x + Math.cos(this.view2.angle * Math.PI / 180) * 70;
    this.view3.y =
      this.view2.y + Math.sin(this.view2.angle * Math.PI / 180) * 70;
    this.view3.angle -= dt * 3;

    this.view4.x =
      this.view3.x + Math.cos(this.view3.angle * Math.PI / 180) * 200;
    this.view4.y =
      this.view3.y + Math.sin(this.view3.angle * Math.PI / 180) * 200;
    this.view4.angle += dt * 2;

    if (game.layer.sub.light) {
      const light = game.layer.sub.light;
      if (!this.light) {
        const rt = new Phaser.RenderTexture(
          game, 128, 128, null, null, 1);
        const image = new Phaser.Image(game, 0, 0, 'light');
        image.blendMode = PIXI.blendModes.ADD;
        rt.renderXY(image, 0, 0, true);
        rt.renderXY(image, 0, 0, false);
        rt.renderXY(image, 0, 0, false);
        this.light = new Phaser.Image(game, 0, 0, rt);
        this.light.tint = 0x3388FF;
        this.light.blendMode = PIXI.blendModes.ADD;
        this.light.anchor.set(0.5);
      }
      const x = (this.pos.x - game.ui.x) / light.scale.x;
      const y = (this.pos.y - game.ui.y) / light.scale.y;

      this.light.scale.set(0.5);
      this.light.alpha = 0.5;
      light.texture.renderXY(this.light, view.x, view.y, false);
      this.light.scale.set(0.8);
      this.light.alpha = 0.7;
      light.texture.renderXY(this.light, view2.x, view2.y, false);
      this.light.scale.set(1.2);
      this.light.alpha = 1;
      light.texture.renderXY(this.light, view3.x, view3.y, false);
      this.light.scale.set(1.7);
      this.light.alpha = 0.5;
      light.texture.renderXY(this.light, view4.x, view4.y, false);
    }
  }
}