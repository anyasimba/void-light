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
    const image = weapon__sword__default.createView();
    image.scale.set(0.4);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__sword2 = {
  LANG_RU: 'Меч Ветра',

  createView() {
    const image = weapon__sword2__default.createView();
    image.scale.set(0.4);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__big__sword = {
  LANG_RU: 'Двуручный Меч',

  createView() {
    const image = weapon__bigsword__default.createView();
    image.scale.set(0.5);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__big__sword2 = {
  LANG_RU: 'Меч Синего Пламени',

  createView() {
    const image = weapon__bigsword2__default.createView();
    image.scale.set(0.5);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__axe = {
  LANG_RU: 'Топор',

  createView() {
    const image = weapon__axe__default.createView();
    image.scale.set(0.4);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__axe2 = {
  LANG_RU: 'Топор Красного Пламени',

  createView() {
    const image = weapon__axe2__default.createView();
    image.scale.set(0.4);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__bigaxe = {
  LANG_RU: 'Алебарда',

  createView() {
    const image = weapon__bigaxe__default.createView();
    image.scale.set(0.5);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__bigaxe2 = {
  LANG_RU: 'Жаждущая Крови Алебарда',

  createView() {
    const image = weapon__bigaxe2__default.createView();
    image.scale.set(0.5);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__kopie = {
  LANG_RU: 'Копьё',

  createView() {
    const image = weapon__kopie__default.createView();
    image.scale.set(0.5);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__kopie2 = {
  LANG_RU: 'Копьё Крадущейся Тени',

  createView() {
    const image = weapon__kopie2__default.createView();
    image.scale.set(0.5);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__molot = {
  LANG_RU: 'Молот',

  createView() {
    const image = weapon__molot__default.createView();
    image.scale.set(0.4);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__molot2 = {
  LANG_RU: 'Молот Грозы',

  createView() {
    const image = weapon__molot2__default.createView();
    image.scale.set(0.4);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__bigmolot = {
  LANG_RU: 'Булава',

  createView() {
    const image = weapon__bigmolot__default.createView();
    image.scale.set(0.5);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__bigmolot2 = {
  LANG_RU: 'Булава Бури',

  createView() {
    const image = weapon__bigmolot2__default.createView();
    image.scale.set(0.5);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__dubina = {
  LANG_RU: 'Лапа великана',

  createView() {
    const image = weapon__dubina__default.createView();
    image.scale.set(0.4);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__bigdubina = {
  LANG_RU: 'Лапа гиганта',

  createView() {
    const image = weapon__bigdubina__default.createView();
    image.scale.set(0.5);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__kinjal = {
  LANG_RU: 'Кинжал',

  createView() {
    const image = weapon__kinjal__default.createView();
    image.scale.set(0.4);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__kinjal2 = {
  LANG_RU: 'Кинжал Яростного Пламени',

  createView() {
    const image = weapon__kinjal2__default.createView();
    image.scale.set(0.4);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__shield = {
  LANG_RU: 'Щит',

  createView() {
    const image = shield__default__default.createView();
    image.scale.set(0.8);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__luk = {
  LANG_RU: 'Лук',

  createView() {
    const image = weapon__luk__default.createView();
    image.scale.set(0.8);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};
export const client__item__luk2 = {
  LANG_RU: 'Лук Чистого Неба',

  createView() {
    const image = weapon__luk2__default.createView();
    image.scale.set(0.8);
    image.tex.anchor.set(0.5);
    image.blackTex.anchor.set(0.5);
    image.addTex.anchor.set(0.5);
    image.angle = 45;
    return image;
  },
};