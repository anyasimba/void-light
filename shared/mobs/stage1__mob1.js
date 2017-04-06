export const stage1__mob1__moveset = [
  [
    [0, 0.7, 0.04, 0.3, 800, 40, 'roll', 0.6],
    [1, 0.5, 0.04, 0.3, 800, 10],
    [0, 0.3, 0.04, 0.3, 1500, 60],
    [2, 0.3, 0.3, 0.3, 800, 50],
  ],
  [
    [1, 0.7, 0.04, 0.3, 1500, 10],
    [0, 0.5, 0.04, 0.3, 800, 50],
    [2, 0.3, 0.3, 0.3, 1500, 50],
    [1, 0.3, 0.04, 0.3, 800, 10],
  ],
  [
    [2, 0.7, 0.3, 0.3, 900, 50, 'jump', 0.6],
    [2, 0.5, 0.3, 0.3, 800, 50],
    [1, 0.3, 0.04, 0.3, 1500, 10],
    [0, 0.3, 0.04, 0.3, 800, 70],
  ],
  [0.4, 0.3, 0.3, 600, 40],
  [
    [0, 0.7, 0.04, 0.3, 800, 40, 'roll', 0.6],
    [1, 0.5, 0.04, 0.3, 800, 10],
    [0, 0.3, 0.04, 0.3, 1500, 60],
    [2, 0.3, 0.3, 0.3, 800, 50],
  ],
  [
    [1, 0.7, 0.04, 0.3, 1500, 10],
    [0, 0.5, 0.04, 0.3, 800, 50],
    [2, 0.3, 0.3, 0.3, 1500, 50],
    [1, 0.3, 0.04, 0.3, 800, 10],
  ],
  [
    [2, 0.7, 0.3, 0.3, 900, 50, 'jump', 0.6],
    [2, 0.5, 0.3, 0.3, 800, 50],
    [1, 0.3, 0.04, 0.3, 1500, 10],
    [0, 0.3, 0.04, 0.3, 800, 70],
  ],
  3,
];
export const stage1__mob1__doHit = ia_hands__doHit(
  moveset(stage1__mob1__moveset));

export const stage1__mob1a__moveset = stage1__mob1__moveset;
export const stage1__mob1a__doHit = ia_hands__doHit(
  moveset(stage1__mob1a__moveset));

export const stage1__mob1b__moveset = stage1__mob1__moveset;
export const stage1__mob1b__doHit = ia_hands__doHit(
  moveset(stage1__mob1b__moveset));

export const stage1__mob1c__moveset = stage1__mob1__moveset;
export const stage1__mob1c__doHit = ia_hands__doHit(
  moveset(stage1__mob1c__moveset));

export const stage1__mob1boss__moveset = stage1__mob1__moveset;
export const stage1__mob1boss__doHit = ia_hands__doHit(
  moveset(stage1__mob1boss__moveset));