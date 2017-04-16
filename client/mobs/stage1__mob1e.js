// 1
export const stage1__mob1e = patch(stage1__mob1, {
  GRAY_TINT: 0xd34100,
  COLOR_TINT: 0xfb4d00,
  AMBIENT_TINT: [0x732600, 1],
  SPECIAL_TINT: 0xfd6b00,
  ADD_COLOR_TINT: 0xf99e00,
  ADD_AMBIENT_TINT: 0x845100,
  ADD_SPECIAL_TINT: 0xfa0070,
});
export const weapon__stage1__mob1e__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0xd34100, 0xfb4d00, [0x732600, 1],
        0xfd6b00, 0xf99e00, 0x845100, 0xfa0070
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1e__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0xd34100, 0xfb4d00, [0x732600, 1],
        0xfd6b00, 0xf99e00, 0x845100, 0xfa0070
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });

// 2
export const stage1__mob1e2 = patch(stage1__mob1, {
  GRAY_TINT: 0xd3d3d3,
  COLOR_TINT: 0xff9000,
  AMBIENT_TINT: [0x2e2c2c, 1],
  SPECIAL_TINT: 0xfb0000,
  ADD_COLOR_TINT: 0xf63a00,
  ADD_AMBIENT_TINT: 0x870000,
  ADD_SPECIAL_TINT: 0xf0ff00,
});
export const weapon__stage1__mob1e2__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0xd3d3d3, 0xff9000, [0x2e2c2c, 1],
        0xfb0000, 0xf63a00, 0x870000, 0xf0ff00
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1e2__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0xd3d3d3, 0xff9000, [0x2e2c2c, 1],
        0xfb0000, 0xf63a00, 0x870000, 0xf0ff00
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });

// 3
export const stage1__mob1e3 = patch(stage1__mob1, {
  GRAY_TINT: 0x603600,
  COLOR_TINT: 0x231e0f,
  AMBIENT_TINT: [0x211201, 1],
  SPECIAL_TINT: 0x000000,
  ADD_COLOR_TINT: 0x30281b,
  ADD_AMBIENT_TINT: 0x3f2100,
  ADD_SPECIAL_TINT: 0x654000,
});
export const weapon__stage1__mob1e3__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x603600, 0x231e0f, [0x211201, 1],
        0x000000, 0x30281b, 0x3f2100, 0x654000
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1e3__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x603600, 0x231e0f, [0x211201, 1],
        0x000000, 0x30281b, 0x3f2100, 0x654000
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });

// 4
export const stage1__mob1e4 = patch(stage1__mob1, {
  GRAY_TINT: 0xff9100,
  COLOR_TINT: 0xb5a328,
  AMBIENT_TINT: [0x262626, 1],
  SPECIAL_TINT: 0xdbc549,
  ADD_COLOR_TINT: 0x6f704f,
  ADD_AMBIENT_TINT: 0x701702,
  ADD_SPECIAL_TINT: 0xa6a6a6,
});
export const weapon__stage1__mob1e4__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0xff9100, 0xb5a328, [0x262626, 1],
        0xdbc549, 0x6f704f, 0x701702, 0xa6a6a6
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1e4__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
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

// boss1
export const stage1__mob1e__boss1 = patch(stage1__mob1, {
  GRAY_TINT: 0x086bff,
  COLOR_TINT: 0x4064ff,
  AMBIENT_TINT: [0x152e3c, 1],
  SPECIAL_TINT: 0x0843d9,
  ADD_COLOR_TINT: 0x41688a,
  ADD_AMBIENT_TINT: 0x19045b,
  ADD_SPECIAL_TINT: 0x076aff,
});
export const weapon__stage1__mob1e__boss1__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x086bff, 0x4064ff, [0x152e3c, 1],
        0x0843d9, 0x41688a, 0x19045b, 0x076aff
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1e__boss1__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x086bff, 0x4064ff, [0x152e3c, 1],
        0x0843d9, 0x41688a, 0x19045b, 0x076aff
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });