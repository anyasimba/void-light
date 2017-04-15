// 1
export const stage1__mob1b = patch(stage1__mob1, {
  VOIDS_COUNT: 100,
  AGRO_D: 8,
  RUN_D: 24,
  FIGHTER: {
    LANG_RU: 'Элементаль Хаоса',
    name: 'stage1__mob1b',

    moveTimeF: 0.5,
    hitSpeed: 1,
    SCALE: 1.4,

    damage: 20,

    ACC: 200,
    RUN_ACC: 300,

    BALANCE: 20,
    HP: 200,
    MP: 100,
    STAMINA: 100,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob1b__rightHand',
    bodyScale: 1.2,
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob1b__leftHand',
    bodyScale: 1.2,
  },
});
// 2
export const stage1__mob1b2 = patch(stage1__mob1, {
  VOIDS_COUNT: 50,
  AGRO_D: 8,
  RUN_D: 24,
  HIT_VER: 1,
  FIGHTER: {
    LANG_RU: 'Темный элемент',
    name: 'stage1__mob1b2',

    moveTimeF: 1.2,
    SCALE: 0.9,

    hitSpeed: 0.5,
    damage: 10,

    ACC: 400,
    RUN_ACC: 700,

    BALANCE: 20,
    HP: 50,
    MP: 100,
    STAMINA: 100,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob1b2__rightHand',
    bodyScale: 2.4,
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob1b2__leftHand',
    bodyScale: 1,
  },
});
// boss1
export const stage1__mob1b__boss1 = patch(stage1__mob1, {
  VOIDS_COUNT: 30,
  FIGHTER: {
    LANG_RU: 'Ночной Кошмар',
    name: 'stage1__mob1b__boss1',
    hitSpeed: 2,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob1b__boss1__rightHand',
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob1b__boss1__leftHand',
  },
});
// boss2
export const stage1__mob1b__boss2 = patch(stage1__mob1, {
  VOIDS_COUNT: 30,
  FIGHTER: {
    LANG_RU: 'Эссенция Чистой Пустоты',
    name: 'stage1__mob1b__boss2',
    hitSpeed: 2,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob1b__boss2__rightHand',
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob1b__boss2__leftHand',
  },
});