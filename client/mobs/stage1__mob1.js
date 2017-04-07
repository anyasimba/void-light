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

  GRAY_TINT: 0x000000,
  COLOR_TINT: 0x000000,
  AMBIENT_TINT: [0x000000, 1],
  SPECIAL_TINT: 0x000000,
  ADD_COLOR_TINT: 0x000000,
  ADD_AMBIENT_TINT: 0x000000,
  ADD_SPECIAL_TINT: 0x000000,
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
      0x000000, 0x000000, [0x000000, 1],
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
      image.scale.x = -1;
    }
    const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
      0x000000, 0x000000, [0x000000, 1],
      0x000000, 0x000000, 0x000000, 0x000000
    ]);
    prepare(view.blackTex);
    prepare(view.tex);
    prepare(view.addTex);
    return view;
  }
}

// stage1__mob1a
export const stage1__mob1a = patch(stage1__mob1, {
  GRAY_TINT: 0xff9100,
  COLOR_TINT: 0xb5a328,
  AMBIENT_TINT: [0x262626, 1],
  SPECIAL_TINT: 0xdbc549,
  ADD_COLOR_TINT: 0x6f704f,
  ADD_AMBIENT_TINT: 0x701702,
  ADD_SPECIAL_TINT: 0xa6a6a6,
});
export const weapon__stage1__mob1a__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0xff9100, 0xb5a328, [0x262626, 1],
        0xdbc549, 0x6f704f, 0x701702, 0xa6a6a6
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1a__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x = -1;
      }
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0xff9100, 0xb5a328, [0x262626, 1],
        0xdbc549, 0x6f704f, 0x701702, 0xa6a6a6
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });

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