// 1
export const stage1__mob3d = patch(stage1__mob3, {
  VOIDS_COUNT: 40,
  FIGHTER: {
    LANG_RU: 'Грех Алчности',
    name: 'stage1__mob3d',
    hitSpeed: 2,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob3d__rightHand',
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob3d__leftHand',
  },
});
// 2
export const stage1__mob3d2 = patch(stage1__mob3, {
  VOIDS_COUNT: 40,
  FIGHTER: {
    LANG_RU: 'Грех Обжорства',
    name: 'stage1__mob3d2',
    hitSpeed: 2,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob3d2__rightHand',
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob3d2__leftHand',
  },
});
// boss1
export const stage1__mob3d__boss1 = patch(stage1__mob3, {
  VOIDS_COUNT: 40,
  FIGHTER: {
    LANG_RU: 'Обжорство',
    name: 'stage1__mob3d__boss1',
    hitSpeed: 2,
  },
  rightHand: {
    type: 'weapon',
    kind: 'stage1__mob3d__boss1__rightHand',
  },
  leftHand: {
    type: 'weapon',
    kind: 'stage1__mob3d__boss1__leftHand',
  },
});