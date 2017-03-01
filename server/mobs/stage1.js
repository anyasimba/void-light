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

    ACC: 1400,
    RUN_ACC: 2500,
    DAMAGE: 100,
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
      damage: 40,
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
      damage: 40,
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