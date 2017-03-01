export const stage1__mob1 = {
  AGRO_D: 8,
  RUN_D: 50,
  HIT_D: [100, 200],
  HIT_VER: 0.6,
  HIT_TIME: [0.5, 1.5],
  JUMP_HIT_VER: 0.02,
  ROLL_HIT_VER: 0.04,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.1,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [5, 15],
  JUMP_TIME: [10, 15],

  FIGHTER: {
    name: 'stage1__mob1',

    hitSpeed: 2,

    ACC: 1000,
    RUN_ACC: 1800,
    DAMAGE: 24,
    BODY_SIZE: 140,
    SCALE: 1,

    BALANCE: 50,
    HP: 200,
    MP: 100,
    STAMINA: 30,
  },

  rightHand(parent) {
    return new global.Item({
      parent: parent,
      type: 'weapon',
      kind: 'stage1__mob1__rightHand',
      balance: 5,
      stamina: 10,
      staminaTime: 1,
      hand: 1,
      pos: {
        x: -15,
        y: 80,
      },
      angle: 0,
    });
  },
  leftHand(parent) {
    return new global.Item({
      parent: parent,
      type: 'weapon',
      kind: 'stage1__mob1__leftHand',
      balance: 5,
      stamina: 10,
      staminaTime: 1,
      hand: 2,
      pos: {
        x: -15,
        y: -80,
      },
      angle: -0,
    });
  },
};
//
export const stage1__mob2 = {
  AGRO_D: 12,
  RUN_D: 50,
  HIT_D: [50, 150],
  HIT_VER: 0.9,
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

  FIGHTER: {
    name: 'stage1__mob2',

    hitSpeed: 1.5,

    ACC: 1600,
    RUN_ACC: 2400,
    DAMAGE: 14,
    BODY_SIZE: 40,
    SCALE: 3,

    BALANCE: 20,
    HP: 120,
    MP: 100,
    STAMINA: 30,
  },

  rightHand(parent) {
    return new global.Item({
      parent: parent,
      type: 'weapon',
      kind: 'stage1__mob2__rightHand',
      hand: 1,
      balance: 4,
      stamina: 3,
      staminaTime: 1,
      pos: {
        x: -25,
        y: 25,
      },
      angle: 15,
    });
  },
};
//
export const stage1__boss1 = {
  AGRO_D: 16,
  RUN_D: 50,
  HIT_D: [50, 150],
  HIT_VER: 0.9,
  HIT_TIME: [1, 4],
  JUMP_HIT_VER: 0.02,
  ROLL_HIT_VER: 0.04,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.1,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [5, 15],
  JUMP_TIME: [10, 15],

  FIGHTER: {
    name: 'stage1__boss1',

    hitSpeed: 2,

    ACC: 1000,
    RUN_ACC: 2600,
    DAMAGE: 30,
    BODY_SIZE: 40,
    SCALE: 4,

    BALANCE: 100,
    HP: 1200,
    MP: 100,
    STAMINA: 50,
  },

  rightHand(parent) {
    return new global.Item({
      parent: parent,
      type: 'weapon',
      kind: 'stage1__boss1__rightHand',
      hand: 1,
      balance: 20,
      stamina: 30,
      staminaTime: 1,
      pos: {
        x: -25,
        y: 25,
      },
      angle: 15,
    });
  },
};