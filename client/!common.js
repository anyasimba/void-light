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
  light.f = 1 / game.light.scale.x;
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

function createLayer() {
  const layer = new Phaser.Group(game);
  layer.sub = {};
  layer.sub.ground = layer.add(new Phaser.Group(game));
  for (let i = 1; i <= 6; ++i) {
    layer.sub['layer' + i] = layer.add(new Phaser.Group(game));
    const l = layer.sub['layer' + i];
    layer.sub['walls' + i] = l.add(new Phaser.Group(game));
    layer.sub['affects1' + i] = l.add(new Phaser.Group(game));
    layer.sub['affects2' + i] = l.add(new Phaser.Group(game));
    layer.sub['shadows1' + i] = l.add(new Phaser.Group(game));
    layer.sub['shadows2' + i] = l.add(new Phaser.Group(game));
    layer.sub['mix' + i] = layer.add(new Phaser.Group(game));
    layer.sub['mixDead' + i] = layer.add(new Phaser.Group(game));
  }
  layer.sub.layer7 = layer.add(new Phaser.Group(game));
  const l = layer.sub.layer7;
  layer.sub.ceil = layer.add(new Phaser.Group(game));
  layer.sub.walls7 = l.add(new Phaser.Group(game));
  layer.sub.affects17 = l.add(new Phaser.Group(game));
  layer.sub.affects27 = l.add(new Phaser.Group(game));
  layer.sub.shadows17 = l.add(new Phaser.Group(game));
  layer.sub.shadows27 = l.add(new Phaser.Group(game));
  layer.sub.mix7 = layer.add(new Phaser.Group(game));
  layer.sub.mixDead7 = layer.add(new Phaser.Group(game));
  layer.sub.info = layer.add(new Phaser.Group(game));

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

  if (global.client && client.player) {
    const targetX = client.player.pos.x;
    const targetY = client.player.pos.y;

    const dx = -targetX * game.scaleFactor -
      game.scene.x;
    const dy = -targetY * game.scaleFactor -
      game.scene.y;

    const f = (1 - Math.pow(0.1, dt * 0.6));
    game.scene.x = -targetX * game.scaleFactor;
    game.scene.y = -targetY * game.scaleFactor;
    game.cameraZ = client.player.z;

    game.cameraPos = new vec3({
      x: -game.scene.x / game.scaleFactor,
      y: -game.scene.y / game.scaleFactor,
    });
  }
}

function create() {
  game.ui = new Phaser.Group(game);

  resize();
  window.addEventListener('resize', resize);

  loadMapAssets();

  loadingProgress(0, 'map');

  global.client = new Client;

  game.layers = [
    game.scene.add(createLayer()),
    game.scene.add(createLayer()),
    game.scene.add(createLayer()),
    game.scene.add(createLayer()),
    game.scene.add(createLayer()),
    game.scene.add(createLayer()),
  ];
  const q = 0.05;
  const rt = new Phaser.RenderTexture(
    game, Math.ceil(game.w * q * 1.3), Math.ceil(game.h * q * 1.3), null,
    null);
  game.light = game.scene.add(new Phaser.Sprite(
    game, 0, 0, rt));
  game.light.scale.set(1 / q);
  game.light.blendMode = PIXI.blendModes.MULTIPLY;
  game.light.smoothed = true;

  game.texts = game.scene.add(new Phaser.Group(game));
  game.textEvents1 = game.scene.add(new Phaser.Group(game));
  game.textEvents2 = game.scene.add(new Phaser.Group(game));

  for (let i = 0; i < hsl.length; ++i) {
    processHsl(hsl[i]);
  }

  game.scene.add(game.ui);
  initUI();

  // let x = 0;
  // let y = 0;
  // const g = new Phaser.Graphics(game, 0, 0);
  // g.beginFill(0x000000);
  // g.drawRect(0, 0, 10000, 10000);
  // g.endFill();
  // game.ui.add(g);

  // game.ui.add(new Phaser.Image(game, x, y, hslMap['stage1__mob3'].gray));
  // x += hslMap['stage1__mob3'].gray.width;
  // y += 0;

  // game.ui.add(new Phaser.Image(game, x, y, hslMap['stage1__mob3'].color));
  // x += hslMap['stage1__mob3'].gray.width;
  // y += 0;

  // game.ui.add(new Phaser.Image(game, x, y, hslMap['stage1__mob3'].ambient));
  // x += hslMap['stage1__mob3'].gray.width;
  // y += 0;

  // game.ui.add(new Phaser.Image(game, x, y, hslMap['stage1__mob3'].special));
  // x += hslMap['stage1__mob3'].gray.width;
  // y += 0;

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
  game.scene.smoothed = true;

  game.isCreated = true;
}

