export class Fighter extends mix(global.Fighter, MixGameObject) {
  static createView(isSelf) {
    const graphics = new Phaser.Graphics(game, 0, 0);

    let color = 0xFF9900;
    if (isSelf) {
      color = 0x0099FF;
    }
    graphics.beginFill(color, 0.5);
    graphics.lineStyle(2, color, 1);
    graphics.drawCircle(0, 0, this.BODY_SIZE);
    graphics.endFill();

    return graphics;
  }

  constructor(data) {
    super(data, {
      pos: new vec3(data.pos),
      speed: new vec3(data.speed),
      inputMove: new vec3(data.inputMove),
      look: new vec3(data.look),
    });

    this.view = Fighter.createView(this.id === client.playerID);
    this.group.add(this.view);

    if (this.id === client.playerID) {
      client.player = this;
    }
  }

  onPos(data) {
    this.pos.init(data.pos);
    this.speed.init(data.speed);
    this.inputMove.init(data.inputMove);
  }

  update() {
    super.update();

    this.group.x = this.pos.x;
    this.group.y = this.pos.y;
  }
}