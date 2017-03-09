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
  if (windowReady && fontReady) {
    $('.username').val(getCookie('username'));
    $('.login').css('display', 'block');
    $('.login-button').click(e => {
      const username = $('.username').val();
      if (username.length > 24) {
        alert('Не более 24 символов');
        return;
      }
      setCookie('username', username);
      $('.login').css('display', 'none');
      createGame();
    });
  }
};

function createLayer() {
  const layer = new Phaser.Group(game);
  layer.sub = {};
  layer.sub.ground = layer.add(new Phaser.Group(game));
  layer.sub.deads = layer.add(new Phaser.Group(game));
  layer.sub.bottom = layer.add(new Phaser.Group(game));
  layer.sub.middle = layer.add(new Phaser.Group(game));
  layer.sub.walls = layer.add(new Phaser.Group(game));
  layer.sub.top = layer.add(new Phaser.Group(game));
  layer.sub.info = layer.add(new Phaser.Group(game));
  const q = 0.1;
  const rt = new Phaser.RenderTexture(
    game, Math.ceil(game.w * q), Math.ceil(game.h * q), null, null);
  layer.sub.light = layer.add(new Phaser.Sprite(game, 0, 0, rt));
  layer.sub.light.scale.set(1 / q);
  layer.sub.light.blendMode = PIXI.blendModes.MULTIPLY;
  return layer;
}

function create() {
  global.client = new Client;

  game.layer = game.scene.add(createLayer());

  game.texts = game.scene.add(new Phaser.Group(game));
  game.textEvents1 = game.scene.add(new Phaser.Group(game));
  game.textEvents2 = game.scene.add(new Phaser.Group(game));

  game.ui = game.scene.add(new Phaser.Group(game));
  initUI();

  game.backSound = game.add.sound('back', 0.5, true);
  game.backSound.play();
  game.bossBackSound = game.add.sound('bossBack', 1, true);
  game.youDiedSound = game.add.sound('youDied', 1, false);

  game.bossAreaSound = game.add.sound('bossArea', 1, false);
  game.bossDeadSound = game.add.sound('bossDead', 1, false);

  game.isCreated = true;
}

