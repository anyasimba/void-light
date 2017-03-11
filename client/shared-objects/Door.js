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

    this.view = Door.createView();
    this.view.texture = makeDarken(this.view);
    this.view.width = this.size.x;
    this.view.height = this.size.y;
    this.bottomGroup.add(this.view);

    this.view2 = Door.createView();
    this.view2.x = 10;
    this.view2.y = 10;
    this.view2.width = this.size.x - 20;
    this.view2.height = this.size.y - 20;
    this.topGroup.add(this.view2);
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

    this.view.width = this.size.x;
    this.view.height = this.size.y;
    this.view.tilePosition.x = this.size.x - this.baseSize.x;
    this.view.tilePosition.y = this.size.y - this.baseSize.y;

    this.view2.width = this.size.x - 20;
    this.view2.height = this.size.y - 20;
    this.view2.tilePosition.x = this.size.x - this.baseSize.x +
      this.view.texture.width * 0.5;
    this.view2.tilePosition.y = this.size.y - this.baseSize.y +
      this.view.texture.height * 0.5;

    if (this.sound && !this.isOpening && !this.isClosing) {
      this.sound.stop();
      this.sound.destroy();
      delete this.sound;
    } else if (this.sound) {
      this.sound.volume = this.soundVolume() * 0.3;
    }
  }
}