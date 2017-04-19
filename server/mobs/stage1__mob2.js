export const stage1__mob2 = {
  AGRO_D: 4.5,
  RUN_D: 20,
  HIT_D: [0, 250],
  HIT_VER: 0.7,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.5,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [10, 60],
  JUMP_TIME: [10, 60],

  VOIDS_COUNT: 0,

  FIGHTER: {
    LANG_RU: 'Отрешенный',
    name: 'stage1__mob2',

    moveTimeF: 1.2,

    hitSpeed: 1,
    damage: 12,

    ACC: 100,
    RUN_ACC: 600,
    BODY_SIZE: 40,
    SCALE: 1.6,

    BALANCE: 5,
    HP: 18,
    MP: 100,
    STAMINA: 120,
  },

  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2__sword',
    hand: 1,
    balance: 2,
    stamina: 0,
    staminaTime: 0,
    staminaUse: 10,
    staminaUseTime: 0.3,
    stunTime: 0.6,
    pos: {
      x: -25,
      y: 25,
    },
    angle: 15,
    vAngle: 20,
    hAngle: 20,
  },
};