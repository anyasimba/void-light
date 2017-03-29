export const stage1__mob1 = {
  VIEW: 'stage1__mob1',
  CAN_MIRROR_VIEW: true,
  BACK_VIEW: 'stage1__mob1--back',
  HIT_VIEW: 'stage1__mob1--hit',
  DEAD_VIEW: 'stage1__mob1--dead',
  LEFT_FOOT_VIEW: 'stage1__mob1--foot',
  RIGHT_FOOT_VIEW: 'stage1__mob1--foot',
  CAN_MIRROR_FOOTS: true,
  LEFT_HAND: 'stage1__mob1--hand',
  RIGHT_HAND: 'stage1__mob1--hand',
  CAN_MIRROR_HANDS: true,

  H: 0.5,

  TINT: 0x4411f2,
  LIGHT: 0x4411f2,
  LIGHT_I: 1,
  LIGHT_A: 1,
  LIGHT_SCALE: 12,
}
export const weapon__stage1__mob1__rightHand__default = new class {
  constructor() {
    this.update = mobs__hands__family.rightHand.update;
    this.onStun = mobs__hands__family.rightHand.onStun;
  }
  createView(isHost, kind) {
    const prepare = (image) => {
      image.anchor.x = 0.2;
      image.anchor.y = 0.8;
      image.smoothed = true;
    }

    const view = makeHSL(hslMap['stage1__mob1--hand']);
    view.color.tint = 0x4411f2;
    view.ambient.tint = 0x4411f2;
    view.special.tint = 0x4411f2;
    prepare(view.gray);
    prepare(view.color);
    prepare(view.ambient);
    prepare(view.special);
    return view;
  }
}
export const weapon__stage1__mob1__leftHand__default = new class {
  constructor() {
    this.update = mobs__hands__family.leftHand.update;
    this.onStun = mobs__hands__family.leftHand.onStun;
  }
  createView(isHost, kind) {
    const prepare = (image) => {
      image.scale.x = -1;
      image.anchor.x = 0.2;
      image.anchor.y = 0.8;
      image.smoothed = true;
    }

    const view = makeHSL(hslMap['stage1__mob1--hand']);
    view.color.tint = 0x4411f2;
    view.ambient.tint = 0x4411f2;
    view.special.tint = 0x4411f2;
    prepare(view.gray);
    prepare(view.color);
    prepare(view.ambient);
    prepare(view.special);
    return view;
  }
}
export const stage1__mob1a = {
  VIEW: 'stage1__mob1',
  CAN_MIRROR_VIEW: true,
  BACK_VIEW: 'stage1__mob1--back',
  HIT_VIEW: 'stage1__mob1--hit',
  DEAD_VIEW: 'stage1__mob1--dead',
  LEFT_FOOT_VIEW: 'stage1__mob1--foot',
  RIGHT_FOOT_VIEW: 'stage1__mob1--foot',
  CAN_MIRROR_FOOTS: true,
  LEFT_HAND: 'stage1__mob1--hand',
  RIGHT_HAND: 'stage1__mob1--hand',
  CAN_MIRROR_HANDS: true,

  H: 0.5,

  TINT: 0x990000,
  LIGHT: 0x990000,
  LIGHT_I: 1,
  LIGHT_A: 1,
  LIGHT_SCALE: 8,
}
export const weapon__stage1__mob1a__rightHand__default = new class {
  constructor() {
    this.update = mobs__hands__family.rightHand.update;
    this.onStun = mobs__hands__family.rightHand.onStun;
  }
  createView(isHost, kind) {
    const prepare = (image) => {
      image.anchor.x = 0.2;
      image.anchor.y = 0.8;
      image.smoothed = true;
    }

    const view = makeHSL(hslMap['stage1__mob1--hand']);
    view.color.tint = 0x990000;
    view.ambient.tint = 0x990000;
    view.special.tint = 0x990000;
    prepare(view.gray);
    prepare(view.color);
    prepare(view.ambient);
    prepare(view.special);
    return view;
  }
}
export const weapon__stage1__mob1a__leftHand__default = new class {
  constructor() {
    this.update = mobs__hands__family.leftHand.update;
    this.onStun = mobs__hands__family.leftHand.onStun;
  }
  createView(isHost, kind) {
    const prepare = (image) => {
      image.scale.x = -1;
      image.anchor.x = 0.2;
      image.anchor.y = 0.8;
      image.smoothed = true;
    }

    const view = makeHSL(hslMap['stage1__mob1--hand']);
    view.color.tint = 0x990000;
    view.ambient.tint = 0x990000;
    view.special.tint = 0x990000;
    prepare(view.gray);
    prepare(view.color);
    prepare(view.ambient);
    prepare(view.special);
    return view;
  }
}
export const stage1__mob1b = {
  VIEW: 'stage1__mob1',
  CAN_MIRROR_VIEW: true,
  BACK_VIEW: 'stage1__mob1--back',
  HIT_VIEW: 'stage1__mob1--hit',
  DEAD_VIEW: 'stage1__mob1--dead',
  LEFT_FOOT_VIEW: 'stage1__mob1--foot',
  RIGHT_FOOT_VIEW: 'stage1__mob1--foot',
  CAN_MIRROR_FOOTS: true,
  LEFT_HAND: 'stage1__mob1--hand',
  RIGHT_HAND: 'stage1__mob1--hand',
  CAN_MIRROR_HANDS: true,

  H: 0.5,

  TINT: 0x18006a,
  LIGHT: 0x18006a,
  LIGHT_I: 1,
  LIGHT_A: 1,
  LIGHT_SCALE: 8,
}
export const weapon__stage1__mob1b__rightHand__default = new class {
  constructor() {
    this.update = mobs__hands__family.rightHand.update;
    this.onStun = mobs__hands__family.rightHand.onStun;
  }
  createView(isHost, kind) {
    const prepare = (image) => {
      image.anchor.x = 0.2;
      image.anchor.y = 0.8;
      image.smoothed = true;
    }

    const view = makeHSL(hslMap['stage1__mob1--hand']);
    view.color.tint = 0x18006a;
    view.ambient.tint = 0x18006a;
    view.special.tint = 0x18006a;
    prepare(view.gray);
    prepare(view.color);
    prepare(view.ambient);
    prepare(view.special);
    return view;
  }
}
export const weapon__stage1__mob1b__leftHand__default = new class {
  constructor() {
    this.update = mobs__hands__family.leftHand.update;
    this.onStun = mobs__hands__family.leftHand.onStun;
  }
  createView(isHost, kind) {
    const prepare = (image) => {
      image.scale.x = -1;
      image.anchor.x = 0.2;
      image.anchor.y = 0.8;
      image.smoothed = true;
    }

    const view = makeHSL(hslMap['stage1__mob1--hand']);
    view.color.tint = 0x18006a;
    view.ambient.tint = 0x18006a;
    view.special.tint = 0x18006a;
    prepare(view.gray);
    prepare(view.color);
    prepare(view.ambient);
    prepare(view.special);
    return view;
  }
}
export const stage1__mob1c = {
  VIEW: 'stage1__mob1',
  CAN_MIRROR_VIEW: true,
  BACK_VIEW: 'stage1__mob1--back',
  HIT_VIEW: 'stage1__mob1--hit',
  DEAD_VIEW: 'stage1__mob1--dead',
  LEFT_FOOT_VIEW: 'stage1__mob1--foot',
  RIGHT_FOOT_VIEW: 'stage1__mob1--foot',
  CAN_MIRROR_FOOTS: true,
  LEFT_HAND: 'stage1__mob1--hand',
  RIGHT_HAND: 'stage1__mob1--hand',
  CAN_MIRROR_HANDS: true,

  H: 0.5,

  TINT: 0x3366ff,
  LIGHT: 0x3366ff,
  LIGHT_I: 1,
  LIGHT_A: 1,
  LIGHT_SCALE: 8,
}
export const weapon__stage1__mob1c__rightHand__default = new class {
  constructor() {
    this.update = mobs__hands__family.rightHand.update;
    this.onStun = mobs__hands__family.rightHand.onStun;
  }
  createView(isHost, kind) {
    const prepare = (image) => {
      image.anchor.x = 0.2;
      image.anchor.y = 0.8;
      image.smoothed = true;
    }

    const view = makeHSL(hslMap['stage1__mob1--hand']);
    view.color.tint = 0x3366ff;
    view.ambient.tint = 0x3366ff;
    view.special.tint = 0x3366ff;
    prepare(view.gray);
    prepare(view.color);
    prepare(view.ambient);
    prepare(view.special);
    return view;
  }
}
export const weapon__stage1__mob1c__leftHand__default = new class {
  constructor() {
    this.update = mobs__hands__family.leftHand.update;
    this.onStun = mobs__hands__family.leftHand.onStun;
  }
  createView(isHost, kind) {
    const prepare = (image) => {
      image.scale.x = -1;
      image.anchor.x = 0.2;
      image.anchor.y = 0.8;
      image.smoothed = true;
    }

    const view = makeHSL(hslMap['stage1__mob1--hand']);
    view.color.tint = 0x3366ff;
    view.ambient.tint = 0x3366ff;
    view.special.tint = 0x3366ff;
    prepare(view.gray);
    prepare(view.color);
    prepare(view.ambient);
    prepare(view.special);
    return view;
  }
}

