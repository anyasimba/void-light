// 1
export const stage1__mob1d = patch(stage1__mob1, {
  GRAY_TINT: 0x707070,
  COLOR_TINT: 0xffffff,
  AMBIENT_TINT: [0x2b2b2b, 1],
  SPECIAL_TINT: 0x9f9f9b,
  ADD_COLOR_TINT: 0xfcfd83,
  ADD_AMBIENT_TINT: 0x4c4c4c,
  ADD_SPECIAL_TINT: 0xfffe9d,
});
export const weapon__stage1__mob1d__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x707070, 0xffffff, [0x2b2b2b, 1],
        0x9f9f9b, 0xfcfd83, 0x4c4c4c, 0xfffe9d
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1d__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x707070, 0xffffff, [0x2b2b2b, 1],
        0x9f9f9b, 0xfcfd83, 0x4c4c4c, 0xfffe9d
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });

// 2
export const stage1__mob1d2 = patch(stage1__mob1, {
  GRAY_TINT: 0xfcfc00,
  COLOR_TINT: 0xfafa00,
  AMBIENT_TINT: [0x626200, 1],
  SPECIAL_TINT: 0xffff01,
  ADD_COLOR_TINT: 0xfcfd83,
  ADD_AMBIENT_TINT: 0x4c4c4c,
  ADD_SPECIAL_TINT: 0xfffe9d,
});
export const weapon__stage1__mob1d2__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0xfcfc00, 0xfafa00, [0x626200, 1],
        0xffff01, 0xfcfd83, 0x4c4c4c, 0xfffe9d
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1d2__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0xfcfc00, 0xfafa00, [0x626200, 1],
        0xffff01, 0xfcfd83, 0x4c4c4c, 0xfffe9d
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });

// 3
export const stage1__mob1d3 = patch(stage1__mob1, {
  GRAY_TINT: 0x00fffc,
  COLOR_TINT: 0x00ffde,
  AMBIENT_TINT: [0x00ffa8, 1],
  SPECIAL_TINT: 0x0190fe,
  ADD_COLOR_TINT: 0x0012ff,
  ADD_AMBIENT_TINT: 0x1e00ff,
  ADD_SPECIAL_TINT: 0x00aeff,
});
export const weapon__stage1__mob1d3__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x00fffc, 0x00ffde, [0x00ffa8, 1],
        0x0190fe, 0x0012ff, 0x1e00ff, 0x00aeff
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1d3__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x00fffc, 0x00ffde, [0x00ffa8, 1],
        0x0190fe, 0x0012ff, 0x1e00ff, 0x00aeff
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });

// 4
export const stage1__mob1d4 = patch(stage1__mob1, {
  GRAY_TINT: 0x000000,
  COLOR_TINT: 0xfc3500,
  AMBIENT_TINT: [0x540000, 1],
  SPECIAL_TINT: 0x6a2121,
  ADD_COLOR_TINT: 0x990b00,
  ADD_AMBIENT_TINT: 0x500000,
  ADD_SPECIAL_TINT: 0xff6600,
});
export const weapon__stage1__mob1d4__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x000000, 0xfc3500, [0x540000, 1],
        0x6a2121, 0x990b00, 0x500000, 0xff6600
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1d4__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x000000, 0xfc3500, [0x540000, 1],
        0x6a2121, 0x990b00, 0x500000, 0xff6600
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });

// boss1
export const stage1__mob1d__boss1 = patch(stage1__mob1, {
  GRAY_TINT: 0x086bff,
  COLOR_TINT: 0x4064ff,
  AMBIENT_TINT: [0x152e3c, 1],
  SPECIAL_TINT: 0x0843d9,
  ADD_COLOR_TINT: 0x41688a,
  ADD_AMBIENT_TINT: 0x19045b,
  ADD_SPECIAL_TINT: 0x076aff,
});
export const weapon__stage1__mob1d__boss1__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x086bff, 0x4064ff, [0x152e3c, 1],
        0x0843d9, 0x41688a, 0x19045b, 0x076aff
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1d__boss1__leftHand__default = patch(
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