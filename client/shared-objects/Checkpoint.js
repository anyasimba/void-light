export class Checkpoint extends mix(global.Checkpoint, MixGameObject) {
  static createView(gray, color, ambient, special) {
    const view = makeHSL(hslMap['checkpoint'], 0.5, 0.5, [
      gray, color, ambient, special, ambient, ambient
    ]);
    return view;
  }

  constructor(data) {
    data.pos = new vec3(data.pos);

    super(data, data);

    this.group.x = this.pos.x;
    this.group.y = this.pos.y;

    this.view = Checkpoint.createView(
      0xFFFFFF, 0x4200ff, 0x0006ff, 0xFFFFFF);
    this.view2 = Checkpoint.createView(
      0xFFFFFF, 0x0006ff, 0x006cff, 0xFFFFFF);
    this.view3 = Checkpoint.createView(
      0xFFFFFF, 0x006cff, 0x00deff, 0xFFFFFF);
    this.view4 = Checkpoint.createView(
      0xFFFFFF, 0x00deff, 0x00ff96, 0xFFFFFF);

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

    this.view.addTex.time = 0;
    this.view2.addTex.time = 0.5;
    this.view3.addTex.time = 1;
    this.view4.addTex.time = 1.5;

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

    if (!client.player) {
      return;
    }
    this.z = this.z || 0;
    let l = Math.floor(this.z / 100.0);
    l = Math.min(l, 5);
    l = Math.max(l, 0);
    const pz = Math.floor(client.player.z / 100.0)
    if (pz === l && game.light && this.light) {
      const alpha = 1;
      const light = game.light;

      const f = 1 / light.scale.x;
      const lx = 0; //game.w * 0.5;
      const ly = 0; //game.h * 0.5;
      const x = (this.pos.x - game.ui.x + lx) * f;
      const y = (this.pos.y - game.ui.y + ly) * f;

      this.light.scale.set(3 * this.light.f);
      this.light.alpha = 0.7 * lightAlpha * alpha;
      light.texture.renderXY(
        this.light, x + this.view.x * f, y + this.view.y * f, false);
      this.light.scale.set(5 * this.light.f);
      this.light.alpha = 0.7 * lightAlpha * alpha;
      light.texture.renderXY(
        this.light, x + this.view2.x * f, y + this.view2.y * f, false);
      this.light.scale.set(10 * this.light.f);
      this.light.alpha = 0.8 * lightAlpha * alpha;
      light.texture.renderXY(
        this.light, x + this.view3.x * f, y + this.view3.y * f, false);
      this.light.scale.set(7 * this.light.f);
      this.light.alpha = 1 * lightAlpha * alpha;
      light.texture.renderXY(
        this.light, x + this.view4.x * f, y + this.view4.y * f, false);
    }
  }
}