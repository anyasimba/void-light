export const stage1__mob2 = {
  AGRO_D: 8,
  RUN_D: 50,
  HIT_D: [300, 400],
  HIT_VER: 0.9,
  HIT_TIME: [0.2, 3],
  JUMP_HIT_VER: 0.02,
  ROLL_HIT_VER: 0.04,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.1,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [5, 15],
  JUMP_TIME: [10, 15],

  VOIDS_COUNT: 200,

  FIGHTER: {
    LANG_RU: 'Оболочка',
    name: 'stage1__mob2',

    moveTimeF: 1.2,

    hitSpeed: 1,
    damage: 20,

    ACC: 500,
    RUN_ACC: 800,
    BODY_SIZE: 40,
    SCALE: 2.5,

    BALANCE: 30,
    HP: 100,
    MP: 100,
    STAMINA: 120,
  },

  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2__rightHand',
    hand: 1,
    balance: 5,
    stamina: 10,
    staminaTime: 1,
    pos: {
      x: 0,
      y: 0,
    },
    angle: -20,
    vAngle: 20,
    hAngle: 0,
  },
};
export const stage1__mob2a = {
  AGRO_D: 5,
  RUN_D: 40,
  HIT_D: [120, 250],
  HIT_VER: 0.6,
  HIT_TIME: [0.2, 3],
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

    moveTimeF: 0.9,

    hitSpeed: 1,
    damage: 15,

    ACC: 400,
    RUN_ACC: 500,
    BODY_SIZE: 40,
    SCALE: 1.5,

    BALANCE: 10,
    HP: 30,
    MP: 100,
    STAMINA: 100,
  },

  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2a__rightHand',
    hand: 1,
    balance: 2,
    stamina: 3,
    staminaTime: 0.6,
    pos: {
      x: -25,
      y: 25,
    },
    angle: 15,
    vAngle: 20,
    hAngle: 20,
  },
};
export const stage1__mob2b = {
  AGRO_D: 6,
  RUN_D: 150,
  HIT_D: [120, 250],
  HIT_VER: 0.9,
  HIT_TIME: [0.2, 3],
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

    hitSpeed: 1,
    damage: 15,

    ACC: 400,
    RUN_ACC: 600,
    BODY_SIZE: 40,
    SCALE: 1.6,

    BALANCE: 10,
    HP: 40,
    MP: 100,
    STAMINA: 50,
  },

  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2b__rightHand',
    hand: 1,
    balance: 2,
    stamina: 3,
    staminaTime: 0.4,
    pos: {
      x: -25,
      y: 25,
    },
    angle: 15,
    vAngle: 20,
    hAngle: 20,
  },
};
export const stage1__mob2c = {
  AGRO_D: 6,
  RUN_D: 150,
  HIT_D: [120, 250],
  HIT_VER: 0.9,
  HIT_TIME: [0.2, 3],
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

    hitSpeed: 1,
    damage: 20,

    ACC: 400,
    RUN_ACC: 600,
    BODY_SIZE: 40,
    SCALE: 2,

    BALANCE: 10,
    HP: 50,
    MP: 100,
    STAMINA: 60,
  },

  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2c__rightHand',
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
  },
  leftHand: {
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
  },
};
//
export const stage1__boss1 = {
  IS_BOSS: true,

  AGRO_D: 20,
  RUN_D: 50,
  HIT_D: [120, 180],
  HIT_VER: 0.7,
  HIT_TIME: [0.5, 4],
  JUMP_HIT_VER: 0.2,
  ROLL_HIT_VER: 0.1,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.1,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [5, 15],
  JUMP_TIME: [10, 15],

  VOIDS_COUNT: 5000,

  FIGHTER: {
    LANG_RU: 'Истяженная оболочка',
    name: 'stage1__boss1',

    moveTimeF: 0.5,

    hitSpeed: 1.6,
    damage: 18,

    ACC: 400,
    RUN_ACC: 450,
    BODY_SIZE: 40,
    SCALE: 4.5,

    BALANCE: 100,
    HP: 400,
    MP: 100,
    STAMINA: 1000,
  },

  rightHand: {
    type: 'weapon',
    kind: 'stage1__boss1__rightHand',
    hand: 1,
    balance: 8,
    stamina: 20,
    staminaTime: 1,
    bodyScale: 0.9,
    pos: {
      x: -25,
      y: 25,
    },
    angle: 15,
    vAngle: 20,
    hAngle: 20,
  },
  leftHand: {
    type: 'shield',
    kind: 'stage1__boss1__leftHand',
    hand: 2,
    bodyScale: 0.9,
    pos: {
      x: -15,
      y: -30,
    },
    angle: -35,
    vAngle: 0,
    hAngle: 20,
  },
};