// 1
export const stage1__mob3b = patch(stage1__mob3, {
  GRAY_TINT: 0xffffff,
  COLOR_TINT: 0xff1b6e,
  AMBIENT_TINT: [0x2d0f25, 1],
  SPECIAL_TINT: 0xcc0097,
  ADD_COLOR_TINT: 0x814263,
  ADD_AMBIENT_TINT: 0x5b022d,
  ADD_SPECIAL_TINT: 0xff0000,
});
export const weapon__stage1__mob3b__rightHand__default = patch(
  weapon__stage1__mob3__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.2, 0.8, [
        0xffffff, 0xff1b6e, [0x2d0f25, 1],
        0xcc0097, 0x814263, 0x5b022d, 0xff0000
      ]);
      return view;
    }
  });
export const weapon__stage1__mob3b__leftHand__default = patch(
  weapon__stage1__mob3__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.2, 0.8, [
        0xffffff, 0xff1b6e, [0x2d0f25, 1],
        0xcc0097, 0x814263, 0x5b022d, 0xff0000
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });
// 2
export const stage1__mob3b2 = patch(stage1__mob3, {
  GRAY_TINT: 0xffffff,
  COLOR_TINT: 0x145514,
  AMBIENT_TINT: [0x112b0f, 1],
  SPECIAL_TINT: 0x00ff24,
  ADD_COLOR_TINT: 0x1f3120,
  ADD_AMBIENT_TINT: 0x194018,
  ADD_SPECIAL_TINT: 0xcffb00,
});
export const weapon__stage1__mob3b2__rightHand__default = patch(
  weapon__stage1__mob3__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.2, 0.8, [
        0xffffff, 0x145514, [0x112b0f, 1],
        0x00ff24, 0x1f3120, 0x194018, 0xcffb00
      ]);
      return view;
    }
  });
export const weapon__stage1__mob3b2__leftHand__default = patch(
  weapon__stage1__mob3__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.2, 0.8, [
        0xffffff, 0x145514, [0x112b0f, 1],
        0x00ff24, 0x1f3120, 0x194018, 0xcffb00
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });