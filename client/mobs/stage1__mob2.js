export const stage1__mob2 = {
  VIEW: 'player',
  SCALE: 0.2,
  GRAY_TINT: 0xFFFFFF,
  COLOR_TINT: 0x666666,
  AMBIENT_TINT: [0x333333, 1],
  SPECIAL_TINT: 0x666666,
  ADD_COLOR_TINT: 0x000000,
  ADD_AMBIENT_TINT: 0x000000,
  ADD_SPECIAL_TINT: 0x000000,
  BACK_VIEW: 'player-back',
  DEAD_VIEW: 'player-back',

  LIGHT: 0xFFFFFF,
  LIGHT_I: 0,
  LIGHT_A: 0.7,
  LIGHT_SCALE: 8,
}
export const weapon__stage1__mob2__sword__default = new class {
  constructor() {
    this.update = mobs__weapon__family.rightHand.update;
    this.onStun = mobs__weapon__family.rightHand.onStun;
  }
  createView(isHost, kind) {
    const image = makeHSL(hslMap['sword'], 0.5, 0.75, [
      0xFFFFFF, 0x666666, [0x333333, 1],
      0x000000, 0x000000, 0x000000, 0x000000
    ]);
    image.scale.x = 0.5;
    image.scale.y = 0.5;
    return image;
  }
}

// stage1__mob2a
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
////
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