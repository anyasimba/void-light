// 1
export const stage1__mob3d = patch(stage1__mob3, {
  GRAY_TINT: 0xffffff,
  COLOR_TINT: 0xb19c29,
  AMBIENT_TINT: [0x3a3614, 1],
  SPECIAL_TINT: 0x3a3500,
  ADD_COLOR_TINT: 0xc4b27d,
  ADD_AMBIENT_TINT: 0x8f8135,
  ADD_SPECIAL_TINT: 0xfebf00,
});
export const weapon__stage1__mob3d__rightHand__default = patch(
  weapon__stage1__mob3__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0xffffff, 0xb19c29, [0x3a3614, 1],
        0x3a3500, 0xc4b27d, 0x8f8135, 0xfebf00
      ]);
      return view;
    }
  });
export const weapon__stage1__mob3d__leftHand__default = patch(
  weapon__stage1__mob3__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0xffffff, 0xb19c29, [0x3a3614, 1],
        0x3a3500, 0xc4b27d, 0x8f8135, 0xfebf00
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });
// 2
export const stage1__mob3d2 = patch(stage1__mob3, {
  GRAY_TINT: 0xffffff,
  COLOR_TINT: 0xce808d,
  AMBIENT_TINT: [0x551525, 1],
  SPECIAL_TINT: 0x533541,
  ADD_COLOR_TINT: 0x6d3949,
  ADD_AMBIENT_TINT: 0x886b72,
  ADD_SPECIAL_TINT: 0x930000,
});
export const weapon__stage1__mob3d2__rightHand__default = patch(
  weapon__stage1__mob3__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0xffffff, 0xce808d, [0x551525, 1],
        0x533541, 0x6d3949, 0x886b72, 0x930000
      ]);
      return view;
    }
  });
export const weapon__stage1__mob3d2__leftHand__default = patch(
  weapon__stage1__mob3__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0xffffff, 0xce808d, [0x551525, 1],
        0x533541, 0x6d3949, 0x886b72, 0x930000
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });

// boss1
export const stage1__mob3d__boss1 = patch(stage1__mob3, {
  GRAY_TINT: 0xffffff,
  COLOR_TINT: 0x6e303d,
  AMBIENT_TINT: [0x551525, 1],
  SPECIAL_TINT: 0x533541,
  ADD_COLOR_TINT: 0x6d3949,
  ADD_AMBIENT_TINT: 0x886b72,
  ADD_SPECIAL_TINT: 0x930000,
});
export const weapon__stage1__mob3d__boss1__rightHand__default = patch(
  weapon__stage1__mob3__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0xffffff, 0x6e303d, [0x551525, 1],
        0x533541, 0x6d3949, 0x886b72, 0x930000
      ]);
      return view;
    }
  });
export const weapon__stage1__mob3d__boss1__leftHand__default = patch(
  weapon__stage1__mob3__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0xffffff, 0x6e303d, [0x551525, 1],
        0x533541, 0x6d3949, 0x886b72, 0x930000
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });