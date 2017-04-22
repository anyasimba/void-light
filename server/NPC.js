export const npc = {
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

    hitSpeed: 1.8,
    moveTimeF: 1,

    ACC: 500,
    RUN_ACC: 800,
    DAMAGE: 30,
    BODY_SIZE: 40,
    SCALE: 1,

    BALANCE: 30,
    HP: 10000,
    MP: 100,
    STAMINA: 30,
  },
}

export const npc__strannic = patch(npc, {
  FIGHTER: {
    LANG_RU: 'Загадочный Путник',
    name: 'npc__strannic',
  },
});
export const npc__otr = patch(npc, {
  FIGHTER: {
    LANG_RU: 'Отрешенный',
    name: 'npc__otr',
  },
});
export const npc__otr_uch = patch(npc, {
  FIGHTER: {
    LANG_RU: 'Отрешенный Ученик Магии',
    name: 'npc__otr_uch',
  },
});
// 2
export const npc__posl = patch(npc, {
  FIGHTER: {
    LANG_RU: 'Жрец Солнца',
    name: 'npc__posl',
  },
});
export const npc__posl2 = patch(npc, {
  FIGHTER: {
    LANG_RU: 'Жрец Солнца',
    name: 'npc__posl2',
  },
});
export const npc__posl_chaos = patch(npc, {
  FIGHTER: {
    LANG_RU: 'Тень',
    name: 'npc__posl_chaos',
  },
});
export const npc__razb = patch(npc, {
  FIGHTER: {
    LANG_RU: 'Разбойник',
    name: 'npc__razb',
  },
});
export const npc__hran = patch(npc, {
  FIGHTER: {
    LANG_RU: 'Хранительница Леса',
    name: 'npc__hran',
  },
});