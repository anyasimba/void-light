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
    this.view.scale.x = 0.8 * f;
    this.view.scale.y = 0.8 * f;
    this.view2.scale.x = -1.2 * f;
    this.view2.scale.y = 1.2 * f;

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

    this.light = genLight();
    for (let i = 0; i < 4; ++i) {
      this.light.rt.renderXY(this.light.rtImage, 0, 0, false);
    }
    this.light.tint = 0x2266FF;
  }

  update() {
    super.update();

    const dt = global.dt * 10;

    this.view.angle += dt * 5;

    this.view2.x = Math.cos(this.view.angle * Math.PI / 180) * 90;
    this.view2.y = Math.sin(this.view.angle * Math.PI / 180) * 90;
    this.view2.angle -= dt * 4;

    this.view3.x =
      this.view2.x + Math.cos(this.view2.angle * Math.PI / 180) * 140;
    this.view3.y =
      this.view2.y + Math.sin(this.view2.angle * Math.PI / 180) * 140;
    this.view3.angle += dt * 3;

    this.view4.x =
      this.view3.x + Math.cos(this.view3.angle * Math.PI / 180) * 200;
    this.view4.y =
      this.view3.y + Math.sin(this.view3.angle * Math.PI / 180) * 200;
    this.view4.angle -= dt * 2;

    if (game.layer.sub.light) {
      const light = game.layer.sub.light;

      const f = 1 / light.scale.x;
      const x = (this.pos.x - game.ui.x) * f;
      const y = (this.pos.y - game.ui.y) * f;

      this.light.scale.set(3 * this.light.f);
      this.light.alpha = 0.7 * lightAlpha;
      light.texture.renderXY(
        this.light, x + this.view.x * f, y + this.view.y * f, false);
      this.light.scale.set(5 * this.light.f);
      this.light.alpha = 0.7 * lightAlpha;
      light.texture.renderXY(
        this.light, x + this.view2.x * f, y + this.view2.y * f, false);
      this.light.scale.set(10 * this.light.f);
      this.light.alpha = 0.8 * lightAlpha;
      light.texture.renderXY(
        this.light, x + this.view3.x * f, y + this.view3.y * f, false);
      this.light.scale.set(7 * this.light.f);
      this.light.alpha = 1 * lightAlpha;
      light.texture.renderXY(
        this.light, x + this.view4.x * f, y + this.view4.y * f, false);
    }
  }
}