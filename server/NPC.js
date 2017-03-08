export const npc__luna = {
  IS_NPC: true,

  RUN_D: 50,
  HIT_D: [50, 200],
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
    LANG_RU: 'Хранитель лунного света',
    name: 'npc__luna',

    hitSpeed: 1.8,

    ACC: 500,
    RUN_ACC: 800,
    DAMAGE: 30,
    BODY_SIZE: 40,
    SCALE: 1.5,

    BALANCE: 30,
    HP: 10000,
    MP: 100,
    STAMINA: 30,
  },
};