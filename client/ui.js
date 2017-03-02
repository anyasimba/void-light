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

  const textView = new Phaser.Text(game, 0, 0, text, {
    fontSize: 140,
    fill: color,
    boundsAlignH: 'center',
    boundsAlignV: 'center',
  });
  textView.setTextBounds(0, game.h * 0.5 - 100, game.w, 0);
  textView.alpha = 0.5;
  const textView2 = new Phaser.Text(game, 0, 0, text, {
    fontSize: 180,
    fill: color,
    boundsAlignH: 'center',
    boundsAlignV: 'center',
  });
  textView2.setTextBounds(0, game.h * 0.5 - 100, game.w, 0);
  textView2.alpha = 0.4;

  const inner = new Phaser.Graphics(game, 0, game.h * 0.5 - 200);
  inner.beginFill(0x000000, 0.8);
  inner.drawRect(0, 0, game.w, 400);
  inner.endFill();

  let time = 0;
  group.update = () => {
    textView2.blendMode = PIXI.blendModes.ADD;
    textView2.scale.x = 1.05;
    textView2.scale.y = 1.05;
    textView2.x = textView.x - 180 + time * 40;
    textView2.y = textView.y - 60;
    time += dt / 3;
    group.alpha = time;
    if (time >= 1) {
      group.alpha = 2 - time;
    }
    if (time >= 2) {
      group.destroy();
    }
  };

  group.add(inner);
  group.add(textView);
  group.add(textView2);
  game.ui.add(group);
}