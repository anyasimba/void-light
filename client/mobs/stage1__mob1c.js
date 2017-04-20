// 1
export const stage1__mob1c = patch(stage1__mob1, {
  GRAY_TINT: 0xfa00fd,
  COLOR_TINT: 0x00f47e,
  AMBIENT_TINT: [0x00fefb, 1],
  SPECIAL_TINT: 0x00f9fc,
  ADD_COLOR_TINT: 0x004e4b,
  ADD_AMBIENT_TINT: 0x004e4b,
  ADD_SPECIAL_TINT: 0x004e4b,
});
export const weapon__stage1__mob1c__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0xfa00fd, 0x00f47e, [0x00fefb, 1],
        0x00f9fc, 0x004e4b, 0x004e4b, 0x004e4b
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1c__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0xfa00fd, 0x00f47e, [0x00fefb, 1],
        0x00f9fc, 0x004e4b, 0x004e4b, 0x004e4b
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });

// 2
export const stage1__mob1c2 = patch(stage1__mob1, {
  GRAY_TINT: 0x00fdd0,
  COLOR_TINT: 0x5f00fc,
  AMBIENT_TINT: [0xc900ed, 1],
  SPECIAL_TINT: 0xfdfdfd,
  ADD_COLOR_TINT: 0xff0000,
  ADD_AMBIENT_TINT: 0x004e4b,
  ADD_SPECIAL_TINT: 0x004e4b,
});
export const weapon__stage1__mob1c2__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x00fdd0, 0x5f00fc, [0xc900ed, 1],
        0xfdfdfd, 0xff0000, 0x004e4b, 0x004e4b
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1c2__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x00fdd0, 0x5f00fc, [0xc900ed, 1],
        0xfdfdfd, 0xff0000, 0x004e4b, 0x004e4b
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });

// boss1
export const stage1__mob1c__boss1 = patch(stage1__mob1, {
  GRAY_TINT: 0xfa00fd,
  COLOR_TINT: 0x00f47e,
  AMBIENT_TINT: [0x00fefb, 1],
  SPECIAL_TINT: 0x00f9fc,
  ADD_COLOR_TINT: 0x004e4b,
  ADD_AMBIENT_TINT: 0x004e4b,
  ADD_SPECIAL_TINT: 0x004e4b,
});
export const weapon__stage1__mob1c__boss1__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x00fdd0, 0x5f00fc, [0xc900ed, 1],
        0xfdfdfd, 0xff0000, 0x004e4b, 0x004e4b
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1c__boss1__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x00fdd0, 0x5f00fc, [0xc900ed, 1],
        0xfdfdfd, 0xff0000, 0x004e4b, 0x004e4b
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });