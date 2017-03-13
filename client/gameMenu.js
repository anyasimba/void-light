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
  const makeClotheCell = (x, y, w, h, k, tabI) => {
    const g = contentView.add(new Phaser.Group(game));
    g.x = x;
    g.y = y;
    g.width = w;
    g.height = h;
    g.anchor = {
      x: 0.5,
      y: 0.5,
    };
    g.parentGroup = contentView;

    const view = g.add(
      new Phaser.Graphics(game, 0, 0));

    view.beginFill(0xFFFFFF, 0.1);
    view.lineStyle(2, 0xFFFFFF, 0.5);
    view.drawRect(-w / 2, -w / 2, w, w);
    view.endFill();

    g.update = () => {
      const hasClothe = client &&
        client.params &&
        client.params.items &&
        client.params.items.clothed;
      if (hasClothe) {
        const clothed = client.params.items.clothed;
        const newItem = client.params.items.list[clothed[k]];
        let diffByCount = false;
        if (newItem && g.textView && newItem.count + '' !== g.textView.text) {
          diffByCount = true;
        }
        if (clothed[k] !== g.clothed || diffByCount) {
          if (g.itemView) {
            g.itemView.destroy();
            delete g.itemView;
          }
          if (g.textView) {
            g.textView.destroy();
            delete g.textView;
          }
          g.clothed = clothed[k];
          if (clothed[k] !== undefined) {
            const item = client.params.items.list[g.clothed];
            if (!item) {
              return;
            }
            const clientItemData = global['client__' + item.slug];
            const itemView = clientItemData.createView();
            itemView.scale.x *= w / 160;
            itemView.scale.y *= h / 160;
            g.itemView = g.add(itemView);

            if (item.count !== undefined) {
              g.textView = g.add(new Phaser.Text(
                game, -32, -5, item.count, {
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
                k: k,
              });
            } else {
              client.emit('clothe', {
                k: k,
              });
            }
          };
          gameMenuView.switch(tabI);
        };
      }
    }

    cellViews.push(view);
  }
  for (let i = 0; i < 8; ++i) {
    makeClotheCell(i * 90 + 40, 750, 80, 80, i + '', 1);
  }
  const mainX = 900;
  const mainY = 80;
  makeClotheCell(mainX, mainY, 200, 200, 'leftHand1', 2);
  makeClotheCell(mainX + 250, mainY, 200, 200, 'rightHand1', 2);
  makeClotheCell(mainX, mainY + 300, 200, 200, 'leftHand2', 2);
  makeClotheCell(mainX + 250, mainY + 300, 200, 200, 'rightHand2', 2);
  const mainText1 = contentView.add(new Phaser.Text(
    game, mainX - 140, mainY, 'Первая стойка', {
      font: 'Neucha',
      fontSize: 60,
      fontWeight: 'bold',
      fill: '#AAAAAA',
      stroke: '#050505',
      strokeThickness: 6,
    }));
  mainText1.anchor.x = 1;
  mainText1.anchor.y = 0.5;
  const mainText2 = contentView.add(new Phaser.Text(
    game, mainX - 140, mainY + 300, 'Вторая стойка', {
      font: 'Neucha',
      fontSize: 60,
      fontWeight: 'bold',
      fill: '#AAAAAA',
      stroke: '#050505',
      strokeThickness: 6,
    }));
  mainText2.anchor.x = 1;
  mainText2.anchor.y = 0.5;

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
  const w = 250;
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
  if (data.count !== undefined) {
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

  const sx = view.scale.x;
  const sy = view.scale.y;

  g.parentGroup = this.menuView;
  g.update = () => {
    view.scale.x = sx;
    view.scale.y = sy;
    if (checkMouse(g, 0)) {
      view.scale.x = sx * 1.1;
      view.scale.y = sy * 1.1;

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
  const titleView = makeGameMenuTabTitle(5, 'Опции');
  const contentView = titleView.contentView;
  const makeKeyOption = (x, y, key, code, text) => {
    let updateText;
    const g = contentView.add(makeButton(
      '',
      '#FFFFFF',
      'Neucha',
      30,
      x, y, 0,
      () => {
        g.tint = 0xFFEEAA;
        updateText('...');
        game.input.keyboard.onDownCallback = e => {
          delete game.input.keyboard.onDownCallback;
          e.preventDefault();
          setCookie('key__' + key, e.keyCode);
          updateText();
          g.tint = 0xAAEEFF;
        };
      }));
    g.tint = 0xAAEEFF;
    updateText = (title) => {
      if (!getCookie('key__' + key)) {
        setCookie('key__' + key, code);
      }
      const curKey = parseInt(getCookie('key__' + key));
      if (!title) {
        for (const k in Phaser.Keyboard) {
          if (Phaser.Keyboard[k] === curKey) {
            title = k;
          }
        }
      }
      g.text = text + ': [' + title + ']';
    }
    updateText();
    g.parentGroup = contentView;
    return g;
  }

  const i = 50;
  makeKeyOption(0, 0, 'w', Phaser.Keyboard.W, 'Движение вверх');
  makeKeyOption(0, i, 'a', Phaser.Keyboard.A, 'Движение влево');
  makeKeyOption(0, i * 2, 's', Phaser.Keyboard.S, 'Движение вниз');
  makeKeyOption(0, i * 3, 'd', Phaser.Keyboard.D, 'Движение вправо');
  makeKeyOption(0, i * 4, 'shift', Phaser.Keyboard.SHIFT, 'Перекат');
  makeKeyOption(0, i * 5, 'space', Phaser.Keyboard.SPACEBAR, 'Прыжок');
  makeKeyOption(0, i * 6, 'q', Phaser.Keyboard.Q, 'Предыдущий предмет');
  makeKeyOption(0, i * 7, 'e', Phaser.Keyboard.E, 'Следующий предмет');
  makeKeyOption(0, i * 8, 'f', Phaser.Keyboard.F, 'Использовать предмет');
  makeKeyOption(0, i * 9, 'r', Phaser.Keyboard.R, 'Поставить\\убрать блок');
  makeKeyOption(0, i * 10, 'g', Phaser.Keyboard.G, 'Начать\\перестать бежать');
  makeKeyOption(0, i * 11, 'p', Phaser.Keyboard.P, 'Удар');
  makeKeyOption(
    0, i * 12, 'y', Phaser.Keyboard.Y, 'Движение на курсор\\абсолютное');

  return titleView;
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

  gameMenuView.add(new Phaser.Text(
    game, 20, 0, '[esc] - закрыть\\открыть меню', {
      font: 'Tinos',
      fontSize: 26,
      fontWeight: 'normal',
      fill: '#AAAAAA',
      stroke: '#050505',
      strokeThickness: 6,
    }));

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