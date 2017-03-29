export const stage1__1 = [
  'npc__luna'
];

export const npc__luna__stage1__1 = {
  1: {
    LANG_RU: `
      Свет покидает это место.
    `,
    2: ['(Дальше)', 2],
  },
  2: {
    LANG_RU: `
      Виделись ли мы прежде?
    `,
    1: ['Нет', 3],
    2: ['Да', 4],
  },

  3: {
    LANG_RU: `
      Коснись кольца света.
      Последний свет вернет тебе силы.
    `,
    1: ['(Уйти)'],
  },
  4: {
    LANG_RU: `
      Ты знаешь, что делать.
    `,
    1: ['(Уйти)'],
  },
};
export const npc__she__stage1__1 = {
  1: {
    LANG_RU: `
      Здесь кто-то есть?..
    `,
    1: ['(Дальше)', 2],
  },
  2: {
    LANG_RU: `
      Мой Тит.. Бедный Тит.
    `,
    1: ['(Уйти)'],
  },
};
export const npc__she2__stage1__1 = {
  1: {
    LANG_RU: `
      Мы хотели быть вместе до смерти,
      теперь и смерть хочет того же.
    `,
    1: ['(Дальше)', 2],
  },
  2: {
    LANG_RU: `
      ...
    `,
    1: ['(Дальше)', 3],
  },
  3: {
    LANG_RU: `
      Один Пустой погиб здесь, оставив меч.
      Может, он поможет тебе найти искупление.
    `,
    1: ['(Уйти)'],
  },
};