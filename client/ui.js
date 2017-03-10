const PAD = 40;

export function checkMouse(view, PAD) {
  if (typeof PAD !== 'object') {
    PAD = {
      x: PAD,
      y: PAD,
    };
  }
  let dx = mx - game.ui.x -
    (view.x - view.width * view.anchor.x - PAD.x);
  let dy = my - game.ui.y -
    (view.y - view.height * view.anchor.y - PAD.y);

  let parentGroup = view.parentGroup;
  while (parentGroup) {
    if (parentGroup.needHide || !parentGroup.visible) {
      return;
    }
    dx -= parentGroup.x;
    dy -= parentGroup.y;
    parentGroup = parentGroup.parentGroup;
  }
  if (dx > 0 && dx < view.width + PAD.x * 2) {
    if (dy > 0 && dy < view.height + PAD.y * 2) {
      return true;
    }
  }
}

export function makeButton(text, color, font, fontSize, x, y, PAD, fn) {
  const textView = new Phaser.Text(
    game, x, y, text, {
      font: font || 'Tinos',
      fontSize: fontSize,
      fontWeight: 'bold',
      fill: color,
      stroke: '#050505',
      strokeThickness: 6,
    });
  textView.update = () => {
    textView.fill = textView.baseFill || color;
    textView.stroke = '#050505';
    if (textView.disabled) {
      return;
    }

    if (checkMouse(textView, PAD)) {
      textView.fill = '#FFFFFF';
      textView.stroke = '#AAAAAA';
      global.mouseCapture = fn;
    }
  }

  return textView;
}

export function makeRect(
  fillColor, fillA, lineColor, lineA, lw, x, y, w, h, update) {

  const g = new Phaser.Graphics(game, x, y);
  g.beginFill(fillColor, fillA);
  g.lineStyle(lw, lineColor, lineA);
  g.drawRect(0, 0, w, h);
  g.endFill();
  if (update) {
    g.update = () => {
      update(g);
    };
  }
  return g;
}

export function makeBar(innerColor, x, y, w, h, update) {
  const outer = game.ui.add(makeRect(
    0x000000, 0,
    innerColor, 0.8, 3,
    PAD + x, PAD + y, w, h));
  const inner = game.ui.add(makeRect(
    innerColor, 0.5,
    0, 0x000000, 0,
    PAD + x, PAD + y, w, h, () => {
      update(inner);
      inner.scale.x = Math.min(inner.scale.x, 1);
    }));
}

export function makeVoidsCount() {
  const getParams = () => {
    if (client.params && client.params.fighter && client.params.fighter.params) {
      return client.params.fighter.params;
    }
  }
  makeBar(0x999999, 0, game.h - 100, 300, 10, (inner) => {
    if (global.client && global.client.player) {
      const params = getParams();
      if (params) {
        inner.scale.x = params.voidsCount / levelLimit(params.level);
      }
    };
  });
  const voidsCountView = new Phaser.Text(game, 300 + PAD, game.h - 120, '', {
    font: 'Tinos',
    fontSize: 40,
    fill: '#AAAAAA',
  });
  voidsCountView.anchor.x = 1;
  voidsCountView.update = () => {
    const params = getParams();
    if (params) {
      voidsCountView.text = params.voidsCount + ' пустоты';
    }
  }
  game.ui.add(voidsCountView);
}

