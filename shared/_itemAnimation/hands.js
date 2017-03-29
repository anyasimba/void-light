export function ia_hands__doHit(begin, wait, end, imp, f, af, a) {
  begin *= f;
  wait *= f;
  end *= f;
  af *= f;

  const moveset = {
    0: function () {
      switch (this.curHitType) {
        case 1:
          moveset.forward[this.curHitStage].call(this, true);
          break;
        case 2:
        case 3:
          moveset.side[this.curHitStage].call(this, true);
          break;
        case 4:
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
        if (this.isJumpHit) {
          this.curHitType = 0;
          moveset.top[this.curHitStage].call(this);
          return;
        }
        if (this.isRollHit) {
          this.curHitType = 1;
          moveset.forward[this.curHitStage].call(this);
          return;
        }
        if (this.inBlock) {
          this.curHitStage += 4;
        }
      }
      switch (this.curHitType) {
        case 1:
          moveset.forward[this.curHitStage].call(this);
          break;
        case 2:
        case 3:
          moveset.side[this.curHitStage].call(this);
          break;
        case 4:
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
    begin, wait, end,
    800 * imp,
    10 * a, 0, 240, 40, 70, 0, -50, 0,
    10, -10);
  moveset.top = [];
  moveset.forward = [];
  moveset.side = [];
  for (let i = 0; i < 4; ++i) {
    const j = i + 1;
    moveset.top[j] = ia_top(
      1.3 * begin - i * 0.04 * af, wait - i * 0.04 * af, 1.5 * end,
      400 * imp,
      30 * a, 0, 260, 50, 75, 50, 170 - i * 10, 0,
      30 - i * 5, -30 + i * 5);
    moveset.forward[j] = ia_forward(
      1.3 * begin - i * 0.04 * af, wait - i * 0.04 * af, 1.5 * end,
      800 * imp,
      10 * a, 0, 280, 10, 50, 0, 70 - i * 10, 0,
      30 - i * 5, -30 + i * 5);
    moveset.side[j] = ia_side(
      begin - i * 0.04 * af, wait - i * 0.04 * af, end,
      600 * imp,
      (40 + i * 5) * a, 20 * a, 260,
      70, 0, 0, 0,
      30 + i * 5, -30 - i * 5);
  }
  for (let i = 0; i < 4; ++i) {
    const j = i + 5;
    moveset.top[j] = ia_top(
      begin - i * 0.04 * af, wait - i * 0.04 * af, end,
      300 * imp,
      10 * a, 0, 260, 50, 75, 50, 170 - i * 10, 0,
      30 - i * 5, -30 + i * 5);
    moveset.forward[j] = ia_forward(
      begin - i * 0.04 * af, wait - i * 0.04 * af, end,
      700 * imp,
      10 * a, 0, 280, 10, 50, 0, 70 - i * 10, 0,
      30 - i * 5, -30 + i * 5);
    moveset.side[j] = ia_side(
      begin - i * 0.04 * af, wait - i * 0.04 * af, end,
      500 * imp,
      (20 + i * 5) * a, 20 * a, 260,
      70, 0, 0, 0,
      30 + i * 5, -30 - i * 5);
  }

  return moveset;
}