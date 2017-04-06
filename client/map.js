export async function loadMap() {
  console.log('loading map...');

  // JUST DATA
  client.w = client.map.width * WALL_SIZE;
  client.h = client.map.height * WALL_SIZE;

  const dictionary = loadMapDictionary(client.map);

  for (let i = 0; i < 6; ++i) {
    const lights = client.map.layers[i * 2 + 2];
    if (lights) {
      game.mapLights = [];
      for (const k in lights.objects) {
        const o = lights.objects[k];
        game.mapLights.push({
          x: (o.x + o.width * 0.5) / 32 * WALL_SIZE,
          y: (o.y + o.height * 0.5) / 32 * WALL_SIZE,
          rx: o.width / 64 * WALL_SIZE,
          ry: o.height / 64 * WALL_SIZE,
        });
      }
    }

    const ground = client.map.layers[i * 2];
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
    const scaleF = Math.round(game.scaleFactor * 8) / 16;
    global.ts = WALL_SIZE * 2;
    const xn = Math.ceil(client.map.width * WALL_SIZE / ts);
    const yn = Math.ceil(client.map.height * WALL_SIZE / ts);

    const ln = WALL_LAYERS.length + 2;
    const textures = [];
    for (let i = 0; i < ln; ++i) {
      textures[i] = [];
    }

    const AF = 2.4;
    global.AF = AF;

    const bricksView = new Phaser.TileSprite(
      game, 0, 0, WALL_SIZE * scaleF, WALL_SIZE * scaleF,
      'bricks');
    bricksView.isWall = true;
    bricksView.darken = new Phaser.TileSprite(
      game, 0, 0, WALL_SIZE * scaleF, WALL_SIZE * scaleF,
      makeDarken(bricksView));

    const stoneView = new Phaser.TileSprite(
      game, 0, 0, WALL_SIZE * scaleF, WALL_SIZE * scaleF,
      'stone');
    stoneView.isWall = true;
    stoneView.darken = new Phaser.TileSprite(
      game, 0, 0, WALL_SIZE * scaleF, WALL_SIZE * scaleF,
      makeDarken(stoneView));

    const maskView = new Phaser.Image(game, 0, 0, 'ground-mask');
    maskView.scale.set(AF * WALL_SIZE / maskView.width * scaleF);

    const renderMaskAffect = (image, x, y) => {
      const v = new Phaser.Image(game, 0, 0, image);
      v.scale.set(8 * WALL_SIZE * AF * scaleF / v.width);
      v.x = -x * WALL_SIZE * AF * scaleF;
      v.y = -y * WALL_SIZE * AF * scaleF;
      maskView.anchor.set(0.5);
      maskView.angle = Math.random() * 360;
      maskView.x = WALL_SIZE * AF * scaleF * 0.5;
      maskView.y = WALL_SIZE * AF * scaleF * 0.5;
      let bmd = game.make.bitmapData(
        WALL_SIZE * AF * scaleF, WALL_SIZE * AF * scaleF);
      bmd.alphaMask(v, maskView);

      return new Phaser.Image(game, 0, 0, bmd);
    }
    const wholeView = [];
    const iceView = [];
    const slowView = [];
    const lavaView = [];
    for (let i = 0; i < 16; ++i) {
      wholeView.push(renderMaskAffect('whole', i % 4, (i / 4) % 4));
      iceView.push(renderMaskAffect('ice', i % 4, (i / 4) % 4));
      slowView.push(renderMaskAffect('dirt', i % 4, (i / 4) % 4));
      lavaView.push(renderMaskAffect('lava', i % 4, (i / 4) % 4));
    }

    loadingProgress(Math.floor(i / 6 * 100 + 20 / 6));
    await sleep(10);
    for (let y = 0; y < client.map.height; ++y) {
      for (let x = 0; x < client.map.width; ++x) {
        const i = y * client.map.width + x;
        const v = ground.data[i];
        const slug = dictionary[v];

        let view;
        let padShift = 0;
        let conf = {};
        switch (slug) {
          case 'wall':
            view = stoneView;
            conf.layers = [0, 2, 4, 6];
            break;
          case 'wall_h1':
            view = stoneView;
            conf.layers = [0, 1];
            break;
          case 'wall_h2':
            view = stoneView;
            conf.layers = [0, 1, 2];
            break;
          case 'wall_h3':
            view = stoneView;
            conf.layers = [0, 1, 2, 3];
            break;
          case 'wall_h4':
            view = stoneView;
            conf.layers = [0, 2, 4];
            break;
          case 'wall_h5':
            view = stoneView;
            conf.layers = [0, 1, 3, 5];
            break;
          case 'wall2':
            view = bricksView;
            conf.layers = [0, 2, 4, 6];
            break;
          case 'whole':
            view = wholeView[x % 4 + (y % 4) * 4];
            padShift = 1;
            break;
          case 'ice':
            view = iceView[x % 4 + (y % 4) * 4];
            break;
          case 'slow':
            view = slowView[x % 4 + (y % 4) * 4];
            break;
          case 'lava':
            view = lavaView[x % 4 + (y % 4) * 4];
            padShift = 1;
            break;
          default:
            continue;
        }

        const f = scaleF;
        let pad = 0;
        if (!view.isWall) {
          pad = WALL_SIZE * (AF - 1);
        }

        view.isWall = view.isWall || false;

        const cx = Math.floor(x * WALL_SIZE / ts);
        const cy = Math.floor(y * WALL_SIZE / ts);

        if (!view.isWall) {
          textures[padShift][cx] = textures[padShift][cx] || [];
          textures[padShift][cx][cy] = textures[padShift][cx][cy] ||
            new Phaser.RenderTexture(
              game,
              Math.ceil((ts + pad) * f), Math.ceil((ts + pad) * f),
              null, null, 1);

          let v = view;
          textures[padShift][cx][cy].renderXY(
            v,
            (x * WALL_SIZE - cx * ts) * f,
            (y * WALL_SIZE - cy * ts) * f,
            false);
          textures[padShift][cx][cy].padShift = padShift;

          continue;
        }

        for (let i = 0; i < conf.layers.length; ++i) {
          let k = conf.layers[i] + 2;

          textures[k][cx] = textures[k][cx] || [];
          textures[k][cx][cy] = textures[k][cx][cy] || new Phaser.RenderTexture(
            game,
            Math.ceil((ts + pad) * f), Math.ceil((ts + pad) * f),
            null, null, 1);

          let pad = (k - 2) * WALL_SIZE * 0.25 / (ln - 3) +
            Math.random() * WALL_SIZE / 6;

          let px = 0;
          let py = 0;
          let v = view;
          if (i < conf.layers.length - 1) {
            v = view.darken;
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

          textures[k][cx][cy].renderXY(
            v,
            (x * WALL_SIZE - cx * ts + px) * scaleF,
            (y * WALL_SIZE - cy * ts + py) * scaleF,
            false);
        }
      }
    }
    console.log('done', xn * yn);
    loadingProgress(Math.floor(i / 6 * 100 + 60 / 6));
    console.log('2', Math.floor(i / 6 * 100 + 60 / 6));

    await sleep(10);

    for (let x = 0; x < xn; ++x) {
      for (let y = 0; y < yn; ++y) {
        for (let i = 0; i < ln; ++i) {
          if (textures[i][x] && textures[i][x][y]) {
            const sprite = new Phaser.Sprite(
              game, x * ts, y * ts,
              textures[i][x][y]);
            textures[i][x][y].sprite = sprite;
            sprite.smoothed = true;
            sprite.scale.set(1 / scaleF);

            if (i < 2) {
              if (i === 1) {
                sprite.target = 'affects2';
              } else {
                sprite.target = 'affects';
              }
              sprite.x -= (AF - 1) * 0.5 * WALL_SIZE;
              sprite.y -= (AF - 1) * 0.5 * WALL_SIZE;
            } else {
              sprite.target = WALL_LAYERS[i - 2].slug;
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