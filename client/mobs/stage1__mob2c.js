// 1
export const stage1__mob2c__sword = patch(stage1__mob2, {
  GRAY_TINT: 0xffffff,
  COLOR_TINT: 0x344047,
  AMBIENT_TINT: [0x84acce, 1],
  SPECIAL_TINT: 0xbecacc,
  ADD_COLOR_TINT: 0x617280,
  ADD_AMBIENT_TINT: 0x575f64,
  ADD_SPECIAL_TINT: 0x1bfaed,
});
export const weapon__stage1__mob2c__sword__default = patch(
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
export const stage1__mob2c2__sword = patch(stage1__mob2, {
  GRAY_TINT: 0xffffff,
  COLOR_TINT: 0x344047,
  AMBIENT_TINT: [0x84acce, 1],
  SPECIAL_TINT: 0xbecacc,
  ADD_COLOR_TINT: 0x617280,
  ADD_AMBIENT_TINT: 0x575f64,
  ADD_SPECIAL_TINT: 0x1bfaed,
});
export const weapon__stage1__mob2c2__sword__default = patch(
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