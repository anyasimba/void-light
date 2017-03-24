// common functions
export function httpGet(url) {
  return new Promise(r => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState < 4) {
        return;
      }
      if (xmlHttp.status === 200) {
        r(xmlHttp.responseText);
      } else {
        r();
      }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
  });
}

export function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
    "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, options) {
  options = options || {};

  let expires = options.expires;

  if (typeof expires === 'number' && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  let updatedCookie = name + "=" + value;

  for (let propName in options) {
    updatedCookie += "; " + propName;
    let propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

//
export function genLight() {
  const rt = new Phaser.RenderTexture(
    game, 128, 128, null, null, 1);
  const image = new Phaser.Image(game, 0, 0, 'light');
  image.blendMode = PIXI.blendModes.ADD;

  rt.renderXY(image, 0, 0, true);
  const light = new Phaser.Image(game, 0, 0, rt);
  light.rt = rt;
  light.rtImage = image;
  light.blendMode = PIXI.blendModes.ADD;
  light.anchor.set(0.5);
  light.f = 1 / game.layer.sub.light.scale.x;
  light.alpha *= lightAlpha;
  return light;
}
//
WebFont.load({
  custom: {
    families: ['Neucha', 'Tinos'],
    urls: ['https://fonts.googleapis.com/css?family=Neucha|Tinos'],

  },
  active: function () {
    onFontReady();
    console.log('Fonts loaded');
  },
  inactive: function () {}
});

let fontReady;
let windowReady;

function onFontReady() {
  fontReady = true;
  checkIfBothReady();
};

$(window).on('load', function () {
  windowReady = true;
  checkIfBothReady();
});

function checkIfBothReady() {
  let isEntered = false;

  if (windowReady && fontReady) {
    $('.username').val(getCookie('username'));
    if (getCookie('role')) {
      $('.role-wrap').css('display', 'none');
      $('.reset-button').click(e => {
        setCookie('role', '');
        setCookie('params', '');
        window.location.reload();
      });
    } else {
      $('.reset').css('display', 'none');
    }
    $('.login').css('display', 'block');
    $('.login-button').click(e => {
      if (isEntered) {
        return;
      }
      const username = $('.username').val();
      if (username.length <= 0) {
        alert('Введите имя для игры');
        return;
      }
      if (username.length > 24) {
        alert('Не более 24 символов');
        return;
      }
      isEntered = true;
      setCookie('username', username);
      setCookie('role', $('.role').val());
      setCookie('complex', $('.complex').val());
      $('.login').css('display', 'none');
      createGame();
    });

    $('body').keyup(e => {
      if (e.keyCode == 13) {
        $(".login-button").click();
      }
    });
  }
};


const WALL_LAYERS = [{
  slug: 'bottom',
}, {
  slug: 'middle',
}, {
  slug: 'walls',
}, ];

function createLayer() {
  const layer = new Phaser.Group(game);
  layer.sub = {};
  layer.sub.ground = layer.add(new Phaser.Group(game));
  layer.sub.bottom = layer.add(new Phaser.Group(game));
  layer.sub.deads = layer.add(new Phaser.Group(game));
  layer.sub.middle = layer.add(new Phaser.Group(game));
  layer.sub.walls = layer.add(new Phaser.Group(game));
  layer.sub.top = layer.add(new Phaser.Group(game));
  layer.sub.info = layer.add(new Phaser.Group(game));
  const q = 0.1;
  const rt = new Phaser.RenderTexture(
    game, Math.ceil(game.w * q * 2), Math.ceil(game.h * q * 2), null, null);
  layer.sub.light = layer.add(new Phaser.Sprite(game, 0, 0, rt));
  layer.sub.light.scale.set(1 / q);
  layer.sub.light.blendMode = PIXI.blendModes.MULTIPLY;
  return layer;
}

function create() {
  game.ui = new Phaser.Group(game)

  function resize(e) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    game.width = w;
    game.height = h;
    game.resF = 1;

    game.renderer.resize(w * game.resF, h * game.resF);

    const s = Math.min(w / 2560, h / 1440) * game.resF * 0.9;
    game.w = game.width / s;
    game.h = game.height / s;
    game.sceneWrap.x = game.width / 2;
    game.sceneWrap.y = game.height / 2;
    const uiS = Math.min(w / 2560, h / 1440) * game.resF;
    game.ui.w = game.width / uiS;
    game.ui.h = game.height / uiS;
    game.scene.scale.set(s);
    game.ui.scale.set(uiS / s);
    game.scaleFactor = s;
    game.uiScaleFactor = uiS;
  }
  resize();
  window.addEventListener('resize', resize);

  global.client = new Client;

  game.layer = game.scene.add(createLayer());

  game.texts = game.scene.add(new Phaser.Group(game));
  game.textEvents1 = game.scene.add(new Phaser.Group(game));
  game.textEvents2 = game.scene.add(new Phaser.Group(game));

  game.scene.add(game.ui);
  initUI();

  game.backSound = game.add.sound('back', 0.5, true);
  game.backSound.play();
  game.bossBackSound = game.add.sound('bossBack', 1, true);
  game.youDiedSound = game.add.sound('youDied', 1, false);

  game.bossAreaSound = game.add.sound('bossArea', 1, false);
  game.bossDeadSound = game.add.sound('bossDead', 1, false);

  showGameMenu(true);
  gameMenuView.switch(5);

  const preUpdate = game.scene.preUpdate;
  game.scene.preUpdate = () => {
    global.mx = ((game.input.x * game.resF - game.width * 0.5) /
      game.sceneWrap.scale.x - game.scene.x) / game.scaleFactor;
    global.my = ((game.input.y * game.resF - game.height * 0.5) /
      game.sceneWrap.scale.y - game.scene.y) / game.scaleFactor;
    global.dt = game.time.elapsed * 0.001;
    preUpdate.call(game.scene);
  }

  game.isCreated = true;
}

export function makeDarken(view) {
  const v = new Phaser.Sprite(game, 0, 0, view.texture);
  const rt = new Phaser.RenderTexture(
    game, v.width, v.height, null, null, 1);

  const filter = new Phaser.Graphics(game, 0, 0);
  filter.beginFill(0xAAAAAA, 1);
  filter.drawRect(0, 0, v.width, v.height);
  filter.endFill();
  filter.blendMode = PIXI.blendModes.MULTIPLY;
  rt.renderXY(v, 0, 0, true);
  rt.renderXY(filter, 0, 0, false);
  return rt;
}

global.loadingProgressValue = 0;
global.loadingProgressTargetValue = 0;
let loadingProgressInterval;
global.loadingProgressOpacity = 1;
let loadingProgressText;

function loadingProgress(v, text) {
  loadingProgressText = text || loadingProgressText;

  if (v === 0) {
    loadingProgressOpacity = 1;
    loadingProgressValue = 0;
  }
  loadingProgressTargetValue = v;
  loadingProgressInterval = loadingProgressInterval || setInterval(() => {
    const progress = Math.ceil(loadingProgressValue);
    if (progress >= 100 && loadingProgressOpacity <= 0) {
      $('.loading-wrap').css('display', 'none');
      clearInterval(loadingProgressInterval);
    } else {
      loadingProgressValue +=
        (loadingProgressTargetValue - loadingProgressValue) * 0.1;
      if (progress >= 100) {
        loadingProgressOpacity -= 0.1;
      }
      $('.loading').text('Loading ' + loadingProgressText + ', ' +
        progress + '%');
      $('.loading-wrap').css('opacity', loadingProgressOpacity);
    }
  }, 10);
}

function createGame() {
  global.game = new Phaser.Game(
    "100%", "100%", Phaser.CANVAS, '', {
      async preload() {
        $('.loading-wrap').css('display', 'block');
        global.lightAlpha = 0.1;

        game.load.image('light', 'assets/light.png');

        game.load.image('shield', 'assets/shield.png');
        game.load.image('sword', 'assets/sword.png');
        game.load.image('axe', 'assets/axe.png');

        game.load.image('player', 'assets/player.png');
        game.load.image('player-back', 'assets/player-back.png');

        game.load.image('stage1__mob1', 'assets/stage1__mob1.png');
        game.load.image('stage1__mob1--back',
          'assets/stage1__mob1--back.png');
        game.load.image('stage1__mob1--hit',
          'assets/stage1__mob1--hit.png');
        game.load.image('stage1__mob1--dead',
          'assets/stage1__mob1--dead.png');
        game.load.image('stage1__mob1--foot',
          'assets/stage1__mob1--foot.png');
        game.load.image('stage1__mob1--hand',
          'assets/stage1__mob1--hand.png');

        game.load.image('checkpoint', 'assets/checkpoint.png');
        game.load.image('item__heal__regular',
          'assets/item__heal__regular.png');
        game.load.image('item__heal__stone', 'assets/item__heal__stone.png');
        game.load.image('item__stamina__stone',
          'assets/item__stamina__stone.png');

        game.load.image('ground', 'assets/ground.jpg');
        game.load.image('bricks', 'assets/bricks.jpg');
        game.load.image('stone', 'assets/stone.png');
        game.load.image('door', 'assets/door.png');

        game.load.audio('back',
          'assets/back__doxent_-_Forgotten_Land.ogg');
        game.load.audio('bossBack',
          'assets/bossBack__essesq_-_Dark_Dicey_Sci_Fi_Soundtrack.ogg'
        );

        game.load.audio('door',
          'assets/door__233389__laiaoreka__automatic-door.ogg');

        game.load.audio('boss',
          'assets/boss__essesq_-_Dark_Dicey_Sci_Fi_Soundtrack.ogg');
        game.load.audio('hit',
          'assets/hit__86003__nextmaking__hitting-body-with-blood.ogg'
        );
        game.load.audio('hit1',
          'assets/hit1__351754__urupin__whistle-of-a-twig-in-air.ogg');
        game.load.audio('hit2',
          'assets/hit2__351754__urupin__whistle-of-a-twig-in-air.ogg');
        game.load.audio('hit3',
          'assets/hit3__351754__urupin__whistle-of-a-twig-in-air.ogg');
        game.load.audio('hit4',
          'assets/hit4__351754__urupin__whistle-of-a-twig-in-air.ogg');
        game.load.audio('hit5',
          'assets/hit5__351754__urupin__whistle-of-a-twig-in-air.ogg');

        game.load.audio('block',
          'assets/block__326845__johnbuhr__sword-clash-25.ogg');

        game.load.audio('jump',
          'assets/jump__260188__splicesound__young-boy-grunts-for-body-impact.ogg'
        );
        game.load.audio('mobJump',
          'assets/mob1Jump__181068__lolamadeus__zombie-vocals-grunts.ogg'
        );

        game.load.audio('mob1Die',
          'assets/mob1Die__76964__michel88__grunt2.ogg');
        game.load.audio('youDied',
          'assets/youDied__onlymeith_-_Toward_Isolation.ogg');

        game.load.audio('bossArea',
          'assets/bossArea__377887__debsound__monster-072.ogg');
        game.load.audio('bossDead',
          'assets/bossDead__56304__syna-max__monster-death-scream.ogg'
        );

        game.stage.backgroundColor = 0x101010;

        game.stage.disableVisibilityChange = true;
        game.time.advancedTiming = true;
        game.scaleMode = Phaser.FILL_WINDOW_FIXED_ASPECT;

        game.sceneWrap = game.add.group();
        game.scene = game.sceneWrap.add(new Phaser.Group(game));

        game.canvas.oncontextmenu = function (e) {
          e.preventDefault();
        }

        loadingProgress(0, 'data');
        game.load.onFileComplete.add((progress, cacheKey, success,
          totalLoaded, totalFiles) => {
          loadingProgress(progress);
        });
        console.log('Game preloaded');
      },
      create: create,
      update() {
        if (!game.isCreated) {
          return;
        }
        delete global.mouseCapture;

        if (client && client.player) {
          const targetX = client.player.pos.x +
            client.player.speed.x +
            (mx - client.player.pos.x) * 0.2;
          const targetY = client.player.pos.y +
            client.player.speed.y +
            (my - client.player.pos.y) * 0.2;

          const dx = -targetX *
            game.scaleFactor -
            game.scene.x;
          const dy = -targetY *
            game.scaleFactor -
            game.scene.y;

          const f = (1 - Math.pow(0.1, dt * 0.6));
          game.scene.x += dx * f;
          game.scene.y += dy * f;

          const speed = client.player.speed.length();
          const zoom =
            (game.preZoom || 1) *
            (game.actionPreZoom || 1);
          game.zoomF = (game.zoomF || 1);
          const f2 = (1 - Math.pow(0.1, dt * 0.3));
          game.zoomF += (zoom - game.zoomF) * f2;
          game.sceneWrap.scale.set(game.zoomF);

          game.ui.x = -game.scene.x / game.scaleFactor - game.w * 0.5 /
            game.sceneWrap.scale.x;
          game.ui.y = -game.scene.y / game.scaleFactor - game.h * 0.5 /
            game.sceneWrap.scale.y;
          game.ui.scale.set(game.uiScaleFactor / game.scaleFactor / game.zoomF);

          game.cameraPos = new vec3({
            x: -game.scene.x / game.scaleFactor,
            y: -game.scene.y / game.scaleFactor,
          });

          if (game.layer.sub.light) {
            game.layer.sub.light.x = game.ui.x;
            game.layer.sub.light.y = game.ui.y;
          }
        }

        if (game.layer.sub.light) {
          const light = game.layer.sub.light;
          const light2 = game.layer.sub.light2;
          if (!game.lightClear) {
            const w = light.width * light.scale.x;
            const h = light.height * light.scale.y;
            game.lightClear = new Phaser.Graphics(game);
            game.lightClear.beginFill(0x000000, lightAlpha);
            game.lightClear.drawRect(0, 0, w, h);
            game.lightClear.endFill();
            game.lightClear.blendMode = PIXI.blendModes.MULTIPLY;

            game.lightClear2 = new Phaser.Graphics(game);
            game.lightClear2.beginFill(0x452025, lightAlpha);
            game.lightClear2.drawRect(0, 0, w, h);
            game.lightClear2.endFill();
            game.lightClear2.blendMode = PIXI.blendModes.ADD;
          }
          light.texture.renderXY(game.lightClear, 0, 0, false);
          light.texture.renderXY(game.lightClear2, 0, 0, false);
        }

        const makeSubLayer3D = (layer, f) => {
          const p = game.cameraPos;
          layer.scale.set(f);
          layer.x = -p.x * (f - 1);
          layer.y = -p.y * (f - 1);
        };
        const makeLayer3D = layer => {
          const f = 6 * game.sceneWrap.scale.x;
          makeSubLayer3D(layer.sub.middle, 1 + 0.01 * f);
          makeSubLayer3D(layer.sub.top, 1 + 0.02 * f);
          makeSubLayer3D(layer.sub.walls, 1 + 0.02 * f);
          makeSubLayer3D(layer.sub.info, 1 + 0.03 * f);
        }

        if (global.client && client.player) {
          makeLayer3D(game.layer);
        }

        if (client.needLoadMap) {
          loadingProgress(0, 'map');

          delete client.needLoadMap;
          client.w = client.map.width * WALL_SIZE;
          client.h = client.map.height * WALL_SIZE;

          const dictionary = loadMapDictionary(client.map);

          const lights = client.map.layers[2];
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

          const ground = client.map.layers[0];
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

          const scaleF = Math.round(game.scaleFactor * 8) / 8;
          const scaleLF = scaleF / WALL_SIZE * 2;
          const scaleLF2 = scaleF / WALL_SIZE * 3;
          global.ts = WALL_SIZE * 4;
          const xn = Math.ceil(client.map.width * WALL_SIZE / ts);
          const yn = Math.ceil(client.map.height * WALL_SIZE / ts);

          const ln = WALL_LAYERS.length + 2;
          const textures = [];
          for (let i = 0; i < ln; ++i) {
            textures[i] = [];
          }

          for (let x = 0; x < xn; ++x) {
            for (let y = 0; y < yn; ++y) {
              for (let i = 0; i < ln; ++i) {
                let f = scaleF;
                if (i === 0) {
                  f = scaleLF;
                }
                if (i === 1) {
                  f = scaleLF2;
                }
                const tex = new Phaser.RenderTexture(
                  game,
                  Math.ceil(ts * f) + 3, Math.ceil(ts * f) + 3,
                  null, null, 1);

                textures[i][x] = textures[i][x] || [];
                textures[i][x][y] = tex;
              }
            }
          }

          const wholeView = new Phaser.Graphics(
            game, 0, 0);
          wholeView.padShift = 1;
          wholeView.beginFill(0x000000, 1.0);
          wholeView.drawRect(0, 0,
            WALL_SIZE * scaleLF2 + 1, WALL_SIZE * scaleLF2 + 1);
          wholeView.endFill();
          const iceView = new Phaser.Graphics(
            game, 0, 0);
          iceView.beginFill(0x4ba4b4, 1.0);
          iceView.drawRect(0, 0,
            WALL_SIZE * scaleLF + 1, WALL_SIZE * scaleLF + 1);
          iceView.endFill();
          const slowView = new Phaser.Graphics(
            game, 0, 0);
          slowView.beginFill(0x451401, 1.0);
          slowView.drawRect(0, 0,
            WALL_SIZE * scaleLF + 1, WALL_SIZE * scaleLF + 1);
          slowView.endFill();
          const lavaView = new Phaser.Graphics(
            game, 0, 0);
          lavaView.beginFill(0x992200, 1.0);
          lavaView.drawRect(0, 0,
            WALL_SIZE * scaleLF + 1, WALL_SIZE * scaleLF + 1);
          lavaView.endFill();

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

          console.log('loading map...');
          loadingProgress(10);
          for (let y = 0; y < client.map.height; ++y) {
            for (let x = 0; x < client.map.width; ++x) {
              const getView = (x, y) => {
                if (x < 0 || y < 0 ||
                  x >= client.map.width ||
                  y >= client.map.height) {

                  return;
                }
                const i = y * client.map.width + x;
                const v = ground.data[i];
                const slug = dictionary[v];

                let view;
                switch (slug) {
                  case 'wall':
                    view = stoneView;
                    break;
                  case 'wall2':
                    view = bricksView;
                    break;
                  case 'whole':
                    view = wholeView;
                    break;
                  case 'ice':
                    view = iceView;
                    break;
                  case 'slow':
                    view = slowView;
                    break;
                  case 'lava':
                    view = lavaView;
                    break;
                  default:
                    return;
                }
                view.padShift = view.padShift || 0;
                view.isWall = view.isWall || false;
                return view;
              }
              const view = getView(x, y);
              if (view) {
                const f = scaleF;
                if (!view.isWall) {
                  let f = scaleLF;
                  const padShift = view.padShift;
                  if (padShift) {
                    f = scaleLF2;
                  }
                  let v = view;
                  const cx = Math.floor(x * WALL_SIZE / ts);
                  const cy = Math.floor(y * WALL_SIZE / ts);
                  const drawTex = (cx, cy) => {
                    if (textures[padShift][cx] &&
                      textures[padShift][cx][cy]) {

                      textures[padShift][cx][cy].isUsed = true;
                      textures[padShift][cx][cy].renderXY(
                        v,
                        (x * WALL_SIZE - cx * ts) * f + 1,
                        (y * WALL_SIZE - cy * ts) * f + 1,
                        false);
                      textures[padShift][cx][cy].padShift = padShift;
                    }
                  }

                  drawTex(cx, cy);
                } else {
                  for (let i = 2; i < ln; ++i) {
                    let pad = (i - 2) * WALL_SIZE * 0.25 / (ln - 3) + Math.random() *
                      WALL_SIZE / 6;

                    let px = 0;
                    let py = 0;
                    let v = view;
                    if (i < ln - 1) {
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
                    const sf = (0.7 + i * 0.3 / (ln - 3));
                    v.tilePosition.x = (-x * WALL_SIZE - px) / sf;
                    v.tilePosition.y = (-y * WALL_SIZE - py) / sf;
                    v.tileScale.x = f * sf;
                    v.tileScale.y = f * sf;
                    const cx = Math.floor(x * WALL_SIZE / ts);
                    const cy = Math.floor(y * WALL_SIZE / ts);
                    textures[i][cx][cy].isUsed = true;
                    textures[i][cx][cy].renderXY(
                      v,
                      (x * WALL_SIZE - cx * ts + px) * scaleF,
                      (y * WALL_SIZE - cy * ts + py) * scaleF,
                      false);
                  }
                }
              }
            }
          }
          console.log('done', xn * yn);
          loadingProgress(50);

          const groundSprite = game.layer.sub.ground.add(new Phaser.TileSprite(
            game, 0, 0, game.w * 2, game.h * 2, 'ground'));
          groundSprite.update = () => {
            groundSprite.x = game.ui.x;
            groundSprite.y = game.ui.y;
            groundSprite.tilePosition.x = -game.ui.x;
            groundSprite.tilePosition.y = -game.ui.y;
          };

          for (let x = 0; x < xn; ++x) {
            for (let y = 0; y < yn; ++y) {
              const sprites = [];
              let hasUpdate = false;
              let lowLevels = 0;
              for (let i = 0; i < ln; ++i) {
                if (textures[i][x][y].isUsed) {
                  const sprite = new Phaser.Sprite(
                    game, x * ts, y * ts,
                    textures[i][x][y]);
                  sprites.push(sprite);
                  sprite.visible = false;
                  sprite.scale.set(1 / scaleF);
                  if (!hasUpdate) {
                    hasUpdate = true;
                    sprite.update = () => {
                      if (global.client && global.client.player) {
                        const cx = x * ts + ts * 0.5;
                        const cy = y * ts + ts * 0.5;
                        const dx = Math.abs(cx - game.cameraPos.x);
                        const dy = Math.abs(cy - game.cameraPos.y);
                        const fx = 1 / game.sceneWrap.scale.x;
                        const fy = 1 / game.sceneWrap.scale.y;
                        const w = (game.w * fx + ts) * 0.5;
                        const h = (game.h * fy + ts) * 0.5;
                        let b = lowLevels;
                        if (dx <= w && dy <= h) {
                          for (let i = b; i < sprites.length; ++i) {
                            sprites[i].visible = true;
                            ++global.SPRITES_N;
                          }
                        } else {
                          for (let i = b; i < sprites.length; ++i) {
                            sprites[i].visible = false;
                          }
                        }
                        if (lowLevels) {
                          const w0 = w + 200;
                          const h0 = h + 200;
                          if (dx <= w0 && dy <= h0) {
                            for (let i = 0; i < lowLevels; ++i) {
                              sprites[i].visible = true;
                              ++global.SPRITES_N;
                            }
                          } else {
                            for (let i = 0; i < lowLevels; ++i) {
                              sprites[i].visible = false;
                            }
                          }
                        }
                      }
                    };
                  }
                  //sprite.tint = 0x888888 + Math.random() * 0x777777;
                  sprite.cacheAsBitmap = true;
                  if (i < 2) {
                    let f = scaleLF;
                    if (i === 1) {
                      f = scaleLF2;
                    }
                    ++lowLevels;
                    sprite.scale.set(1 / f);
                    sprite.x -= 1.5 / f;
                    sprite.y -= 1.5 / f;
                    game.layer.sub.ground.add(sprite);
                  } else {
                    game.layer.sub[WALL_LAYERS[i - 2].slug].add(sprite);
                  }
                }
              }
            }
          }

          bricksView.destroy();
          bricksView.darken.destroy();

          loadingProgress(100);
        }

        global.SPRITES_N = global.SPRITES_N || 0;
        //console.log(global.SPRITES_N);
        global.SPRITES_N = 0;
      },

      render() {
        game.debug.text(game.time.fps, 20, 20, '#FFFFFF');
      },
    });
}