export class Fighter extends mix(global.Fighter, MixGameObject) {
  static createView(isHost, kind, size) {
    const orient = Math.floor(Math.random() * 2);

    let color = 0xFFFFFF;
    if (isHost) {
      color = 0xFFFFFF;
    } else if (kind === 'player') {
      color = 0x55FF00;
    }
    let images;
    if (kind === 'mob') {
      images = [
        new Phaser.Image(game, 0, 0, 'stage1__mob1'),
        new Phaser.Image(game, 0, 0, 'stage1__mob1--back'),
      ];
    } else {
      images = [
        new Phaser.Image(game, 0, 0, 'player'),
        new Phaser.Image(game, 0, 0, 'player-back'),
      ];
    }
    for (const k in images) {
      const image = images[k];
      image.anchor.x = 0.5;
      image.anchor.y = 0.5;
      image.angle = 90;
      image.tint = color;
      if (orient) {
        image.scale.x = -1;
      }
      image.smoothed = true;
    }
    return images;
  }
  static createDeadView(isHost, kind, size) {
    let color = 0xFFFFFF;
    if (isHost) {
      color = 0xFFFFFF;
    } else if (kind === 'player') {
      color = 0x55FF00;
    }
    let images;
    if (kind === 'mob') {
      images = [
        new Phaser.Image(game, 0, 0, 'stage1__mob1'),
        new Phaser.Image(game, 0, 0, 'stage1__mob1--dead'),
      ];
    } else {
      images = [
        new Phaser.Image(game, 0, 0, 'player'),
        new Phaser.Image(game, 0, 0, 'player-back'),
      ]
    }
    for (const k in images) {
      const image = images[k];
      image.anchor.x = 0.5;
      image.anchor.y = 0.5;
      image.angle = 90;
      image.tint = color;
      image.smoothed = true;
    }

    return images;
  }
  static createFootView(isHost, kind, size) {
    if (kind === 'mob') {
      let views = [];
      //
      {
        const image = new Phaser.Image(game, 0, 0, 'stage1__mob1--foot');
        image.mirror = true;
        image.anchor.x = 0.5;
        image.anchor.y = 0.5;
        image.angle = 90;
        image.smoothed = true;
        views.push(image);
      } {
        const image = new Phaser.Image(game, 0, 0, 'stage1__mob1--foot');
        image.anchor.x = 0.5;
        image.anchor.y = 0.5;
        image.angle = 90;
        image.smoothed = true;
        views.push(image);
      }

      return views;
    }
  }

