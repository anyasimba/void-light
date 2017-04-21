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
  BODY_VIEW: 'stage1__mob1--body',
  TAIL: 'stage1__mob1--tail',

  GRAY_TINT: 0xFFFFFF,
  COLOR_TINT: 0x666666,
  AMBIENT_TINT: [0x333333, 1],
  SPECIAL_TINT: 0x666666,
  ADD_COLOR_TINT: 0x000000,
  ADD_AMBIENT_TINT: 0x000000,
  ADD_SPECIAL_TINT: 0x000000,

  LIGHT: 0xFFFFFF,
  LIGHT_I: 0,
  LIGHT_A: 0.7,
  LIGHT_SCALE: 8,
}
export const weapon__stage1__mob1__rightHand__default = new class {
  constructor() {
    this.update = mobs__hands__family.rightHand.update;
    this.onStun = mobs__hands__family.rightHand.onStun;
  }
  createView() {
    const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
      0xFFFFFF, 0x666666, [0x333333, 1],
      0x000000, 0x000000, 0x000000, 0x000000
    ]);
    return view;
  }
}
export const weapon__stage1__mob1__leftHand__default = new class {
  constructor() {
    this.update = mobs__hands__family.leftHand.update;
    this.onStun = mobs__hands__family.leftHand.onStun;
  }
  createView() {
    const prepare = (image) => {
      image.scale.x *= -1;
    }
    const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
      0xFFFFFF, 0x666666, [0x333333, 1],
      0x000000, 0x000000, 0x000000, 0x000000
    ]);
    prepare(view.blackTex);
    prepare(view.tex);
    prepare(view.addTex);
    return view;
  }
}