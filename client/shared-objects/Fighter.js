export class Fighter extends mix(global.Fighter, MixGameObject) {
  static createView(isHost, kind, size) {
    let color = 0xFF4400;
    if (isHost) {
      color = 0xFFFFFF;
    } else if (kind === 'player') {
      color = 0x55FF00;
    }
    const images = [
      new Phaser.Image(game, 0, 0, 'player'),
      new Phaser.Image(game, 0, 0, 'player-back'),
    ];
    for (const k in images) {
      const image = images[k];
      image.scale.x = 0.9;
      image.scale.y = 1;
      image.anchor.x = 0.5;
      image.anchor.y = 0.5;
      image.angle = 90;
      image.tint = color;
      if (!isHost) {
        image.scale.x = 0.8;
        image.scale.y = 0.9;
      }
      image.smoothed = true;

      image.scale.x *= size / 40;
      image.scale.y *= size / 40;
    }
    return images;
  }
  static createDeadView(isHost, kind, size) {
    let color = 0xFF4400;
    if (isHost) {
      color = 0xFFFFFF;
    } else if (kind === 'player') {
      color = 0x55FF00;
    }
    const image = new Phaser.Image(game, 0, 0, 'player-back');
    image.scale.x = 0.9;
    image.scale.y = 1;
    image.anchor.x = 0.5;
    image.anchor.y = 0.5;
    image.angle = 90;
    image.tint = color;
    if (!isHost) {
      image.scale.x = 0.8;
      image.scale.y = 0.9;
    }
    image.smoothed = true;

    image.scale.x *= size / 40;
    image.scale.y *= size / 40;

    return image;
  }

  constructor(data) {
    data.pos = new vec3(data.pos);
    data.speed = new vec3(data.speed);
    data.inputMove = new vec3(data.inputMove);
    data.look = new vec3(data.look);

    super(data, data);

    this.views = Fighter.createView(
      this.id === client.playerID, this.kind, this.size);
    this.group.add(this.views[0]);
    this.group.add(this.views[1]);
    this.views[1].alpha = 0;

    if (this.id === client.playerID) {
      client.player = this;
    }

    this.moveTime = 0;
  }

  playSound(name) {
    if (game.cameraPos) {
      const d = this.pos.subtract(game.cameraPos).length();
      const sound = game.add.sound(name);
      sound.volume = 100000 / (100000 + d * d);
      sound.play();
    }
  }

  onPos(data) {
    this.pos.init(data.pos);
    this.speed.init(data.speed);
    this.inputMove.init(data.inputMove);
    this.look.init(data.look);
  }
  onBreakHit(data) {
    this.needBreakHit = true;
    this.playSound('breakHit');
  }
  onStun(data) {
    this.stunTime = data.time;
  }
  onOtherHit() {
    this.playSound('hit');
  }
  onJump(data) {
    super.onJump(data);
    if (this.kind === 'mob') {
      this.playSound('mobJump');
    } else {
      this.playSound('jump');
    }
  }
  onRoll(data) {
    super.onRoll(data);
    if (this.kind === 'mob') {
      this.playSound('mobJump');
    } else {
      this.playSound('jump');
    }
  }

  onDie() {
    if (this.kind === 'mob') {
      this.playSound('mob1Die');
    }
    const group = new Phaser.Group(game);

    const deadView = Fighter.createDeadView(
      this.id === client.playerID, this.kind, this.size);

    group.add(deadView);

    group.x = this.pos.x;
    group.y = this.pos.y;
    const angle = this.look.toAngle();
    group.angle = angle;
    group.time = 0;
    group.update = () => {
      group.time += dt;
      if (group.time >= 8) {
        group.destroy();
      }
      group.alpha = 1 - group.time / 8;
      group.scale.x = 1 + group.time * 0.2;
      group.scale.y = 1 + group.time * 0.2;
      group.angle = angle + Math.cos(group.time * 0.5) * 40;
    };
    game.level.add(group);
  }

  update() {
    super.update();

    const sideVec = new vec3(this.look.y, -this.look.x, this.look.z).unit();

    this.group.x = this.pos.x + sideVec.x * this.moveShift * 3;
    this.group.y = this.pos.y + sideVec.y * this.moveShift * 3;
    this.group.angle = this.look.toAngle();
    this.group.scale.x = 1;
    this.group.scale.y = 1;
    if (this.inJump) {
      const f = Math.sin(
        (this.inJump.time / this.inJump.duration) * Math.PI) * 0.2;
      this.group.scale.x = 1 + f;
      this.group.scale.y = 1 + f;
    }

    this.views[0].alpha = 1;
    this.views[1].alpha = 0;
    if (this.inRoll) {
      const f = Math.sin(
        (this.inRoll.time / this.inRoll.duration * 2 + 0.5) * Math.PI);
      this.group.scale.x *= f;

      if (f < 0) {
        this.views[0].alpha = 0;
        this.views[1].alpha = 1;
      }
    }

    this.moveTime += this.speed.length() * dt * 0.01;
    this.moveShift = Math.sin(this.moveTime) *
      (this.speed.length() + 100) / (this.speed.length() + 200);
    if (this.inJump || this.inRoll) {
      this.moveShift = 0;
    }
    if (this.kind === 'mob') {
      this.moveTime += this.speed.length() * dt * 0.04;
      this.moveShift *= 2;
    }
  }
}