export function moveset(m) {
  const r = [];
  r[0] = [];
  r[1] = [];
  r[2] = [];
  r[3] = m[3];
  r[4] = [];
  r[5] = [];
  r[6] = [];
  r[7] = m[7];

  for (let i = 0; i < 3; ++i) {
    const s = m[i];
    for (let j = 0; j < 4; ++j) {
      const h = s[j];
      r[h[0]][j] = [
        h[1], h[2], h[3], h[4], h[5]
      ];
    }
  }
  for (let i = 4; i < 7; ++i) {
    const s = m[i];
    for (let j = 0; j < 4; ++j) {
      const h = s[j];
      r[h[0] + 4][j] = [
        h[1], h[2], h[3], h[4], h[5]
      ];
    }
  }
  return r;
}