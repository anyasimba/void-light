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