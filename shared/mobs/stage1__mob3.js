export const stage1__mob3__moveset = [
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
export const stage1__mob3__doHit = ia_hands__doHit(
  moveset(stage1__mob3__moveset));

export const stage1__mob3a__moveset = stage1__mob3__moveset;
export const stage1__mob3a__doHit = ia_hands__doHit(
  moveset(stage1__mob3a__moveset));

export const stage1__mob3b__moveset = stage1__mob3__moveset;
export const stage1__mob3b__doHit = ia_hands__doHit(
  moveset(stage1__mob3b__moveset));

export const stage1__mob3c__moveset = stage1__mob3__moveset;
export const stage1__mob3c__doHit = ia_hands__doHit(
  moveset(stage1__mob3c__moveset));

export const stage1__mob3boss__moveset = stage1__mob3__moveset;
export const stage1__mob3boss__doHit = ia_hands__doHit(
  moveset(stage1__mob3boss__moveset));