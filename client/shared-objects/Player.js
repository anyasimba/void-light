export class Player extends mix(global.Player, MixGameObject) {
  static createView(isSelf) {
    const graphics = new Phaser.Graphics(game, 0, 0);

    if (isSelf) {
      graphics.beginFill(0x0099FF, 0.5);
      graphics.lineStyle(2, 0x0099FF, 1);
    } else {
      graphics.beginFill(0xFF9900, 0.5);
      graphics.lineStyle(2, 0xFF9900, 1);
    }
    graphics.drawCircle(0, 0, this.BODY_SIZE);
    graphics.endFill();

    return graphics;
  }

  constructor(data) {
    super(data, {
      pos: new vec3(data.pos),
      speed: new vec3(data.speed),
      inputMove: new vec3(data.inputMove),

      view: Player.createView(data.id === client.playerID),
    });
    this.group.add(this.view);
  }

  update() {
    super.update();

    this.group.x = this.pos.x;
    this.group.y = this.pos.y;
  }

  onPos(data) {
    this.pos.init(data.pos);
    this.speed.init(data.speed);
    this.inputMove.init(data.inputMove);
  }
}