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
  static createView(isHost, kind, name, size, tints) {
    let orient = Math.floor(Math.random() * 2);
    let scale = 0.25;

    let images;
    if (kind === 'mob') {
      const opts = global[name];
      if (!opts.CAN_MIRROR_VIEW) {
        orient = 0;
      }

      const hitView = makeHSL(hslMap[opts.HIT_VIEW || opts.VIEW],
        0.5, 0.5, [
          multiplyTint(tints[0], 0xFF3300),
          multiplyTint(tints[1], 0xFF3300),
          multiplyTint(tints[2], 0xFF3300),
          multiplyTint(tints[3], 0xFF3300),
        ]);

      const view = makeHSL(hslMap[opts.VIEW], 0.5, 0.5, tints);
      const backView = makeHSL(
        hslMap[opts.BACK_VIEW || opts.VIEW], 0.5, 0.5, tints);

      images = [
        view,
        backView,
        hitView,
      ];
      scale = opts.SCALE || 1;
    } else {
      const hitView = makeHSL(hslMap['player'],
        0.5, 0.5, [
          multiplyTint(tints[0], 0xFF3300),
          multiplyTint(tints[1], 0xFF3300),
          multiplyTint(tints[2], 0xFF3300),
          multiplyTint(tints[3], 0xFF3300),
        ]);
      images = [
        makeHSL(hslMap['player'], 0.5, 0.5, tints),
        makeHSL(hslMap['player-back'], 0.5, 0.5, tints),
        hitView,
      ];
    }
    let ID = '';
    if (kind === 'player') {
      ID = 'player';
    } else {
      ID = name;
    }

    for (const k in images) {
      let image = images[k];
      image.scale.set(scale);
      image.angle = 90;
      if (orient) {
        image.scale.x = -image.scale.x;
      }
    }
    return [images, orient];
  }
  static createDeadView(isHost, kind, name, size, orient, tints) {
    let images;
    let scale = 0.25;
    if (kind === 'mob') {
      const opts = global[name];
      scale = opts.SCALE || 1;

      const view = makeHSL(hslMap[opts.VIEW], 0.5, 0.5, tints);
      const deadView = makeHSL(
        hslMap[opts.DEAD_VIEW || opts.VIEW], 0.5, 0.5, tints);

      images = [
        view,
        deadView,
      ];
    } else {
      images = [
        makeHSL(hslMap['player'], 0.5, 0.5, tints),
        makeHSL(hslMap['player-back'], 0.5, 0.5, tints),
      ]
    }
    let ID = '';
    if (kind === 'player') {
      ID = 'player';
    } else {
      ID = name;
    }
    for (const k in images) {
      let image = images[k];
      image.scale.set(scale);
      image.angle = 90;
      if (orient) {
        image.scale.x = -image.scale.x;
      }
      image.smoothed = true;
    }

    return images;
  }
  static createFootView(isHost, kind, name, size, tints) {
    if (kind === 'mob') {
      const opts = global[name];
      if (!opts.LEFT_FOOT_VIEW) {
        return;
      }
      let views = [];
      //
      const prepare = (image) => {
        image.angle = 90;
        image.smoothed = true;
      }; {
        const view = makeHSL(hslMap[opts.LEFT_FOOT_VIEW],
          0.5, 0.5, tints);
        prepare(view);
        views.push(view);
      } {
        const view = makeHSL(hslMap[opts.RIGHT_FOOT_VIEW], 0.5, 0.5, tints);
        prepare(view);
        views.push(view);
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

    this.angle = 0;


    this.tints = [0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF];
    if (this.kind === 'mob') {
      const opts = global[this.name];

      if (opts.LIGHT) {
        this.light = genLight();
        this.light.tint = opts.LIGHT;
        this.light.scale.set(opts.LIGHT_SCALE * this.light.f);
        this.light.alpha *= opts.LIGHT_A;
        for (let i = 0; i < opts.LIGHT_I - 1; ++i) {
          this.light.rt.renderXY(this.light.rtImage, 0, 0, false);
        }
      }

      let tint = opts.TINT;
      if (opts.TINT === undefined) {
        tint = 0xFFFFFF;
      }
      if (opts.GRAY_TINT === undefined) {
        this.tints[0] = tint;
      } else {
        this.tints[0] = opts.GRAY_TINT;
      }
      if (opts.COLOR_TINT === undefined) {
        this.tints[1] = tint;
      } else {
        this.tints[1] = opts.COLOR_TINT;
      }
      if (opts.AMBIENT_TINT === undefined) {
        this.tints[2] = tint;
      } else {
        this.tints[2] = opts.AMBIENT_TINT;
      }
      if (opts.SPECIAL_TINT === undefined) {
        this.tints[3] = tint;
      } else {
        this.tints[3] = opts.SPECIAL_TINT;
      }
    } else {
      this.light = genLight();
      this.light.scale.set(12 * this.light.f);
      for (let i = 0; i < 1; ++i) {
        this.light.rt.renderXY(this.light.rtImage, 0, 0, false);
      }

      if (this.id !== client.playerID) {
        this.tints[0] = 0x88FF33;
        this.tints[1] = 0x88FF33;
        this.tints[2] = 0x88FF33;
        this.tints[3] = 0x88FF33;
        this.light.tint = 0x88FF33;
      }
    }

    this.viewsForTint = [];

    [this.views, this.orient] = Fighter.createView(
      this.id === client.playerID,
      this.kind, this.name, this.size, this.tints);
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
      this.id === client.playerID,
      this.kind, this.name, this.size, this.tints);
    if (this.footViews) {
      this.footViewsRoot = new Phaser.Group(game);
      this.bottomGroup.add(this.footViewsRoot);
      this.footViewsRoot.add(this.footViews[0]);
      this.footViewsRoot.add(this.footViews[1]);
      this.viewsForTint.push(this.footViews[0]);
      this.viewsForTint.push(this.footViews[1]);
    }

    if (this.kind === 'mob' || this.id !== client.playerID) {
      const opts = global[this.name];

      const barGroup = new Phaser.Group(game);
      this.infoGroup.add(barGroup);
      const bar = Fighter.createBar(
        this.lang, 0xFF3300, -125, -100, 250, 10, (inner) => {
          inner.scale.x = this.hp / this.HP;
        });
      barGroup.add(bar[1]);
      barGroup.add(bar[0]);
      barGroup.add(bar[2]);
    }

    if (this.id === client.playerID) {
      client.player = this;
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
    this.absLook = data.absLook;
    this.inRun = data.inRun;
    this.inBlock = data.inBlock;
    this.groundFriction = data.groundFriction;
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
    this.hitType = data.hitType;

    this.clearSteps();
    global[this.kind + '__doHit'].call(this);
  }
  onBreakHit(data) {
    if (data.block) {
      this.playSound('block');
    }
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
    this.stunDelay = data.delay;
    console.log(data);
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
      this.tints[0] = 0xFF8811;
      this.tints[1] = 0xFF8811;
      this.tints[2] = 0xFF8811;
      this.tints[3] = 0xFF8811;
      for (const k in this.viewsForTint) {
        const v = this.viewsForTint[k];
        changeHSL(v, this.tints);
      }
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
      }
    }

    const group = new Phaser.Group(game);

    const deadViews = Fighter.createDeadView(
      this.id === client.playerID,
      this.kind, this.name,
      this.size,
      this.orient,
      this.tints);

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
    this.group.angle = this.angle + this.look.toAngle();
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
    this.rollSX = 1;
    this.rollSY = 1;
    if (this.inRoll) {
      const f = Math.sin(
        (this.inRoll.time / this.inRoll.duration * 2 + 0.5) * Math.PI);
      if (this.inHit && !this.inJump) {
        this.group.scale.y *= f;
        this.rollSY = f;
      } else {
        this.group.scale.x *= f;
        this.rollSX = f;
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

    if (game.layer.sub.light && this.light) {
      const light = game.layer.sub.light;
      const lx = 0; //game.w * 0.5;
      const ly = 0; //game.h * 0.5;
      const x = (this.pos.x - game.ui.x + lx) / light.scale.x;
      const y = (this.pos.y - game.ui.y + ly) / light.scale.y;
      light.texture.renderXY(this.light, x, y, false);
    }
  }

  checkBlock(opts) {}
  doDamageRadialArea(opts) {
    if (!this.hitVec) {
      return;
    }

    let color = 0x444444;
    if (this.hitType === 0) {
      color = 0x607040;
    } else if (this.hitType === 1) {
      color = 0x604070;
    } else if (this.hitType === 2) {
      color = 0x406070;
    } else if (this.hitType === 3) {
      color = 0xFF0000;
    }

    if (opts.hand === 2) {
      opts.d -= this.weapon2.pos.length();
      opts.d *= this.scale * (this.weapon2.bodyScale || 1);
      opts.d += this.weapon2.pos.length() * this.scale;
    } else {
      opts.d -= this.weapon.pos.length();
      opts.d *= this.scale * (this.weapon.bodyScale || 1);
      opts.d += this.weapon.pos.length() * this.scale;
    }

    const da = (opts.da || 0) * Math.PI / 180.0;
    const hitP = new vec3(
      Math.cos(da) * this.rollSX,
      Math.sin(da) * this.rollSY
    );
    const d = opts.d * hitP.length();

    opts.a *= Math.PI / 180.0;
    let af = (Math.abs(this.rollSY) - 1) * Math.abs(Math.cos(da)) + 1;
    if (this.rollSX !== 1) {
      af = (Math.abs(this.rollSX) - 1) * Math.abs(Math.sin(da)) + 1;
    }
    const a1 = opts.a * af;
    const a2 = -opts.a * af;

    for (let i = 0; i < 2; ++i) {
      const g = new Phaser.Graphics(game, this.pos.x, this.pos.y);
      g.blendMode = PIXI.blendModes.ADD;
      g.lineStyle(4, color, 0.03);
      g.beginFill(color, 0.2);
      if (i === 1) {
        g.blendMode = PIXI.blendModes.MULTIPLY;
        g.lineStyle(4, color, 0.05);
        g.beginFill(color, 0.3);
      }

      g.arc(0, 0, d, a1, a2, true);

      g.angle = this.hitVec.toAngle() + hitP.toAngle();
      g.update = () => {
        g.alpha -= dt * 1.5;
        if (g.alpha <= 0.0) {
          g.destroy();
        }
      };
      game.layer.sub.bottom.add(g);
    }
  }
}