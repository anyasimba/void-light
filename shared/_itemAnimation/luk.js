export function ia_luk__doHit(m) {
  const moveset = {
    1: function () {
      this.hitType = -1;
      moveset.hit[this.hitStage].call(this);
    },
    2: function () {
      moveset[1].call(this);
    },
    3: function () {
      moveset[1].call(this);
    },
    4: function () {
      moveset[1].call(this);
      this.hitStage = 3;
    },
  };
  moveset.hit = [];
  for (let i = 0; i < 4; ++i) {
    const j = i + 1;
    moveset.hit[j] = ia_luk();
  }

  return moveset;
}