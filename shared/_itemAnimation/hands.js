export function ia_hands__doHit(m) {
  const moveset = {
    0: function () {
      switch (this.curHitType) {
        case 1:
          moveset.forward[this.curHitStage].call(this, true);
          break;
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
      if (this.curHitType !== 3) {
        if (this.inBlock) {
          this.curHitStage += 4;
        }
      }
      switch (this.curHitType) {
        case 1:
          moveset.forward[this.curHitStage].call(this);
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
    m[3][0], m[3][1], m[3][2],
    m[3][3],
    m[3][4], 0, 280, 40, 70, 0, -50, 0,
    10, -10);
  moveset.top = [];
  moveset.forward = [];
  moveset.side = [];
  for (let i = 0; i < 4; ++i) {
    const j = i + 1;
    moveset.top[j] = ia_top(m[0][i][0], m[0][i][1], m[0][i][2],
      m[0][i][3],
      m[0][i][4],
      0, 250, 50, 75, 50, 170 - i * 10, 0,
      30 - i * 5, -30 + i * 5);
    moveset.forward[j] = ia_forward(m[1][i][0], m[1][i][1], m[1][i][2],
      m[1][i][3],
      m[1][i][4], 0, 265, 10, 50, 0, 70 - i * 10, 0,
      30 - i * 5, -30 + i * 5);
    moveset.side[j] = ia_side(
      m[2][i][0], m[2][i][1], m[2][i][2],
      m[2][i][3],
      m[2][i][4], -40, 270,
      70, 0, 0, 0,
      30 + i * 5, -30 - i * 5);
  }
  for (let i = 0; i < 4; ++i) {
    const j = i + 5;
    moveset.top[j] = ia_top(m[0][i][0], m[0][i][1], m[0][i][2],
      m[0][i][3],
      m[0][i][4],
      0, 250, 50, 75, 50, 170 - i * 10, 0,
      30 - i * 5, -30 + i * 5);
    moveset.forward[j] = ia_forward(m[1][i][0], m[1][i][1], m[1][i][2],
      m[1][i][3],
      m[1][i][4], 0, 265, 10, 50, 0, 70 - i * 10, 0,
      30 - i * 5, -30 + i * 5);
    moveset.side[j] = ia_side(
      m[2][i][0], m[2][i][1], m[2][i][2],
      m[2][i][3],
      m[2][i][4], -40, 270,
      70, 0, 0, 0,
      30 + i * 5, -30 - i * 5);
  }

  return moveset;
}