function createGame() {
  global.game = new Phaser.Game(
    "100%", "100%", Phaser.CANVAS, '', {
      async preload() {
        game.load.image('light', 'assets/light.png');

        game.load.image('shield', 'assets/shield.png');
        game.load.image('sword', 'assets/sword.png');

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

        game.load.image('ground', 'assets/ground.jpg');
        game.load.image('bricks', 'assets/bricks.jpg');
        game.load.image('door', 'assets/door.png');

        game.load.audio('back',
          'assets/back__doxent_-_Forgotten_Land.mp3');
        game.load.audio('bossBack',
          'assets/bossBack__essesq_-_Dark_Dicey_Sci_Fi_Soundtrack.mp3'
        );

        game.load.audio('door',
          'assets/door__233389__laiaoreka__automatic-door.mp3');

        game.load.audio('boss',
          'assets/boss__essesq_-_Dark_Dicey_Sci_Fi_Soundtrack.mp3');
        game.load.audio('hit',
          'assets/hit__86003__nextmaking__hitting-body-with-blood.mp3'
        );
        game.load.audio('hit1',
          'assets/hit1__351754__urupin__whistle-of-a-twig-in-air.mp3');
        game.load.audio('hit2',
          'assets/hit2__351754__urupin__whistle-of-a-twig-in-air.mp3');
        game.load.audio('hit3',
          'assets/hit3__351754__urupin__whistle-of-a-twig-in-air.mp3');
        game.load.audio('hit4',
          'assets/hit4__351754__urupin__whistle-of-a-twig-in-air.mp3');
        game.load.audio('hit5',
          'assets/hit5__351754__urupin__whistle-of-a-twig-in-air.mp3');

        game.load.audio('block',
          'assets/block__326845__johnbuhr__sword-clash-25.mp3');

        game.load.audio('jump',
          'assets/jump__260188__splicesound__young-boy-grunts-for-body-impact.mp3'
        );
        game.load.audio('mobJump',
          'assets/mob1Jump__181068__lolamadeus__zombie-vocals-grunts.mp3'
        );

        game.load.audio('mob1Die',
          'assets/mob1Die__76964__michel88__grunt2.mp3');
        game.load.audio('youDied',
          'assets/youDied__onlymeith_-_Toward_Isolation.mp3');

        game.load.audio('bossArea',
          'assets/bossArea__377887__debsound__monster-072.mp3');
        game.load.audio('bossDead',
          'assets/bossDead__56304__syna-max__monster-death-scream.mp3'
        );

        game.stage.backgroundColor = 0x101010;

        game.stage.disableVisibilityChange = true;
        game.time.advancedTiming = true;
        game.scaleMode = Phaser.FILL_WINDOW_FIXED_ASPECT;

        game.scene = game.add.group();
        const preUpdate = game.scene.preUpdate;
        game.scene.preUpdate = () => {
          preUpdate.call(game.scene);

          if (global.client && client.player) {
            const targetX = client.player.pos.x + client.player.speed.x *
              0.5;
            const targetY = client.player.pos.y + client.player.speed.y *
              0.5;

            const dx = -targetX *
              game.scaleFactor + game.width * game.resF / 2 - game.scene
              .x;
            const dy = -targetY *
              game.scaleFactor + game.height * game.resF / 2 - game.scene
              .y;

            const f = (1 - Math.pow(0.1, dt));
            game.scene.x += dx * f;
            game.scene.y += dy * f;

            game.ui.x = -game.scene.x / game.scaleFactor;
            game.ui.y = -game.scene.y / game.scaleFactor;

            game.cameraPos = new vec3({
              x: client.player.pos.x,
              y: client.player.pos.y,
            });

            game.layer.sub.light.x = game.ui.x;
            game.layer.sub.light.y = game.ui.y;
          }
        };

        function resize(e) {
          const w = window.innerWidth;
          const h = window.innerHeight;
          game.width = w;
          game.height = h;
          game.resF = 1;

          game.renderer.resize(w * game.resF, h * game.resF);

          const s = Math.min(w / 2560, h / 1440) * game.resF;
          game.w = game.width / s;
          game.h = game.height / s;
          game.scene.scale.set(s);
          game.scaleFactor = s;
        }
        resize();
        window.addEventListener('resize', resize);

        game.canvas.oncontextmenu = function (e) {
          e.preventDefault();
        }

        console.log('Game preloaded');
      },
      create: create,
      update() {
        if (!game.isCreated) {
          return;
        }
        delete global.mouseCapture;

        if (game.layer.sub.light) {
          const light = game.layer.sub.light;
          if (!game.lightClear) {
            game.lightClear = new Phaser.Graphics(game);
            game.lightClear.beginFill(0x000000, 1);
            const w = light.width * light.scale.x;
            const h = light.height * light.scale.y;
            game.lightClear.drawRect(0, 0, w, h);
            game.lightClear.endFill();
          }
          light.texture.renderXY(game.lightClear, 0, 0, true);
        }

        const makeSubLayer3D = (layer, f) => {
          const p = client.player.pos;
          layer.scale.set(f);
          layer.x = -p.x * (f - 1);
          layer.y = -p.y * (f - 1);
        };
        const makeLayer3D = layer => {
          makeSubLayer3D(layer.sub.middle, 1.01);
          makeSubLayer3D(layer.sub.top, 1.02);
          makeSubLayer3D(layer.sub.walls, 1.02);
        }

        if (global.client && client.player) {
          makeLayer3D(game.layer);
        }

        if (client.needLoadMap) {
          delete client.needLoadMap;
          client.w = client.map.width * WALL_SIZE;
          client.h = client.map.height * WALL_SIZE;

          const dictionary = loadMapDictionary(client.map);

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

          const scaleF = Math.ceil(game.scaleFactor * 10) * 0.1;
          const ts = WALL_SIZE * 10;
          const xn = Math.ceil(client.map.width * WALL_SIZE / ts);
          const yn = Math.ceil(client.map.height * WALL_SIZE / ts);
          const textures = [];

          for (let x = 0; x < xn; ++x) {
            for (let y = 0; y < yn; ++y) {
              const tex = new Phaser.RenderTexture(
                game,
                ts * scaleF, ts * scaleF,
                null, null, 1);

              textures[x] = textures[x] || [];
              textures[x][y] = tex;
            }
          }

          const bricksView = new Phaser.TileSprite(
            game, 0, 0, WALL_SIZE * scaleF, WALL_SIZE * scaleF,
            'bricks');

          console.log('loading map...');
          for (let y = 0; y < client.map.height; ++y) {
            for (let x = 0; x < client.map.width; ++x) {
              const i = y * client.map.width + x;
              const v = ground.data[i];
              const slug = dictionary[v];

              let view;
              switch (slug) {
                case 'wall':
                  view = bricksView;
                  break;
                default:
              }
              if (view) {
                const f = scaleF;
                view.tilePosition.x = -x * WALL_SIZE;
                view.tilePosition.y = -y * WALL_SIZE;
                view.tileScale.x = f;
                view.tileScale.y = f;

                const cx = Math.floor(x * WALL_SIZE / ts);
                const cy = Math.floor(y * WALL_SIZE / ts);
                textures[cx][cy].isUsed = true;
                textures[cx][cy].renderXY(
                  view,
                  (x * WALL_SIZE - cx * ts) * scaleF,
                  (y * WALL_SIZE - cy * ts) * scaleF,
                  false);
              }
            }
          }
          console.log('done', xn * yn);

          const groundSprite = game.layer.sub.ground.add(new Phaser.TileSprite(
            game, 0, 0, client.w, client.h, 'ground'));

          for (let x = 0; x < xn; ++x) {
            for (let y = 0; y < yn; ++y) {
              if (!textures[x][y].isUsed) {
                continue;
              }

              const sprite = new Phaser.Sprite(
                game, x * ts, y * ts,
                textures[x][y]);
              sprite.visible = false;
              sprite.scale.set(1 / scaleF);
              sprite.update = () => {
                if (global.client && global.client.player) {
                  const cx = sprite.x + ts * 0.5;
                  const cy = sprite.y + ts * 0.5;
                  const dx = Math.abs(cx - client.player.pos.x);
                  const dy = Math.abs(cy - client.player.pos.y);
                  if (dx < ts * 2 && dy < ts * 1.5) {
                    sprite.visible = true;
                  } else {
                    sprite.visible = false;
                  }
                }
              };
              game.layer.sub.walls.add(sprite);
            }
          }

          bricksView.destroy();
        }

        global.mx = (game.input.x * game.resF - game.scene.x) / game.scaleFactor;
        global.my = (game.input.y * game.resF - game.scene.y) / game.scaleFactor;
        global.dt = game.time.elapsed * 0.001;
      },

      render() {
        game.debug.text(game.time.fps, 20, 20, '#FFFFFF');
      },
    });
}