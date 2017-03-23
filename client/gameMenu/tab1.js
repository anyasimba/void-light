// Tab 1 - Character
export function makeGameMenuTab1() {
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
    g.mw = w;
    g.mh = h;
    g.anchor = {
      x: 0.5,
      y: 0.5,
    };
    g.parentGroup = contentView;

    const view = g.add(
      new Phaser.Graphics(game, 0, 0));

    view.beginFill(0xFFFFFF, 0.1);
    view.lineStyle(2, 0xFFFFFF, 0.5);
    view.drawRect(-w / 2, -h / 2, w, h);
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
  // makeClotheCell(mainX, mainY + 300, 200, 200, 'leftHand2', 2);
  // makeClotheCell(mainX + 250, mainY + 300, 200, 200, 'rightHand2', 2);
  const mainText1 = contentView.add(new Phaser.Text(
    game, mainX - 140, mainY, 'Руки: ', {
      font: 'Neucha',
      fontSize: 60,
      fontWeight: 'bold',
      fill: '#AAAAAA',
      stroke: '#050505',
      strokeThickness: 6,
    }));
  mainText1.anchor.x = 1;
  mainText1.anchor.y = 0.5;
  // const mainText2 = contentView.add(new Phaser.Text(
  //   game, mainX - 140, mainY + 300, 'Вторая стойка', {
  //     font: 'Neucha',
  //     fontSize: 60,
  //     fontWeight: 'bold',
  //     fill: '#AAAAAA',
  //     stroke: '#050505',
  //     strokeThickness: 6,
  //   }));
  // mainText2.anchor.x = 1;
  // mainText2.anchor.y = 0.5;

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