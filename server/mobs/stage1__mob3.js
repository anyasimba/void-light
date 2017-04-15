export const stage1__mob3 = {
  AGRO_D: 7,
  RUN_D: 60,
  HIT_D: [150, 250],
  HIT_VER: 0.6,
  HIT_TIME: [0.5, 2],
  JUMP_HIT_VER: 0.02,
  ROLL_HIT_VER: 0.04,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.1,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [5, 15],
  JUMP_TIME: [10, 15],

  VOIDS_COUNT: 300,

  FIGHTER: {
    LANG_RU: 'Тяжкий грех',

    name: 'stage1__mob3',

    moveTimeF: 0.8,

    hitSpeed: 1.5,
    damage: 20,

    ACC: 400,
    RUN_ACC: 700,
    BODY_SIZE: 140,
    SCALE: 1.5,

    BALANCE: 60,
    HP: 30,
    MP: 100,
    STAMINA: 200,
  },

  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob3__rightHand',
    balance: 5,
    stamina: 10,
    staminaTime: 1,
    staminaUse: 5,
    staminaUseTime: 0.5,
    stunTime: 0.5,
    hand: 1,
    bodyScale: 1.5,
    pos: {
      x: 30,
      y: 0,
    },
    angle: 50,
    vAngle: 20,
    hAngle: 0,
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob3__leftHand',
    balance: 5,
    stamina: 10,
    staminaTime: 1,
    staminaUse: 5,
    staminaUseTime: 0.5,
    stunTime: 0.5,
    hand: 2,
    bodyScale: 1.5,
    pos: {
      x: 30,
      y: -0,
    },
    angle: -50,
    vAngle: 20,
    hAngle: 0,
  },
};