export let barItems = {};
let curBarItem = 0;
export function nextBarItem() {
  ++curBarItem;
  updateBarItems();
}
export function prevBarItem() {
  --curBarItem;
  updateBarItems();
}
export function setBarItem(g, i, mainI) {
  const item = client.params.items.list[i];
  const clientItemData = global['client__' + item.slug];
  const v = clientItemData.createView();
  if (mainI === undefined) {
    v.scale.set(0.5);
  } else {
    barItems.curItem = mainI;
  }
  g.itemView = v;
  g.add(v);

  if (item.count) {
    if (mainI !== undefined) {
      g.textView = g.add(new Phaser.Text(
        game, -32, -5, item.count, {
          font: 'Neucha',
          fontSize: 30,
          fontWeight: 'bold',
          fill: '#AAAAAA',
          stroke: '#050505',
          strokeThickness: 6,
        }));
    } else {
      g.textView = g.add(new Phaser.Text(
        game, -16, -6, item.count, {
          font: 'Neucha',
          fontSize: 20,
          fontWeight: 'bold',
          fill: '#AAAAAA',
          stroke: '#050505',
          strokeThickness: 6,
        }));
    }
  }
}
export function updateBarItems() {
  delete barItems.curItem;
  if (barItems.g1.itemView) {
    barItems.g1.itemView.destroy();
    delete barItems.g1.itemView;
  }
  if (barItems.g1.textView) {
    barItems.g1.textView.destroy();
    delete barItems.g1.textView;
  }
  if (barItems.g2.itemView) {
    barItems.g2.itemView.destroy();
    delete barItems.g2.itemView;
  }
  if (barItems.g2.textView) {
    barItems.g2.textView.destroy();
    delete barItems.g2.textView;
  }
  if (barItems.g3.itemView) {
    barItems.g3.itemView.destroy();
    delete barItems.g3.itemView;
  }
  if (barItems.g3.textView) {
    barItems.g3.textView.destroy();
    delete barItems.g3.textView;
  }
  if (!client || !client.params) {
    return;
  }
  if (!client.params.items.clothed) {
    return;
  }
  const clothed = client.params.items.clothed;
  let shift = 0;
  for (let i = 0; i < 8; ++i) {
    const r = clothed[i];
    if (r !== undefined) {
      ++shift;
    }
  }
  curBarItem = (curBarItem + shift) % shift;
  shift = 0;
  for (let i = 0; i < 8; ++i) {
    const r = clothed[i];
    if (r !== undefined) {
      if (shift >= curBarItem) {
        shift = i;
        break;
      }
      ++shift;
    }
  }

  let doneI = 0;
  let lastI;
  for (let i = 0; i < 8; ++i) {
    const j = (i + shift) % 8;
    const clothedI = clothed[j];
    if (clothedI !== undefined) {
      if (doneI === 0) {
        setBarItem(barItems.g1, clothedI, j);
      } else if (doneI === 1) {
        setBarItem(barItems.g2, clothedI);
      } else {
        lastI = clothedI;
      }
      ++doneI;
    }
  }
  if (lastI !== undefined) {
    setBarItem(barItems.g3, lastI);
  }
}

function makeItemsBar() {
  //
  const g1 = new Phaser.Group(game);
  g1.x = 240;
  g1.y = 180;
  const v1 = g1.add(
    new Phaser.Graphics(game, 0, 0));

  v1.beginFill(0xFFFFFF, 0.1);
  v1.lineStyle(2, 0xFFFFFF, 0.5);
  v1.drawRect(-40, -40, 80, 80);
  v1.endFill();
  game.ui.add(g1);
  barItems.g1 = g1;

  const g2 = new Phaser.Group(game);
  g2.x = 320;
  g2.y = 200;
  const v2 = g2.add(
    new Phaser.Graphics(game, 0, 0));

  v2.beginFill(0xFFFFFF, 0.1);
  v2.lineStyle(2, 0xFFFFFF, 0.5);
  v2.drawRect(-20, -20, 40, 40);
  v2.endFill();
  game.ui.add(g2);
  barItems.g2 = g2;

  const g3 = new Phaser.Group(game);
  g3.x = 160;
  g3.y = 200;
  const v3 = g3.add(
    new Phaser.Graphics(game, 0, 0));

  v3.beginFill(0xFFFFFF, 0.1);
  v3.lineStyle(2, 0xFFFFFF, 0.5);
  v3.drawRect(-20, -20, 40, 40);
  v3.endFill();
  game.ui.add(g3);
  barItems.g3 = g3;
}

export function initUI() {
  game.ui.add(makeGameMenu());

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

  makeVoidsCount();

  makeItemsBar();
}

export function makeSuperMessage(text, color) {
  const group = new Phaser.Group(game);

  const textView = new Phaser.Text(game, game.w * 0.5, game.h * 0.5, text, {
    font: 'Tinos',
    fontSize: 140,
    fill: color,
  });
  textView.alpha = 1;
  textView.anchor.set(0.5);
  const textView2 = new Phaser.Text(game, game.w * 0.5, game.h * 0.5, text, {
    font: 'Tinos',
    fontSize: 180,
    fill: color,
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
  const textView = makeButton(
    text,
    color,
    font,
    50,
    game.w * 0.5 - 300 + i * 600, game.h - 220, 40,
    fn);
  textView.anchor.x = i;
  textView.anchor.y = 0;
  textView.parentGroup = client.message;

  client.message.isExpanded = true;
  client.message.add(textView);
}