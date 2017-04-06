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
    const image = makeHSL(hslMap['luk'], 0.5, 0.5, [
      0xFFFFFF,
      0x8899AA,
      0x8899AA,
      0x8899AA
    ]);
    image.scale.x = -0.9;
    image.scale.y = 0.9;
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
  VIEW: 'stage1__mob3',
  SCALE: 0.2,
  GRAY_TINT: 0x201010,
  COLOR_TINT: 0x101010,
  ADD_AMBIENT_TINT: 0x882200,
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
      null,
      null,
      null,
      null,
      0x882200
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
      null,
      null,
      null,
      null,
      0x882200
    ]);
    image.scale.x = 0.8;
    image.scale.y = 0.8;
    return image;
  }
}