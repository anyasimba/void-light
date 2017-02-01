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
      game.stage.disableVisibilityChange = true;
      game.time.advancedTiming = true;
      game.scaleMode = Phaser.FILL_WINDOW_FIXED_ASPECT;

      game.scene = game.add.group();

      function resize(e) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        game.width = w;
        game.height = h;

        if (game.renderType === Phaser.WEBGL) {
          game.renderer.resize(w, h);
        }

        const s = Math.min(w / 1280, h / 720);
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

      isCreated = true;
    },
    update() {
      if (!isCreated) {
        return;
      }

      global.mx = game.input.x / game.scaleFactor;
      global.my = game.input.y / game.scaleFactor;
      global.dt = game.time.elapsed * 0.001;
    },
  });