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


export const WALL_LAYERS = [{
  slug: 'walls',
}, {
  slug: 'walls2',
}, {
  slug: 'walls3',
}, ];

function createLayer() {
  const layer = new Phaser.Group(game);
  layer.sub = {};
  layer.sub.ground = layer.add(new Phaser.Group(game));
  layer.sub.affects = layer.add(new Phaser.Group(game));
  layer.sub.affects2 = layer.add(new Phaser.Group(game));
  layer.sub.bottom = layer.add(new Phaser.Group(game));
  layer.sub.walls = layer.add(new Phaser.Group(game));
  layer.sub.deads = layer.add(new Phaser.Group(game));
  layer.sub.middle = layer.add(new Phaser.Group(game));
  layer.sub.top = layer.add(new Phaser.Group(game));
  layer.sub.walls2 = layer.add(new Phaser.Group(game));
  layer.sub.walls3 = layer.add(new Phaser.Group(game));
  layer.sub.info = layer.add(new Phaser.Group(game));
  layer.sub.ceil = layer.add(new Phaser.Group(game));
  const q = 0.05;
  const rt = new Phaser.RenderTexture(
    game, Math.ceil(game.w * q * 1.3), Math.ceil(game.h * q * 1.3), null,
    null);
  layer.sub.light = layer.add(new Phaser.Sprite(
    game, 0, 0, rt));
  layer.sub.light.scale.set(1 / q);
  layer.sub.light.blendMode = PIXI.blendModes.MULTIPLY;
  layer.sub.light.smoothed = true;
  return layer;
}


