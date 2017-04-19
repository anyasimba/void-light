export const stage1__mob3a = patch(stage1__mob3, {
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
    LANG_RU: 'Грех Уныния',
    name: 'stage1__mob3a',

    moveTimeF: 0.8,

    hitSpeed: 1.5,
    damage: 20,

    ACC: 300,
    RUN_ACC: 400,
    BODY_SIZE: 140,
    SCALE: 1,

    BALANCE: 30,
    HP: 100,
    MP: 100,
    STAMINA: 200,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob3a__rightHand',
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob3a__leftHand',
  },
});