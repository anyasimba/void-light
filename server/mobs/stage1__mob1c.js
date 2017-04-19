// 1
export const stage1__mob1c = patch(stage1__mob1, {
  VOIDS_COUNT: 1200,
  AGRO_D: 7,
  RUN_D: 30,
  HIT_D: [0, 300],
  HIT_VER: 0.8,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.5,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [30, 60],
  JUMP_TIME: [30, 60],
  FIGHTER: {
    LANG_RU: 'Магический Элемент',
    name: 'stage1__mob1c',
    hitSpeed: 1.2,
    SCALE: 1,
    damage: 30,
    BALANCE: 50,
    HP: 200,
    ACC: 100,
    RUN_ACC: 800,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob1c__rightHand',
    bodyScale: 1.5,
    balance: 10,
    staminaUse: 10,
    staminaUseTime: 2,
    stunTime: 0.5,
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob1c__leftHand',
    bodyScale: 1.5,
  },
});
// 2
export const stage1__mob1c2 = patch(stage1__mob1, {
  VOIDS_COUNT: 2000,
  AGRO_D: 7,
  RUN_D: 30,
  HIT_D: [0, 400],
  HIT_VER: 0.8,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.5,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [30, 60],
  JUMP_TIME: [30, 60],
  FIGHTER: {
    LANG_RU: 'Магическая Элементаль',
    name: 'stage1__mob1c2',
    hitSpeed: 0.8,
    SCALE: 1.4,
    damage: 50,
    BALANCE: 40,
    HP: 300,
    ACC: 100,
    RUN_ACC: 1200,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob1c2__rightHand',
    bodyScale: 2.5,
    balance: 10,
    staminaUse: 10,
    staminaUseTime: 2,
    stunTime: 1,
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob1c2__leftHand',
    bodyScale: 2.5,
  },
});

// boss1
export const stage1__mob1c__boss1 = patch(stage1__mob1, {
  VOIDS_COUNT: 30,
  FIGHTER: {
    LANG_RU: 'Эссенция Чистой Магии',
    name: 'stage1__mob1c__boss1',
    hitSpeed: 2,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob1c__boss1__rightHand',
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob1c__boss1__leftHand',
  },
});