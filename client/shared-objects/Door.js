export class Door extends mix(global.Door, MixGameObject) {
  static createView() {
    const view = new Phaser.TileSprite(
      game, 0, 0, WALL_SIZE, WALL_SIZE, 'door');

    return view;
  }

  constructor(data) {
    data.pos = new vec3(data.pos);
    data.size = new vec3(data.size);

    super(data, data);

    this.group.x = this.pos.x - this.size.x * 0.5;
    this.group.y = this.pos.y - this.size.y * 0.5;

    if (!this.isExit) {
      this.view = Door.createView();
      this.view.texture = makeDarken(this.view);
      this.view.x = 0;
      this.view.y = 0;
      this.view.width = this.size.x;
      this.view.height = this.size.y;
      this.view.tileScale.set(0.7);
      this.bottomGroup.add(this.view);

      this.view2 = Door.createView();
      this.view2.x = 0;
      this.view2.y = 0;
      this.view2.width = this.size.x;
      this.view2.height = this.size.y;
      this.view2.tileScale.set(0.8);
      this.middleGroup.add(this.view2);

      this.view3 = Door.createView();
      this.view3.x = 10;
      this.view3.y = 10;
      this.view3.width = this.size.x - 20;
      this.view3.height = this.size.y - 20;
      this.topGroup.add(this.view3);
    }
  }

  onOpen(data) {
    if (this.isOpened && !this.isClosing) {
      this.isClosing = data.time;
    } else if (!this.isOpening) {
      this.isOpening = data.time;
    }

    if (this.sound) {
      this.sound.stop();
      this.sound.destroy();
    }
    this.sound = game.add.sound('door', this.soundVolume() * 0.3, true);
    this.sound.play();
  }
  onBreak(data) {
    if (this.isOpening) {
      delete this.isOpening;
      this.isClosing = data.time;
    } else if (this.isClosing) {
      delete this.isClosing;
      this.isOpening = data.time;
    }

    if (this.sound) {
      this.sound.stop();
      this.sound.destroy();
    }
    this.sound = game.add.sound('door', this.soundVolume() * 0.3, true);
    this.sound.play();
  }

  update() {
    super.update();

    if (!this.isExit) {
      let ax = 0;
      let ay = 0;
      if (this.baseSize.x > this.baseSize.y) {
        ax = 40;
        ay = -10;
      } else {
        ay = 40;
        ax = -10;
      }

      this.view.x = -ax;
      this.view.y = -ay;
      this.view.width = this.size.x + ax * 2;
      this.view.height = this.size.y + ay * 2;
      this.view.tilePosition.x = (this.size.x - this.baseSize.x) / 0.7;;
      this.view.tilePosition.y = (this.size.y - this.baseSize.y) / 0.7;;

      this.view2.x = -ax;
      this.view2.y = -ay;
      this.view2.width = this.size.x + ax * 2;
      this.view2.height = this.size.y + ay * 2;
      this.view2.tilePosition.x = (this.size.x - this.baseSize.x) / 0.8;
      this.view2.tilePosition.y = (this.size.y - this.baseSize.y) / 0.8;

      this.view3.x = 10 - ax;
      this.view3.y = 10 - ay;
      this.view3.width = this.size.x - 20 + ax * 2;
      this.view3.height = this.size.y - 20 + ay * 2;
      this.view3.tilePosition.x = this.size.x - this.baseSize.x;
      this.view3.tilePosition.y = this.size.y - this.baseSize.y;

      if (this.sound && !this.isOpening && !this.isClosing) {
        this.sound.stop();
        this.sound.destroy();
        delete this.sound;
      } else if (this.sound) {
        this.sound.volume = this.soundVolume() * 0.3;
      }
    } else {
      if (Math.random() < dt * 10) {
        const g = new Phaser.Graphics(game, 0, 0);
        this.middleGroup.add(g);
        g.lineStyle(3, 0x8833AA, 0.5);
        g.beginFill(0x8822FF, 0.01);
        const PAD = 0.5 + Math.random() * 0.7;
        g.drawRect(
          this.size.x * (1 - PAD) * 0.5,
          this.size.y * (1 - PAD) * 0.5,
          this.size.x * PAD, this.size.y * PAD);
        g.endFill();
        g.blendMode = PIXI.blendModes.ADD;
        const speed = Math.random() * 100;
        const v = new vec3();
        v.x = Math.random() - 0.5;
        v.y = Math.random() - 0.5;
        g.x = -v.x * 100;
        g.y = -v.y * 100;
        let time = 0;
        g.update = () => {
          g.x += v.x * dt * speed;
          g.y += v.y * dt * speed;
          g.alpha = time;
          time += dt;
          if (time > 1) {
            g.alpha = 2 - time;
          }
          if (time >= 2) {
            g.destroy();
          }
        }
      }
    }
  }
}