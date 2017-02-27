export const stage1__mob1 = {
  NAME: 'stage1__mob1',

  AGRO_D: 10,
  RUN_D: 30,
  HIT_D: [150, 250],
  HIT_VER: 0.8,
  HIT_TIME: [0.5, 2],
  JUMP_HIT_VER: 0.1,
  ROLL_HIT_VER: 0.2,
  MOVE_VER: 0.5,
  MOVE_TIME: [0.5, 1],
  LONG_MOVE_VER: 0.1,
  LONG_MOVE_TIME: [1, 2],
  STOP_TIME: [0, 0.5],

  ROLL_TIME: [5, 15],
  JUMP_TIME: [10, 15],
};

export function ItemStage1__Mob1__RightHand(parent, hitSpeed) {
  return new global.Item({
    parent: parent,
    type: 'weapon',
    kind: 'stage1__mob1__rightHand',
    damage: 40,
    balance: 5,
    stamina: 4,
    staminaTime: 1,
    hitSpeed: hitSpeed,
    hand: 1,
    pos: {
      x: -15,
      y: 80,
    },
    angle: 0,
  });
}
export function ItemStage1__Mob1__LeftHand(parent, hitSpeed) {
  return new global.Item({
    parent: parent,
    type: 'weapon',
    kind: 'stage1__mob1__leftHand',
    damage: 40,
    balance: 5,
    stamina: 4,
    staminaTime: 1,
    hitSpeed: hitSpeed,
    hand: 2,
    pos: {
      x: -15,
      y: -80,
    },
    angle: -0,
  });
}