export async function loadMap() {
  console.log('loading map...');

  // JUST DATA
  client.w = client.map.width * WALL_SIZE;
  client.h = client.map.height * WALL_SIZE;

  const dictionary = loadMapDictionary(client.map);

  let scaleF;
  if (false) {
    scaleF = Math.round(game.scaleFactor * 8) / 8;
    global.ts = WALL_SIZE * 2;
  } else {
    scaleF = game.scaleFactor;
    global.ts = WALL_SIZE * 2;
  }
  scaleF *= 0.8;
  console.log('tex scale factor', scaleF);
  const xn = Math.ceil(client.map.width * WALL_SIZE / ts);
  const yn = Math.ceil(client.map.height * WALL_SIZE / ts);

  const ln = 7;

  const AF = 2.5;
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
  const floorTexs = [
    'grass',
    'grass2',
  ];

  const views = {};
  for (let i = 0; i < 16; ++i) {
    for (let j = 0; j < texs.length; ++j) {
      const view = renderMaskAffect(texs[j], i % 4, Math.floor(i / 4) % 4);
      views[texs[j]] = views[texs[j]] || [];
      views[texs[j]].push(view);

      view.darkView = new Phaser.Image(game, 0, 0, makeDarken(view, 0x80808080));
    }
  }
  for (let i = 0; i < wallTexs.length; ++i) {
    const v = new Phaser.Image(game, 0, 0, wallTexs[i]);
    v.scale.set(scaleF);
    const rt = new Phaser.RenderTexture(
      game, v.texture.width * scaleF, v.texture.height * scaleF, null, null,
      true);
    rt.renderXY(v, 0, 0, true);

    const view = new Phaser.TileSprite(
      game, 0, 0, 0, 0, rt);
    views[wallTexs[i]] = view;

    view.darkView = new Phaser.TileSprite(
      game, 0, 0, 0, 0, makeDarken(view, 0x80808080));
  }

  const floorViews = {};
  for (let i = 0; i < floorTexs.length; ++i) {
    const v = new Phaser.Image(game, 0, 0, floorTexs[i]);
    v.scale.set(game.scaleFactor);
    const rt = new Phaser.RenderTexture(
      game, v.width * game.scaleFactor, v.height * game.scaleFactor, null,
      null,
      true);
    rt.renderXY(v, 0, 0, true);

    floorViews[floorTexs[i]] = rt;
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
        let h = heights.data[i];
        h = dictionary[h];
        if (h === undefined) {
          h = 0;
        } else {
          h = h.slice(-1);
        }
        if (slug) {
          grid[x] = grid[x] || [];
          grid[x][y] = [slug, h];
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
      textures[i][3] = [];
      textures[i][4] = [];
    }

    loadingProgress(Math.floor((i + 1) / 6 * 30 + 30));
    await sleep(10);
    for (let m = 0; m < 2; ++m) {
      for (let y = client.map.height - 1; y >= 0; --y) {
        for (let x = client.map.width - 1; x >= 0; --x) {
          if (!grid[x] || !grid[x][y]) {
            continue;
          }

          const slug = grid[x][y][0];
          const h = grid[x][y][1];

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

          let lb = h;
          let le = h;
          if (m === 1) {
            padShift = 4;
            if (h <= 0) {
              continue;
            }
            let minH = h - 1;
            for (let ix = x - 1; ix <= x + 1; ++ix) {
              for (let iy = y - 1; iy <= y + 1; ++iy) {
                if (ix !== x && iy !== y) {
                  if (grid[ix] && grid[ix][iy]) {
                    minH = Math.min(minH, grid[ix][iy][1]);
                  } else {
                    minH = 0;
                  }
                }
              }
            }

            lb = minH;
            le = h - 1;
          }
          let conf = [];
          if (lb === le) {
            conf = [lb];
          } else if ((le - lb) === 1) {
            conf = [lb, le];
          } else if ((le - lb) === 2) {
            conf = [lb, lb + 1, le];
          } else if ((le - lb) === 3) {
            conf = [lb, le];
          } else if ((le - lb) === 4) {
            conf = [lb, lb + 2, le];
          } else if ((le - lb) === 5) {
            conf = [lb, lb + 3, le];
          }
          if (lb > 0) {
            conf.unshift(0);
          }

          if (!isWall) {
            for (let i = 0; i < conf.length; ++i) {
              const k = conf[i];
              textures[k][padShift][cx] = textures[k][padShift][cx] || [];
              if (false) {
                textures[k][padShift][cx][cy] = textures[k][padShift][cx][cy] ||
                  new Phaser.RenderTexture(
                    game,
                    Math.ceil((ts + texPad) * f), Math.ceil((ts + texPad) * f),
                    null, null, 1);
              } else {
                textures[k][padShift][cx][cy] = textures[k][padShift][cx][cy] ||
                  new Phaser.Group(game, null);
                textures[k][padShift][cx][cy].x = cx * ts;
                textures[k][padShift][cx][cy].y = cy * ts;
              }

              const vx = x + k;
              const vy = y + k;
              let v = view[vx % 4 + (vy % 4) * 4];
              if (k < h) {
                v = v.darkView;
              }

              let px = 0;
              let py = 0;
              let pad = 0;
              if (m === 1) {
                px = -WALL_SIZE * 0.25;
                py = -WALL_SIZE * 0.25;
              }
              v.scale.x = 1 - px * 2 / AF / WALL_SIZE;
              v.scale.y = 1 - py * 2 / AF / WALL_SIZE;

              if (false) {
                textures[k][padShift][cx][cy].renderXY(
                  v,
                  (x * WALL_SIZE + px - cx * ts) * f,
                  (y * WALL_SIZE + py - cy * ts) * f,
                  false);
              } else {
                const s = new Phaser.Image(game,
                  (x * WALL_SIZE + px - cx * ts) * f,
                  (y * WALL_SIZE + py - cy * ts) * f,
                  v.texture);
                s.scale.x = v.scale.x;
                s.scale.y = v.scale.y;
                textures[k][padShift][cx][cy].add(s);
                // textures[k][padShift][cx][cy] = s;
                // s.x += cx * ts;
                // s.y += cy * ts;
              }
            }
            continue;
          }

          for (let i = 0; i < conf.length; ++i) {
            const k = conf[i];

            let padS = 2;
            if (m === 1) {
              padS = 3;
            }
            if (false) {
              textures[k][padS][cx] = textures[k][padS][cx] || [];
              textures[k][padS][cx][cy] = textures[k][padS][cx][cy] ||
                new Phaser.RenderTexture(
                  game,
                  Math.ceil((ts + texPad) * f), Math.ceil((ts + texPad) * f),
                  null, null, 1);
            } else {
              textures[k][padS][cx] = textures[k][padS][cx] || [];
              textures[k][padS][cx][cy] = textures[k][padS][cx][cy] ||
                new Phaser.Group(game, null);
              textures[k][padS][cx][cy].x = cx * ts;
              textures[k][padS][cx][cy].y = cy * ts;
            }

            let pad = k * WALL_SIZE * 0.2 / 6 +
              Math.random() * WALL_SIZE / 6;

            let px = 0;
            let py = 0;
            let v = view;
            if (k < h) {
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
            const sf = WALL_SIZE * 4 / v.texture.width * scaleF;
            v.tilePosition.x = (-x * WALL_SIZE - px) * f / sf + k * 19562;
            v.tilePosition.y = (-y * WALL_SIZE - py) * f / sf + k * 23250;
            v.tileScale.x = sf;
            v.tileScale.y = sf;

            if (false) {
              textures[k][padS][cx][cy].renderXY(
                v,
                (x * WALL_SIZE - cx * ts + px) * scaleF,
                (y * WALL_SIZE - cy * ts + py) * scaleF,
                false);
            } else {
              const s = new Phaser.TileSprite(game,
                (x * WALL_SIZE + px - cx * ts) * f,
                (y * WALL_SIZE + py - cy * ts) * f,
                v.width, v.height,
                v.texture);
              s.tilePosition.x = v.tilePosition.x;
              s.tilePosition.y = v.tilePosition.y;
              s.tileScale.x = v.tileScale.x;
              s.tileScale.y = v.tileScale.y;
              textures[k][padS][cx][cy].add(s);
              // textures[k][padS][cx][cy] = s;
              // s.x += cx * ts;
              // s.y += cy * ts;
            }
          }
        }
      }
    }
    console.log('done', xn * yn);
    loadingProgress(Math.floor((i + 1) / 6 * 60 + 30));

    await sleep(10);

    for (let x = 0; x < xn; ++x) {
      for (let y = 0; y < yn; ++y) {
        for (let i = 0; i < ln; ++i) {
          for (let l = 0; l < 5; ++l) {
            if (textures[i][l][x] && textures[i][l][x][y]) {
              let sprite;
              if (false) {
                sprite = new Phaser.Sprite(
                  game, x * ts, y * ts,
                  textures[i][l][x][y]);
                sprite.smoothed = true;
              } else {
                sprite = textures[i][l][x][y];
              }
              textures[i][l][x][y].sprite = sprite;
              sprite.scale.set(1 / scaleF);

              if (l < 2) {
                sprite.x -= (AF - 1) * 0.5 * WALL_SIZE;
                sprite.y -= (AF - 1) * 0.5 * WALL_SIZE;
                sprite.target = 'affects' + (l + 1) + (i + 1);
              } else if (l === 2) {
                sprite.target = 'walls' + (i + 1);
              } else if (l === 3) {
                sprite.target = 'shadows1' + (i + 1);
              } else if (l === 4) {
                sprite.x -= (AF - 1) * 0.5 * WALL_SIZE;
                sprite.y -= (AF - 1) * 0.5 * WALL_SIZE;
                sprite.target = 'shadows2' + (i + 1);
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
  const floorTex = floorViews['grass2'];
  const groundSprite = game.layers[2].sub.ground.add(new Phaser.TileSprite(
    game, -game.w * 0.5, -game.h * 0.5, game.w * 2, game.h * 2,
    floorTex));
  const grassScale = game.scaleFactor * 0.9;
  groundSprite.tileScale.set(4 * WALL_SIZE / floorTex.width * grassScale);
  groundSprite.update = () => {
    groundSprite.x = game.ui.x - game.w * 0.5;
    groundSprite.y = game.ui.y - game.h * 0.5;
    groundSprite.x = Math.max(groundSprite.x, 0);
    groundSprite.y = Math.max(groundSprite.y, 0);
    groundSprite.width = Math.max(Math.min(
      game.w * 2, client.w - groundSprite.x), 0);
    groundSprite.height = Math.max(Math.min(
      game.h * 2, client.h - groundSprite.y), 0);
    groundSprite.tilePosition.x = -groundSprite.x / 4 / WALL_SIZE * floorTex
      .width / grassScale;
    groundSprite.tilePosition.y = -groundSprite.y / 4 / WALL_SIZE * floorTex
      .width / grassScale;
  };

  loadingProgress(100);
  await sleep(10);
  disableMessage();

  resize();
}