// 1
export const stage1__mob1e = patch(stage1__mob1, {
  GRAY_TINT: 0x79ff02,
  COLOR_TINT: 0xc1e884,
  AMBIENT_TINT: [0x262626, 1],
  SPECIAL_TINT: 0xaeff6d,
  ADD_COLOR_TINT: 0x083301,
  ADD_AMBIENT_TINT: 0x0b1d00,
  ADD_SPECIAL_TINT: 0x49ad2e,
});
export const weapon__stage1__mob1e__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x79ff02, 0xc1e884, [0x262626, 1],
        0xaeff6d, 0x083301, 0x0b1d00, 0x49ad2e
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
        0x79ff02, 0xc1e884, [0x262626, 1],
        0xaeff6d, 0x083301, 0x0b1d00, 0x49ad2e
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });

// 2
export const stage1__mob1e2 = patch(stage1__mob1, {
  GRAY_TINT: 0xffffff,
  COLOR_TINT: 0xa4ff15,
  AMBIENT_TINT: [0x000000, 1],
  SPECIAL_TINT: 0xb4ff5b,
  ADD_COLOR_TINT: 0xa5ff25,
  ADD_AMBIENT_TINT: 0x2aff00,
  ADD_SPECIAL_TINT: 0x11ff9d,
});
export const weapon__stage1__mob1e2__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0xffffff, 0xa4ff15, [0x000000, 1],
        0xb4ff5b, 0xa5ff25, 0x2aff00, 0x11ff9d
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
        0xffffff, 0xa4ff15, [0x000000, 1],
        0xb4ff5b, 0xa5ff25, 0x2aff00, 0x11ff9d
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });

// 3
export const stage1__mob1e3 = patch(stage1__mob1, {
  GRAY_TINT: 0x086bff,
  COLOR_TINT: 0x4064ff,
  AMBIENT_TINT: [0x152e3c, 1],
  SPECIAL_TINT: 0x0843d9,
  ADD_COLOR_TINT: 0x41688a,
  ADD_AMBIENT_TINT: 0x19045b,
  ADD_SPECIAL_TINT: 0x076aff,
});
export const weapon__stage1__mob1e3__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x086bff, 0x4064ff, [0x152e3c, 1],
        0x0843d9, 0x41688a, 0x19045b, 0x076aff
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
        0x086bff, 0x4064ff, [0x152e3c, 1],
        0x0843d9, 0x41688a, 0x19045b, 0x076aff
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });

// 4
export const stage1__mob1e4 = patch(stage1__mob1, {
  GRAY_TINT: 0x086bff,
  COLOR_TINT: 0x4064ff,
  AMBIENT_TINT: [0x152e3c, 1],
  SPECIAL_TINT: 0x0843d9,
  ADD_COLOR_TINT: 0x41688a,
  ADD_AMBIENT_TINT: 0x19045b,
  ADD_SPECIAL_TINT: 0x076aff,
});
export const weapon__stage1__mob1e4__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x086bff, 0x4064ff, [0x152e3c, 1],
        0x0843d9, 0x41688a, 0x19045b, 0x076aff
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
        0x086bff, 0x4064ff, [0x152e3c, 1],
        0x0843d9, 0x41688a, 0x19045b, 0x076aff
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