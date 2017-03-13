export const client__item__heal__regular = {
  LANG_RU: 'Жидкий свет',

  createView() {
    const g = new Phaser.Image(game, 0, 0, 'item__heal__regular');
    g.blendMode = PIXI.blendModes.ADD;
    g.scale.set(1.4);
    g.anchor.set(0.5);
    return g;
  },
};

export const client__item__heal__stone = {
  LANG_RU: 'Красноватый свет',

  createView() {
    const g = new Phaser.Image(game, 0, 0, 'item__heal__stone');
    g.blendMode = PIXI.blendModes.ADD;
    g.scale.set(1.4);
    g.anchor.set(0.5);
    return g;
  },
};
export const client__item__mp__stone = {
  LANG_RU: 'Синий свет',

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
  LANG_RU: 'Зеленоватый свет',

  createView() {
    const g = new Phaser.Image(game, 0, 0, 'item__stamina__stone');
    g.blendMode = PIXI.blendModes.ADD;
    g.scale.set(1.4);
    g.anchor.set(0.5);
    return g;
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
export const client__item__big__sword = {
  LANG_RU: 'Двуручный Меч',

  createView() {
    const image = new Phaser.Image(game, 0, 0, 'sword');
    image.scale.x = 0.8 * 1.5;
    image.scale.y = 1.2 * 1.5;
    image.angle = 45;
    image.tint = 0x777755;
    image.anchor.x = 0.5;
    image.anchor.y = 0.5;
    image.smoothed = true;
    return image;
  },
};
export const client__item__axe = {
  LANG_RU: 'Топор',

  createView() {
    const image = new Phaser.Image(game, 0, 0, 'axe');
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
    image.scale.x = 2;
    image.scale.y = 2;
    image.angle = 45;
    image.anchor.x = 0.5;
    image.anchor.y = 0.5;
    image.smoothed = true;
    return image;
  },
};