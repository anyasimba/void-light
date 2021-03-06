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
  static createBodyView(isHost, kind, name, size, tints) {
    let orient = Math.floor(Math.random() * 2);
    let scale = 0.3;

    let image;
    if (kind === 'mob') {
      const opts = global[name];
      if (!opts.CAN_MIRROR_VIEW) {
        orient = 0;
      }
      if (!opts.BODY_VIEW) {
        return;
      }

      image = makeHSL(hslMap[opts.BODY_VIEW], 0.5, 0.5, tints);
      scale = opts.SCALE || 1;
    } else {
      image = makeHSL(hslMap['player-body'], 0.5, 0.5, tints);
    }

    image.scale.set(scale);
    image.angle = 90;
    if (orient) {
      image.scale.x = -image.scale.x;
    }
    return image;
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
  static createHandsView(isHost, kind, name, size, tints) {
    if (kind === 'mob') {
      const opts = global[name];
      if (!opts.HAND) {
        return;
      }
      let views = [];
      //
      const prepare = (image) => {
        image.angle = 90;
        image.smoothed = true;
        image.scaleF = opts.SCALE || 1;
      }; {
        const view = makeHSL(hslMap[opts.HAND], 0.5, 0.5, tints);
        prepare(view);
        views.push(view);
      } {
        const view = makeHSL(hslMap[opts.HAND], 0.5, 0.5, tints);
        prepare(view);
        views.push(view);
      }

      return views;
    } else {
      let views = [];
      //
      const prepare = (image) => {
        image.angle = 90;
        image.smoothed = true;
        image.scaleF = 0.25;
      }; {
        const view = makeHSL(hslMap['player-hand'], 0.5, 0.5, tints);
        prepare(view);
        views.push(view);
      } {
        const view = makeHSL(hslMap['player-hand'], 0.5, 0.5, tints);
        prepare(view);
        views.push(view);
      }

      return views;
    }
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
        image.scaleF = opts.SCALE || 1;
      }; {
        const view = makeHSL(hslMap[opts.LEFT_FOOT_VIEW], 0.5, 0.5, tints);
        prepare(view);
        views.push(view);
      } {
        const view = makeHSL(hslMap[opts.RIGHT_FOOT_VIEW], 0.5, 0.5, tints);
        prepare(view);
        views.push(view);
      }
      if (opts.TAIL) {
        {
          const view = makeHSL(hslMap[opts.TAIL], 0.5, 0.5, tints);
          prepare(view);
          views.push(view);
        } {
          const view = makeHSL(hslMap[opts.TAIL], 0.5, 0.5, tints);
          prepare(view);
          views.push(view);
        }
      }

      return views;
    } else {
      let views = [];
      //
      const prepare = (image) => {
        image.angle = 90;
        image.smoothed = true;
        image.scaleF = 0.25;
      }; {
        const view = makeHSL(hslMap['player-foot'], 0.5, 0.5, tints);
        prepare(view);
        views.push(view);
      } {
        const view = makeHSL(hslMap['player-foot'], 0.5, 0.5, tints);
        prepare(view);
        views.push(view);
      } {
        const view = makeHSL(hslMap['player-tail'], 0.5, 0.5, tints);
        prepare(view);
        views.push(view);
      } {
        const view = makeHSL(hslMap['player-tail'], 0.5, 0.5, tints);
        prepare(view);
        views.push(view);
      }

      return views;
    }
  }

  updateColors() {
    this.group.alpha = 1;
    if (this.id === client.playerID) {
      this.tints = [0xFFFFFF, 0x999999, 0x111111, 0xCCCCCC];
    } else if (this.invade) {
      this.tints = [0xFF2200, 0x881100, 0x110000, 0xCC2200];
    } else if (this.ally) {
      this.tints = [0x22FF22, 0x118811, 0x001100, 0x22CC22];
    } else {
      this.tints = [0xFFFFFF, 0x999999, 0x111111, 0xCCCCCC];
    }

    if (this.zoneID !== client.zoneID) {
      this.group.alpha = 0.2;
    }

    for (const k in this.viewsForTint) {
      const v = this.viewsForTint[k];
      changeHSL(v, this.tints);
    }
  }

  constructor(data) {
    data.pos = new vec3(data.pos);
    data.speed = new vec3(data.speed);
    data.inputMove = new vec3(data.inputMove);
    data.look = new vec3(data.look);

    super(data, data);

    if (this.zoneID === client.zoneID) {
      if (this.id === client.playerID) {
        if (this.invade) {
          makeSuperMessage('ВЫ ВТОРГАЕТЕСЬ', '#FF7700');
        }
        if (this.ally) {
          makeSuperMessage('ВЫ ПОМОГАЕТЕ', '#FF7700');
        }
      } else if (this.invade) {
        makeSuperMessage('ВТОРЖЕНИЕ', '#FF7700');
      } else if (this.ally) {
        makeSuperMessage('СОЮЗНИК', '#FF7700');
      }
    }

    this.angle = 0;

    this.tints = [0xFFFFFF];
    if (this.kind === 'mob') {
      const opts = global[this.name];
      if (!opts) {
        console.error('no opts for mob: ' + this.name);
      }

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
      if (opts.ADD_COLOR_TINT !== undefined) {
        this.tints[4] = opts.ADD_COLOR_TINT;
      }
      if (opts.ADD_AMBIENT_TINT !== undefined) {
        this.tints[5] = opts.ADD_AMBIENT_TINT;
      }
      if (opts.ADD_SPECIAL_TINT !== undefined) {
        this.tints[6] = opts.ADD_SPECIAL_TINT;
      }
    } else {
      this.light = genLight();
      this.light.scale.set(12 * this.light.f);
      for (let i = 0; i < 1; ++i) {
        this.light.rt.renderXY(this.light.rtImage, 0, 0, false);
      }
    }

    this.viewsForTint = [];

    [this.views, this.orient] = Fighter.createView(
      this.id === client.playerID,
      this.kind, this.name, this.size, this.tints);
    this.views[1].visible = false;
    this.views[2].visible = false;
    this.views[0].addTex.time = Math.random();
    this.views[1].addTex.time = this.views[0].addTex.time;
    this.views[2].addTex.time = this.views[0].addTex.time;
    if (this.kind === 'player') {
      this.middleGroup.add(this.views[0]);
      this.middleGroup.add(this.views[1]);
      this.middleGroup.add(this.views[2]);
    } else {
      this.middle2Group.add(this.views[0]);
      this.middle2Group.add(this.views[1]);
      this.middle2Group.add(this.views[2]);
    }
    this.viewsForTint.push(this.views[0]);
    this.viewsForTint.push(this.views[1]);
    this.viewsForTint.push(this.views[2]);

    this.handViews = Fighter.createHandsView(
      this.id === client.playerID,
      this.kind, this.name, this.size, this.tints);
    if (this.handViews) {
      this.handView1 = new Phaser.Group(game, null);
      this.handView1.add(this.handViews[0]);
      this.bottom3Group.add(this.handView1);
      this.handView2 = new Phaser.Group(game, null);
      this.handView2.add(this.handViews[1]);
      this.bottom3Group.add(this.handView2);
      this.viewsForTint.push(this.handViews[0]);
      this.viewsForTint.push(this.handViews[1]);
      this.handViews[0].addTex.time = this.views[0].addTex.time;
      this.handViews[1].addTex.time = this.views[0].addTex.time;
    }
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
      this.footViews[0].addTex.time = this.views[0].addTex.time;
      this.footViews[1].addTex.time = this.views[0].addTex.time;

      if (this.footViews[2]) {
        this.footViewsRoot2 = new Phaser.Group(game);
        this.bottom2Group.add(this.footViewsRoot2);
        this.footViewsRoot2.add(this.footViews[2]);
        this.footViewsRoot2.add(this.footViews[3]);
        this.viewsForTint.push(this.footViews[2]);
        this.viewsForTint.push(this.footViews[3]);
        this.footViews[2].addTex.time = this.views[0].addTex.time;
        this.footViews[3].addTex.time = this.views[0].addTex.time;
      }
    }

    this.bodyView = Fighter.createBodyView(
      this.id === client.playerID,
      this.kind, this.name, this.size, this.tints);
    if (this.bodyView) {
      this.viewsForTint.push(this.bodyView);
      this.bottom3Group.add(this.bodyView);
      this.bodyView.addTex.time = this.views[0].addTex.time;
    }

    if (this.kind === 'player') {
      this.updateColors();
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
    this.z = data.z;
    this.speedZ = data.speedZ;
    this.isFall = data.isFall;
    this.speed.init(data.speed);
    this.inputMove.init(data.inputMove);
    this.absLook = data.absLook;
    this.inRun = data.inRun;
    this.inBlock = data.inBlock;
    this.inJump = data.inJump;
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
    if (this.shield) {
      this.shield.finalStage(0, easing.easeInOutCubic);
    }
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
      if (this.ally) {
        makeSuperMessage('СОЮЗНИК ПОГИБ', '#991100');
      } else if (this.invade) {
        makeSuperMessage('ВТОРЖЕНИЕ ЗАВЕРШЕНО', '#991100');
      } else if (client.player.invade) {
        makeSuperMessage('УСПЕШНОЕ ВТОРЖЕНИЕ', '#991100');
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
    let l = Math.floor(this.z / 100.0 * 6 + 0.5);
    l = Math.max(l, 0);

    let li = Math.floor(this.z / 100.0 + 1 / 12);
    li = Math.min(li, 5);
    li = Math.max(li, 0);
    game.layers[li].sub['mixDead' + Math.min(l - li * 6 + 1, 7)].add(group);
  }

  update() {
    const sideVec = new vec3(this.look.y, -this.look.x, this.look.z).unit();

    this.moveTime += this.speed.length() * dt * 0.02;
    this.moveShift = Math.sin(this.moveTime) *
      (this.speed.length() + 100) / (this.speed.length() + 200);
    if (this.inJump || this.inRoll) {
      this.moveShift = 0;
    }
    if (this.kind === 'mob') {
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
    if (this.handViews) {
      this.hand1 = this.hands[0];
      this.hand2 = this.hands[1];
      if (this.hand1) {
        this.handViews[0].angle = this.hand1.view.angle + 20;
        this.handViews[0].x = this.hand1.view.x * 0.9;
        this.handViews[0].y = this.hand1.view.y * 0.9;
        this.handViews[0].scale.x = this.hand1.view.scale.x *
          this.handViews[0].scaleF / this.hand1.sx;
        this.handViews[0].scale.y = this.hand1.view.scale.y *
          this.handViews[0].scaleF / this.hand1.sy;

        this.handView1.angle = this.hand1.group.angle;
      } else {
        this.handViews[0].angle = 90 - 10;
        this.handViews[0].x = 20 + this.moveShift + 1;
        this.handViews[0].y = 20 - this.moveShift * 2 + 2;
        this.handViews[0].scale.x = 1 *
          this.handViews[0].scaleF;
        this.handViews[0].scale.y = 1 *
          this.handViews[0].scaleF;

        this.handView1.angle = -30;
      }
      if (this.hand2) {
        this.handViews[1].angle = this.hand2.view.angle - 20;
        this.handViews[1].x = this.hand2.view.x * 0.9;
        this.handViews[1].y = this.hand2.view.y * 0.9;
        this.handViews[1].scale.x = this.hand2.view.scale.x *
          this.handViews[0].scaleF / this.hand2.sx;
        this.handViews[1].scale.y = this.hand2.view.scale.y *
          this.handViews[0].scaleF / this.hand2.sy;

        this.handView2.angle = this.hand2.group.angle;
      } else {
        this.handViews[1].angle = 90 + 10;
        this.handViews[1].x = 20 + this.moveShift + 1;
        this.handViews[1].y = -20 - this.moveShift * 2 + 2;
        this.handViews[1].scale.x = 1 *
          this.handViews[1].scaleF;
        this.handViews[1].scale.y = 1 *
          this.handViews[1].scaleF;

        this.handView2.angle = 30;
      }
    }
    if (this.footViews) {
      this.footSpeed = this.footSpeed || this.speed.clone();
      vec3.add(
        this.footSpeed,
        this.speed
        .subtract(this.footSpeed)
        .multiply(1 - Math.pow(0.95, dt)));
      let l = 200;
      if (this.footViews[0].scaleF < 1) {
        l = 450;
      }
      if (this.speed.length() > 10 &&
        this.footSpeed.length() > 2 &&
        !this.inJump && !this.inRoll) {

        let footTime = this.moveTime * 100 / l * 0.5 / this.scale /
          this.footViews[0].scaleF;

        let sign = Math.sign((footTime % 2) - 1);
        let step = footTime % 1;
        this.footViewsRoot.angle = this.speed.toAngle() - this.look.toAngle();
        if (this.footViewsRoot2) {
          this.footViewsRoot2.angle = this.speed.toAngle() - this.look.toAngle();
        }

        if (!isAngleInRange(this.footViewsRoot.angle, -90, 90)) {
          sign = -sign;
          step = 1 - step;
          this.footViewsRoot.angle += 180;
          if (this.footViewsRoot2) {
            this.footViewsRoot2.angle += 180;
          }
        }
        const scaleStep =
          1 - Math.abs(Math.sin((step - 0.5) * Math.PI));
        const hf = 0.3;
        this.footViews[0].x = (0.5 - step) * l * sign *
          this.footViews[0].scaleF;
        this.footViews[0].y = -60 *
          this.footViews[0].scaleF;
        this.footViews[0].scale.x =
          this.footViews[0].scaleF +
          scaleStep * hf * -Math.sign(sign - 1) *
          this.footViews[0].scaleF;
        this.footViews[0].scale.y =
          this.footViews[0].scaleF +
          scaleStep * hf * -Math.sign(sign - 1) *
          this.footViews[0].scaleF;
        if (this.footViews[2]) {
          this.footViews[2].x = (0.5 - step) * l * sign *
            this.footViews[2].scaleF * 0.2;
          this.footViews[2].y = -60 *
            this.footViews[2].scaleF;
          this.footViews[2].scale.x =
            this.footViews[2].scaleF +
            scaleStep * hf * -Math.sign(sign - 1) *
            this.footViews[2].scaleF;
          this.footViews[2].scale.y =
            this.footViews[2].scaleF +
            scaleStep * hf * -Math.sign(sign - 1) *
            this.footViews[2].scaleF;
        }

        this.footViews[1].x = (step - 0.5) * l * sign *
          this.footViews[1].scaleF;
        this.footViews[1].y = 60 *
          this.footViews[1].scaleF;
        this.footViews[1].scale.x =
          this.footViews[1].scaleF +
          scaleStep * hf * Math.sign(sign + 1) *
          this.footViews[1].scaleF;
        this.footViews[1].scale.y =
          this.footViews[1].scaleF +
          scaleStep * hf * Math.sign(sign + 1) *
          this.footViews[1].scaleF;
        if (this.footViews[2]) {
          this.footViews[3].x = (step - 0.5) * l * sign *
            this.footViews[3].scaleF * 0.2;
          this.footViews[3].y = 60 *
            this.footViews[3].scaleF;
          this.footViews[3].scale.x =
            this.footViews[3].scaleF +
            scaleStep * hf * Math.sign(sign + 1) *
            this.footViews[3].scaleF;
          this.footViews[3].scale.y =
            this.footViews[3].scaleF +
            scaleStep * hf * Math.sign(sign + 1) *
            this.footViews[3].scaleF;
        }
      } else {
        this.footViews[0].x = l * 0.2 *
          this.footViews[0].scaleF;
        this.footViews[0].y = -60 *
          this.footViews[0].scaleF;
        this.footViews[0].scale.x = 1 *
          this.footViews[0].scaleF;
        this.footViews[0].scale.y = 1 *
          this.footViews[0].scaleF;

        if (this.footViews[2]) {
          this.footViews[2].x = l * 0.04 *
            this.footViews[2].scaleF;
          this.footViews[2].y = -60 *
            this.footViews[2].scaleF;
          this.footViews[2].scale.x = 1 *
            this.footViews[2].scaleF;
          this.footViews[2].scale.y = 1 *
            this.footViews[2].scaleF;
        }

        this.footViews[1].x = -l * 0.2 *
          this.footViews[1].scaleF;
        this.footViews[1].y = 60 *
          this.footViews[1].scaleF;
        this.footViews[1].scale.x = 1 *
          this.footViews[1].scaleF;
        this.footViews[1].scale.y = 1 *
          this.footViews[1].scaleF;
        if (this.footViews[2]) {
          this.footViews[3].x = -l * 0.04 *
            this.footViews[3].scaleF;
          this.footViews[3].y = 60 *
            this.footViews[3].scaleF;
          this.footViews[3].scale.x = 1 *
            this.footViews[3].scaleF;
          this.footViews[3].scale.y = 1 *
            this.footViews[3].scaleF;
        }
      }
      this.footViews[0].scale.x = -this.footViews[0].scale.x;

      if (this.footViews[2]) {
        this.footViews[2].scale.x = -this.footViews[2].scale.x;
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

    if (!client.player) {
      return;
    }
    this.z = this.z || 0;
    let l = Math.floor(this.z / 100.0);
    l = Math.min(l, 5);
    l = Math.max(l, 0);
    const pz = Math.floor(client.player.z / 100.0)
    if (pz === l && game.light && this.light) {
      this.light.alpha = lightAlpha;
      const light = game.light;
      const lx = 0; //game.w * 0.5;
      const ly = 0; //game.h * 0.5;
      const x = (this.pos.x - game.ui.x + lx) / light.scale.x;
      const y = (this.pos.y - game.ui.y + ly) / light.scale.y;
      light.texture.renderXY(this.light, x, y, false);
    }
  }

  checkBlock(opts) {}
  doDamageRadialArea(opts) {
    if (this.zoneID && this.zoneID !== client.zoneID) {
      return;
    }
    if (!this.hitVec) {
      return;
    }

    let color = 0x606060;
    if (this.hitType === 0) {
      color = 0xffd200;
    } else if (this.hitType === 1) {
      color = 0xba00ff;
    } else if (this.hitType === 2) {
      color = 0x00c0ff;
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
      g.lineStyle(4, color, 0.015);
      g.beginFill(color, 0.15);
      if (i === 1) {
        g.blendMode = PIXI.blendModes.MULTIPLY;
        g.lineStyle(4, color, 0.03);
        g.beginFill(color, 0.15);
      }

      g.arc(0, 0, d, a1, a2, true);

      g.angle = this.hitVec.toAngle() + hitP.toAngle();
      let l = Math.floor(this.z / 100.0 * 6 + 0.5);
      l = Math.max(l, 0);

      let li = Math.floor(this.z / 100.0 + 1 / 12);
      li = Math.min(li, 5);
      li = Math.max(li, 0);
      game.layers[li].sub['mix' + Math.min(l - li * 6 + 2, 7)].add(g);

      const cg = new Phaser.Group(game, null);
      game.scene.add(cg);
      cg.update = () => {
        g.alpha -= dt * 1.5;
        if (g.alpha <= 0.0) {
          g.destroy();
          cg.destroy();
        } else {
          game.layers[li].sub['mix' + Math.min(l - li * 6 + 2, 7)].add(g);
        }
      };
    }
  }
}