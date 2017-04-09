export const stage1__mob2 = {
  AGRO_D: 4.5,
  RUN_D: 20,
  HIT_D: [100, 250],
  HIT_VER: 0.7,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.5,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [10, 60],
  JUMP_TIME: [10, 60],

  VOIDS_COUNT: 0,

  FIGHTER: {
    LANG_RU: 'Отрешенный',
    name: 'stage1__mob2',

    moveTimeF: 1.2,

    hitSpeed: 1,
    damage: 12,

    ACC: 400,
    RUN_ACC: 600,
    BODY_SIZE: 40,
    SCALE: 1.6,

    BALANCE: 5,
    HP: 18,
    MP: 100,
    STAMINA: 120,
  },

  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2__sword',
    hand: 1,
    balance: 2,
    stamina: 0,
    staminaTime: 0,
    staminaUse: 10,
    staminaUseTime: 0.3,
    stunTime: 0.6,
    pos: {
      x: -25,
      y: 25,
    },
    angle: 15,
    vAngle: 20,
    hAngle: 20,
  },
};

export const stage1__mob2a__sword = patch(stage1__mob2, {
  VOIDS_COUNT: 40,
  FIGHTER: {
    LANG_RU: 'Отрешенный Стражник',
    name: 'stage1__mob2a__sword',
    hitSpeed: 2,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2a__sword',
  },
});
export const stage1__mob2a__sword__shield = patch(stage1__mob2a__sword, {
  leftHand: {
    type: 'shield',
    kind: 'stage1__mob2a__default',
    hand: 2,
    pos: {
      x: -15,
      y: -30,
    },
    angle: -35,
    vAngle: 0,
    hAngle: 20,
  },
});

export const stage1__mob2a__bigsword = patch(stage1__mob2, {
  VOIDS_COUNT: 40,
  HIT_D: [100, 450],
  FIGHTER: {
    LANG_RU: 'Отрешенный Стражник',
    name: 'stage1__mob2a__bigsword',
    hitSpeed: 2.5,
    HP: 40,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2a__bigsword',
    bodyScale: 2.5,
    damage: 20,
    balance: 10,
    staminaUse: 20,
    staminaUseTime: 0.5,
    stunTime: 1.3,
    pos: {
      x: 10,
      y: 50,
    },
    angle: 15,
    vAngle: 30,
    hAngle: 30,
  },
});

export const stage1__mob2a__axe = patch(stage1__mob2, {
  VOIDS_COUNT: 40,
  FIGHTER: {
    LANG_RU: 'Отрешенный Стражник',
    name: 'stage1__mob2a__axe',
    hitSpeed: 2,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2a__axe',
    balance: 2,
    pos: {
      x: -25,
      y: 25,
    },
    angle: 15,
    vAngle: 20,
    hAngle: 20,
  },
});

export const stage1__mob2a__bigaxe = patch(stage1__mob2, {
  VOIDS_COUNT: 40,
  HIT_D: [100, 350],
  FIGHTER: {
    LANG_RU: 'Отрешенный Стражник',
    name: 'stage1__mob2a__bigaxe',
    hitSpeed: 2.5,
    HP: 28,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2a__bigaxe',
    bodyScale: 2,
    damage: 16,
    balance: 10,
    staminaUse: 16,
    staminaUseTime: 0.3,
    stunTime: 1,
    pos: {
      x: -10,
      y: 40,
    },
    angle: 15,
    vAngle: 30,
    hAngle: 30,
  },
});

export const stage1__mob2a__kopie = patch(stage1__mob2, {
  VOIDS_COUNT: 40,
  AGRO_D: 10,
  HIT_D: [100, 600],
  FIGHTER: {
    LANG_RU: 'Отрешенный Стражник',
    name: 'stage1__mob2a__kopie',
    hitSpeed: 2.5,
    HP: 30,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2a__kopie',
    bodyScale: 3,
    damage: 15,
    balance: 6,
    staminaUse: 12,
    staminaUseTime: 0.2,
    stunTime: 0.9,
    pos: {
      x: -10,
      y: 40,
    },
    angle: 15,
    vAngle: 30,
    hAngle: 30,
  },
});

