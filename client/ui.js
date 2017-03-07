const PAD = 40;

function makeBar(innerColor, x, y, w, h, update) {
  const outer = new Phaser.Graphics(game, 0, 0);
  outer.beginFill(0x000000, 0);
  outer.lineStyle(3, innerColor, 0.8);
  outer.drawRect(0, 0, w, h);
  outer.endFill();
  outer.x = PAD + x;
  outer.y = PAD + y;
  game.ui.add(outer);

  const inner = new Phaser.Graphics(game, 0, 0);
  inner.beginFill(innerColor, 0.5);
  inner.lineStyle(0, 0x000000, 0);
  inner.drawRect(0, 0, w, h);
  inner.endFill();
  inner.x = PAD + x;
  inner.y = PAD + y;
  inner.update = () => {
    update(inner);
  };
  game.ui.add(inner);
}

export function initUI() {
  makeBar(0xFF3300, 0, 0, 600, 30, (inner) => {
    if (global.client && global.client.player) {
      inner.scale.x = client.player.hp / client.player.HP;
    };
  });
  makeBar(0x44FF00, 0, 40, 500, 10, (inner) => {
    if (global.client && global.client.player) {
      inner.scale.x = client.player.stamina / client.player.STAMINA;
    };
  });
  makeBar(0x0077FF, 0, 60, 400, 15, (inner) => {
    if (global.client && global.client.player) {
      inner.scale.x = client.player.mp / client.player.MP;
    };
  });
}

export function makeSuperMessage(text, color) {
  const group = new Phaser.Group(game);

  const textView = new Phaser.Text(game, game.w * 0.5, game.h * 0.5, text, {
    font: 'Tinos',
    fontSize: 140,
    fill: color,
    boundsAlignH: 'center',
    boundsAlignV: 'center',
  });
  textView.alpha = 1;
  textView.anchor.set(0.5);
  const textView2 = new Phaser.Text(game, game.w * 0.5, game.h * 0.5, text, {
    font: 'Tinos',
    fontSize: 180,
    fill: color,
    boundsAlignH: 'center',
    boundsAlignV: 'center',
  });
  textView2.alpha = 0;
  textView2.anchor.set(0.5);
  textView2.blendMode = PIXI.blendModes.ADD;

  const inner = new Phaser.Graphics(game, 0, game.h * 0.5 - 200);
  inner.beginFill(0x000000, 0.8);
  inner.drawRect(0, 0, game.w, 400);
  inner.endFill();

  let time = 0;
  group.update = () => {
    textView2.scale.x = 1.05;
    textView2.scale.y = 1.05;
    textView2.x = game.w * 0.5 - 20 + time * 40;
    time += dt / 3;
    group.alpha = time;
    if (time >= 1) {
      group.alpha = 2 - time;
    }
    if (time >= 2) {
      group.destroy();
    }
    textView2.alpha = group.alpha * 0.4;
  };

  group.add(inner);
  group.add(textView);
  group.add(textView2);
  game.ui.add(group);
}

export function makeMessage(text, color, font) {
  disableMessage();

  const group = new Phaser.Group(game);

  const inner = new Phaser.Graphics(game, 0, 0);
  inner.beginFill(0x000000, 0.8);
  inner.drawRect(game.w * 0.5 - 1000, 0, 2000, 1);
  inner.endFill();
  group.add(inner);

  const inner2 = new Phaser.Graphics(game, 0, game.h - 250);
  inner2.beginFill(0x202020, 0.5);
  inner2.drawRect(game.w * 0.5 - 1000, 0, 2000, 10);
  inner2.endFill();
  group.add(inner2);

  const textView = new Phaser.Text(game, game.w * 0.5, game.h - 250, text, {
    font: font || 'Tinos',
    fontSize: 45,
    fill: color,
    stroke: '#050505',
    strokeThickness: 6,
  });
  textView.anchor.x = 0.5;
  textView.anchor.y = 1;

  group.add(textView);
  game.ui.add(group);

  group.time = 0;
  group.preUpdate = () => {
    if (group.needHide) {
      group.time -= dt;
    } else if (group.needShow) {
      group.time += dt;
    }
    if (group.time > 1) {
      group.time = 1;
      delete group.needShow;
    }
    if (group.time < 0) {
      group.destroy();
    }

    group.alpha = group.time;

    inner.y = textView.y - textView.height - 100;
    inner.scale.y = textView.height + 200;
    if (group.isExpanded) {
      textView.y = game.h - 300;
      inner.y = textView.y - textView.height - 75;
      inner.scale.y = textView.height + 250;
    }
  };
  group.needShow = true;

  client.message = group;
}
export function disableMessage() {
  if (!client.message) {
    return;
  }
  client.message.needHide = true;
  delete client.message;
}

export function makeMessageOption(text, color, font, i, fn) {
  const textView = new Phaser.Text(
    game, game.w * 0.5 - 300 + i * 600, game.h - 220, text, {
      font: font || 'Tinos',
      fontSize: 50,
      fontWeight: 'bold',
      fill: color,
      stroke: '#050505',
      strokeThickness: 6,
    });
  textView.anchor.x = i;
  textView.anchor.y = 0;
  textView.update = () => {
    textView.fill = color;
    textView.stroke = '#050505';

    const PAD = 40;
    const dx = mx - game.ui.x -
      (textView.x - textView.width * textView.anchor.x - PAD);
    const dy = my - game.ui.y -
      (textView.y - textView.height * textView.anchor.y - PAD);
    if (dx > 0 && dx < textView.width + PAD * 2) {
      if (dy > 0 && dy < textView.height + PAD * 2) {
        textView.fill = '#FFFFFF';
        textView.stroke = '#AAAAAA';
        global.mouseCapture = fn;
      }
    }
  }

  client.message.isExpanded = true;
  client.message.add(textView);
}