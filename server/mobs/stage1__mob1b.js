// 1
export const stage1__mob1b = patch(stage1__mob1, {
  VOIDS_COUNT: 500,
  AGRO_D: 6,
  RUN_D: 24,
  FIGHTER: {
    LANG_RU: 'Элементаль Хаоса',
    name: 'stage1__mob1b',

    moveTimeF: 0.5,
    hitSpeed: 1,
    SCALE: 1.8,

    damage: 20,

    ACC: 100,
    RUN_ACC: 200,

    BALANCE: 60,
    HP: 200,
    MP: 100,
    STAMINA: 100,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob1b__rightHand',
    bodyScale: 1.3,
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob1b__leftHand',
    bodyScale: 1.3,
  },
});
// 2
export const stage1__mob1b2 = patch(stage1__mob1, {
  VOIDS_COUNT: 550,
  AGRO_D: 8,
  RUN_D: 24,
  HIT_VER: 1,
  FIGHTER: {
    LANG_RU: 'Темный элемент',
    name: 'stage1__mob1b2',

    moveTimeF: 1.2,
    SCALE: 0.9,

    hitSpeed: 0.5,
    damage: 10,

    ACC: 400,
    RUN_ACC: 700,

    BALANCE: 20,
    HP: 50,
    MP: 100,
    STAMINA: 100,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob1b2__rightHand',
    bodyScale: 2.4,
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob1b2__leftHand',
    bodyScale: 1,
  },
});
// boss1
export const stage1__mob1b__boss1 = patch(stage1__mob1, {
  VOIDS_COUNT: 15000,
  AGRO_D: 10,
  RUN_D: 30,
  HIT_D: [0, 200],
  HIT_VER: 0.3,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.5,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [30, 60],
  JUMP_TIME: [1, 2],
  FIGHTER: {
    LANG_RU: 'Ночной Кошмар',
    name: 'stage1__mob1b__boss1',
    hitSpeed: 1.5,
    SCALE: 3,
    damage: 30,
    BALANCE: 100,
    HP: 1500,
    ACC: 600,
    RUN_ACC: 1000,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob1b__boss1__rightHand',
    bodyScale: 1.5,
    balance: 1,
    staminaUse: 3,
    staminaUseTime: 0.3,
    stunTime: 0.3,
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob1b__boss1__leftHand',
    bodyScale: 1.5,
  },
});
// boss2
export const stage1__mob1b__boss2 = patch(stage1__mob1, {
  VOIDS_COUNT: 15000,
  AGRO_D: 10,
  RUN_D: 30,
  HIT_D: [0, 400],
  HIT_VER: 0.6,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.5,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [30, 60],
  JUMP_TIME: [1, 2],
  FIGHTER: {
    LANG_RU: 'Эссенция Чистой Пустоты',
    name: 'stage1__mob1b__boss2',
    hitSpeed: 0.9,
    SCALE: 2,
    damage: 10,
    BALANCE: 100,
    HP: 1500,
    ACC: 600,
    RUN_ACC: 1000,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob1b__boss2__rightHand',
    bodyScale: 2,
    balance: 1,
    staminaUse: 3,
    staminaUseTime: 0.3,
    stunTime: 0.3,
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob1b__boss2__leftHand',
    bodyScale: 2,
  },
});