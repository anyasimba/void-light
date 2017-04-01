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

  GRAY_TINT: 0x333333,
  COLOR_TINT: 0x111111,
  AMBIENT_TINT: 0x201000,
  SPECIAL_TINT: 0xc02010,
  LIGHT: 0x999999,
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

    const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
      0x333333,
      0x111111,
      0x201000,
      0xc02010
    ]);
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
    }

    const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
      0x333333,
      0x111111,
      0x201000,
      0xc02010
    ]);
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

  GRAY_TINT: 0x888888,
  COLOR_TINT: 0x112233,
  AMBIENT_TINT: 0x101010,
  SPECIAL_TINT: 0x1090F0,
  LIGHT: 0x999999,
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
    const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
      0x888888,
      0x112233,
      0x101010,
      0x1090F0
    ]);
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
    }

    const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
      0x444444,
      0x222222,
      0x201010,
      0x201010
    ]);
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

  GRAY_TINT: 0x444444,
  COLOR_TINT: 0x222222,
  AMBIENT_TINT: 0x201010,
  SPECIAL_TINT: 0x201010,
  LIGHT: 0x999999,
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
    const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
      0x444444,
      0xFF2222,
      0x501010,
      0x501010
    ]);
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
    }

    const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
      0x444444,
      0x222222,
      0x201010,
      0x201010
    ]);
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

  GRAY_TINT: 0x444444,
  COLOR_TINT: 0x222222,
  AMBIENT_TINT: 0x201010,
  SPECIAL_TINT: 0x201010,
  LIGHT: 0x999999,
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
    const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
      0x444444,
      0x222222,
      0x201010,
      0x201010
    ]);
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
    }

    const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
      0x444444,
      0x222222,
      0x201010,
      0x201010
    ]);
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
  GRAY_TINT: 0xBBBBBB,
  COLOR_TINT: 0x888888,
  AMBIENT_TINT: 0x101010,
  SPECIAL_TINT: 0x8899AA,
  CAN_MIRROR_VIEW: true,
  BACK_VIEW: 'player-back',
  DEAD_VIEW: 'player-back',

  LIGHT: 0x999999,
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
    const image = makeHSL(hslMap['sword'], 0.5, 0.75, [
      0xBBBBBB,
      0x888888,
      0x101010,
      0x8899AA
    ]);
    image.scale.x = 0.5;
    image.scale.y = 0.5;
    return image;
  }
}
export const stage1__mob2a = {
  VIEW: 'player',
  SCALE: 0.2,
  GRAY_TINT: 0x666666,
  COLOR_TINT: 0x666666,
  AMBIENT_TINT: 0x000000,
  SPECIAL_TINT: 0x793630,
  CAN_MIRROR_VIEW: true,
  BACK_VIEW: 'player-back',
  DEAD_VIEW: 'player-back',

  LIGHT: 0x999999,
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
    const image = makeHSL(hslMap['sword'], 0.5, 0.75, [
      0x888888,
      0x444444,
      0x000000,
      0x590600
    ]);
    image.scale.x = 0.5;
    image.scale.y = 0.5;
    return image;
  }
}
export const stage1__mob2b = {
  VIEW: 'player',
  SCALE: 0.2,
  GRAY_TINT: 0x666666,
  COLOR_TINT: 0x666666,
  AMBIENT_TINT: 0x000000,
  SPECIAL_TINT: 0x793630,
  CAN_MIRROR_VIEW: true,
  BACK_VIEW: 'player-back',
  DEAD_VIEW: 'player-back',

  LIGHT: 0x999999,
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
    const image = makeHSL(hslMap['axe'], 0.5, 0.75, [
      0x888888,
      0x444444,
      0x000000,
      0x590600
    ]);
    image.scale.x = 0.5;
    image.scale.y = 0.5;
    return image;
  }
}
export const stage1__mob2c = {
  VIEW: 'player',
  SCALE: 0.2,
  GRAY_TINT: 0xBBBBBB,
  COLOR_TINT: 0x888888,
  AMBIENT_TINT: 0x101010,
  SPECIAL_TINT: 0x8899AA,
  CAN_MIRROR_VIEW: true,
  BACK_VIEW: 'player-back',
  DEAD_VIEW: 'player-back',

  LIGHT: 0x557799,
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
    const image = makeHSL(hslMap['sword'], 0.5, 0.75, [
      0xBBBBBB,
      0x888888,
      0x101010,
      0x8899AA
    ]);
    image.scale.x = 0.5;
    image.scale.y = 0.5;
    return image;
  }
}
export const shield__stage1__mob2c__leftHand__default = new class {
  constructor() {
    this.update = mobs__weapon__family.leftHand.update;
    this.onStun = mobs__weapon__family.leftHand.onStun;
  }
  createView(isHost, kind) {
    const image = makeHSL(hslMap['shield'], 0.5, 0.5, [
      0xBBBBBB,
      0x888888,
      0x101010,
      0x8899AA
    ]);
    image.scale.x = 0.8;
    image.scale.y = 0.8;
    return image;
  }
}

//
export const stage1__boss1 = {
  VIEW: 'player',
  SCALE: 0.2,
  GRAY_TINT: 0x201010,
  COLOR_TINT: 0x101010,
  AMBIENT_TINT: 0x000000,
  SPECIAL_TINT: 0x303030,
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
    const image = makeHSL(hslMap['sword'], 0.5, 0.75, [
      0x101010,
      0x220000,
      0x882200,
      0x303030
    ]);
    image.scale.x = 0.5;
    image.scale.y = 0.5;
    return image;
  }
}
export const shield__stage1__boss1__leftHand__default = new class {
  constructor() {
    this.update = mobs__weapon__family.leftHand.update;
    this.onStun = mobs__weapon__family.leftHand.onStun;
  }
  createView(isHost, kind) {
    const image = makeHSL(hslMap['shield'], 0.5, 0.5, [
      0x101010,
      0x882200,
      0x882200,
      0x303030
    ]);
    image.scale.x = 0.8;
    image.scale.y = 0.8;
    return image;
  }
}