  constructor(data) {
    data.pos = new vec3(data.pos);
    data.speed = new vec3(data.speed);
    data.inputMove = new vec3(data.inputMove);
    data.look = new vec3(data.look);

    super(data, data);

    this.views = Fighter.createView(
      this.id === client.playerID, this.kind, this.size);
    this.views[1].alpha = 0;
    if (this.kind === 'player') {
      this.middleGroup.add(this.views[0]);
    } else {
      this.topGroup.add(this.views[0]);
    }
    this.bottomGroup.add(this.views[1]);

    this.footViews = Fighter.createFootView(
      this.id === client.playerID, this.kind, this.size);
    if (this.footViews) {
      this.footViewsRoot = new Phaser.Group(game);
      this.bottomGroup.add(this.footViewsRoot);
      this.footViewsRoot.add(this.footViews[0]);
      this.footViewsRoot.add(this.footViews[1]);
    }

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

  playHit() {
    const variant = Math.floor(Math.random() * 5) + 1;
    this.playSound('hit' + variant)
  }

  onPos(data) {
    this.pos.init(data.pos);
    this.speed.init(data.speed);
    this.inputMove.init(data.inputMove);
    this.look.init(data.look);
    this.absLook = data.absLook;
  }
  onParams(data) {
    Object.assign(this, data);
  }
  onHit(data) {
    this.inHit = true;
    delete this.isCanNextHit;
    this.isRollHit = data.isRollHit;
    this.isJumpHit = data.isJumpHit;
    this.hitVec = new vec3(data.hitVec);
    this.hitStage = data.hitStage;

    if (this.hitStage === 1) {
      const hands = this.hands;
      for (const k in hands) {
        const hand = hands[k];
        hand.reborn();
      }
    }

    this.clearSteps();
    global[this.kind + '__doHit'].call(this);
  }
  onBreakHit(data) {
    this.clearSteps();
    this.finishHit();
  }
  onStun(data) {
    this.clearSteps();
    this.finishHit();
    this.stunTime = data.time;
  }
  onOtherHit(data) {
    if (data.inBlock) {
      this.playSound('block');
    } else {
      this.playSound('hit');
    }
    if (data.damage > 0) {
      this.afterHitTime = 0.5;

      const damageView = new Phaser.Text(
        game, this.pos.x, this.pos.y, '-' + data.damage, {
          fontSize: 40,
          fill: '#FF2200',
          stroke: '#222222',
          strokeThickness: 5,
        });
      damageView.update = () => {
        damageView.y -= dt * 4;
        damageView.time = damageView.time || 0;
        damageView.time += dt;
        if (damageView.time > 1) {
          damageView.alpha -= dt;
          if (damageView.alpha <= 0) {
            damageView.destroy();
          }
        }
      };
      game.texts.add(damageView);
    }
  }
  onUseStamina(data) {
    this.stamina = data.stamina;
    this.staminaTime = data.time;
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
    this.clearSteps();

    if (this.kind === 'mob') {
      this.playSound('mob1Die');
    }

    const group = new Phaser.Group(game);

    const deadViews = Fighter.createDeadView(
      this.id === client.playerID, this.kind, this.size);

    group.add(deadViews[1]);
    group.add(deadViews[0]);

    group.x = this.pos.x;
    group.y = this.pos.y;
    const angle = this.look.toAngle();
    group.angle = angle;
    group.time = 0;
    group.update = () => {
      group.time += dt;
      if (group.time >= 60) {
        group.destroy();
      }
      if (group.time <= 1) {
        deadViews[0].alpha = 1 - group.time;
      } else {
        deadViews[0].visible = false;
      }
      group.alpha = 1 - group.time / 60;
    };
    game.deads.add(group);
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
      this.moveTime += this.speed.length() * dt * 0.01;
      this.moveShift *= 2;
    }

    if (this.inStun) {
      const f = 3;
      this.group.x += Math.cos(this.stunTime * f) * 5;
      this.group.y += Math.sin(this.stunTime * f) * 5;
      this.group.angle += Math.cos(this.stunTime * f * 1.3) * 10;
    }

    if (this.footViews) {
      this.footSpeed = this.footSpeed || this.speed.clone();
      vec3.add(
        this.footSpeed,
        this.speed
        .subtract(this.footSpeed)
        .multiply(1 - Math.pow(0.95, dt)))
      if (this.speed.length() > 10 && this.footSpeed.length() > 2) {
        const l = 200;
        let footTime = this.moveTime * 100 / l * 0.5;

        let sign = Math.sign((footTime % 2) - 1);
        let step = footTime % 1;
        this.footViewsRoot.angle = this.footSpeed.toAngle() - this.look.toAngle();

        if (!isAngleInRange(this.footViewsRoot.angle, -90, 90)) {
          sign = -sign;
          step = 1 - step;
          this.footViewsRoot.angle += 180;
        }
        const scaleStep =
          1 - Math.abs(Math.sin((step - 0.5) * Math.PI));
        const hf = 0.3;
        this.footViews[0].x = (0.5 - step) * l * sign;
        this.footViews[0].y = -60;
        this.footViews[0].scale.x =
          1 + scaleStep * hf * -Math.sign(sign - 1);
        this.footViews[0].scale.y =
          1 + scaleStep * hf * -Math.sign(sign - 1);

        this.footViews[1].x = (step - 0.5) * l * sign;
        this.footViews[1].y = 60;
        this.footViews[1].scale.x =
          1 + scaleStep * hf * Math.sign(sign + 1);
        this.footViews[1].scale.y =
          1 + scaleStep * hf * Math.sign(sign + 1);
      } else {
        this.footViews[0].x = 10;
        this.footViews[0].y = -60;
        this.footViews[0].scale.x = 1;
        this.footViews[0].scale.y = 1;

        this.footViews[1].x = -10;
        this.footViews[1].y = 60;
        this.footViews[1].scale.x = 1;
        this.footViews[1].scale.y = 1;
      }
      if (this.footViews[0].mirror) {
        this.footViews[0].scale.x = -this.footViews[0].scale.x;
      }
    }

    if (this.afterHitTime) {
      this.afterHitTime -= dt;
      const f = 1 - this.afterHitTime * 2;
      this.group.tint = RGBtoHEX(255, 255 * (f * 0.8 + 0.2), 255 * f);
      if (this.afterHitTime <= 0) {
        delete this.afterHitTime;
        this.group.tint = 0xFFFFFF;
      }
    } else {
      this.group.tint = 0xFFFFFF;
    }
  }
}