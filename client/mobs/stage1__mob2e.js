// 1
export const stage1__mob2e__sword = patch(stage1__mob2, {
  GRAY_TINT: 0xFFc704,
  COLOR_TINT: 0xb3b3b1,
  AMBIENT_TINT: [0x3f3400, 1],
  SPECIAL_TINT: 0x482d03,
  ADD_COLOR_TINT: 0x571908,
  ADD_AMBIENT_TINT: 0x482c11,
  ADD_SPECIAL_TINT: 0xc5c5c5,
});
export const weapon__stage1__mob2e__sword__default = patch(
  weapon__stage1__mob2__sword__default, {
    createView() {
      const image = makeHSL(hslMap['sword'], 0.5, 0.75, [
        0xFF2222,
        0x3f3400,
        0x3f3400,
        0x882222,
        0x220000,
        0x440000,
        0xFF4400,
      ]);
      image.scale.x = 0.5;
      image.scale.y = 0.5;
      return image;
    }
  });