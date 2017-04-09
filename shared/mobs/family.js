export function moveset(m) {
  const r = [];
  r[0] = [];
  r[1] = [];
  r[2] = [];
  r[3] = m[3];
  r[4] = [];
  r[5] = [];
  r[6] = [];

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
export function axe_moveset(m) {
  const r = [];
  r[0] = [];
  r[1] = [];
  r[2] = [];
  r[3] = m[3];
  r[4] = [];
  r[5] = [];
  r[6] = [];

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
  r.splice(5, 1);
  r.splice(1, 1);
  return r;
}
export function kopie_moveset(m) {
  const r = [];
  r[0] = [];
  r[1] = [];
  r[2] = [];
  r[3] = m[3];
  r[4] = [];
  r[5] = [];
  r[6] = [];

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
  r.splice(6, 1);
  r.splice(4, 1);
  r.splice(2, 1);
  r.splice(0, 1);
  return r;
}