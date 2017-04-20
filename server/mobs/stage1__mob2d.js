// 1
export const stage1__mob2d__sword = patch(stage1__mob2, {
  VOIDS_COUNT: 300,
  FIGHTER: {
    LANG_RU: 'Мумия',
    name: 'stage1__mob2d__sword',
    hitSpeed: 2,
    SCALE: 1.5,
    HP: 100,
    BALANCE: 50,
    damage: 20,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2d__sword',
  },
});
// 2
export const stage1__mob2d2__sword = patch(stage1__mob2, {
  VOIDS_COUNT: 400,
  FIGHTER: {
    LANG_RU: 'Солнечный рыцарь',
    name: 'stage1__mob2d2__sword',
    hitSpeed: 0.7,
    SCALE: 3,
    HP: 150,
    BALANCE: 50,
    damage: 20,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2d2__sword',
  },
});
// 3
export const stage1__mob2d3__sword = patch(stage1__mob2, {
  VOIDS_COUNT: 500,
  FIGHTER: {
    LANG_RU: 'Адепт Солнца',
    name: 'stage1__mob2d3__sword',
    hitSpeed: 0.9,
    SCALE: 2,
    HP: 100,
    BALANCE: 30,
    damage: 35,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2d3__sword',
    bodyScale: 0.7,
  },
});
// boss 1
export const stage1__mob2d__boss1 = patch(stage1__mob2, {
  IS_BOSS: true,
  VOIDS_COUNT: 40,
  FIGHTER: {
    LANG_RU: 'Сгнивший',
    name: 'stage1__mob2d__boss1',
    hitSpeed: 2,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob2d__boss1',
  },
});