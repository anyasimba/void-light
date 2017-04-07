export const stage1__mob1 = {
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

    name: 'stage1__mob1',

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
    kind: 'stage1__mob1__rightHand',
    balance: 5,
    stamina: 10,
    staminaTime: 1,
    hand: 1,
    bodyScale: 1.3,
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
    balance: 5,
    stamina: 10,
    staminaTime: 1,
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

export const stage1__mob1a = patch(stage1__mob1, {
  FIGHTER: {
    LANG_RU: 'Пустынный элемент',
    name: 'stage1__mob1a',
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob1a__rightHand',
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob1a__leftHand',
  },
});
export const stage1__mob1b = patch(stage1__mob1);
export const stage1__mob1c = patch(stage1__mob1);