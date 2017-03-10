let tabsN = 3;

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
        gameMenuView.contentView.visible = false;
        gameMenuView.contentView = textView.contentView;
        gameMenuView.contentView.visible = true;

        for (const k in gameMenuView.tabs) {
          const tab = gameMenuView.tabs[k];
          tab.baseFill = '#AAEEFF';
        }

        textView.baseFill = '#FFEEAA';
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
      300, 180 + i * 70, 0,
      () => {
        client.emit('incParam', {
          i: i
        });
      }));
    paramViews[i].incView.parentGroup = contentView;
  }

  const contentViewUpdate = contentView.update;
  contentView.update = () => {
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

function makeGameMenuTab2() {
  return makeGameMenuTabTitle(1, 'Предметы');
}

function makeGameMenuTab3() {
  return makeGameMenuTabTitle(2, 'Квестовые предметы');
}

function makeGameMenuTab4() {
  return makeGameMenuTabTitle(3, 'Опции');
}

function makeGameMenuTab5() {
  if (window.close) {
    ++tabsN;
    return makeGameMenuTabTitle(4, 'Выход', () => {
      window.close();
    });
  }
}
//
let isGameMenuShowed = false;

let gameMenuView;

function makeGameMenu() {
  gameMenuView = new Phaser.Group(game);
  gameMenuView.w = 1600;
  gameMenuView.h = 1000;
  const w = gameMenuView.w;
  const h = gameMenuView.h;

  const back = gameMenuView.add(makeRect(
    0x000000, 0.6,
    0x050505, 0.8, 3,
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
  ];
  const exit = makeGameMenuTab5();
  if (exit) {
    tabs.push(gameMenuView.add(exit));
  }
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
  if (!gameMenuView) {
    game.ui.add(makeGameMenu());
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