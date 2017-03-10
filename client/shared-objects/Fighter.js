export class Fighter extends mix(global.Fighter, MixGameObject) {
  static createBar(lang, innerColor, x, y, w, h, update) {
    const outer = new Phaser.Graphics(game, x, y);
    outer.beginFill(0x000000, 0);
    outer.lineStyle(3, innerColor, 0.8);
    outer.drawRect(0, 0, w, h);
    outer.endFill();

    const inner = new Phaser.Graphics(game, x, y);
    inner.beginFill(innerColor, 0.5);
    inner.lineStyle(0, 0x000000, 0);
    inner.drawRect(0, 0, w, h);
    inner.endFill();
    inner.update = () => {
      update(inner);
    };

    const text = new Phaser.Text(
      game, 0, 0, lang, {
        font: 'Neucha',
        fontSize: 34,
        fontWeight: 'bold',
        fill: '#CCCCCC',
        stroke: '#050505',
        strokeThickness: 6,
        boundsAlignH: 'center',
      });
    text.setTextBounds(x, y - 50, w, 20);

    return [outer, inner, text];
  }
  static createView(isHost, kind, name, size) {
    let orient = Math.floor(Math.random() * 2);

    let images;
    if (kind === 'mob') {
      const opts = global[name];
      if (!opts.CAN_MIRROR_VIEW) {
        orient = 0;
      }
      const hitView = new Phaser.Image(game, 0, 0, opts.HIT_VIEW || opts.VIEW);
      hitView.tint = 0xFF3300;
      images = [
        new Phaser.Image(game, 0, 0, opts.VIEW),
        new Phaser.Image(game, 0, 0, opts.BACK_VIEW),
        hitView,
      ];
    } else {
      const hitView = new Phaser.Image(game, 0, 0, 'player');
      hitView.tint = 0xFF3300;
      images = [
        new Phaser.Image(game, 0, 0, 'player'),
        new Phaser.Image(game, 0, 0, 'player-back'),
        hitView,
      ];
    }
    for (const k in images) {
      const image = images[k];
      image.anchor.x = 0.5;
      image.anchor.y = 0.5;
      image.angle = 90;
      if (orient) {
        image.scale.x = -1;
      }
      image.smoothed = true;
    }
    return [images, orient];
  }
  static createDeadView(isHost, kind, name, size, orient, tint) {
    let images;
    if (kind === 'mob') {
      const opts = global[name];
      images = [
        new Phaser.Image(game, 0, 0, opts.VIEW),
        new Phaser.Image(game, 0, 0, opts.DEAD_VIEW),
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
      image.tint = tint;
      if (orient) {
        image.scale.x = -1;
      }
      image.smoothed = true;
    }

    return images;
  }
  static createFootView(isHost, kind, name, size) {
    if (kind === 'mob') {
      const opts = global[name];
      if (!opts.LEFT_FOOT_VIEW) {
        return;
      }
      let views = [];
      //
      {
        const image = new Phaser.Image(game, 0, 0, opts.LEFT_FOOT_VIEW);
        image.mirror = true;
        image.anchor.x = 0.5;
        image.anchor.y = 0.5;
        image.angle = 90;
        image.smoothed = true;
        views.push(image);
      } {
        const image = new Phaser.Image(game, 0, 0, opts.RIGHT_FOOT_VIEW);
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

    this.viewsForTint = [];

    [this.views, this.orient] = Fighter.createView(
      this.id === client.playerID, this.kind, this.name, this.size);
    this.views[1].visible = false;
    this.views[2].visible = false;
    if (this.kind === 'player') {
      this.middleGroup.add(this.views[0]);
      this.middleGroup.add(this.views[2]);
    } else {
      this.topGroup.add(this.views[0]);
      this.topGroup.add(this.views[2]);
    }
    this.bottomGroup.add(this.views[1]);
    this.viewsForTint.push(this.views[0]);
    this.viewsForTint.push(this.views[1]);
    this.viewsForTint.push(this.views[2]);

    this.footViews = Fighter.createFootView(
      this.id === client.playerID, this.kind, this.name, this.size);
    if (this.footViews) {
      this.footViewsRoot = new Phaser.Group(game);
      this.bottomGroup.add(this.footViewsRoot);
      this.footViewsRoot.add(this.footViews[0]);
      this.footViewsRoot.add(this.footViews[1]);
      this.viewsForTint.push(this.footViews[0]);
      this.viewsForTint.push(this.footViews[1]);
    }

    this.baseTint = 0xFFFFFF;
    if (this.kind === 'mob') {
      const opts = global[this.name];
      this.baseTint = opts.TINT || 0xFFFFFF;

      const barGroup = new Phaser.Group(game);
      this.infoGroup.add(barGroup);
      const bar = Fighter.createBar(
        this.lang, 0xFF3300, -125, -100, 250, 10, (inner) => {
          inner.scale.x = this.hp / this.HP;
        });
      barGroup.add(bar[1]);
      barGroup.add(bar[0]);
      barGroup.add(bar[2]);
    } else {
      if (this.id !== client.playerID) {
        this.baseTint = 0x88FF33;

        const barGroup = new Phaser.Group(game);
        this.infoGroup.add(barGroup);
        const bar = Fighter.createBar(
          this.name, 0xFF3300, -125, -100, 250, 10, (inner) => {
            inner.scale.x = this.hp / this.HP;
          });
        barGroup.add(bar[1]);
        barGroup.add(bar[0]);
        barGroup.add(bar[2]);
      }
    }

    this.color = HEXtoRGB(this.baseTint);
    this.group.tint = this.baseTint;

    for (const k in this.viewsForTint) {
      const v = this.viewsForTint[k];
      const rgb = HEXtoRGB(v.tint || 0xFFFFFF);
      rgb.r = Math.floor(rgb.r * this.color.r / 255);
      rgb.g = Math.floor(rgb.g * this.color.g / 255);
      rgb.b = Math.floor(rgb.b * this.color.b / 255);
      v.tint = RGBtoHEX(rgb.r, rgb.g, rgb.b);
    }

    if (this.id === client.playerID) {
      client.player = this;

      makeSuperMessage('все будет напрасно', '#2299FF');
    }

    this.moveTime = 0;
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
    this.isRun = data.isRun;
    this.isBlock = data.isBlock;
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
        if (hand) {
          hand.reborn();
        }
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
    if (this.waitTime) {
      delete this.waitTime;
      delete this.inWait;
    }
    this.clearSteps();
    this.finishHit();
    this.stunTime = data.time;
  }
  onWait(data) {
    if (this.stunTime) {
      delete this.stunTime;
      delete this.inStun;
    }
    this.clearSteps();
    this.finishHit();
    this.waitTime = data.time;
  }
  onOtherHit(data) {
    if (data.inBlock) {
      this.playSound('block');
    } else {
      this.playSound('hit');
    }
    if (data.damage > 0 && this.kind !== 'player') {
      this.afterHitTime = 0.5;

      const damageView = new Phaser.Text(
        game, this.pos.x, this.pos.y, data.damage, {
          font: 'Neucha',
          fontWeight: 'bold',
          fontSize: 45,
          fill: '#FF2200',
          stroke: '#050505',
          strokeThickness: 8,
        });
      damageView.alpha = 0.7;
      damageView.update = () => {
        damageView.y -= dt * 4;
        damageView.time = damageView.time || 0;
        damageView.time += dt;
        if (damageView.time > 1) {
          damageView.alpha -= dt * 0.5;
          if (damageView.alpha <= 0) {
            damageView.destroy();
          }
        }
      };
      game.texts.add(damageView);
    }
  }
  onUseHP(data) {
    this.hp = data.hp;
    this.hpTime = data.time;
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

  onInvade(data) {
    this.invade = true;
    if (this.id !== client.playerID) {
      makeSuperMessage('ВТОРЖЕНИЕ', '#FF7700');
      this.baseTint = 0xFF8811;
      this.color = HEXtoRGB(this.baseTint);
      this.group.tint = this.baseTint;
      for (const k in this.viewsForTint) {
        const v = this.viewsForTint[k];
        v.tint = this.baseTint;
      }
      this.weapon.view.tint = 0xFF7700;
      this.shield.view.tint = 0xFF7700;
    } else {
      makeSuperMessage('ВЫ ВТОРГАЕТЕСЬ', '#FF7700');
    }
  }

  onEffects(data) {
    this.effects = data.effects;
  }

  onDie() {
    this.speed.init();
    this.inputMove.init();
    delete this.stunTime;
    delete this.waitTime;

    this.clearSteps();

    if (this.kind === 'mob') {
      this.playSound('mob1Die');
    }
    if (this.id === client.playerID) {
      client.diedTheme();
      makeSuperMessage('ВЫ ПОГИБЛИ', '#991100');
    } else if (this.kind === 'player') {
      if (this.invade) {
        makeSuperMessage('ВТОРЖЕНИЕ ЗАВЕРШЕНО', '#991100');
      } else if (client.player.invade) {
        makeSuperMessage('ВТОРЖЕНИЕ ЗАВЕРШЕНО', '#991100');
      } else {
        makeSuperMessage('СОЮЗНИК ПОГИБ', '#991100');
      }
    }

    const group = new Phaser.Group(game);

    const deadViews = Fighter.createDeadView(
      this.id === client.playerID,
      this.kind, this.name,
      this.size,
      this.orient,
      this.baseTint);

    group.add(deadViews[1]);
    group.add(deadViews[0]);

    group.x = this.pos.x;
    group.y = this.pos.y;
    const angle = this.look.toAngle();
    group.angle = angle;
    group.time = 0;
    group.scale.x = this.scale;
    group.scale.y = this.scale;
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
    game.layer.sub.deads.add(group);

    if (this.kind === 'player' && this.id !== client.playerID) {
      this.baseTint = 0x88FF33;
      this.color = HEXtoRGB(this.baseTint);
      this.group.tint = this.baseTint;
      this.weapon.view.tint = 0x55FF00;
      this.shield.view.tint = 0x55FF00;
    }
  }

  update() {
    const sideVec = new vec3(this.look.y, -this.look.x, this.look.z).unit();

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

    this.group.x = this.pos.x + sideVec.x * this.moveShift * 3;
    this.group.y = this.pos.y + sideVec.y * this.moveShift * 3;
    this.group.angle = this.look.toAngle();
    this.group.scale.x = this.scale;
    this.group.scale.y = this.scale;

    super.update();

    if (!this.visible) {
      return;
    }

    if (this.inJump) {
      const f = Math.sin(
        (this.inJump.time / this.inJump.duration) * Math.PI) * 0.2;
      this.group.scale.x = this.scale * (1 + f);
      this.group.scale.y = this.scale * (1 + f);
    }

    this.views[0].visible = true;
    this.views[1].visible = false;
    if (this.inRoll) {
      const f = Math.sin(
        (this.inRoll.time / this.inRoll.duration * 2 + 0.5) * Math.PI);
      if (this.inHit || this.inJump) {
        this.group.scale.y *= f;
      } else {
        this.group.scale.x *= f;
      }

      if (f < 0) {
        this.views[0].visible = false;
        this.views[1].visible = true;
      }
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
        let footTime = this.moveTime * 100 / l * 0.5 / this.scale;

        let sign = Math.sign((footTime % 2) - 1);
        let step = footTime % 1;
        this.footViewsRoot.angle = this.speed.toAngle() - this.look.toAngle();

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

      this.views[2].visible = true;
      this.views[2].alpha = this.afterHitTime * 2;

      if (this.afterHitTime <= 0) {
        delete this.afterHitTime;
        this.views[2].visible = false;
      }
    }

    if (game.layer.sub.light) {
      const light = game.layer.sub.light;
      if (!this.light) {
        const rt = new Phaser.RenderTexture(
          game, 128, 128, null, null, 1);
        const image = new Phaser.Image(game, 0, 0, 'light');
        image.blendMode = PIXI.blendModes.ADD;
        rt.renderXY(image, 0, 0, true);
        rt.renderXY(image, 0, 0, false);
        rt.renderXY(image, 0, 0, false);
        this.light = new Phaser.Image(game, 0, 0, rt);
        if (this.kind === 'player' && client.playerID === this.id) {
          this.light.scale.set(0.8);
          this.light.alpha = 0.6;
        } else {
          this.light.scale.set(1.2);
          this.light.alpha = 0.5;
        }
        this.light.tint = this.baseTint;
        this.light.blendMode = PIXI.blendModes.ADD;
        this.light.anchor.set(0.5);
        this.light.alpha *= lightAlpha;
      }
      const x = (this.pos.x - game.ui.x) / light.scale.x;
      const y = (this.pos.y - game.ui.y) / light.scale.y;
      light.texture.renderXY(this.light, x, y, false);
    }
  }
}