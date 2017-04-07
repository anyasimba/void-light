export async function loadMap() {
  console.log('loading map...');

  // JUST DATA
  client.w = client.map.width * WALL_SIZE;
  client.h = client.map.height * WALL_SIZE;

  const dictionary = loadMapDictionary(client.map);

  const scaleF = Math.round(game.scaleFactor * 8) / 16;
  global.ts = WALL_SIZE * 2;
  const xn = Math.ceil(client.map.width * WALL_SIZE / ts);
  const yn = Math.ceil(client.map.height * WALL_SIZE / ts);

  const ln = 7;

  const AF = 2.4;
  global.AF = AF;

  const maskView = new Phaser.Image(game, 0, 0, 'ground-mask');
  maskView.scale.set(AF * WALL_SIZE / maskView.width * scaleF);

  let rt = new Phaser.RenderTexture(
    game, WALL_SIZE * AF * scaleF, WALL_SIZE * AF * scaleF, null, null,
    true);
  const renderMaskAffect = (image, x, y) => {
    const v = new Phaser.TileSprite(
      game, 0, 0,
      WALL_SIZE * (2 + AF * 2) * scaleF,
      WALL_SIZE * (2 + AF * 2) * scaleF,
      image);
    v.tileScale.set(4 * WALL_SIZE / v.texture.width * scaleF);
    let rx = -x * WALL_SIZE * scaleF;
    let ry = -y * WALL_SIZE * scaleF;
    rt.renderXY(v, rx, ry, true);

    maskView.anchor.set(0.5);
    maskView.angle = Math.random() * 360;
    maskView.x = WALL_SIZE * AF * scaleF * 0.5;
    maskView.y = WALL_SIZE * AF * scaleF * 0.5;
    let bmd = game.make.bitmapData(
      WALL_SIZE * AF * scaleF, WALL_SIZE * AF * scaleF);
    bmd.alphaMask(rt, maskView);

    return new Phaser.Image(game, 0, 0, bmd);
  }

  const texs = [
    'dirt',
    'dirt2',
    'door',
    'forest-ground',
    'grass',
    'grass2',
    'ground',
    'ice',
    'lava',
    'leaves',
    'leaves2',
    'leaves3',
    'leaves4',
    'leaves5',
    'sand',
    'stones',
    'toxic',
    'water',
    'whole',
  ];
  const wallTexs = [
    'bricks',
    'bricks2',
    'stone',
  ];

  const views = {};
  for (let i = 0; i < 16; ++i) {
    for (let j = 0; j < texs.length; ++j) {
      const view = renderMaskAffect(texs[j], i % 4, Math.floor(i / 4) % 4);
      views[texs[j]] = views[texs[j]] || [];
      views[texs[j]].push(view);

      view.darkView = new Phaser.Image(game, 0, 0, makeDarken(view, 0x505050));
    }
  }
  for (let i = 0; i < wallTexs.length; ++i) {
    const view = new Phaser.TileSprite(
      game, 0, 0, 0, 0, wallTexs[i]);
    views[wallTexs[i]] = view;

    view.darkView = new Phaser.TileSprite(
      game, 0, 0, 0, 0, makeDarken(view, 0x80808080));
  }

  for (let i = 0; i < 6; ++i) {
    const heights = client.map.layers[i * 3 + 1];
    const ground = client.map.layers[i * 3];
    const grid = [];
    for (let y = 0; y < client.map.height; ++y) {
      for (let x = 0; x < client.map.width; ++x) {
        const i = y * client.map.width + x;
        const v = ground.data[i];
        const slug = dictionary[v];
        if (slug) {
          grid[x] = grid[x] || [];
          grid[x][y] = slug;
        }
      }
    }

    // VIEWS
    const textures = [];
    for (let i = 0; i < ln; ++i) {
      textures[i] = [];
      textures[i][0] = [];
      textures[i][1] = [];
      textures[i][2] = [];
    }

    loadingProgress(Math.floor((i + 1) / 6 * 30 + 30));
    await sleep(10);
    for (let y = client.map.height - 1; y >= 0; --y) {
      for (let x = client.map.width - 1; x >= 0; --x) {
        const i = y * client.map.width + x;
        const v = ground.data[i];
        const slug = dictionary[v];
        let h = heights.data[i];
        h = dictionary[h];

        let conf = {};
        switch (h) {
          case 'h1':
            conf.layers = [0, 1];
            break;
          case 'h2':
            conf.layers = [0, 1, 2];
            break;
          case 'h3':
            conf.layers = [0, 1, 2, 3];
            break;
          case 'h4':
            conf.layers = [0, 2, 4];
            break;
          case 'h5':
            conf.layers = [0, 1, 3, 5];
            break;
          case 'h6':
            conf.layers = [0, 2, 4, 6];
            break;
          default:
            conf.layers = [0];
        }
        if (h === undefined) {
          h = 0;
        } else {
          h = h.slice(-1);
        }
        let view = views[slug];
        if (!view) {
          continue;
        }
        let padShift = 0;
        let isWall;
        switch (slug) {
          case 'whole':
          case 'lava':
          case 'toxic':
            padShift = 1;
            break;
          case 'bricks':
          case 'bricks2':
          case 'stone':
            isWall = true;
            break;
          default:
        }

        const f = scaleF;
        let texPad = 0;
        if (!isWall) {
          texPad = WALL_SIZE * (AF - 1);
        }

        const cx = Math.floor(x * WALL_SIZE / ts);
        const cy = Math.floor(y * WALL_SIZE / ts);

        if (!isWall) {
          for (let i = 0; i < conf.layers.length; ++i) {
            let k = conf.layers[i];
            textures[k][padShift][cx] = textures[k][padShift][cx] || [];
            textures[k][padShift][cx][cy] = textures[k][padShift][cx][cy] ||
              new Phaser.RenderTexture(
                game,
                Math.ceil((ts + texPad) * f), Math.ceil((ts + texPad) * f),
                null, null, 1);

            const vx = x + i;
            const vy = y + i;
            let v = view[vx % 4 + (vy % 4) * 4];
            if (i < conf.layers.length - 1) {
              v = v.darkView;
            }
            textures[k][padShift][cx][cy].renderXY(
              v,
              (x * WALL_SIZE - cx * ts) * f,
              (y * WALL_SIZE - cy * ts) * f,
              false);
          }
          continue;
        }

        for (let i = 0; i < conf.layers.length; ++i) {
          let k = conf.layers[i];

          textures[k][2][cx] = textures[k][2][cx] || [];
          textures[k][2][cx][cy] = textures[k][2][cx][cy] || new Phaser.RenderTexture(
            game,
            Math.ceil((ts + texPad) * f), Math.ceil((ts + texPad) * f),
            null, null, 1);

          let pad = (k - 2) * WALL_SIZE * 0.25 / (ln - 3) +
            Math.random() * WALL_SIZE / 6;

          let px = 0;
          let py = 0;
          let v = view;
          if (i < conf.layers.length - 1) {
            v = v.darkView;
          }

          if (!grid[x - 1] || !grid[x - 1][y]) {
            px = pad;
          }
          if (!grid[x] || !grid[x][y - 1]) {
            py = pad;
          }
          v.width = (WALL_SIZE - px) * scaleF;
          v.height = (WALL_SIZE - py) * scaleF;
          if (!grid[x + 1] || !grid[x + 1][y]) {
            v.width -= pad * scaleF;
          }
          if (!grid[x] || !grid[x][y + 1]) {
            v.height -= pad * scaleF;
          }
          const sf = 1.5; //(0.7 + k * 0.3 / (ln - 3));
          v.tilePosition.x = (-x * WALL_SIZE - px) / sf + k * 19562;
          v.tilePosition.y = (-y * WALL_SIZE - py) / sf + k * 23250;
          v.tileScale.x = f * sf;
          v.tileScale.y = f * sf;

          textures[k][2][cx][cy].renderXY(
            v,
            (x * WALL_SIZE - cx * ts + px + texPad * 0.5) * scaleF,
            (y * WALL_SIZE - cy * ts + py + texPad * 0.5) * scaleF,
            false);
        }
      }
    }
    console.log('done', xn * yn);
    loadingProgress(Math.floor((i + 1) / 6 * 60 + 30));

    await sleep(10);

    for (let x = 0; x < xn; ++x) {
      for (let y = 0; y < yn; ++y) {
        for (let i = 0; i < ln; ++i) {
          for (let l = 0; l < 3; ++l) {
            if (textures[i][l][x] && textures[i][l][x][y]) {
              const sprite = new Phaser.Sprite(
                game, x * ts, y * ts,
                textures[i][l][x][y]);
              textures[i][l][x][y].sprite = sprite;
              sprite.smoothed = true;
              sprite.scale.set(1 / scaleF);

              if (l < 2) {
                sprite.x -= (AF - 1) * 0.5 * WALL_SIZE;
                sprite.y -= (AF - 1) * 0.5 * WALL_SIZE;
                sprite.target = 'affects' + (l + 1) + (i + 1);
              } else {
                sprite.target = 'walls' + (i + 1);
              }
            }
          }
        }
      }
    }

    game.mapTextures = game.mapTextures || [];
    game.mapTextures[i] = textures;
  }

  // GLOBAL FLOOR
  game.layers[2].sub.ground.removeAll();
  const groundSprite = game.layers[2].sub.ground.add(new Phaser.TileSprite(
    game, -game.w * 0.5, -game.h * 0.5, game.w * 2, game.h * 2, 'ground'));
  groundSprite.update = () => {
    groundSprite.x = game.ui.x - game.w * 0.5;
    groundSprite.y = game.ui.y - game.h * 0.5;
    groundSprite.tilePosition.x = -game.ui.x;
    groundSprite.tilePosition.y = -game.ui.y;
  };

  loadingProgress(100);
  await sleep(10);
  disableMessage();

  resize();
}