//
export const stage1__mob2 = {
  VIEW: 'player',
  SCALE: 0.2,
  TINT: 0x995511,
  CAN_MIRROR_VIEW: true,
  BACK_VIEW: 'player-back',
  DEAD_VIEW: 'player-back',

  LIGHT: 0x995511,
  LIGHT_I: 2,
  LIGHT_A: 1,
  LIGHT_SCALE: 6,
}
export const weapon__stage1__mob2__rightHand__default = new class {
  constructor() {
    this.update = mobs__weapon__family.rightHand.update;
    this.onStun = mobs__weapon__family.rightHand.onStun;
  }
  createView(isHost, kind) {
    const image = new Phaser.Image(game, 0, 0, 'sword');
    image.scale.x = 0.8;
    image.scale.y = 1.3;
    image.anchor.x = 0.5;
    image.anchor.y = 0.8;
    image.smoothed = true;
    image.tint = 0x992200;
    return image;
  }
}
export const stage1__mob2a = {
  VIEW: 'player',
  SCALE: 0.2,
  TINT: 0x333333,
  CAN_MIRROR_VIEW: true,
  BACK_VIEW: 'player-back',
  DEAD_VIEW: 'player-back',

  LIGHT: 0x994444,
  LIGHT_I: 2,
  LIGHT_A: 1,
  LIGHT_SCALE: 5,
}
export const weapon__stage1__mob2a__rightHand__default = new class {
  constructor() {
    this.update = mobs__weapon__family.rightHand.update;
    this.onStun = mobs__weapon__family.rightHand.onStun;
  }
  createView(isHost, kind) {
    const image = new Phaser.Image(game, 0, 0, 'sword');
    image.scale.x = 0.8;
    image.scale.y = 1.4;
    image.anchor.x = 0.5;
    image.anchor.y = 0.8;
    image.smoothed = true;
    image.tint = 0x555555;
    return image;
  }
}
export const stage1__mob2b = {
  VIEW: 'player',
  SCALE: 0.2,
  TINT: 0x333333,
  CAN_MIRROR_VIEW: true,
  BACK_VIEW: 'player-back',
  DEAD_VIEW: 'player-back',

  LIGHT: 0x994444,
  LIGHT_I: 2,
  LIGHT_A: 1,
  LIGHT_SCALE: 5,
}
export const weapon__stage1__mob2b__rightHand__default = new class {
  constructor() {
    this.update = mobs__weapon__family.rightHand.update;
    this.onStun = mobs__weapon__family.rightHand.onStun;
  }
  createView(isHost, kind) {
    const image = new Phaser.Image(game, 0, 0, 'axe');
    image.scale.x = 0.8;
    image.scale.y = 1.4;
    image.anchor.x = 0.5;
    image.anchor.y = 0.8;
    image.smoothed = true;
    image.tint = 0x555555;
    return image;
  }
}
export const stage1__mob2c = {
  VIEW: 'player',
  SCALE: 0.2,
  TINT: 0x333333,
  CAN_MIRROR_VIEW: true,
  BACK_VIEW: 'player-back',
  DEAD_VIEW: 'player-back',

  LIGHT: 0x994444,
  LIGHT_I: 2,
  LIGHT_A: 1,
  LIGHT_SCALE: 6,
}
export const weapon__stage1__mob2c__rightHand__default = new class {
  constructor() {
    this.update = mobs__weapon__family.rightHand.update;
    this.onStun = mobs__weapon__family.rightHand.onStun;
  }
  createView(isHost, kind) {
    const image = new Phaser.Image(game, 0, 0, 'sword');
    image.scale.x = 0.8;
    image.scale.y = 1.4;
    image.anchor.x = 0.5;
    image.anchor.y = 0.8;
    image.smoothed = true;
    image.tint = 0x555555;
    return image;
  }
}
export const shield__stage1__mob2c__leftHand__default = new class {
  constructor() {
    this.update = mobs__weapon__family.leftHand.update;
    this.onStun = mobs__weapon__family.leftHand.onStun;
  }
  createView(isHost, kind) {
    const image = new Phaser.Image(game, 0, 0, 'shield');
    image.scale.x = 1.4;
    image.scale.y = 1.4;
    image.anchor.x = 0.5;
    image.anchor.y = 0.5;
    image.tint = 0x555555;
    image.smoothed = true;
    return image;
  }
}

