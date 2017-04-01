export function ia_kopie__doHit(m) {
  const moveset = {
    0: function () {
      switch (this.curHitType) {
        default: moveset.forward[this.curHitStage].call(this, true);
      }
    },
    1: function () {
      this.curHitStage = this.hitStage;
      this.curHitType = this.hitType;
      if (this.curHitType !== 4) {
        if (this.inBlock) {
          this.curHitStage += 4;
        }
      }
      switch (this.curHitType) {
        case 1:
          moveset.forward[this.curHitStage].call(this);
          break;
        case 2:
          this.curHitType = 1;
          this.hitType = 1;
          moveset.forward[this.curHitStage].call(this);
          break;
        case 3:
          moveset.backstep.call(this);
          break;
        default:
          this.curHitType = 1;
          this.hitType = 1;
          moveset.forward[this.curHitStage].call(this);
      }
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
  moveset.backstep = ia_backstep(
    m[1][0], m[1][1], m[1][2],
    m[1][3],
    m[1][4], 0, 270, 40, 70, 0, -50, 0,
    10, -10);
  moveset.forward = [];
  for (let i = 0; i < 4; ++i) {
    const j = i + 1;
    moveset.forward[j] = ia_forward(m[0][i][0], m[0][i][1], m[0][i][2],
      m[0][i][3],
      m[0][i][4], 0, 260, 20, 50, 0, 80 - i * 5, 0,
      30 - i * 5, -30 + i * 5);
  }
  for (let i = 0; i < 4; ++i) {
    const j = i + 5;
    moveset.forward[j] = ia_forward(m[2][i][0], m[2][i][1], m[2][i][2],
      m[2][i][3],
      m[2][i][4], 0, 260, 20, 50, 0, 80 - i * 5, 0,
      30 - i * 5, -30 + i * 5);
  }

  return moveset;
}