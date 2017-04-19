export const stage1__mob1 = {
  AGRO_D: 4,
  RUN_D: 16,
  HIT_D: [0, 360],
  HIT_VER: 0.5,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.5,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [30, 60],
  JUMP_TIME: [30, 60],

  VOIDS_COUNT: 0,

  FIGHTER: {
    LANG_RU: 'Элементаль',
    name: 'stage1__mob1',

    moveTimeF: 0.6,

    hitSpeed: 1,
    damage: 8,

    ACC: 100,
    RUN_ACC: 700,
    BODY_SIZE: 140,
    SCALE: 0.8,

    BALANCE: 5,
    HP: 20,
    MP: 100,
    STAMINA: 50,
  },

  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob1__rightHand',
    balance: 3,
    stamina: 0,
    staminaTime: 0,
    hand: 1,
    bodyScale: 1.3,
    staminaUse: 5,
    staminaUseTime: 0.5,
    stunTime: 0.5,
    pos: {
      x: 0,
      y: 10,
    },
    angle: 60,
    vAngle: 20,
    hAngle: 0,
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob1__leftHand',
    balance: 3,
    stamina: 0,
    staminaTime: 0,
    staminaUse: 5,
    staminaUseTime: 0.5,
    stunTime: 0.5,
    hand: 2,
    bodyScale: 1.3,
    pos: {
      x: 0,
      y: -10,
    },
    angle: -60,
    vAngle: 20,
    hAngle: 0,
  },
};