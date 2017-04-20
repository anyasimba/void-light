// 1
export const stage1__mob3d = patch(stage1__mob3, {
  AGRO_D: 7,
  RUN_D: 60,
  HIT_D: [0, 250],
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
    LANG_RU: 'Грех Алчности',
    name: 'stage1__mob3d',

    moveTimeF: 0.8,

    hitSpeed: 3,
    damage: 30,

    ACC: 100,
    RUN_ACC: 400,
    BODY_SIZE: 140,
    SCALE: 1.5,

    BALANCE: 30,
    HP: 100,
    MP: 100,
    STAMINA: 200,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob3d__rightHand',
    bodyScale: 1,
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob3d__leftHand',
    bodyScale: 1,
  },
});
// 2
export const stage1__mob3d2 = patch(stage1__mob3, {
  AGRO_D: 7,
  RUN_D: 60,
  HIT_D: [0, 250],
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
  VOIDS_COUNT: 350,
  FIGHTER: {
    LANG_RU: 'Грех Обжорства',
    name: 'stage1__mob3d2',

    moveTimeF: 0.8,

    hitSpeed: 5,
    damage: 50,

    ACC: 100,
    RUN_ACC: 400,
    BODY_SIZE: 140,
    SCALE: 1.5,

    BALANCE: 30,
    HP: 100,
    MP: 100,
    STAMINA: 200,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob3d2__rightHand',
    bodyScale: 1,
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob3d2__leftHand',
    bodyScale: 1,
  },
});
// boss1
export const stage1__mob3d__boss1 = patch(stage1__mob3, {
  IS_BOSS: true,
  VOIDS_COUNT: 7000,
  AGRO_D: 12,
  RUN_D: 60,
  HIT_D: [0, 250],
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
  VOIDS_COUNT: 350,
  FIGHTER: {
    LANG_RU: 'Обжорство',
    name: 'stage1__mob3d__boss1',
    hitSpeed: 2,
    SCALE: 3,
    damage: 25,
    BALANCE: 100,
    HP: 1200,
    ACC: 100,
    RUN_ACC: 1000,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob3d__boss1__rightHand',
    bodyScale: 1.2,
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob3d__boss1__leftHand',
    bodyScale: 1.2,
  },
});