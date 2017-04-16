// 1
const stage1__mob2a = patch(stage1__mob2, {
  GRAY_TINT: 0xff3405,
  COLOR_TINT: 0x686868,
  AMBIENT_TINT: [0x282925, 1],
  SPECIAL_TINT: 0xccc1c1,
  ADD_COLOR_TINT: 0x200400,
  ADD_AMBIENT_TINT: 0x0f0000,
  ADD_SPECIAL_TINT: 0x990000,
});
export const shield__stage1__mob2a__default__default = new class {
  constructor() {
    this.update = mobs__weapon__family.leftHand.update;
    this.onStun = mobs__weapon__family.leftHand.onStun;
  }
  createView(isHost, kind) {
    const image = makeHSL(hslMap['shield'], 0.5, 0.5, [
      0xFFFFFF,
      0x888888,
      0x888888,
    ]);
    image.scale.x = 1;
    image.scale.y = 1;
    return image;
  }
}
//
export const stage1__mob2a__sword = patch(stage1__mob2a);
export const weapon__stage1__mob2a__sword__default = patch(
  weapon__stage1__mob2__sword__default, {
    createView() {
      const image = makeHSL(hslMap['sword'], 0.5, 0.75, [
        0xFFFFFF,
        0x888888,
        0x888888,
      ]);
      image.scale.x = 0.5;
      image.scale.y = 0.5;
      return image;
    }
  });
//
export const stage1__mob2a__bigsword = patch(stage1__mob2a);
export const weapon__stage1__mob2a__bigsword__default = patch(
  weapon__stage1__mob2__sword__default, {
    createView() {
      const image = makeHSL(hslMap['sword'], 0.5, 0.75, [
        0xFFFFFF,
        0x888888,
        0x888888,
      ]);
      image.scale.x = 0.5;
      image.scale.y = 0.5;
      return image;
    }
  });
//
export const stage1__mob2a__axe = patch(stage1__mob2a);
export const weapon__stage1__mob2a__axe__default = patch(
  weapon__stage1__mob2__sword__default, {
    createView() {
      const image = makeHSL(hslMap['axe'], 0.5, 0.75, [
        0xFFFFFF,
        0x888888,
        0x888888,
      ]);
      image.scale.x = 0.5;
      image.scale.y = 0.5;
      return image;
    }
  });
//
export const stage1__mob2a__bigaxe = patch(stage1__mob2a);
export const weapon__stage1__mob2a__bigaxe__default = patch(
  weapon__stage1__mob2__sword__default, {
    createView() {
      const image = makeHSL(hslMap['axe'], 0.5, 0.75, [
        0xFFFFFF,
        0x888888,
        0x888888,
      ]);
      image.scale.x = 0.5;
      image.scale.y = 0.5;
      return image;
    }
  });
//
export const stage1__mob2a__kopie = patch(stage1__mob2a);
export const weapon__stage1__mob2a__kopie__default = patch(
  weapon__stage1__mob2__sword__default, {
    createView() {
      const image = makeHSL(hslMap['kopie'], 0.5, 0.75, [
        0xFFFFFF,
        0x888888,
        0x888888,
      ]);
      image.scale.x = 0.4;
      image.scale.y = 0.4;
      return image;
    }
  });
//
export const stage1__mob2a__molot = patch(stage1__mob2a);
export const weapon__stage1__mob2a__molot__default = patch(
  weapon__stage1__mob2__sword__default, {
    createView() {
      const image = makeHSL(hslMap['molot'], 0.5, 0.75, [
        0xFFFFFF,
        0x888888,
        0x888888,
      ]);
      image.scale.x = 0.6;
      image.scale.y = 0.6;
      return image;
    }
  });
//
export const stage1__mob2a__bigmolot = patch(stage1__mob2a);
export const weapon__stage1__mob2a__bigmolot__default = patch(
  weapon__stage1__mob2__sword__default, {
    createView() {
      const image = makeHSL(hslMap['molot'], 0.5, 0.75, [
        0xFFFFFF,
        0x888888,
        0x888888,
      ]);
      image.scale.x = 0.6;
      image.scale.y = 0.6;
      return image;
    }
  });
//
export const stage1__mob2a__kinjal = patch(stage1__mob2a);
export const weapon__stage1__mob2a__kinjal__default = patch(
  weapon__stage1__mob2__sword__default, {
    createView() {
      const image = makeHSL(hslMap['kinjal'], 0.5, 0.75, [
        0xFFFFFF,
        0x888888,
        0x888888,
      ]);
      image.scale.x = 0.9;
      image.scale.y = 0.9;
      return image;
    }
  });
