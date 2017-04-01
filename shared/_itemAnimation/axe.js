export function ia_axe__doHit(m) {
  const moveset = {
    0: function () {
      switch (this.curHitType) {
        case 2:
          moveset.side[this.curHitStage].call(this, true);
          break;
        case 3:
          moveset.backstep.call(this);
          break;
        default:
          moveset.top[this.curHitStage].call(this, true);
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
          this.curHitType = 0;
          this.hitType = 0;
          moveset.top[this.curHitStage].call(this);
          break;
        case 2:
          moveset.side[this.curHitStage].call(this);
          break;
        case 3:
          moveset.backstep.call(this);
          break;
        default:
          moveset.top[this.curHitStage].call(this);
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
    m[2][0], m[2][1], m[2][2],
    m[2][3],
    m[2][4], 0, 260, 40, 70, 0, -50, 0,
    10, -10);
  moveset.top = [];
  moveset.forward = [];
  moveset.side = [];
  for (let i = 0; i < 4; ++i) {
    const j = i + 1;
    moveset.top[j] = ia_top(m[0][i][0], m[0][i][1], m[0][i][2],
      m[0][i][3],
      m[0][i][4],
      0, 270, 50, 75, 50, 170 - i * 10, 0,
      30 - i * 5, -30 + i * 5);
    moveset.side[j] = ia_side(
      m[1][i][0], m[1][i][1], m[1][i][2],
      m[1][i][3],
      m[1][i][4], 0, 270,
      70, 0, 0, 0,
      30 + i * 5, -30 - i * 5);
  }
  for (let i = 0; i < 4; ++i) {
    const j = i + 5;
    moveset.top[j] = ia_top(m[3][i][0], m[3][i][1], m[3][i][2],
      m[3][i][3],
      m[3][i][4],
      0, 270, 50, 75, 50, 170 - i * 10, 0,
      30 - i * 5, -30 + i * 5);
    moveset.side[j] = ia_side(
      m[4][i][0], m[4][i][1], m[4][i][2],
      m[4][i][3],
      m[4][i][4], 0, 270,
      70, 0, 0, 0,
      30 + i * 5, -30 - i * 5);
  }

  return moveset;
}