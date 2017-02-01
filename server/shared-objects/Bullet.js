export class Bullet extends mix(global.Bullet, MixGameObject) {
  constructor(player, data) {
    super(Object.assign({
      player,
    }, data));
  }

  get state() {
    return {
      'pos': this.pos,
      'speed': this.speed,
    };
  }
  emitPos() {
    this.emitAll('pos', {
      'pos': this.pos,
      'speed': this.speed,
    });
  }

  update() {
    super.update();

    const isOutOfRange =
      this.pos.x < -200 ||
      this.pos.x > 1480 ||
      this.pos.y < -200 ||
      this.pos.y > 920;
    if (isOutOfRange) {
      return this.destructor();
    }

    const contactSize = Player.BODY_SIZE * 0.5 + Bullet.BODY_SIZE;

    const players = this.players;
    for (const player of players) {
      if (this.player !== player) {
        const dx = this.pos.x - player.pos.x;
        const dy = this.pos.y - player.pos.y;
        const d = Math.pow((dx * dx + dy * dy), 0.5);
        if (d < contactSize) {
          const x = dx / d;
          const y = dy / d;
          const rd = contactSize - d;
          const v = new vec3(rd * x, rd * y);
          vec3.add(this.pos, v);
          vec3.subtract(player.pos, v);

          vec3.unit(v);
          const force = this.speed.length() + player.speed.length();
          vec3.add(this.speed, v.multiply(force * 0.5));
          vec3.subtract(player.speed, v.multiply(force * 0.5));

          this.emitPos();
          player.emitPos();
        }
      }
    }
  }
}