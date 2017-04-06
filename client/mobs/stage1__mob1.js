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

  GRAY_TINT: 0xFFFF44,
  COLOR_TINT: 0x2222FF,
  AMBIENT_TINT: [0x004400, 1],
  SPECIAL_TINT: 0xFF2200,
  LIGHT: 0xFFFFFF,
  LIGHT_I: 1,
  LIGHT_A: 1,
  LIGHT_SCALE: 12,
}
export const weapon__stage1__mob1__rightHand__default = new class {
  constructor() {
    this.update = mobs__hands__family.rightHand.update;
    this.onStun = mobs__hands__family.rightHand.onStun;
  }
  createView() {
    const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
      0x444444, 0x222222, [0x000000, 1],
      0xFF2200,
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
      image.scale.x = -1;
    }
    const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
      0x444444, 0x222222, [0x000000, 1],
      0xFF2200,
    ]);
    prepare(view.blackTex);
    prepare(view.tex);
    prepare(view.addTex);
    return view;
  }
}

export const stage1__mob1a = patch(stage1__mob1);
export const weapon__stage1__mob1a__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default);
export const weapon__stage1__mob1a__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default);

export const stage1__mob1b = patch(stage1__mob1);
export const weapon__stage1__mob1b__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default);
export const weapon__stage1__mob1b__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default);

export const stage1__mob1c = patch(stage1__mob1);
export const weapon__stage1__mob1c__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default);
export const weapon__stage1__mob1c__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default);