// 1
export const stage1__mob3a = patch(stage1__mob3, {
  GRAY_TINT: 0xffffff,
  COLOR_TINT: 0x9bd3fb,
  AMBIENT_TINT: [0x0e1d29, 1],
  SPECIAL_TINT: 0xcc0000,
  ADD_COLOR_TINT: 0x727b84,
  ADD_AMBIENT_TINT: 0x0b171e,
  ADD_SPECIAL_TINT: 0xfcff00,
});
export const weapon__stage1__mob3a__rightHand__default = patch(
  weapon__stage1__mob3__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0xffffff, 0x9bd3fb, [0x0e1d29, 1],
        0xcc0000, 0x727b84, 0x0b171e, 0xfcff00
      ]);
      return view;
    }
  });
export const weapon__stage1__mob3a__leftHand__default = patch(
  weapon__stage1__mob3__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0xffffff, 0x9bd3fb, [0x0e1d29, 1],
        0xcc0000, 0x727b84, 0x0b171e, 0xfcff00
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });