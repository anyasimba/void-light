let tabsN = -1;

function tabPos(i) {
  if (tabsN === 0) {
    return 0.5;
  }
  return i / tabsN;
}

function makeGameMenuTabTitle(i, text, fn) {
  if (!fn) {
    fn = () => {
      if (textView.contentView) {
        gameMenuView.switch(i);
      }
    };
  }

  const textView = makeButton(
    text,
    '#AAEEFF',
    'Neucha',
    50,
    0, 30, 40,
    fn);
  textView.parentGroup = gameMenuView;

  textView.contentView = new Phaser.Group(game);
  textView.contentView.parentGroup = gameMenuView;

  return textView;
}

// Tab 1 - Character
function makeGameMenuTab1() {
  ++tabsN;
  const titleView = makeGameMenuTabTitle(0, 'Персонаж');
  const contentView = titleView.contentView;
  const usernameView = contentView.add(new Phaser.Text(
    game, 0, 0, '', {
      font: 'Tinos',
      fontSize: 50,
      fontWeight: 'bold',
      fill: '#AAAAAA',
      stroke: '#050505',
      strokeThickness: 6,
    }));
  const levelView = contentView.add(new Phaser.Text(
    game, 0, 60, '', {
      font: 'Neucha',
      fontSize: 40,
      fontWeight: 'bold',
      fill: '#AAAAAA',
      stroke: '#050505',
      strokeThickness: 6,
    }));

  const paramViews = [];
  for (let i = 0; i < PLAYER_PARAMS.length; ++i) {
    const param = PLAYER_PARAMS[i];
    paramViews.push(contentView.add(new Phaser.Text(
      game, 0, 180 + i * 70, '', {
        font: 'Neucha',
        fontSize: 40,
        fontWeight: 'bold',
        fill: '#FFFFAA',
        stroke: '#050505',
        strokeThickness: 6,
      })));

    paramViews[i].incView = contentView.add(makeButton(
      '+',
      '#AAEEFF',
      'Neucha',
      40,
      300, 180 + i * 70, {
        x: 20,
        y: 0
      },
      () => {
        client.emit('incParam', {
          i: i
        });
      }));
    paramViews[i].incView.parentGroup = contentView;
  }

  const cellViews = [];
  for (let i = 0; i < 8; ++i) {
    const g = contentView.add(new Phaser.Group(game));
    g.x = i * 90 + 40;
    g.y = 750;
    g.width = 80;
    g.height = 80;
    g.anchor = {
      x: 0.5,
      y: 0.5,
    };
    g.parentGroup = contentView;

    const view = g.add(
      new Phaser.Graphics(game, 0, 0));

    view.beginFill(0xFFFFFF, 0.1);
    view.lineStyle(2, 0xFFFFFF, 0.5);
    view.drawRect(-40, -40, 80, 80);
    view.endFill();

    g.update = () => {
      const hasClothe = client &&
        client.params &&
        client.params.items &&
        client.params.items.clothed;
      if (hasClothe) {
        const clothed = client.params.items.clothed;
        if (clothed[i] !== g.clothed) {
          if (g.itemView) {
            g.itemView.destroy();
          }
          g.clothed = clothed[i];
          if (clothed[i] !== undefined) {
            const item = client.params.items.list[g.clothed];
            const clientItemData = global['client__' + item.slug];
            const itemView = clientItemData.createView();
            itemView.scale.set(0.5);
            g.itemView = g.add(itemView);

            if (item.count) {
              g.add(new Phaser.Text(
                game, 16, -5, item.count, {
                  font: 'Neucha',
                  fontSize: 30,
                  fontWeight: 'bold',
                  fill: '#AAAAAA',
                  stroke: '#050505',
                  strokeThickness: 6,
                }));
            }
          }
        }
      }

      g.scale.set(1);
      if (checkMouse(g, 0)) {
        g.scale.set(1.1);

        global.mouseCapture = () => {
          global.mouseAction = (item, clientItem, data, itemI) => {
            gameMenuView.switch(0);
            if (item) {
              client.emit('clothe', {
                item: parseInt(itemI),
                i: i
              });
            } else {
              client.emit('clothe', {
                i: i
              });
            }
          };
          gameMenuView.switch(1);
        };
      }
    }

    cellViews.push(view);
  }

  const contentViewUpdate = contentView.update;
  contentView.update = () => {
    if (!client || !client.params || !client.params.fighter) {
      return;
    }
    const params = client.params.fighter.params;
    usernameView.text = params.username;
    levelView.text = 'Уровень ' + params.level;
    let total = 0;
    for (let i = 0; i < PLAYER_PARAMS.length; ++i) {
      const param = PLAYER_PARAMS[i];
      total += params[param];
    }
    for (let i = 0; i < PLAYER_PARAMS.length; ++i) {
      const param = PLAYER_PARAMS[i];
      paramViews[i].text = PLAYER_PARAMS_LANG_RU[i] + ': ' + params[param];
      paramViews[i].incView.x = paramViews[i].width + 20;
      paramViews[i].incView.visible = false;
      if (total < params.level - 1) {
        paramViews[i].incView.visible = true;
      }
    }

    contentViewUpdate.call(contentView);
  }

  return titleView;
}

function onItems(items, filter) {
  this.menuView.removeAll();
  let i = 0;
  for (const k in items.list) {
    const item = items.list[k];
    const itemData = global[item.slug];
    const clientItemData = global['client__' + item.slug];
    if (filter(itemData)) {
      this.addItem(itemData, clientItemData, item, i, k);
      ++i;
    }
  }
}

function addItem(item, clientItem, data, i, k) {
  const w = 220;
  const h = 160;
  const g = new Phaser.Group(game);
  g.x = i * w + w / 2;
  g.y = h / 2;
  g.width = w;
  g.height = h;
  g.anchor = {
    x: 0.5,
    y: 0.5,
  };

  const view = g.add(clientItem.createView());

  let clothed = false;
  for (let i = 0; i < 8; ++i) {
    const arr = client.params.items.clothed;
    if (arr && arr[i] === parseInt(k)) {
      clothed = true;
    }
  }

  if (clothed) {
    const graphics = new Phaser.Graphics(game, -70, 40);
    graphics.beginFill(0x33FF00, 0.8);
    graphics.drawCircle(0, 0, 40);
    graphics.endFill();
    g.add(graphics);
  }

  let title = clientItem.LANG_RU;
  if (data.count) {
    title += ', ' + data.count + ' шт.';
  }
  const slugView = g.add(new Phaser.Text(
    game, 0, h / 2 + 20, title, {
      font: 'Neucha',
      fontSize: 24,
      fontWeight: 'normal',
      fill: '#EEEEEE',
      stroke: '#050505',
      strokeThickness: 6,
    }));
  slugView.anchor.set(0.5);

  g.parentGroup = this.menuView;
  g.update = () => {
    view.scale.set(1);
    if (checkMouse(g, 0)) {
      view.scale.set(1.1);

      global.mouseCapture = () => {
        if (global.mouseAction) {
          global.mouseAction(item, clientItem, data, k);
          delete global.mouseAction;
        }
      }
    }
  }
  this.menuView.add(g);
}

function makeGameMenuTab2() {
  ++tabsN;
  const titleView = makeGameMenuTabTitle(1, 'Предметы');
  const contentView = titleView.contentView;
  titleView.menuView = contentView.add(
    new Phaser.Group(game));
  titleView.menuView.parentGroup = contentView;
  titleView.onItems = items => {
    onItems.call(titleView, items, data => {
      if (data.WEAPON || data.SHIELD || data.ARMOR) {
        return;
      }
      return true;
    });
  };
  titleView.addItem = addItem;
  return titleView;
}

function makeGameMenuTab3() {
  ++tabsN;
  const titleView = makeGameMenuTabTitle(2, 'Оружие');
  const contentView = titleView.contentView;
  titleView.menuView = contentView.add(
    new Phaser.Group(game));
  titleView.menuView.parentGroup = contentView;
  titleView.onItems = items => {
    onItems.call(titleView, items, data => {
      if (!data.WEAPON && !data.SHIELD) {
        return;
      }
      return true;
    });
  };
  titleView.addItem = addItem;
  return titleView;
}

function makeGameMenuTab4() {
  ++tabsN;
  const titleView = makeGameMenuTabTitle(3, 'Доспехи');
  const contentView = titleView.contentView;
  titleView.menuView = contentView.add(
    new Phaser.Group(game));
  titleView.menuView.parentGroup = contentView;
  titleView.onItems = items => {
    onItems.call(titleView, items, data => {
      if (!data.ARMOR) {
        return;
      }
      return true;
    });
  };
  titleView.addItem = addItem;
  return titleView;
}

function makeGameMenuTab5() {
  ++tabsN;
  return makeGameMenuTabTitle(4, 'Ключи');
}

function makeGameMenuTab6() {
  ++tabsN;
  return makeGameMenuTabTitle(5, 'Опции');
}
//
let isGameMenuShowed = false;

export function makeGameMenu() {
  global.gameMenuView = new Phaser.Group(game);
  gameMenuView.onItems = data => {
    gameMenuView.tabs[1].onItems(data);
    gameMenuView.tabs[2].onItems(data);
    gameMenuView.tabs[3].onItems(data);

    updateBarItems();
  };

  gameMenuView.switch = (i) => {
    gameMenuView.contentView.visible = false;
    gameMenuView.contentView = gameMenuView.tabs[i].contentView;
    gameMenuView.contentView.visible = true;

    for (const k in gameMenuView.tabs) {
      const tab = gameMenuView.tabs[k];
      tab.baseFill = '#AAEEFF';
    }

    gameMenuView.tabs[i].baseFill = '#FFEEAA';
  }
  gameMenuView.w = 1600;
  gameMenuView.h = 1000;
  const w = gameMenuView.w;
  const h = gameMenuView.h;

  const back = gameMenuView.add(makeRect(
    0x050505, 0.6,
    0x101010, 0.8, 3,
    0, 0, w, h));

  const crossLine = gameMenuView.add(makeRect(
    0xAAAAAA, 0.8,
    0x000000, 0, 0,
    0, 100, w, 5));

  const tabs = [
    gameMenuView.add(makeGameMenuTab1()),
    gameMenuView.add(makeGameMenuTab2()),
    gameMenuView.add(makeGameMenuTab3()),
    gameMenuView.add(makeGameMenuTab4()),
    gameMenuView.add(makeGameMenuTab5()),
    gameMenuView.add(makeGameMenuTab6()),
  ];
  gameMenuView.tabs = tabs;
  for (const k in tabs) {
    const tab = tabs[k];
    if (tab.contentView) {
      gameMenuView.add(tab.contentView);
      tab.contentView.visible = false;
      tab.contentView.x = 50;
      tab.contentView.y = 150;
    }
  }
  tabs[0].contentView.visible = true;
  gameMenuView.contentView = tabs[0].contentView;
  tabs[0].baseFill = '#FFEEAA';

  gameMenuView.alpha = 0;
  gameMenuView.visible = false;
  gameMenuView.preUpdate = () => {
    let tw = 0;
    for (const k in tabs) {
      const tab = tabs[k];
      tw += tab.width;
    }

    let tx = 50;
    const dw = gameMenuView.w - tx * 2 - tw;
    const sdf = dw / (tabs.length - 1);

    for (const k in tabs) {
      const tab = tabs[k];
      tab.x = tx;
      tx += tab.width + sdf;
    }

    if (gameMenuView.needHide) {
      gameMenuView.alpha -= dt * 2;
    } else if (gameMenuView.needShow) {
      gameMenuView.alpha += dt * 2;
      gameMenuView.visible = true;
    }
    if (gameMenuView.alpha < 0) {
      gameMenuView.alpha = 0;
      if (gameMenuView.needHide) {
        delete gameMenuView.needHide;
        gameMenuView.visible = false;
        isGameMenuShowed = false;
      }
    }
    if (gameMenuView.alpha > 1) {
      gameMenuView.alpha = 1;
      if (gameMenuView.needShow) {
        delete gameMenuView.needShow;
      }
    }
  };

  return gameMenuView;
}

export function showGameMenu(force) {
  if (!force && isGameMenuShowed) {
    hideGameMenu();
    return;
  }
  game.ui.remove(gameMenuView);
  game.ui.add(gameMenuView);

  isGameMenuShowed = true;
  gameMenuView.needShow = true;

  gameMenuView.x = game.w * 0.5 - gameMenuView.w * 0.5;
  gameMenuView.y = game.h * 0.5 - gameMenuView.h * 0.5;
}

export function hideGameMenu() {
  gameMenuView.needHide = true;
}