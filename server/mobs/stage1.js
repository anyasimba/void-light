export const stage1__mob1 = {
  DIES: 1,
  DIES_N: 3,
  DIES_SCALE: 0.4,

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
    LANG_RU: 'Обыденный грех',

    name: 'stage1__mob1',

    moveTimeF: 0.8,

    hitSpeed: 3,
    damage: 15,

    ACC: 400,
    RUN_ACC: 700,
    BODY_SIZE: 140,
    SCALE: 1.2,

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
    LANG_RU: 'Высосанный',
    name: 'stage1__mob2',

    moveTimeF: 1.2,

    hitSpeed: 2,
    damage: 20,

    ACC: 500,
    RUN_ACC: 800,
    BODY_SIZE: 40,
    SCALE: 3,

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

    hitSpeed: 1.5,
    damage: 30,

    ACC: 300,
    RUN_ACC: 500,
    BODY_SIZE: 40,
    SCALE: 4,

    BALANCE: 100,
    HP: 400,
    MP: 100,
    STAMINA: 200,
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
    });
  },
};