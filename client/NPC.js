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