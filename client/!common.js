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
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
  });
}

//
export let ui;

const uiThemePaths = [
  '/client/third-party/assets/kenney-theme/kenney-theme.json',
];
export const uiThemes = {
  'std': 'kenney',
};

let isCreated = false;
let time;
export const game = new Phaser.Game(
  "100%", "100%", Phaser.AUTO, '', {
    async preload() {
      game.load.image('shield', 'assets/shield.png');
      game.load.image('sword', 'assets/sword.png');
      game.load.image('player', 'assets/player.png');
      game.load.image('player-back', 'assets/player-back.png');

      game.load.image('stage1__mob1', 'assets/stage1__mob1.png');

      game.load.image('ground', 'assets/ground.jpg');
      game.load.image('bricks', 'assets/bricks.jpg');

      game.load.audio('back',
        'assets/back__essesq_-_Dark_Dicey_Sci_Fi_Soundtrack.mp3');
      game.load.audio('hit',
        'assets/hit__86003__nextmaking__hitting-body-with-blood.mp3');
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
        'assets/mob1Jump__181068__lolamadeus__zombie-vocals-grunts.mp3');

      game.load.audio('mob1Die',
        'assets/mob1Die__76964__michel88__grunt2.mp3');

      game.stage.backgroundColor = 0x101010;

      game.stage.disableVisibilityChange = true;
      game.time.advancedTiming = true;
      game.scaleMode = Phaser.FILL_WINDOW_FIXED_ASPECT;

      game.scene = game.add.group();

      game.scene.postUpdate = () => {
        if (global.client && client.player) {
          const targetX = client.player.pos.x + client.player.speed.x *
            0.5;
          const targetY = client.player.pos.y + client.player.speed.y *
            0.5;

          const dx = -targetX *
            game.scaleFactor + game.width / 2 - game.scene.x;
          const dy = -targetY *
            game.scaleFactor + game.height / 2 - game.scene.y;

          const f = (1 - Math.pow(0.1, dt));
          game.scene.x += dx * f;
          game.scene.y += dy * f;

          game.ui.x = -game.scene.x / game.scaleFactor;
          game.ui.y = -game.scene.y / game.scaleFactor;

          game.cameraPos = new vec3({
            x: client.player.pos.x,
            y: client.player.pos.y,
          });
        }
      };

      function resize(e) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        game.width = w;
        game.height = h;

        if (game.renderType === Phaser.WEBGL) {
          game.renderer.resize(w, h);
        }

        const s = Math.min(w / 1920, h / 1080);
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
    async create() {
      EZGUI.renderer = game.renderer;
      await new Promise(r => EZGUI.Theme.load(uiThemePaths, r));

      global.client = new Client;

      game.level = game.scene.add(new Phaser.Group(game));
      game.level.add(new Phaser.TileSprite(
        game, -100000, -100000, 200000, 200000, 'ground'));

      game.level2 = game.scene.add(new Phaser.Group(game));

      game.ui = game.scene.add(new Phaser.Group(game));
      initUI();

      game.backSound = game.add.sound('back', 0.5, true);
      game.backSound.play();

      isCreated = true;
    },
    update() {
      if (!isCreated) {
        return;
      }

      global.mx = (game.input.x - game.scene.x) / game.scaleFactor;
      global.my = (game.input.y - game.scene.y) / game.scaleFactor;
      global.dt = game.time.elapsed * 0.001;
    },

    render() {
      game.debug.text(game.time.fps, 20, 20, '#FFFFFF');
    },
  });