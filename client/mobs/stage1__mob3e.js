// 1
export const stage1__mob3e = patch(stage1__mob3, {
  GRAY_TINT: 0xffffff,
  COLOR_TINT: 0xa00a00,
  AMBIENT_TINT: [0x3c0f0c, 1],
  SPECIAL_TINT: 0x9c2820,
  ADD_COLOR_TINT: 0x760c0c,
  ADD_AMBIENT_TINT: 0x2d0b09,
  ADD_SPECIAL_TINT: 0xf0f3f8,
});
export const weapon__stage1__mob3e__rightHand__default = patch(
  weapon__stage1__mob3__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0xffffff, 0xa00a00, [0x3c0f0c, 1],
        0x9c2820, 0x760c0c, 0x2d0b09, 0xf0f3f8
      ]);
      return view;
    }
  });
export const weapon__stage1__mob3e__leftHand__default = patch(
  weapon__stage1__mob3__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0xffffff, 0xa00a00, [0x3c0f0c, 1],
        0x9c2820, 0x760c0c, 0x2d0b09, 0xf0f3f8
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });
// 2
export const stage1__mob3e2 = patch(stage1__mob3, {
  GRAY_TINT: 0xffffff,
  COLOR_TINT: 0x4b2e5a,
  AMBIENT_TINT: [0x2e1c36, 1],
  SPECIAL_TINT: 0xab6fd9,
  ADD_COLOR_TINT: 0x72407e,
  ADD_AMBIENT_TINT: 0x341f3d,
  ADD_SPECIAL_TINT: 0x5800f8,
});
export const weapon__stage1__mob3e2__rightHand__default = patch(
  weapon__stage1__mob3__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0xffffff, 0x4b2e5a, [0x2e1c36, 1],
        0xab6fd9, 0x72407e, 0x341f3d, 0x5800f8
      ]);
      return view;
    }
  });
export const weapon__stage1__mob3e2__leftHand__default = patch(
  weapon__stage1__mob3__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0xffffff, 0x4b2e5a, [0x2e1c36, 1],
        0xab6fd9, 0x72407e, 0x341f3d, 0x5800f8
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });
// 3
export const stage1__mob3e3 = patch(stage1__mob3, {
  GRAY_TINT: 0xff2a00,
  COLOR_TINT: 0x161616,
  AMBIENT_TINT: [0x3c0f0c, 1],
  SPECIAL_TINT: 0x862300,
  ADD_COLOR_TINT: 0x760c0c,
  ADD_AMBIENT_TINT: 0x2d0b09,
  ADD_SPECIAL_TINT: 0xf86402,
});
export const weapon__stage1__mob3e3__rightHand__default = patch(
  weapon__stage1__mob3__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0xff2a00, 0x161616, [0x3c0f0c, 1],
        0x862300, 0x760c0c, 0x2d0b09, 0xf86402
      ]);
      return view;
    }
  });
export const weapon__stage1__mob3e3__leftHand__default = patch(
  weapon__stage1__mob3__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0xff2a00, 0x161616, [0x3c0f0c, 1],
        0x862300, 0x760c0c, 0x2d0b09, 0xf86402
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });
// 4
export const stage1__mob3e4 = patch(stage1__mob3, {
  GRAY_TINT: 0xff2a00,
  COLOR_TINT: 0x161616,
  AMBIENT_TINT: [0x3c0f0c, 1],
  SPECIAL_TINT: 0x862300,
  ADD_COLOR_TINT: 0x000000,
  ADD_AMBIENT_TINT: 0x2d0b09,
  ADD_SPECIAL_TINT: 0xf86402,
});
export const weapon__stage1__mob3e4__rightHand__default = patch(
  weapon__stage1__mob3__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0xff2a00, 0x161616, [0x3c0f0c, 1],
        0x862300, 0x000000, 0x2d0b09, 0xf86402
      ]);
      return view;
    }
  });
export const weapon__stage1__mob3e4__leftHand__default = patch(
  weapon__stage1__mob3__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0xff2a00, 0x161616, [0x3c0f0c, 1],
        0x862300, 0x000000, 0x2d0b09, 0xf86402
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });
// 5
export const stage1__mob3e5 = patch(stage1__mob3, {
  GRAY_TINT: 0xff2a00,
  COLOR_TINT: 0x372e0e,
  AMBIENT_TINT: [0x372e0e, 1],
  SPECIAL_TINT: 0x862300,
  ADD_COLOR_TINT: 0x000000,
  ADD_AMBIENT_TINT: 0x2d0b09,
  ADD_SPECIAL_TINT: 0xf86402,
});
export const weapon__stage1__mob3e5__rightHand__default = patch(
  weapon__stage1__mob3__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0xff2a00, 0x372e0e, [0x372e0e, 1],
        0x862300, 0x000000, 0x2d0b09, 0xf86402
      ]);
      return view;
    }
  });
export const weapon__stage1__mob3e5__leftHand__default = patch(
  weapon__stage1__mob3__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0xff2a00, 0x372e0e, [0x372e0e, 1],
        0x862300, 0x000000, 0x2d0b09, 0xf86402
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });

// boss1
export const stage1__mob3e__boss1 = patch(stage1__mob3, {
  GRAY_TINT: 0x4f4f4f,
  COLOR_TINT: 0x000000,
  AMBIENT_TINT: [0x101010, 1],
  SPECIAL_TINT: 0x888888,
  ADD_COLOR_TINT: 0x000000,
  ADD_AMBIENT_TINT: 0x000000,
  ADD_SPECIAL_TINT: 0xf86402,
});
export const weapon__stage1__mob3e__boss1__rightHand__default = patch(
  weapon__stage1__mob3__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0x4f4f4f, 0x000000, [0x101010, 1],
        0x888888, 0x000000, 0x000000, 0xf86402
      ]);
      return view;
    }
  });
export const weapon__stage1__mob3e__boss1__leftHand__default = patch(
  weapon__stage1__mob3__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob3--hand'], 0.3, 0.7, [
        0x4f4f4f, 0x000000, [0x101010, 1],
        0x888888, 0x000000, 0x000000, 0xf86402
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });