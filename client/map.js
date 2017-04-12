export async function loadMap() {
  console.log('loading map...');

  // JUST DATA
  client.w = client.map.width * WALL_SIZE;
  client.h = client.map.height * WALL_SIZE;

  const dictionary = loadMapDictionary(client.map);

  let scaleF = game.scaleFactor;
  global.ts = WALL_SIZE;
  const tc = 3;
  const rs = Math.min(WALL_SIZE * game.scaleFactor, 512 / tc);
  console.log('RS', rs);
  scaleF = rs / WALL_SIZE;
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

  const renderMaskAffect = (image, x, y, w) => {
    const v = new Phaser.TileSprite(
      game, 0, 0,
      WALL_SIZE * (2 + w + AF * 2) * scaleF,
      WALL_SIZE * (2 + AF * 2) * scaleF,
      image);
    const f = tc * WALL_SIZE / v.texture.width * scaleF;
    v.tileScale.set(f);
    v.tilePosition.x = (AF - 1) * 0.5 * WALL_SIZE * scaleF / f;
    v.tilePosition.y = (AF - 1) * 0.5 * WALL_SIZE * scaleF / f;
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
  const tileViews = {};
  for (let j = 0; j < texs.length; ++j) {
    for (let i = 0; i < tc * tc; ++i) {
      const view = renderMaskAffect(texs[j], i % tc, Math.floor(i / tc) % tc,
        2);
      views[texs[j]] = views[texs[j]] || [];
      views[texs[j]].push(view);

      view.darkView = new Phaser.Image(game, 0, 0, makeDarken(view, 0xBBBBBB));
    }

    for (let w = 1; w <= tc - 1; ++w) {
      for (let k = 0; k < tc; ++k) {
        const rt = new Phaser.RenderTexture(
          game,
          (AF + w) * WALL_SIZE * scaleF,
          AF * WALL_SIZE * scaleF,
          null, null, 1);
        let x = 0;
        let y = 0;
        for (let l = tc - 1 - w; l <= tc - 1; ++l) {
          rt.renderXY(views[texs[j]][k * tc + l], x, y, false);
          x += WALL_SIZE * scaleF;
        }
        tileViews[texs[j]] = tileViews[texs[j]] || [];
        tileViews[texs[j]][w] = tileViews[texs[j]][w] || [];
        tileViews[texs[j]][w][k] = rt;

        rt.darkView = makeDarken(new Phaser.Image(game, 0, 0, rt), 0xBBBBBB);
      }
    }
  }
  for (let i = 0; i < wallTexs.length; ++i) {
    const slug = wallTexs[i];
    const v = new Phaser.Image(game, 0, 0, wallTexs[i]);
    const f = tc * WALL_SIZE / v.texture.width * scaleF;
    v.scale.set(f);

    for (let w = 1; w < tc; ++w) {
      for (let k = 0; k < tc; ++k) {
        const rt = new Phaser.RenderTexture(
          game,
          (w + 1) * WALL_SIZE * scaleF,
          WALL_SIZE * scaleF,
          null, null, 1);
        let x = -(tc - 1 - w) * WALL_SIZE * scaleF;
        let y = -k * WALL_SIZE * scaleF;
        rt.renderXY(v, x, y, false);
        tileViews[slug] = tileViews[slug] || [];
        tileViews[slug][w] = tileViews[slug][w] || [];
        tileViews[slug][w][k] = rt;

        rt.darkView = makeDarken(new Phaser.Image(game, 0, 0, rt), 0xBBBBBB);
      }
    }

    for (let k = 0; k < tc; ++k) {
      for (let l = 0; l < tc; ++l) {
        console.log(WALL_SIZE * scaleF);
        const rt = new Phaser.RenderTexture(
          game,
          WALL_SIZE * scaleF,
          WALL_SIZE * scaleF,
          null, null, 1);
        let x = -l * WALL_SIZE * scaleF;
        let y = -k * WALL_SIZE * scaleF;
        rt.renderXY(v, x, y, false);
        views[slug] = views[slug] || [];
        views[slug][l] = views[slug][l] || [];
        views[slug][l][k] = rt;

        rt.darkView = makeDarken(new Phaser.Image(game, 0, 0, rt), 0xBBBBBB);
      }
    }
  }

  const floorViews = {};
  for (let i = 0; i < floorTexs.length; ++i) {
    const v = new Phaser.Image(game, 0, 0, floorTexs[i]);
    const f = tc * WALL_SIZE / v.texture.width * scaleF;
    v.scale.set(f);
    const rt = new Phaser.RenderTexture(
      game, v.width, v.height, null, null, true);
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
          let needConf = [];
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
                    if (grid[ix][iy][1] < h) {
                      needConf[grid[ix][iy][1]] = true;
                    }
                  } else {
                    minH = 0;
                    needConf[0] = true;
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
          if (m === 1) {
            conf.unshift(0);
            for (let i = 0; i < 7; ++i) {
              if (needConf[i]) {
                conf.push(i);
              }
            }

            conf = conf.filter((value, index, self) =>
              self.indexOf(value) === index);
          }

          function isTiled() {
            if (grid[x + 1] && grid[x + 1][y] &&
              grid[x + 1][y][0] === grid[x][y][0] &&
              grid[x + 1][y][1] === grid[x][y][1]) {

              return true;
            }
          }

          if (!isWall) {
            for (let i = 0; i < conf.length; ++i) {
              const k = conf[i];

              const vx = x + Math.floor(k);
              const vy = y + Math.floor(k);
              let v = view[vx % tc + (vy % tc) * tc];
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
              const sx = (1 - px * 2 / AF / WALL_SIZE) / scaleF;
              const sy = (1 - py * 2 / AF / WALL_SIZE) / scaleF;

              px += (x - (AF - 1) * 0.5) * WALL_SIZE;
              py += (y - (AF - 1) * 0.5) * WALL_SIZE;

              textures[k][padShift][cx] = textures[k][padShift][cx] || [];
              textures[k][padShift][cx + 1] = textures[k][padShift][cx + 1] ||
                [];
              if (isTiled() && textures[k][padShift][cx + 1][cy]) {
                const s = textures[k][padShift][cx + 1][cy];
                if (s.tileCount && s.tileCount < tc) {
                  textures[k][padShift][cx][cy] = s;
                  s.x -= WALL_SIZE;
                  ++s.tileCount;
                  s.texture = tileViews[slug][s.tileCount - 1][vy % tc];
                  if (k < h) {
                    s.texture = s.texture.darkView;
                  }
                  continue;
                }
              }

              const s = new Phaser.Image(game, px, py, v.texture);
              if ((vx % tc) === tc - 1) {
                s.tileCount = 1;
              }
              s.scale.x = sx;
              s.scale.y = sy;
              s.smoothed = true;
              textures[k][padShift][cx][cy] = s;
            }
            continue;
          }

          for (let i = 0; i < conf.length; ++i) {
            const k = conf[i];

            let padShift = 2;
            if (m === 1) {
              padShift = 3;
            }

            let px = -1 / scaleF;
            let py = -1 / scaleF;
            const vx = x + Math.floor(k);
            const vy = y + Math.floor(k);
            let v = views[slug][vx % tc][vy % tc];
            if (k < h) {
              v = v.darkView;
            }

            const sx = (1 - px * 2 / WALL_SIZE * scaleF) / scaleF;
            const sy = (1 - py * 2 / WALL_SIZE * scaleF) / scaleF;
            px += cx * ts;
            py += cy * ts;

            textures[k][padShift][cx] = textures[k][padShift][cx] || [];
            textures[k][padShift][cx + 1] = textures[k][padShift][cx + 1] || [];
            if (isTiled() && textures[k][padShift][cx + 1][cy]) {
              const s = textures[k][padShift][cx + 1][cy];
              if (s.tileCount && s.tileCount < tc) {
                textures[k][padShift][cx][cy] = s;
                s.x -= WALL_SIZE;
                ++s.tileCount;
                s.texture = tileViews[slug][s.tileCount - 1][vy % tc];
                if (k < h) {
                  s.texture = s.texture.darkView;
                }
                continue;
              }
            }

            const s = new Phaser.Image(game, px, py, v);
            if ((vx % tc) === tc - 1) {
              s.tileCount = 1;
            }
            s.scale.x = sx;
            s.scale.y = sy;
            s.smoothed = true;
            textures[k][padShift][cx][cy] = s;
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
              let sprite = textures[i][l][x][y];

              if (l < 2) {
                sprite.target = 'affects' + (l + 1) + (i + 1);
              } else if (l === 2) {
                sprite.target = 'walls' + (i + 1);
              } else if (l === 3) {
                sprite.target = 'shadows1' + (i + 1);
              } else if (l === 4) {
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
  const grassScale = tc * WALL_SIZE / floorTex.width;
  groundSprite.tileScale.set(grassScale);
  groundSprite.update = () => {
    groundSprite.x = game.ui.x - game.w * 0.5;
    groundSprite.y = game.ui.y - game.h * 0.5;
    groundSprite.x = Math.max(groundSprite.x, 0);
    groundSprite.y = Math.max(groundSprite.y, 0);
    groundSprite.width = Math.max(Math.min(
      game.w * 2, client.w - groundSprite.x), 0);
    groundSprite.height = Math.max(Math.min(
      game.h * 2, client.h - groundSprite.y), 0);
    groundSprite.tilePosition.x = (-groundSprite.x) / grassScale;
    groundSprite.tilePosition.y = (-groundSprite.y) / grassScale;
  }
  loadingProgress(100);
  await sleep(10);
  disableMessage();

  resize();
}