//
export const stage1__mob2a__luk = patch(stage1__mob2a);
export const weapon__stage1__mob2a__luk__default = patch(
  weapon__stage1__mob2__sword__default, {
    createView() {
      const image = makeHSL(hslMap['luk'], 0.5, 0.5, [
        0xFFFFFF,
        0x888888,
        0x888888,
      ]);
      image.scale.x = -0.9;
      image.scale.y = 0.9;
      return image;
    }
  });

// 2
export const stage1__mob2a2__sword = patch(stage1__mob2, {
  GRAY_TINT: 0xffffff,
  COLOR_TINT: 0x344047,
  AMBIENT_TINT: [0x84acce, 1],
  SPECIAL_TINT: 0xbecacc,
  ADD_COLOR_TINT: 0x617280,
  ADD_AMBIENT_TINT: 0x575f64,
  ADD_SPECIAL_TINT: 0x1bfaed,
});
export const weapon__stage1__mob2a2__sword__default = patch(
  weapon__stage1__mob2__sword__default, {
    createView() {
      const image = makeHSL(hslMap['sword'], 0.5, 0.75, [
        0xFFFFFF,
        0x888888,
        0x888888,
      ]);
      image.scale.x = 0.5;
      image.scale.y = 0.5;
      return image;
    }
  });
// 3
export const stage1__mob2a3__sword = patch(stage1__mob2, {
  GRAY_TINT: 0x000000,
  COLOR_TINT: 0x697178,
  AMBIENT_TINT: [0x282925, 1],
  SPECIAL_TINT: 0x484f50,
  ADD_COLOR_TINT: 0x200400,
  ADD_AMBIENT_TINT: 0x0f0000,
  ADD_SPECIAL_TINT: 0x000000,
});
export const weapon__stage1__mob2a3__sword__default = patch(
  weapon__stage1__mob2__sword__default, {
    createView() {
      const image = makeHSL(hslMap['sword'], 0.5, 0.75, [
        0xFFFFFF,
        0x888888,
        0x888888,
      ]);
      image.scale.x = 0.5;
      image.scale.y = 0.5;
      return image;
    }
  });
// 4
export const stage1__mob2a4__sword = patch(stage1__mob2, {
  GRAY_TINT: 0x04c7ff,
  COLOR_TINT: 0xb1b3b3,
  AMBIENT_TINT: [0x00343f, 1],
  SPECIAL_TINT: 0x032d48,
  ADD_COLOR_TINT: 0x081957,
  ADD_AMBIENT_TINT: 0x112c48,
  ADD_SPECIAL_TINT: 0xc5c5c5,
});
export const weapon__stage1__mob2a4__sword__default = patch(
  weapon__stage1__mob2__sword__default, {
    createView() {
      const image = makeHSL(hslMap['sword'], 0.5, 0.75, [
        0xFFFFFF,
        0x888888,
        0x888888,
      ]);
      image.scale.x = 0.5;
      image.scale.y = 0.5;
      return image;
    }
  });

// boss1
export const stage1__mob2a__boss1 = patch(stage1__mob2a, {
  GRAY_TINT: 0x000000,
  COLOR_TINT: 0x141414,
  AMBIENT_TINT: [0x282925, 1],
  SPECIAL_TINT: 0xccc1c1,
  ADD_COLOR_TINT: 0x200400,
  ADD_AMBIENT_TINT: 0x000000,
  ADD_SPECIAL_TINT: 0x990000,
});
export const weapon__stage1__mob2a__boss1__default = patch(
  weapon__stage1__mob2__sword__default, {
    createView() {
      const image = makeHSL(hslMap['axe'], 0.5, 0.75, [
        0x141414,
        0x141414,
        0x141414,
        0x000000,
        0x200400,
        0x200400,
        0x200400
      ]);
      image.scale.x = 0.5;
      image.scale.y = 0.5;
      return image;
    }
  });
export const shield__stage1__mob2a__boss1__default = new class {
  constructor() {
    this.update = mobs__weapon__family.leftHand.update;
    this.onStun = mobs__weapon__family.leftHand.onStun;
  }
  createView(isHost, kind) {
    const image = makeHSL(hslMap['shield'], 0.5, 0.5, [
      0x141414,
      0x141414,
      0x141414,
      0x000000,
      0x200400,
      0x200400,
      0x200400
    ]);
    image.scale.x = 1;
    image.scale.y = 1;
    return image;
  }
}