export function makeDarken(view, color) {
  const v = new Phaser.Sprite(game, 0, 0, view.texture);
  const rt = new Phaser.RenderTexture(
    game, v.width, v.height, null, null, 1);

  const g = new Phaser.Graphics(game, 0, 0);
  g.beginFill(0x000000, 1);
  g.drawRect(0, 0, v.width, v.height);
  g.endFill();

  const filter = new Phaser.Graphics(game, 0, 0);
  filter.beginFill(color, 1);
  filter.drawRect(0, 0, v.width, v.height);
  filter.endFill();
  filter.blendMode = PIXI.blendModes.MULTIPLY;

  rt.renderXY(g, 0, 0, true);
  rt.renderXY(v, 0, 0, false);
  rt.renderXY(filter, 0, 0, false);

  let bmd = game.make.bitmapData(v.width, v.height);
  bmd.alphaMask(rt, v);
  rt.renderXY(new Phaser.Image(game, 0, 0, bmd), 0, 0, true);
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
      if (loadingProgressValue > loadingProgressTargetValue) {
        loadingProgressValue = loadingProgressTargetValue;
      } else {
        loadingProgressValue +=
          (loadingProgressTargetValue - loadingProgressValue) * 0.3;
      }
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
      preload() {
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

        game.stage.backgroundColor = 0x000000;

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
          if (progress === 100) {
            create();
          }
        });

        console.log('Game preloaded');
      },
      update() {
        if (!game.isCreated) {
          return;
        }
        delete global.mouseCapture;

        if (client.needLoadMap) {
          delete client.needLoadMap;

          const targetX = client.player.pos.x;
          const targetY = client.player.pos.y;

          const dx = -targetX * game.scaleFactor -
            game.scene.x;
          const dy = -targetY * game.scaleFactor -
            game.scene.y;

          const f = (1 - Math.pow(0.1, dt * 0.6));
          game.scene.x = -targetX * game.scaleFactor;
          game.scene.y = -targetY * game.scaleFactor;
          game.cameraZ = client.player.z;

          game.cameraPos = new vec3({
            x: -game.scene.x / game.scaleFactor,
            y: -game.scene.y / game.scaleFactor,
          });

          loadMap();
        }

        if (client && client.player) {
          let mf = 0.4;
          if (client.player.weapon && client.player.weapon.opts.isRange) {
            mf = 0.4;
          }
          const targetX = client.player.pos.x +
            client.player.speed.x +
            (mx - client.player.pos.x) * mf;
          const targetY = client.player.pos.y +
            client.player.speed.y +
            (my - client.player.pos.y) * mf;
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
          game.cameraZ = game.cameraZ || 0;
          game.cameraZ += (client.player.z - game.cameraZ) * f;
          const speed = client.player.speed.length();
          const zoom =
            (game.preZoom || 1) *
            (game.actionPreZoom || 1);
          game.zoomF = (game.zoomF || 1);
          const f2 = (1 - Math.pow(0.1, dt * 0.3));
          game.zoomF += (zoom - game.zoomF) * f2;

          //game.sceneWrap.angle = -90 - look.toAngle();

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

          game.cameraPos = new vec3({
            x: -game.scene.x / game.scaleFactor,
            y: -game.scene.y / game.scaleFactor,
          });
          // game.cameraPos.angle = look.toAngle();
          // game.cameraPos.x += Math.cos(game.cameraPos.angle * Math.PI / 180) *
          //   1000;
          // game.cameraPos.y += Math.sin(game.cameraPos.angle * Math.PI / 180) *
          //   1000;

          global.pf = 600;
          game.sceneWrap.scale.set(game.zoomF);

          global.cameraDF = global.cameraDF || 1;
          const makeSubLayer3D = (layer, ci, i, f) => {
            const p = game.cameraPos;
            const a = -game.cameraAngle + 90;
            let px = p.x + 1500 * Math.cos(a * Math.PI / 180.0) * cameraDF;
            let py = p.y + 1500 * Math.sin(a * Math.PI / 180.0) * cameraDF;
            // if (p.angle && !isNaN(p.angle)) {
            //   px -= Math.cos(p.angle * Math.PI / 180) * 1400;
            //   py -= Math.sin(p.angle * Math.PI / 180) * 1400;
            // }
            layer.scale.set(f);
            layer.x = -px * (f - 1);
            layer.y = -py * (f - 1);

            let cz = client.player.z + 100 / 12;
            let pz = Math.floor(cz / 100);
            let clz = Math.floor(ci / 6);
            let cd = pz - clz;
            let cd2 = cz / 100 - clz;
            let af = 1;
            if (cd < 0) {
              cd = -cd;
              af = 2 / 6 + cd2 * 3;
            }
            if (cd >= 0) {
              const pz = cz / 100;
              const lz = (ci + i) / 6;
              layer.alpha = 1;
              let d = pz - lz;
              let db = 0 / 6;
              let de = 8 / 6;
              if (d < -de) {
                layer.alpha = 0;
              } else if (d <= -db) {
                layer.alpha = 1 - Math.pow(-(d + db) / (de - db), 0.5);
              }
              if (cd > 0) {
                layer.alpha = 2 - cd2;
              }
            }
            layer.alpha *= af;
            layer.alpha = Math.max(layer.alpha, 0);
            layer.alpha = Math.min(layer.alpha, 1);
          };
          const makeLayer3D = (layer, i, z) => {
            makeSubLayer3D(layer.sub.ground, i, 0, pf / (pf + z));
            const wf = -1;
            for (let j = 0; j < 7; ++j) {
              let k = i + j;
              if (j === 6) {
                k -= 0.0001;
              }
              makeSubLayer3D(
                layer.sub['walls' + (j + 1)], k, wf,
                pf / (pf + z - j * 100 / 6));
              makeSubLayer3D(
                layer.sub['affects1' + (j + 1)], k, wf,
                pf / (pf + z - j * 100 / 6));
              makeSubLayer3D(
                layer.sub['affects2' + (j + 1)], k, wf,
                pf / (pf + z - j * 100 / 6));
              makeSubLayer3D(
                layer.sub['shadows1' + (j + 1)], k, wf,
                pf / (pf + z - j * 100 / 6));
              makeSubLayer3D(
                layer.sub['shadows2' + (j + 1)], k, wf,
                pf / (pf + z - j * 100 / 6));
              makeSubLayer3D(
                layer.sub['mix' + (j + 1)], k, -4,
                pf / (pf + z - j * 100 / 6));
              makeSubLayer3D(
                layer.sub['mixDead' + (j + 1)], i + j, -4,
                pf / (pf + z - j * 100 / 6));
            }
            makeSubLayer3D(
              layer.sub.info, i + 3, -3, pf / (pf + z - 500 / 6));
            makeSubLayer3D(
              layer.sub.ceil, i + 3, -3, pf / (pf + z - 700 / 6));
          }

          game.cameraAngle = game.cameraAngle || 0;
          for (let i = 0; i < 6; ++i) {
            const l = game.layers[i];
            l.angle = game.cameraAngle;
            let p = game.cameraPos;
            let a = p.toAngle() + l.angle;
            l.x = p.x - Math.cos(a * Math.PI / 180.0) * p.length();
            l.y = p.y - Math.sin(a * Math.PI / 180.0) * p.length();
            makeLayer3D(l, i * 6, game.cameraZ - i * 100);
          }

          game.ui.x = -game.scene.x / game.scaleFactor - game.w * 0.5 /
            game.sceneWrap.scale.x;
          game.ui.y = -game.scene.y / game.scaleFactor - game.h * 0.5 /
            game.sceneWrap.scale.y;
          game.ui.scale.set(
            game.uiScaleFactor / game.scaleFactor / game.zoomF);
          //game.ui.angle = -game.sceneWrap.angle;

          game.light.x = game.ui.x;
          game.light.y = game.ui.y;
        }

        if (client && client.player && game.light) {
          const light = game.light;

          if (!game.lightClear) {
            const w = light.width * light.scale.x;
            const h = light.height * light.scale.y;
            game.lightClear = new Phaser.Graphics(game);
            game.lightClear.beginFill(0x000000, lightAlpha);
            game.lightClear.drawRect(0, 0, w, h);
            game.lightClear.endFill();
            game.lightClear.blendMode = PIXI.blendModes.MULTIPLY;

            game.lightClear2 = new Phaser.Graphics(game);
            game.lightClear2.beginFill(0x7090B0, lightAlpha);
            game.lightClear2.drawRect(0, 0, w, h);
            game.lightClear2.endFill();
            game.lightClear2.blendMode = PIXI.blendModes.ADD;
          }

          light.texture.renderXY(game.lightClear, 0, 0, false);
          light.texture.renderXY(game.lightClear2, 0, 0, false);
        }

        if (game.cameraPos && global.AF && game.mapTextures) {
          let CMF = 2;
          if (game.lastCX !== Math.floor(game.cameraPos.x / WALL_SIZE * CMF) ||
            game.lastCY !== Math.floor(game.cameraPos.y / WALL_SIZE * CMF)) {

            game.lastCX = Math.floor(game.cameraPos.x / WALL_SIZE * CMF);
            game.lastCY = Math.floor(game.cameraPos.y / WALL_SIZE * CMF);

            let vGrid = [];
            for (let i = 5; i >= 0; --i) {
              const ln = 7;

              if (!game.mapTextures[i]) {
                break;
              }
              if (game.layers[i].sub.affects11.alpha <= 0.0 &&
                game.layers[i].sub.affects17.alpha <= 0.0) {
                continue;
              }

              for (let j = 1; j <= ln; ++j) {
                if (game.layers[i].sub['affects1' + j].alpha <= 0.0) {
                  continue;
                }
                game.layers[i].sub['affects1' + j].removeAll();
                game.layers[i].sub['affects2' + j].removeAll();
                game.layers[i].sub['walls' + j].removeAll();
                game.layers[i].sub['shadows1' + j].removeAll();
                game.layers[i].sub['shadows2' + j].removeAll();
              }

              const texs = game.mapTextures[i];
              for (let j = ln - 1; j >= 0; --j) {
                const la = game.layers[i].sub['affects1' + (j + 1)].alpha;
                if (la <= 0.0) {
                  continue;
                }
                const f = game.sceneWrap.scale.x *
                  game.layers[i].sub['affects1' + (j + 1)].scale.x;
                let gbx = game.cameraPos.x -
                  game.w * 0.5 / f;
                gbx -= (AF) * 0.5 * WALL_SIZE / f;
                gbx = Math.floor(gbx / ts);
                let gby = game.cameraPos.y -
                  game.h * 0.5 / f;
                gby -= (AF + 2) * 0.5 * WALL_SIZE / f;
                gby = Math.floor(gby / ts);
                let gex = game.cameraPos.x +
                  game.w * 0.5 / f;
                gex += (AF - 1) * 0.5 * WALL_SIZE / f;
                gex = Math.floor(gex / ts);
                let gey = game.cameraPos.y +
                  game.h * 0.5 / f;
                gey += (AF + 1) * 0.5 * WALL_SIZE / f;
                gey = Math.floor(gey / ts);

                for (let x = gbx; x <= gex; ++x) {
                  for (let y = gey; y >= gby; --y) {
                    for (let l = 0; l < 5; ++l) {
                      if (!texs[j][l][x]) {
                        continue;
                      }
                      if (!texs[j][l][x][y]) {
                        continue;
                      }
                      if (vGrid[x] && vGrid[x][y] && vGrid[x][y][100] >= 9) {
                        continue;
                      }

                      const s = texs[j][l][x][y];
                      if (s.used) {
                        continue;
                      }
                      s.used = true;
                      game.layers[i].sub[s.target].add(s);
                      global.SPRITES_N = global.SPRITES_N || 0;
                      ++global.SPRITES_N;
                    }
                  }
                }

                if (la >= 1.0) {
                  for (let x = gbx - 5; x <= gex + 5; ++x) {
                    for (let y = gey + 5; y >= gby - 5; --y) {
                      for (let l = 0; l < 5; ++l) {
                        if (!texs[j][l][x]) {
                          continue;
                        }
                        if (!texs[j][l][x][y]) {
                          continue;
                        }
                        for (let ax = -1; ax <= 1; ++ax) {
                          for (let ay = -1; ay <= 1; ++ay) {
                            const rx = x + ax;
                            const ry = y + ay;
                            vGrid[rx] = vGrid[rx] || [];
                            vGrid[rx][ry] = vGrid[rx][ry] || [];
                            if (vGrid[rx][ry][100] &&
                              vGrid[rx][ry][100] >= 9) {

                              continue;
                            }
                            if (vGrid[rx][ry][101] !== i * 7 + j) {
                              vGrid[rx][ry][101] = i * 7 + j;
                              vGrid[rx][ry][100] = 0;
                              delete vGrid[rx][ry][ax + ay * 10];
                            }
                            if (!vGrid[rx][ry][ax + ay * 10]) {
                              vGrid[rx][ry][ax + ay * 10] = true;
                              vGrid[rx][ry][100] += 1;
                            }
                          }
                        }
                      }
                    }
                  }
                }

                for (let x = gbx; x <= gex; ++x) {
                  for (let y = gey; y >= gby; --y) {
                    for (let l = 0; l < 5; ++l) {
                      if (!texs[j][l][x]) {
                        continue;
                      }
                      if (!texs[j][l][x][y]) {
                        continue;
                      }
                      const s = texs[j][l][x][y];
                      s.used = false;
                    }
                  }
                }
              }
            }
          }
        }

        global.SPRITES_N = global.SPRITES_N || 0;
        if (SPRITES_N && SPRITES_N !== global.SAVED_SPRITES_N) {
          global.SAVED_SPRITES_N = SPRITES_N;
        }
        global.SPRITES_N = 0;
      },

      render() {
        global.SAVED_SPRITES_N = global.SAVED_SPRITES_N || '...';
        game.debug.text(game.time.fps + ', ' + global.SAVED_SPRITES_N, 20,
          20, '#FFFFFF');
      },
    });
}