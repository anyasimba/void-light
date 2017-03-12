export const client__item__heal__regular = {
  LANG_RU: 'Светлая вода',

  createView() {
    const graphics = new Phaser.Graphics(game, 0, 0);

    graphics.beginFill(0xAAFFAA, 0.5);
    graphics.lineStyle(4, 0xAAFFAA, 1);
    graphics.drawCircle(0, 0, 60);
    graphics.endFill();

    return graphics;
  },
};

export const client__item__heal__stone = {
  LANG_RU: 'Светлый камень',

  createView() {
    const graphics = new Phaser.Graphics(game, 0, 0);

    graphics.beginFill(0x33FF33, 0.5);
    graphics.lineStyle(4, 0x33FF33, 1);
    graphics.drawCircle(0, 0, 60);
    graphics.endFill();

    return graphics;
  },
};
export const client__item__mp__stone = {
  LANG_RU: 'Магический камень',

  createView() {
    const graphics = new Phaser.Graphics(game, 0, 0);

    graphics.beginFill(0x3333FF, 0.5);
    graphics.lineStyle(4, 0x3333FF, 1);
    graphics.drawCircle(0, 0, 60);
    graphics.endFill();

    return graphics;
  },
};
export const client__item__stamina__stone = {
  LANG_RU: 'Плотный камень',

  createView() {
    const graphics = new Phaser.Graphics(game, 0, 0);

    graphics.beginFill(0x33FFAA, 0.5);
    graphics.lineStyle(4, 0x33FFAA, 1);
    graphics.drawCircle(0, 0, 60);
    graphics.endFill();

    return graphics;
  },
};

export const client__item__sword = {
  LANG_RU: 'Меч',

  createView() {
    const image = new Phaser.Image(game, 0, 0, 'sword');
    image.scale.x = 0.8;
    image.scale.y = 1.2;
    image.angle = 45;
    image.anchor.x = 0.5;
    image.anchor.y = 0.5;
    image.smoothed = true;
    return image;
  },
};
export const client__item__shield = {
  LANG_RU: 'Щит',

  createView() {
    const image = new Phaser.Image(game, 0, 0, 'shield');
    image.scale.x = 0.8;
    image.scale.y = 1.2;
    image.angle = 45;
    image.anchor.x = 0.5;
    image.anchor.y = 0.5;
    image.smoothed = true;
    return image;
  },
};