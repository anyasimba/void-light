// 1
export const stage1__mob2b__sword = patch(stage1__mob2, {
  GRAY_TINT: 0x000000,
  COLOR_TINT: 0x312c23,
  AMBIENT_TINT: [0x000000, 1],
  SPECIAL_TINT: 0x000000,
  ADD_COLOR_TINT: 0x000000,
  ADD_AMBIENT_TINT: 0x000000,
  ADD_SPECIAL_TINT: 0x000000,
});
export const weapon__stage1__mob2b__sword__default = patch(
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
// 2
export const stage1__mob2b2__sword = patch(stage1__mob2, {
  GRAY_TINT: 0xff0084,
  COLOR_TINT: 0x000000,
  AMBIENT_TINT: [0x000000, 1],
  SPECIAL_TINT: 0x000000,
  ADD_COLOR_TINT: 0x440014,
  ADD_AMBIENT_TINT: 0xff0084,
  ADD_SPECIAL_TINT: 0x000000,
});
export const weapon__stage1__mob2b2__sword__default = patch(
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
export const stage1__mob2b3__sword = patch(stage1__mob2, {
  GRAY_TINT: 0xff0084,
  COLOR_TINT: 0x4a0339,
  AMBIENT_TINT: [0x31042b, 1],
  SPECIAL_TINT: 0x8a227f,
  ADD_COLOR_TINT: 0x200400,
  ADD_AMBIENT_TINT: 0x31042b,
  ADD_SPECIAL_TINT: 0x000000,
});
export const weapon__stage1__mob2b3__sword__default = patch(
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
// 4
export const stage1__mob2b4__sword = patch(stage1__mob2, {
  GRAY_TINT: 0x000000,
  COLOR_TINT: 0x697178,
  AMBIENT_TINT: [0x282925, 1],
  SPECIAL_TINT: 0x484f50,
  ADD_COLOR_TINT: 0x200400,
  ADD_AMBIENT_TINT: 0x8a227f,
  ADD_SPECIAL_TINT: 0x000000,
});
export const weapon__stage1__mob2b4__sword__default = patch(
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
export const stage1__mob2b__boss1 = patch(stage1__mob2, {
  GRAY_TINT: 0x444444,
  COLOR_TINT: 0xb3b3b3,
  AMBIENT_TINT: [0x000000, 1],
  SPECIAL_TINT: 0x484848,
  ADD_COLOR_TINT: 0x000000,
  ADD_AMBIENT_TINT: 0x000000,
  ADD_SPECIAL_TINT: 0x000000,
});
export const weapon__stage1__mob2b__boss1__default = patch(
  weapon__stage1__mob2__sword__default, {
    createView() {
      const image = makeHSL(hslMap['sword'], 0.5, 0.75, [
        0xFFFFFF,
        0x444444,
        0x444444,
        0x000000,
        0xb3b3b3,
        0xb3b3b3,
        0xb3b3b3
      ]);
      image.scale.x = 0.5;
      image.scale.y = 0.5;
      return image;
    }
  });
export const shield__stage1__mob2b__boss1__default = new class {
  constructor() {
    this.update = mobs__weapon__family.leftHand.update;
    this.onStun = mobs__weapon__family.leftHand.onStun;
  }
  createView(isHost, kind) {
    const image = makeHSL(hslMap['shield'], 0.5, 0.5, [
      0xFFFFFF,
      0x444444,
      0x444444,
      0x000000,
      0xb3b3b3,
      0xb3b3b3,
      0xb3b3b3
    ]);
    image.scale.x = 1;
    image.scale.y = 1;
    return image;
  }
}