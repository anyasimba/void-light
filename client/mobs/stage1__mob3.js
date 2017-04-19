export const stage1__mob3 = {
  VIEW: 'stage1__mob3',
  CAN_MIRROR_VIEW: true,
  BACK_VIEW: 'stage1__mob3--back',
  HIT_VIEW: 'stage1__mob3--hit',
  DEAD_VIEW: 'stage1__mob3--dead',
  LEFT_FOOT_VIEW: 'stage1__mob3--foot',
  RIGHT_FOOT_VIEW: 'stage1__mob3--foot',
  CAN_MIRROR_FOOTS: true,
  LEFT_HAND: 'stage1__mob3--hand',
  RIGHT_HAND: 'stage1__mob3--hand',
  CAN_MIRROR_HANDS: true,

  GRAY_TINT: 0x402020,
  COLOR_TINT: 0x202020,
  AMBIENT_TINT: [0x100000, 1],
  SPECIAL_TINT: 0xFF2200,
  LIGHT: 0xFFFFFF,
  LIGHT_I: 1,
  LIGHT_A: 1,
  LIGHT_SCALE: 12,
}
export const weapon__stage1__mob3__rightHand__default = new class {
  constructor() {
    this.update = mobs__hands__family.rightHand.update;
    this.onStun = mobs__hands__family.rightHand.onStun;
  }
  createView() {
    const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
      0x402020, 0x202020, [0x100000, 1],
      0xFF2200,
    ]);
    return view;
  }
}
export const weapon__stage1__mob3__leftHand__default = new class {
  constructor() {
    this.update = mobs__hands__family.leftHand.update;
    this.onStun = mobs__hands__family.leftHand.onStun;
  }
  createView() {
    const prepare = (image) => {
      image.scale.x *= -1;
    }
    const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
      0x402020, 0x202020, [0x100000, 1],
      0xFF2200,
    ]);
    prepare(view.blackTex);
    prepare(view.tex);
    prepare(view.addTex);
    return view;
  }
}

export const stage1__mob3b = patch(stage1__mob3);
export const weapon__stage1__mob3b__rightHand__default = patch(
  weapon__stage1__mob3__rightHand__default);
export const weapon__stage1__mob3b__leftHand__default = patch(
  weapon__stage1__mob3__leftHand__default);

export const stage1__mob3c = patch(stage1__mob3);
export const weapon__stage1__mob3c__rightHand__default = patch(
  weapon__stage1__mob3__rightHand__default);
export const weapon__stage1__mob3c__leftHand__default = patch(
  weapon__stage1__mob3__leftHand__default);