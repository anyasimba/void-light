export class Decor extends mix(global.Decor, MixGameObject) {
  static createView(opts) {
    const image = new Phaser.Image(game, 0, 0, VIEW);

    image.anchor.set(0.5);
    image.scale.set(opts.SCALE || 1);
    image.tint = opts.TINT || oxFFFFFF;

    return image;
  }

  constructor(data) {
    data.pos = new vec3(data.pos);

    super(data, data);

    this.group.x = this.pos.x;
    this.group.y = this.pos.y;

    const opts = global[this.slug];
    if (opts.VIEW) {
      this.view = Decor.createView(opts);
      this.middleGroup.add(this.view);
    }

    if (opts.LIGHT) {
      this.light = genLight();
      for (let i = 0; i < opts.LIGHT_I || 0; ++i) {
        this.light.rt.renderXY(this.light.rtImage, 0, 0, false);
      }
      this.light.alpha *= opts.LIGHT_A || 1;
      this.light.scale.set((opts.LIGHT_SCALE || 1) * this.light.f);
      this.light.tint = opts.LIGHT;

      this.addLight = genLight();
      this.addLight.tint = opts.LIGHT;
      this.addLight.scale.set(0.6);
      this.addLight.alpha = (opts.LIGHT_A || 1) * 0.2;
      this.topGroup.add(this.addLight);

      this.addLight2 = genLight();
      this.addLight2.tint = 0xFFFFFF;
      this.addLight2.scale.set(0.07);
      this.addLight2.alpha = (opts.LIGHT_A || 1) * 0.5;
      this.topGroup.add(this.addLight2);
    }
  }

  update() {
    super.update();

    let l = Math.floor(this.z / 100.0);
    l = Math.min(l, 5);
    l = Math.max(l, 0);
    if (this.light) {
      this.light.alpha = game.layers[l].sub.mix7.alpha * lightAlpha;
      const light = game.light;
      const lx = 0; //game.w * 0.5;
      const ly = 0; //game.h * 0.5;
      const x = (this.pos.x - game.ui.x + lx) / light.scale.x;
      const y = (this.pos.y - game.ui.y + ly) / light.scale.y;
      light.texture.renderXY(this.light, x, y, false);
    }
  }
}

export const decor__light = {
  LIGHT: 0xFFFFFF,
  LIGHT_A: 0.8,
  LIGHT_SCALE: 20,
};
export const decor__light2 = {
  LIGHT_A: 0.8,
  LIGHT_SCALE: 20,
  LIGHT: 0xFF9933,
};
export const decor__light3 = {
  LIGHT_A: 0.8,
  LIGHT_SCALE: 20,
  LIGHT: 0xFF77FF,
};