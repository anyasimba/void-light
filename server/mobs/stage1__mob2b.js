// 1
export const stage1__mob2b__sword = patch(stage1__mob2, {
  VOIDS_COUNT: 350,

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
  FIGHTER: {
    LANG_RU: 'Погребенный',
    name: 'stage1__mob2b__sword',

    moveTimeF: 1.2,

    hitSpeed: 1,
    damage: 20,

    ACC: 400,
    RUN_ACC: 600,
    SCALE: 1.6,

    BALANCE: 30,
    HP: 100,
    MP: 100,
    STAMINA: 120,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2b__sword',
    balance: 5,
    staminaUse: 15,
    staminaUseTime: 0.5,
    stunTime: 0.6,
    bodyScale: 1.5,
  },
});
// 2
export const stage1__mob2b2__sword = patch(stage1__mob2, {
  VOIDS_COUNT: 600,

  AGRO_D: 4.5,
  RUN_D: 20,
  HIT_D: [0, 350],
  HIT_VER: 1,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.5,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [10, 60],
  JUMP_TIME: [10, 60],
  FIGHTER: {
    LANG_RU: 'Темный Дух',
    name: 'stage1__mob2b2__sword',

    moveTimeF: 1.2,

    hitSpeed: 0.4,
    damage: 5,

    ACC: 1000,
    RUN_ACC: 1500,
    SCALE: 2,

    BALANCE: 20,
    HP: 20,
    MP: 100,
    STAMINA: 120,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2b2__sword',
    balance: 5,
    staminaUse: 15,
    staminaUseTime: 0.5,
    stunTime: 0.3,
    bodyScale: 1.2,
  },
});
// 3
export const stage1__mob2b3__sword = patch(stage1__mob2, {
  VOIDS_COUNT: 700,

  AGRO_D: 4.5,
  RUN_D: 20,
  HIT_D: [0, 350],
  HIT_VER: 0.7,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.5,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [10, 60],
  JUMP_TIME: [10, 60],
  FIGHTER: {
    LANG_RU: 'Рыцарь Теней',
    name: 'stage1__mob2b3__sword',

    moveTimeF: 1.2,

    hitSpeed: 1.5,
    damage: 40,

    ACC: 400,
    RUN_ACC: 600,
    SCALE: 3,

    BALANCE: 30,
    HP: 300,
    MP: 100,
    STAMINA: 120,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2b3__sword',
    bodyScale: 1.5,
  },
});
// 4
export const stage1__mob2b4__sword = patch(stage1__mob2, {
  VOIDS_COUNT: 500,

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
  FIGHTER: {
    LANG_RU: 'Адепт Тени',
    name: 'stage1__mob2b4__sword',

    moveTimeF: 1.2,

    hitSpeed: 0.5,
    damage: 20,

    ACC: 700,
    RUN_ACC: 900,
    SCALE: 1.6,

    BALANCE: 30,
    HP: 100,
    MP: 100,
    STAMINA: 120,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2b4__sword',
  },
});
// boss 1
export const stage1__mob2b__boss1 = patch(stage1__mob2, {
  VOIDS_COUNT: 40,
  FIGHTER: {
    LANG_RU: 'Скелет',
    name: 'stage1__mob2b__boss1',
    hitSpeed: 2,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2b__boss1',
  },
});