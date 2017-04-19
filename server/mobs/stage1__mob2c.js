// 1
export const stage1__mob2c__sword = patch(stage1__mob2, {
  VOIDS_COUNT: 1500,

  AGRO_D: 5,
  RUN_D: 40,
  HIT_D: [0, 450],
  HIT_VER: 0.9,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.5,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [10, 60],
  JUMP_TIME: [10, 60],
  FIGHTER: {
    LANG_RU: 'Спящий Рыцарь',
    name: 'stage1__mob2c__sword',

    moveTimeF: 1.2,

    hitSpeed: 3,
    damage: 40,

    ACC: 100,
    RUN_ACC: 400,
    SCALE: 3,

    BALANCE: 80,
    HP: 400,
    MP: 100,
    STAMINA: 120,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2c__sword',
    balance: 10,
    staminaUse: 25,
    staminaUseTime: 2,
    stunTime: 1,
    bodyScale: 1.5,
  },
});
// 2
export const stage1__mob2c2__sword = patch(stage1__mob2, {
  VOIDS_COUNT: 2500,

  AGRO_D: 5,
  RUN_D: 40,
  HIT_D: [0, 450],
  HIT_VER: 0.9,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.5,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [10, 60],
  JUMP_TIME: [10, 60],
  FIGHTER: {
    LANG_RU: 'Одурманенный',
    name: 'stage1__mob2c2__sword',

    moveTimeF: 1.2,

    hitSpeed: 4,
    damage: 60,

    ACC: 100,
    RUN_ACC: 400,
    SCALE: 3,

    BALANCE: 80,
    HP: 400,
    MP: 100,
    STAMINA: 120,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2c2__sword',
    balance: 10,
    staminaUse: 25,
    staminaUseTime: 2,
    stunTime: 1,
    bodyScale: 2,
  },
});