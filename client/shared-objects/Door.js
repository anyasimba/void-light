export class Door extends mix(global.Door, MixGameObject) {
  static createView() {
    const view = new Phaser.TileSprite(
      game, 0, 0, WALL_SIZE, WALL_SIZE, 'door');

    return view;
  }

  constructor(data) {
    data.pos = new vec3(data.pos);
    data.size = new vec3(data.size);

    super(data, data);

    this.group.x = this.pos.x - this.size.x * 0.5;
    this.group.y = this.pos.y - this.size.y * 0.5;

    this.view = Door.createView();
    this.view.width = this.size.x;
    this.view.height = this.size.y;
    this.topGroup.add(this.view);
  }

  onOpen(data) {
    this.isOpening = data.time;
  }

  update() {
    super.update();

    this.view.width = this.size.x;
    this.view.height = this.size.y;
    this.view.tilePosition.x = this.size.x - this.baseSize.x;
    this.view.tilePosition.y = this.size.y - this.baseSize.y;
  }
}