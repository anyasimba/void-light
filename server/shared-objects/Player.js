preMain(async() => {
  Player.list = [];
});

export class Player extends mix(global.Player, MixGameObject) {
  get state() {
    return {
      pos: this.pos,
      speed: this.speed,
      inputMove: this.inputMove,
    };
  }
  emitPos() {
    this.emitAll('pos', {
      pos: this.pos,
      speed: this.speed,
      inputMove: this.inputMove,
    });
  }

  constructor(client, gameLevelZone) {
    super({
      gameLevelZone,
      pos: new vec3,
      speed: new vec3,
      inputMove: new vec3,
    });

    const players = this.players;
    players.push(this);

    this.client = client;

    this.emit('playerID', {
      playerID: this.id,
    });

    const objects = this.objects;
    for (const id in objects) {
      const object = objects[id];
      const state = object.state;
      this.emit('new', Object.assign({
        class: object.constructor.classID,
        id: object.id,
      }, state));

      if (object.childrenCount > 0) {
        for (const id in object.children) {
          const subObject = object.children[id];
          const state = subObject.state;
          this.emit('new', Object.assign({
            class: subObject.constructor.classID,
            id: subObject.id,
            parentID: subObject.parent.id,
          }, state));
        }
      }
    }

    this.sword = new Sword(this, {
      pos: {
        x: -20,
        y: 20,
      },
      angle: 10,
    });
  }
  destructor() {
    const list = this.players;
    list.splice(list.indexOf(this), 1);

    super.destructor();
  }

  emit(...args) {
    if (this.client) {
      this.client.emit(...args);
    }
  }

  update() {
    super.update();

    const size = this.constructor.BODY_SIZE;

    const players = this.players;
    for (const player of players) {
      if (this !== player) {
        const dx = this.pos.x - player.pos.x;
        const dy = this.pos.y - player.pos.y;
        const d = Math.pow((dx * dx + dy * dy), 0.5);
        if (d < size) {
          const x = dx / d;
          const y = dy / d;
          const rd = size - d;
          const v = new vec3(rd * x, rd * y);
          vec3.add(this.pos, v);
          vec3.subtract(player.pos, v);

          vec3.unit(v);
          const force = this.speed.length() + player.speed.length();
          const imp = 2;
          vec3.add(this.speed, v.multiply(force * imp));
          vec3.subtract(player.speed, v.multiply(force * imp));

          this.emitPos();
          player.emitPos();
        }
      }
    }

    if (this.pos.x < size * 0.5) {
      this.pos.x = size * 0.5;
      this.speed.x = Math.abs(this.speed.x);
      this.emitPos();
    }
    if (this.pos.x > 1280 - size * 0.5) {
      this.pos.x = 1280 - size * 0.5;
      this.speed.x = -Math.abs(this.speed.x);
      this.emitPos();
    }
    if (this.pos.y < size * 0.5) {
      this.pos.y = size * 0.5;
      this.speed.y = Math.abs(this.speed.y);
      this.emitPos();
    }
    if (this.pos.y > 720 - size * 0.5) {
      this.pos.y = 720 - size * 0.5;
      this.speed.y = -Math.abs(this.speed.y);
      this.emitPos();
    }
  }
}