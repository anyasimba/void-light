// 1
export const stage1__mob2e__sword = patch(stage1__mob2, {
  AGRO_D: 6,
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

  VOIDS_COUNT: 2000,
  FIGHTER: {
    LANG_RU: 'Адепт Огня',
    name: 'stage1__mob2e__sword',

    moveTimeF: 1.2,

    hitSpeed: 2,
    damage: 80,

    ACC: 100,
    RUN_ACC: 600,
    BODY_SIZE: 40,
    SCALE: 2.5,

    BALANCE: 100,
    HP: 600,
    MP: 100,
    STAMINA: 120,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2e__sword',
    bodyScale: 1.5,
    balance: 10,
    staminaUse: 20,
    staminaUseTime: 1,
    stunTime: 1.5,
  },
});