export function resize(e) {
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

function create() {
  loadingProgress(0, 'map');

  game.ui = new Phaser.Group(game)
  resize();
  window.addEventListener('resize', resize);

  global.client = new Client;

  game.layer = game.scene.add(createLayer());

  game.texts = game.scene.add(new Phaser.Group(game));
  game.textEvents1 = game.scene.add(new Phaser.Group(game));
  game.textEvents2 = game.scene.add(new Phaser.Group(game));

  game.scene.add(game.ui);
  initUI();

  for (let i = 0; i < hsl.length; ++i) {
    processHsl(hsl[i]);
  }

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

export function loadingProgress(v, text) {
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
      loadingProgressInterval = undefined;
    } else {
      $('.loading-wrap').css('display', 'block');
      loadingProgressValue +=
        (loadingProgressTargetValue - loadingProgressValue) * 0.3;
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

        loadAudio();
        loadPlayer();
        loadWeapon();
        loadStage1();
        loadStage1__mobs();

        loadHsl('checkpoint', 'assets/checkpoint.png');
        game.load.image('light', 'assets/light.png');
        game.load.image('ground-mask', 'assets/ground-mask.png');

        game.stage.backgroundColor = 0x101010;

        game.stage.disableVisibilityChange = true;
        game.time.advancedTiming = true;
        game.scaleMode = Phaser.FILL_WINDOW_FIXED_ASPECT;

        game.sceneWrap2 = game.add.group();
        game.sceneWrap = game.sceneWrap2.add(new Phaser.Group(game));
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
      async update() {
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
          // let targetX = client.player.pos.x +
          //   client.player.speed.x;
          // let targetY = client.player.pos.y +
          //   client.player.speed.y;

          // targetX += look.x * 200;
          // targetY += look.y * 200;

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
          //game.sceneWrap.angle = -90 - look.toAngle();

          game.ui.x = -game.scene.x / game.scaleFactor - game.w * 0.5 /
            game.sceneWrap.scale.x;
          game.ui.y = -game.scene.y / game.scaleFactor - game.h * 0.5 /
            game.sceneWrap.scale.y;
          game.ui.scale.set(game.uiScaleFactor / game.scaleFactor / game.zoomF);
          //game.ui.angle = -game.sceneWrap.angle;

          game.cameraPos = new vec3({
            x: -game.scene.x / game.scaleFactor,
            y: -game.scene.y / game.scaleFactor,
          });
          // game.cameraPos.angle = look.toAngle();
          // game.cameraPos.x += Math.cos(game.cameraPos.angle * Math.PI / 180) *
          //   1000;
          // game.cameraPos.y += Math.sin(game.cameraPos.angle * Math.PI / 180) *
          //   1000;

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

        // let angleS = 60;
        // if (keysState.a) {
        //   const a = look.toAngle() * Math.PI / 180;
        //   look.x = Math.cos(a - dt * angleS * Math.PI / 180);
        //   look.y = Math.sin(a - dt * angleS * Math.PI / 180);
        // }
        // if (keysState.d) {
        //   const a = look.toAngle() * Math.PI / 180;
        //   look.x = Math.cos(a + dt * angleS * Math.PI / 180);
        //   look.y = Math.sin(a + dt * angleS * Math.PI / 180);
        // }

        const makeSubLayer3D = (layer, f) => {
          const p = game.cameraPos;
          let px = p.x;
          let py = p.y;
          // if (p.angle && !isNaN(p.angle)) {
          //   px -= Math.cos(p.angle * Math.PI / 180) * 1400;
          //   py -= Math.sin(p.angle * Math.PI / 180) * 1400;
          // }
          layer.scale.set(f);
          layer.x = -px * (f - 1);
          layer.y = -py * (f - 1);
        };
        const makeLayer3D = layer => {
          const f = 6 * game.sceneWrap.scale.x;
          makeSubLayer3D(layer.sub.middle, 1 + 0.002 * f);
          makeSubLayer3D(layer.sub.top, 1 + 0.007 * f);
          makeSubLayer3D(layer.sub.walls2, 1 + 0.008 * f);
          makeSubLayer3D(layer.sub.info, 1 + 0.01 * f);
          makeSubLayer3D(layer.sub.walls3, 1 + 0.02 * f);
          makeSubLayer3D(layer.sub.ceil, 1 + 0.025 * f);
        }

        if (global.client && client.player) {
          makeLayer3D(game.layer);
        }

        if (client.needLoadMap) {
          delete client.needLoadMap;
          loadMap();
        }
        const texs = game.mapTextures;
        if (game.cameraPos && global.AF && texs) {
          const ln = WALL_LAYERS.length + 2;
          let gbx = game.cameraPos.x - game.w * 0.5 / game.sceneWrap.scale.x;
          gbx -= (AF - 1) * 0.5 * WALL_SIZE;
          gbx = Math.floor(gbx / ts);
          let gby = game.cameraPos.y - game.h * 0.5 / game.sceneWrap.scale.y;
          gby -= (AF - 1) * 0.5 * WALL_SIZE;
          gby = Math.floor(gby / ts);
          let gex = game.cameraPos.x + game.w * 0.5 / game.sceneWrap.scale.x;
          gex += (AF - 1) * 0.5 * WALL_SIZE;
          gex = Math.floor(gex / ts);
          let gey = game.cameraPos.y + game.h * 0.5 / game.sceneWrap.scale.y;
          gey += (AF - 1) * 0.5 * WALL_SIZE;
          gey = Math.floor(gey / ts);

          gbx = Math.max(0, Math.min(texs[0].length - 1, gbx));
          gby = Math.max(0, Math.min(texs[0][0].length - 1, gby));
          gex = Math.max(0, Math.min(texs[0].length - 1, gex));
          gey = Math.max(0, Math.min(texs[0][0].length - 1, gey));

          game.layer.sub.affects.removeAll();
          game.layer.sub.affects2.removeAll();
          game.layer.sub.walls.removeAll();
          game.layer.sub.walls2.removeAll();
          game.layer.sub.walls3.removeAll();
          for (let i = 0; i < ln; ++i) {
            for (let x = gbx; x <= gex; ++x) {
              for (let y = gby; y <= gey; ++y) {
                const tex = texs[i][x][y];
                if (!tex.isUsed) {
                  continue;
                }
                const s = tex.sprite;
                s.visible = true;
                game.layer.sub[s.target].add(s);
                global.SPRITES_N = global.SPRITES_N || 0;
                ++global.SPRITES_N;
              }
            }
          }
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