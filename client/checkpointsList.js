export let isCheckpointsListShowed = false;

export function makeCheckpointsList() {
  global.checkpointsListView = new Phaser.Group(game);
  checkpointsListView.w = 1600;
  checkpointsListView.h = 1000;
  const w = checkpointsListView.w;
  const h = checkpointsListView.h;

  const back = checkpointsListView.add(makeRect(
    0x050505, 0.6,
    0x101010, 0.8, 3,
    0, 0, w, h));

  const crossLine = checkpointsListView.add(makeRect(
    0xAAAAAA, 0.8,
    0x000000, 0, 0,
    0, 100, w, 5));

  const mask = makeRect(
    0xAAAAAA, 0.8,
    0xFFFFFF, 0, 0,
    0, 100, w, 5);

  const innerView = new Phaser.Group(game);
  innerView.x = 50;
  innerView.y = 150;
  checkpointsListView.add(innerView);
  checkpointsListView.innerView = innerView;

  checkpointsListView.alpha = 0;
  checkpointsListView.visible = false;
  checkpointsListView.preUpdate = () => {
    if (checkpointsListView.needHide) {
      checkpointsListView.alpha -= dt * 2;
      delete checkpointsListView.needShow;
    } else if (checkpointsListView.needShow) {
      checkpointsListView.alpha += dt * 2;
      checkpointsListView.visible = true;
    }
    if (checkpointsListView.alpha < 0) {
      checkpointsListView.alpha = 0;
      if (checkpointsListView.needHide) {
        delete checkpointsListView.needHide;
        checkpointsListView.visible = false;
        global.isCheckpointsListShowed = false;
      }
    }
    if (checkpointsListView.alpha > 1) {
      checkpointsListView.alpha = 1;
      if (checkpointsListView.needShow) {
        delete checkpointsListView.needShow;
      }
    }
  };

  return checkpointsListView;
}

export function showCheckpointsList() {
  game.ui.remove(checkpointsListView);
  game.ui.add(checkpointsListView);

  global.isCheckpointsListShowed = true;
  checkpointsListView.needShow = true;

  checkpointsListView.x = game.ui.w * 0.5 - checkpointsListView.w * 0.5;
  checkpointsListView.y = game.ui.h * 0.5 - checkpointsListView.h * 0.5;

  const titleView = new Phaser.Text(
    game, 50, 20, 'Выберите Кольцо Света:', {
      font: 'Neucha',
      fontSize: 60,
      fontWeight: 'bold',
      fill: '#AAEEFF',
      stroke: '#050505',
      strokeThickness: 6,
    });
  checkpointsListView.add(titleView);

  const list = client.params.checkpoints.list;

  checkpointsListView.innerView.removeAll();
  checkpointsListView.innerView.parentGroup = checkpointsListView;
  let j = 0;
  let curMapName;
  for (let i = 0; i < list.length; ++i) {
    const c = list[i];
    if (curMapName !== c.mapName) {
      curMapName = c.mapName;
      j = 0;
    }
    let title = '???';
    if (maps[c.mapName]) {
      title = maps[c.mapName].LANG_RU;
    }
    ++j;
    title += ' (' + j + ')';
    const textView = makeButton(
      title,
      '#AAEEFF',
      'Neucha',
      30,
      0, i * 50, 0,
      () => {
        hideCheckpointsList();
        client.emit('travel', {
          target: i,
        });
      });
    textView.parentGroup = checkpointsListView.innerView;
    checkpointsListView.innerView.add(textView)
  }
}

export function hideCheckpointsList() {
  checkpointsListView.needHide = true;
}