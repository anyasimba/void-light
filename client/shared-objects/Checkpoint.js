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

    this.view.alpha = 0.5;
    this.view2.alpha = 0.6;
    this.view3.alpha = 0.7;
    this.view4.alpha = 1;

    this.view3.angle += 45;
    this.view4.angle -= 45;

    this.view.blendMode = PIXI.blendModes.ADD;
    this.view2.blendMode = PIXI.blendModes.ADD;
    this.view3.blendMode = PIXI.blendModes.ADD;

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
  }
}