//
export const stage1__boss1 = {
  VIEW: 'player',
  SCALE: 0.2,
  TINT: 0x222222,
  CAN_MIRROR_VIEW: true,
  BACK_VIEW: 'player-back',
  DEAD_VIEW: 'player-back',

  LIGHT: 0xFF5555,
  LIGHT_I: 3,
  LIGHT_A: 1,
  LIGHT_SCALE: 16,
}
export const weapon__stage1__boss1__rightHand__default = new class {
  constructor() {
    this.update = mobs__weapon__family.rightHand.update;
    this.onStun = mobs__weapon__family.rightHand.onStun;
  }
  createView(isHost, kind) {
    const image = new Phaser.Image(game, 0, 0, 'sword');
    image.scale.x = 1;
    image.scale.y = 1.4;
    image.anchor.x = 0.5;
    image.anchor.y = 0.8;
    image.smoothed = true;
    image.tint = 0x772222;
    return image;
  }
}
export const shield__stage1__boss1__leftHand__default = new class {
  constructor() {
    this.update = mobs__weapon__family.leftHand.update;
    this.onStun = mobs__weapon__family.leftHand.onStun;
  }
  createView(isHost, kind) {
    const image = new Phaser.Image(game, 0, 0, 'shield');
    image.scale.x = 1.4;
    image.scale.y = 1.4;
    image.anchor.x = 0.5;
    image.anchor.y = 0.5;
    image.tint = 0x222222;
    image.smoothed = true;
    return image;
  }
}