export const stage1__mob2a__molot = patch(stage1__mob2, {
  VOIDS_COUNT: 40,
  FIGHTER: {
    LANG_RU: 'Отрешенный Стражник',
    name: 'stage1__mob2a__molot',
    hitSpeed: 1.5,
    HP: 40,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2a__molot',
    bodyScale: 0.8,
    damage: 12,
    balance: 8,
    staminaUse: 10,
    staminaUseTime: 0.3,
    stunTime: 0.9,
    pos: {
      x: -10,
      y: 40,
    },
    angle: 15,
    vAngle: 30,
    hAngle: 30,
  },
});

export const stage1__mob2a__bigmolot = patch(stage1__mob2, {
  VOIDS_COUNT: 40,
  HIT_D: [100, 350],
  FIGHTER: {
    LANG_RU: 'Отрешенный Стражник',
    name: 'stage1__mob2a__bigmolot',
    hitSpeed: 3,
    HP: 60,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2a__bigmolot',
    bodyScale: 2,
    damage: 24,
    balance: 12,
    staminaUse: 25,
    staminaUseTime: 0.6,
    stunTime: 1.5,
    pos: {
      x: -10,
      y: 40,
    },
    angle: 15,
    vAngle: 30,
    hAngle: 30,
  },
});

export const stage1__mob2a__kinjal = patch(stage1__mob2, {
  VOIDS_COUNT: 40,
  HIT_D: [50, 150],
  FIGHTER: {
    LANG_RU: 'Отрешенный Стражник',
    name: 'stage1__mob2a__kinjal',
    hitSpeed: 0.4,
    HP: 10,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2a__kinjal',
    bodyScale: 0.4,
    damage: 3,
    balance: 1,
    staminaUse: 3,
    staminaUseTime: 0,
    stunTime: 0.3,
    pos: {
      x: -10,
      y: 40,
    },
    angle: 15,
    vAngle: 20,
    hAngle: 20,
  },
});

export const stage1__mob2a__luk = patch(stage1__mob2, {
  AGRO_D: 6,
  RUN_D: 6,
  VOIDS_COUNT: 40,
  HIT_D: [200, 1000],
  HIT_VER: 0.5,
  MOVE_VER: 0,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0.5, 0.5],

  ROLL_TIME: [300, 300],
  JUMP_TIME: [300, 300],
  FIGHTER: {
    LANG_RU: 'Отрешенный Стражник',
    name: 'stage1__mob2a__luk',
    hitSpeed: 10,
    HP: 14,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2a__luk',
    isRange: true,
    bodyScale: 0.7,
    damage: 7,
    balance: 2,
    staminaUse: 3,
    staminaUseTime: 0.5,
    stunTime: 1,
    pos: {
      x: 0,
      y: 0,
    },
    angle: -20,
    vAngle: 20,
    hAngle: 0,
  },
});

//
export const stage1__mob2a__boss1 = patch(stage1__mob2, {
  IS_BOSS: true,

  VOIDS_COUNT: 2000,
  HIT_D: [50, 250],
  AGRO_D: 16,
  RUN_D: 24,
  FIGHTER: {
    LANG_RU: 'Ателард, Мастер Пыток',
    name: 'stage1__mob2a__boss1',

    moveTimeF: 0.4,
    hitSpeed: 1.5,
    HP: 400,
    SCALE: 3,

    ACC: 300,
    RUN_ACC: 400,

    BALANCE: 50,
    STAMINA: 200,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2a__boss1',
    bodyScale: 1.5,
    damage: 20,
    balance: 10,
    staminaUse: 16,
    staminaUseTime: 0.3,
    stunTime: 2,
    pos: {
      x: -10,
      y: 40,
    },
    angle: 15,
    vAngle: 30,
    hAngle: 30,
  },
  leftHand: {
    type: 'shield',
    kind: 'stage1__mob2a__boss1',
    hand: 2,
    pos: {
      x: -15,
      y: -30,
    },
    angle: -35,
    vAngle: 0,
    hAngle: 20,
  },
});