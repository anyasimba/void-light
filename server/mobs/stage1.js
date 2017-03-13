export const stage1__mob1 = {
  DIES: 1,
  DIES_N: 1,
  DIES_SCALE: 0.5,

  AGRO_D: 8,
  RUN_D: 50,
  HIT_D: [100, 400],
  HIT_VER: 0.6,
  HIT_TIME: [1.5, 5],
  JUMP_HIT_VER: 0.02,
  ROLL_HIT_VER: 0.04,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.1,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [5, 15],
  JUMP_TIME: [10, 15],

  VOIDS_COUNT: 150,

  FIGHTER: {
    LANG_RU: 'Тяжкий грех',

    name: 'stage1__mob1',

    moveTimeF: 0.8,

    hitSpeed: 3,
    damage: 15,

    ACC: 400,
    RUN_ACC: 700,
    BODY_SIZE: 140,
    SCALE: 1.5,

    BALANCE: 50,
    HP: 40,
    MP: 100,
    STAMINA: 50,
  },

  rightHand(parent) {
    return new global.Item({
      parent: parent,
      type: 'weapon',
      kind: 'stage1__mob1__rightHand',
      balance: 5,
      stamina: 10,
      staminaTime: 1,
      hand: 1,
      pos: {
        x: -15,
        y: 80,
      },
      angle: 0,
      vAngle: 20,
      hAngle: 20,
    });
  },
  leftHand(parent) {
    return new global.Item({
      parent: parent,
      type: 'weapon',
      kind: 'stage1__mob1__leftHand',
      balance: 5,
      stamina: 10,
      staminaTime: 1,
      hand: 2,
      pos: {
        x: -15,
        y: -80,
      },
      angle: -0,
      vAngle: 20,
      hAngle: 20,
    });
  },
};
export const stage1__mob1a = {
  AGRO_D: 8,
  RUN_D: 40,
  HIT_D: [100, 400],
  HIT_VER: 0.6,
  HIT_TIME: [1.5, 5],
  JUMP_HIT_VER: 0.02,
  ROLL_HIT_VER: 0.04,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.1,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [5, 15],
  JUMP_TIME: [10, 15],

  VOIDS_COUNT: 150,

  FIGHTER: {
    LANG_RU: 'Обыденный грех',

    name: 'stage1__mob1a',

    moveTimeF: 0.8,

    hitSpeed: 2,
    damage: 10,

    ACC: 300,
    RUN_ACC: 500,
    BODY_SIZE: 140,
    SCALE: 0.7,

    BALANCE: 50,
    HP: 50,
    MP: 100,
    STAMINA: 50,
  },

  rightHand(parent) {
    return new global.Item({
      parent: parent,
      type: 'weapon',
      kind: 'stage1__mob1a__rightHand',
      balance: 5,
      stamina: 7,
      staminaTime: 0.6,
      hand: 1,
      pos: {
        x: -15,
        y: 80,
      },
      angle: 0,
      vAngle: 20,
      hAngle: 20,
    });
  },
  leftHand(parent) {
    return new global.Item({
      parent: parent,
      type: 'weapon',
      kind: 'stage1__mob1a__leftHand',
      balance: 5,
      stamina: 7,
      staminaTime: 0.6,
      hand: 2,
      pos: {
        x: -15,
        y: -80,
      },
      angle: -0,
      vAngle: 20,
      hAngle: 20,
    });
  },
};
export const stage1__mob1b = {
  AGRO_D: 8,
  RUN_D: 40,
  HIT_D: [100, 400],
  HIT_VER: 0.6,
  HIT_TIME: [1.5, 5],
  JUMP_HIT_VER: 0.02,
  ROLL_HIT_VER: 0.04,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.1,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [5, 15],
  JUMP_TIME: [10, 15],

  VOIDS_COUNT: 150,

  FIGHTER: {
    LANG_RU: 'Обыденный грех',

    name: 'stage1__mob1b',

    moveTimeF: 0.8,

    hitSpeed: 1.5,
    damage: 20,

    ACC: 500,
    RUN_ACC: 700,
    BODY_SIZE: 140,
    SCALE: 0.8,

    BALANCE: 50,
    HP: 30,
    MP: 100,
    STAMINA: 50,
  },

  rightHand(parent) {
    return new global.Item({
      parent: parent,
      type: 'weapon',
      kind: 'stage1__mob1b__rightHand',
      balance: 5,
      stamina: 7,
      staminaTime: 0.6,
      hand: 1,
      pos: {
        x: -15,
        y: 80,
      },
      angle: 0,
      vAngle: 20,
      hAngle: 20,
    });
  },
  leftHand(parent) {
    return new global.Item({
      parent: parent,
      type: 'weapon',
      kind: 'stage1__mob1b__leftHand',
      balance: 5,
      stamina: 7,
      staminaTime: 0.6,
      hand: 2,
      pos: {
        x: -15,
        y: -80,
      },
      angle: -0,
      vAngle: 20,
      hAngle: 20,
    });
  },
};
export const stage1__mob1c = {
  DIES: 1,
  DIES_N: 1,
  DIES_SCALE: 0.5,

  AGRO_D: 8,
  RUN_D: 50,
  HIT_D: [100, 400],
  HIT_VER: 0.6,
  HIT_TIME: [1.5, 5],
  JUMP_HIT_VER: 0.02,
  ROLL_HIT_VER: 0.04,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.1,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [5, 15],
  JUMP_TIME: [10, 15],

  VOIDS_COUNT: 150,

  FIGHTER: {
    LANG_RU: 'Грех гордыни',

    name: 'stage1__mob1c',

    moveTimeF: 0.8,

    hitSpeed: 4,
    damage: 20,

    ACC: 200,
    RUN_ACC: 400,
    BODY_SIZE: 140,
    SCALE: 1,

    BALANCE: 50,
    HP: 40,
    MP: 100,
    STAMINA: 50,
  },

  rightHand(parent) {
    return new global.Item({
      parent: parent,
      type: 'weapon',
      kind: 'stage1__mob1c__rightHand',
      balance: 5,
      stamina: 10,
      staminaTime: 1,
      hand: 1,
      pos: {
        x: -15,
        y: 80,
      },
      angle: 0,
      vAngle: 20,
      hAngle: 20,
    });
  },
  leftHand(parent) {
    return new global.Item({
      parent: parent,
      type: 'weapon',
      kind: 'stage1__mob1c__leftHand',
      balance: 5,
      stamina: 10,
      staminaTime: 1,
      hand: 2,
      pos: {
        x: -15,
        y: -80,
      },
      angle: -0,
      vAngle: 20,
      hAngle: 20,
    });
  },
};
//
export const stage1__mob2 = {
  AGRO_D: 12,
  RUN_D: 50,
  HIT_D: [50, 200],
  HIT_VER: 0.9,
  HIT_TIME: [0.2, 7],
  JUMP_HIT_VER: 0.02,
  ROLL_HIT_VER: 0.04,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.1,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [5, 15],
  JUMP_TIME: [10, 15],

  VOIDS_COUNT: 100,

  FIGHTER: {
    LANG_RU: 'Оболочка',
    name: 'stage1__mob2',

    moveTimeF: 1.2,

    hitSpeed: 2,
    damage: 20,

    ACC: 500,
    RUN_ACC: 800,
    BODY_SIZE: 40,
    SCALE: 2.5,

    BALANCE: 30,
    HP: 30,
    MP: 100,
    STAMINA: 120,
  },

  rightHand(parent) {
    return new global.Item({
      parent: parent,
      type: 'weapon',
      kind: 'stage1__mob2__rightHand',
      hand: 1,
      balance: 10,
      stamina: 15,
      staminaTime: 1.5,
      pos: {
        x: -25,
        y: 25,
      },
      angle: 15,
      vAngle: 20,
      hAngle: 20,
    });
  },
};
export const stage1__mob2a = {
  AGRO_D: 7,
  RUN_D: 40,
  HIT_D: [50, 200],
  HIT_VER: 0.9,
  HIT_TIME: [0.2, 7],
  JUMP_HIT_VER: 0.02,
  ROLL_HIT_VER: 0.04,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.1,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [5, 15],
  JUMP_TIME: [10, 15],

  VOIDS_COUNT: 100,

  FIGHTER: {
    LANG_RU: 'Высосанный',
    name: 'stage1__mob2a',

    moveTimeF: 1.2,

    hitSpeed: 1.5,
    damage: 20,

    ACC: 400,
    RUN_ACC: 600,
    BODY_SIZE: 40,
    SCALE: 1.5,

    BALANCE: 20,
    HP: 30,
    MP: 100,
    STAMINA: 40,
  },

  rightHand(parent) {
    return new global.Item({
      parent: parent,
      type: 'weapon',
      kind: 'stage1__mob2a__rightHand',
      hand: 1,
      balance: 4,
      stamina: 6,
      staminaTime: 0.7,
      pos: {
        x: -25,
        y: 25,
      },
      angle: 15,
      vAngle: 20,
      hAngle: 20,
    });
  },
};
export const stage1__mob2b = {
  AGRO_D: 12,
  RUN_D: 50,
  HIT_D: [50, 200],
  HIT_VER: 0.9,
  HIT_TIME: [0.2, 7],
  JUMP_HIT_VER: 0.02,
  ROLL_HIT_VER: 0.04,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.1,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [5, 15],
  JUMP_TIME: [10, 15],

  VOIDS_COUNT: 100,

  FIGHTER: {
    LANG_RU: 'Высосанный',
    name: 'stage1__mob2b',

    moveTimeF: 1.2,

    hitSpeed: 2,
    damage: 15,

    ACC: 400,
    RUN_ACC: 600,
    BODY_SIZE: 40,
    SCALE: 1.6,

    BALANCE: 30,
    HP: 40,
    MP: 100,
    STAMINA: 50,
  },

  rightHand(parent) {
    return new global.Item({
      parent: parent,
      type: 'weapon',
      kind: 'stage1__mob2b__rightHand',
      hand: 1,
      balance: 3,
      stamina: 4,
      staminaTime: 0.5,
      pos: {
        x: -25,
        y: 25,
      },
      angle: 15,
      vAngle: 20,
      hAngle: 20,
    });
  },
};
export const stage1__mob2c = {
  AGRO_D: 12,
  RUN_D: 50,
  HIT_D: [50, 200],
  HIT_VER: 0.9,
  HIT_TIME: [0.2, 7],
  JUMP_HIT_VER: 0.02,
  ROLL_HIT_VER: 0.04,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.1,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [5, 15],
  JUMP_TIME: [10, 15],

  VOIDS_COUNT: 100,

  FIGHTER: {
    LANG_RU: 'Высосанный',
    name: 'stage1__mob2c',

    moveTimeF: 1.2,

    hitSpeed: 2,
    damage: 20,

    ACC: 400,
    RUN_ACC: 600,
    BODY_SIZE: 40,
    SCALE: 2,

    BALANCE: 30,
    HP: 50,
    MP: 100,
    STAMINA: 60,
  },

  rightHand(parent) {
    return new global.Item({
      parent: parent,
      type: 'weapon',
      kind: 'stage1__mob2c__rightHand',
      hand: 1,
      balance: 4,
      stamina: 6,
      staminaTime: 0.7,
      pos: {
        x: -25,
        y: 25,
      },
      angle: 15,
      vAngle: 20,
      hAngle: 20,
    });
  },
  leftHand(parent) {
    return new global.Item({
      parent: parent,
      type: 'shield',
      kind: 'stage1__mob2c__leftHand',
      hand: 2,
      pos: {
        x: -15,
        y: -30,
      },
      angle: -35,
      vAngle: 0,
      hAngle: 20,
    });
  },
};
//
export const stage1__boss1 = {
  IS_BOSS: true,

  AGRO_D: 16,
  RUN_D: 50,
  HIT_D: [50, 150],
  HIT_VER: 0.9,
  HIT_TIME: [0.2, 8],
  JUMP_HIT_VER: 0.02,
  ROLL_HIT_VER: 0.04,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.1,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [5, 15],
  JUMP_TIME: [10, 15],

  VOIDS_COUNT: 3000,

  FIGHTER: {
    LANG_RU: 'Истяженная оболочка',
    name: 'stage1__boss1',

    moveTimeF: 1.1,

    hitSpeed: 1.3,
    damage: 30,

    ACC: 300,
    RUN_ACC: 500,
    BODY_SIZE: 40,
    SCALE: 5,

    BALANCE: 100,
    HP: 200,
    MP: 100,
    STAMINA: 200,
  },

  leftHand(parent) {
    return new global.Item({
      parent: parent,
      type: 'shield',
      kind: 'stage1__boss1__leftHand',
      hand: 2,
      pos: {
        x: -15,
        y: -30,
      },
      angle: -35,
      vAngle: 0,
      hAngle: 20,
    });
  },
  rightHand(parent) {
    return new global.Item({
      parent: parent,
      type: 'weapon',
      kind: 'stage1__boss1__rightHand',
      hand: 1,
      balance: 20,
      stamina: 10,
      staminaTime: 1,
      pos: {
        x: -25,
        y: 25,
      },
      angle: 15,
      vAngle: 20,
      hAngle: 20,
    });
  },
};