export const PLAYER_PARAMS = [
  'Health',
  'Strength',
  'Endurance',
  'Dexterity',
  'Willpower',
  'Magic',
  'Wisdom',
];

export const PLAYER_PARAMS_LANG_RU = [
  'Здоровье',
  'Сила',
  'Подвижность',
  'Ловкость',
  'Выносливость',
  'Интеллект',
  'Мудрость',
];

export function levelLimit(level) {
  const f1 = Math.pow(level * 10, 1.3) * 0.5;
  const f2 = Math.pow(level * 10, 2) * 0.02;
  return 500 + Math.floor((f1 + f2) * 0.1) * 10;
}