preMain(async() => {
  Player.list = [];
});

export class Player extends mix(global.Player, MixGameObject) {
  get state() {
    return {
      pos: this.pos,
      speed: this.speed,
      inputMove: this.inputMove,
      look: this.look,
    };
  }
  emitPos() {
    this.emitAll('pos', {
      pos: this.pos,
      speed: this.speed,
      inputMove: this.inputMove,
    });
  }

  constructor(client) {
    super({
      client,

      pos: new vec3,
      speed: new vec3,
      inputMove: new vec3,
      look: new vec3,
    });

    this.body = {
      kind: 'circle',
      size: Player.BODY_SIZE,
    }

    new Sword({
      parent: this,
      pos: {
        x: -20,
        y: 20,
      },
      angle: 10,
    });
  }

  doHit(data) {
    this.onHit(data);
    this.emitAll('hit', {
      x: data.x,
      y: data.y,
    });
  }

  doDamageRadialArea(opts) {
    opts.hitVec = this.hitVec;

    const hitAngle = this.hitVec.toAngle();
    opts.a1 += hitAngle;
    opts.a2 += hitAngle;

    if (this.gameLevelZone) {
      this.gameLevelZone.doDamageRadialArea(this, opts);
    }
  }
}