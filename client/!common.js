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

      global.mx = (game.input.x - game.scene.x) / game.scaleFactor;
      global.my = (game.input.y - game.scene.y) / game.scaleFactor;
      global.dt = game.time.elapsed * 0.001;
    },

    render() {},
  });