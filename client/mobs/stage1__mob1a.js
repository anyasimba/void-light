// 1
export const stage1__mob1a = patch(stage1__mob1, {
  GRAY_TINT: 0x79ff02,
  COLOR_TINT: 0xc1e884,
  AMBIENT_TINT: [0x262626, 1],
  SPECIAL_TINT: 0xaeff6d,
  ADD_COLOR_TINT: 0x083301,
  ADD_AMBIENT_TINT: 0x0b1d00,
  ADD_SPECIAL_TINT: 0x49ad2e,
});
export const weapon__stage1__mob1a__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x79ff02, 0xc1e884, [0x262626, 1],
        0xaeff6d, 0x083301, 0x0b1d00, 0x49ad2e
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1a__leftHand__default = patch(
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
export const stage1__mob1a2 = patch(stage1__mob1, {
  GRAY_TINT: 0xffffff,
  COLOR_TINT: 0xa4ff15,
  AMBIENT_TINT: [0x000000, 1],
  SPECIAL_TINT: 0xb4ff5b,
  ADD_COLOR_TINT: 0xa5ff25,
  ADD_AMBIENT_TINT: 0x2aff00,
  ADD_SPECIAL_TINT: 0x11ff9d,
});
export const weapon__stage1__mob1a2__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0xffffff, 0xa4ff15, [0x000000, 1],
        0xb4ff5b, 0xa5ff25, 0x2aff00, 0x11ff9d
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1a2__leftHand__default = patch(
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
export const stage1__mob1a3 = patch(stage1__mob1, {
  GRAY_TINT: 0x086bff,
  COLOR_TINT: 0x4064ff,
  AMBIENT_TINT: [0x152e3c, 1],
  SPECIAL_TINT: 0x0843d9,
  ADD_COLOR_TINT: 0x41688a,
  ADD_AMBIENT_TINT: 0x19045b,
  ADD_SPECIAL_TINT: 0x076aff,
});
export const weapon__stage1__mob1a3__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x086bff, 0x4064ff, [0x152e3c, 1],
        0x0843d9, 0x41688a, 0x19045b, 0x076aff
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1a3__leftHand__default = patch(
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
export const stage1__mob1a4 = patch(stage1__mob1, {
  GRAY_TINT: 0xffffff,
  COLOR_TINT: 0x4dc6ff,
  AMBIENT_TINT: [0x10323c, 1],
  SPECIAL_TINT: 0x08ceff,
  ADD_COLOR_TINT: 0x0017f5,
  ADD_AMBIENT_TINT: 0x02223e,
  ADD_SPECIAL_TINT: 0x036417,
});
export const weapon__stage1__mob1a4__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0xffffff, 0x4dc6ff, [0x10323c, 1],
        0x08ceff, 0x0017f5, 0x02223e, 0x036417
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1a4__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0xffffff, 0x4dc6ff, [0x10323c, 1],
        0x08ceff, 0x0017f5, 0x02223e, 0x036417
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });

// 5
export const stage1__mob1a5 = patch(stage1__mob1, {
  GRAY_TINT: 0xb6daff,
  COLOR_TINT: 0xc4dbfe,
  AMBIENT_TINT: [0x2c376f, 1],
  SPECIAL_TINT: 0xdfebff,
  ADD_COLOR_TINT: 0x2d2d2d,
  ADD_AMBIENT_TINT: 0x3e3e3e,
  ADD_SPECIAL_TINT: 0x363636,
});
export const weapon__stage1__mob1a5__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0xb6daff, 0xc4dbfe, [0x2c376f, 1],
        0xdfebff, 0x2d2d2d, 0x3e3e3e, 0x363636
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1a5__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0xb6daff, 0xc4dbfe, [0x2c376f, 1],
        0xdfebff, 0x2d2d2d, 0x3e3e3e, 0x363636
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });

// 6
export const stage1__mob1a6 = patch(stage1__mob1, {
  GRAY_TINT: 0xfefefe,
  COLOR_TINT: 0xc4eafd,
  AMBIENT_TINT: [0x6a6b6f, 1],
  SPECIAL_TINT: 0xcfe9ff,
  ADD_COLOR_TINT: 0x5d5d5d,
  ADD_AMBIENT_TINT: 0x3e3e3e,
  ADD_SPECIAL_TINT: 0x2e3980,
});
export const weapon__stage1__mob1a6__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0xfefefe, 0xc4eafd, [0x6a6b6f, 1],
        0xcfe9ff, 0x5d5d5d, 0x3e3e3e, 0x2e3980
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1a6__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0xfefefe, 0xc4eafd, [0x6a6b6f, 1],
        0xcfe9ff, 0x5d5d5d, 0x3e3e3e, 0x2e3980
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });

// 7

export const stage1__mob1a7 = patch(stage1__mob1, {
  GRAY_TINT: 0x5c5c5c,
  COLOR_TINT: 0x1c1a28,
  AMBIENT_TINT: [0x252426, 1],
  SPECIAL_TINT: 0x314562,
  ADD_COLOR_TINT: 0x263367,
  ADD_AMBIENT_TINT: 0x18002e,
  ADD_SPECIAL_TINT: 0x752a72,
});
export const weapon__stage1__mob1a7__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x5c5c5c, 0x1c1a28, [0x252426, 1],
        0x314562, 0x263367, 0x18002e, 0x752a72
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1a7__leftHand__default = patch(
  weapon__stage1__mob1__leftHand__default, {
    createView() {
      const prepare = (image) => {
        image.scale.x *= -1;
      }
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x5c5c5c, 0x1c1a28, [0x252426, 1],
        0x314562, 0x263367, 0x18002e, 0x752a72
      ]);
      prepare(view.blackTex);
      prepare(view.tex);
      prepare(view.addTex);
      return view;
    }
  });

// boss1
export const stage1__mob1a__boss1 = patch(stage1__mob1, {
  GRAY_TINT: 0xffffff,
  COLOR_TINT: 0xa4ff15,
  AMBIENT_TINT: [0x000000, 1],
  SPECIAL_TINT: 0xb4ff5b,
  ADD_COLOR_TINT: 0xa5ff25,
  ADD_AMBIENT_TINT: 0x2aff00,
  ADD_SPECIAL_TINT: 0x11ff9d,
});
export const weapon__stage1__mob1a__boss1__rightHand__default = patch(
  weapon__stage1__mob1__rightHand__default, {
    createView() {
      const view = makeHSL(hslMap['stage1__mob1--hand'], 0.2, 0.8, [
        0x79ff02, 0xc1e884, [0x262626, 1],
        0xaeff6d, 0x083301, 0x0b1d00, 0x49ad2e
      ]);
      return view;
    }
  });
export const weapon__stage1__mob1a__boss1__leftHand__default = patch(
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