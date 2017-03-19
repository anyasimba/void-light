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

  LIGHT: 0xFF44FF,
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
    const image = new Phaser.Image(game, 0, 0, 'stage1__mob1--hand');
    image.scale.x = 1;
    image.scale.y = 1;
    image.anchor.x = 0.2;
    image.anchor.y = 0.8;
    image.smoothed = true;
    image.isHSL = true;
    return image;
  }
}
export const weapon__stage1__mob1__leftHand__default = new class {
  constructor() {
    this.update = mobs__hands__family.leftHand.update;
    this.onStun = mobs__hands__family.leftHand.onStun;
  }
  createView(isHost, kind) {
    const image = new Phaser.Image(game, 0, 0, 'stage1__mob1--hand');
    image.scale.x = -1;
    image.scale.y = 1;
    image.anchor.x = 0.2;
    image.anchor.y = 0.8;
    image.smoothed = true;
    image.isHSL = true;
    return image;
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

  TINT: 0x449933,
  LIGHT: 0x888888,
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
    const image = new Phaser.Image(game, 0, 0, 'stage1__mob1--hand');
    image.scale.x = 1;
    image.scale.y = 1;
    image.anchor.x = 0.2;
    image.anchor.y = 0.8;
    image.smoothed = true;
    image.tint = 0x449933;
    return image;
  }
}
export const weapon__stage1__mob1a__leftHand__default = new class {
  constructor() {
    this.update = mobs__hands__family.leftHand.update;
    this.onStun = mobs__hands__family.leftHand.onStun;
  }
  createView(isHost, kind) {
    const image = new Phaser.Image(game, 0, 0, 'stage1__mob1--hand');
    image.scale.x = -1;
    image.scale.y = 1;
    image.anchor.x = 0.2;
    image.anchor.y = 0.8;
    image.smoothed = true;
    image.tint = 0x449933;
    return image;
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

  TINT: 0x444433,
  LIGHT: 0x888888,
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
    const image = new Phaser.Image(game, 0, 0, 'stage1__mob1--hand');
    image.scale.x = 1;
    image.scale.y = 1;
    image.anchor.x = 0.2;
    image.anchor.y = 0.8;
    image.smoothed = true;
    image.tint = 0x444433;
    return image;
  }
}
export const weapon__stage1__mob1b__leftHand__default = new class {
  constructor() {
    this.update = mobs__hands__family.leftHand.update;
    this.onStun = mobs__hands__family.leftHand.onStun;
  }
  createView(isHost, kind) {
    const image = new Phaser.Image(game, 0, 0, 'stage1__mob1--hand');
    image.scale.x = -1;
    image.scale.y = 1;
    image.anchor.x = 0.2;
    image.anchor.y = 0.8;
    image.smoothed = true;
    image.tint = 0x444433;
    return image;
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

  TINT: 0x334466,
  LIGHT: 0x888888,
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
    const image = new Phaser.Image(game, 0, 0, 'stage1__mob1--hand');
    image.scale.x = 1;
    image.scale.y = 1;
    image.anchor.x = 0.2;
    image.anchor.y = 0.8;
    image.smoothed = true;
    image.tint = 0x334466;
    return image;
  }
}
export const weapon__stage1__mob1c__leftHand__default = new class {
  constructor() {
    this.update = mobs__hands__family.leftHand.update;
    this.onStun = mobs__hands__family.leftHand.onStun;
  }
  createView(isHost, kind) {
    const image = new Phaser.Image(game, 0, 0, 'stage1__mob1--hand');
    image.scale.x = -1;
    image.scale.y = 1;
    image.anchor.x = 0.2;
    image.anchor.y = 0.8;
    image.smoothed = true;
    image.tint = 0x334466;
    return image;
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