export const npc = {
  VIEW: 'player',
  SCALE: 0.25,
  GRAY_TINT: 0xFFFFFF,
  COLOR_TINT: 0x666666,
  AMBIENT_TINT: [0x333333, 1],
  SPECIAL_TINT: 0x666666,
  ADD_COLOR_TINT: 0x000000,
  ADD_AMBIENT_TINT: 0x000000,
  ADD_SPECIAL_TINT: 0x000000,
  BACK_VIEW: 'player-back',
  DEAD_VIEW: 'player-back',
  LEFT_FOOT_VIEW: 'player-foot',
  RIGHT_FOOT_VIEW: 'player-foot',
  BODY_VIEW: 'player-body',
  TAIL: 'player-tail',
  HAND: 'player-hand',

  LIGHT: 0xFFFFFF,
  LIGHT_I: 0,
  LIGHT_A: 0.7,
  LIGHT_SCALE: 8,
};

export const npc__strannic = patch(npc, {
  GRAY_TINT: 0x3388FF,
});
export const npc__otr = patch(npc, {
  GRAY_TINT: 0x888888,
});
export const npc__otr_uch = patch(npc, {
  GRAY_TINT: 0x6666FF,
});
export const npc__posl = patch(npc, {
  GRAY_TINT: 0xFFFF33,
});
export const npc__posl2 = patch(npc, {
  GRAY_TINT: 0xFFFF33,
});
export const npc__posl_chaos = patch(npc, {
  GRAY_TINT: 0xFF3333,
});
export const npc__razb = patch(npc, {
  GRAY_TINT: 0x888888,
});
export const npc__hran = patch(npc, {
  GRAY_TINT: 0x000088,
});