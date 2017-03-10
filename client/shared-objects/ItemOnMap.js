export class ItemOnMap extends mix(global.ItemOnMap, MixGameObject) {
  static createView() {
    const graphics = new Phaser.Graphics(game, 0, 0);

    graphics.beginFill(0xFF9900, 0.5);
    graphics.lineStyle(4, 0xFF9900, 1.2);
    graphics.drawCircle(0, 0, Bullet.BODY_SIZE);
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
  }
}