// 1
export const stage1__mob2d__sword = patch(stage1__mob2, {
  GRAY_TINT: 0x444400,
  COLOR_TINT: 0xb3b3b1,
  AMBIENT_TINT: [0x000000, 1],
  SPECIAL_TINT: 0x484803,
  ADD_COLOR_TINT: 0x000000,
  ADD_AMBIENT_TINT: 0x000000,
  ADD_SPECIAL_TINT: 0x000000,
});
export const weapon__stage1__mob2d__sword__default = patch(
  weapon__stage1__mob2__sword__default, {
    createView() {
      const image = makeHSL(hslMap['sword'], 0.5, 0.75, [
        0x444400,
        0x484803,
        0x484803,
      ]);
      image.scale.x = 0.5;
      image.scale.y = 0.5;
      return image;
    }
  });
// 2
export const stage1__mob2d2__sword = patch(stage1__mob2, {
  GRAY_TINT: 0xc7c704,
  COLOR_TINT: 0xb3b3b1,
  AMBIENT_TINT: [0x3f3f00, 1],
  SPECIAL_TINT: 0x484803,
  ADD_COLOR_TINT: 0x575700,
  ADD_AMBIENT_TINT: 0x484811,
  ADD_SPECIAL_TINT: 0xc5c5c5,
});
export const weapon__stage1__mob2d2__sword__default = patch(
  weapon__stage1__mob2__sword__default, {
    createView() {
      const image = makeHSL(hslMap['sword'], 0.5, 0.75, [
        0xFFFFFF,
        0x888888,
        0x888888,
      ]);
      image.scale.x = 0.5;
      image.scale.y = 0.5;
      return image;
    }
  });
// 3
export const stage1__mob2d3__sword = patch(stage1__mob2, {
  GRAY_TINT: 0x999933,
  COLOR_TINT: 0x484803,
  AMBIENT_TINT: [0x3f3f00, 1],
  SPECIAL_TINT: 0x484803,
  ADD_COLOR_TINT: 0x575700,
  ADD_AMBIENT_TINT: 0x484811,
  ADD_SPECIAL_TINT: 0xFFc5c5,
});
export const weapon__stage1__mob2d3__sword__default = patch(
  weapon__stage1__mob2__sword__default, {
    createView() {
      const image = makeHSL(hslMap['sword'], 0.5, 0.75, [
        0xFFFFFF,
        0x888888,
        0x888888,
      ]);
      image.scale.x = 0.5;
      image.scale.y = 0.5;
      return image;
    }
  });

// boss1
export const stage1__mob2d__boss1 = patch(stage1__mob2, {
  GRAY_TINT: 0x000000,
  COLOR_TINT: 0x141414,
  AMBIENT_TINT: [0x282925, 1],
  SPECIAL_TINT: 0xccc1c1,
  ADD_COLOR_TINT: 0x200400,
  ADD_AMBIENT_TINT: 0x000000,
  ADD_SPECIAL_TINT: 0x990000,
});
export const weapon__stage1__mob2d__boss1__default = patch(
  weapon__stage1__mob2__sword__default, {
    createView() {
      const image = makeHSL(hslMap['axe'], 0.5, 0.75, [
        0x141414,
        0x141414,
        0x141414,
        0x000000,
        0x200400,
        0x200400,
        0x200400
      ]);
      image.scale.x = 0.5;
      image.scale.y = 0.5;
      return image;
    }
  });
export const shield__stage1__mob2d__boss1__default = new class {
  constructor() {
    this.update = mobs__weapon__family.leftHand.update;
    this.onStun = mobs__weapon__family.leftHand.onStun;
  }
  createView(isHost, kind) {
    const image = makeHSL(hslMap['shield'], 0.5, 0.5, [
      0x141414,
      0x141414,
      0x141414,
      0x000000,
      0x200400,
      0x200400,
      0x200400
    ]);
    image.scale.x = 1;
    image.scale.y = 1;
    return image;
  }
}