export function loadAudio() {
  game.load.audio('back',
    'assets/audio/back__doxent_-_Forgotten_Land.ogg');
  game.load.audio('bossBack',
    'assets/audio/bossBack__essesq_-_Dark_Dicey_Sci_Fi_Soundtrack.ogg'
  );

  game.load.audio('door',
    'assets/audio/door__233389__laiaoreka__automatic-door.ogg');

  game.load.audio('boss',
    'assets/audio/boss__essesq_-_Dark_Dicey_Sci_Fi_Soundtrack.ogg');
  game.load.audio('hit',
    'assets/audio/hit__86003__nextmaking__hitting-body-with-blood.ogg'
  );
  game.load.audio('hit1',
    'assets/audio/hit1__351754__urupin__whistle-of-a-twig-in-air.ogg');
  game.load.audio('hit2',
    'assets/audio/hit2__351754__urupin__whistle-of-a-twig-in-air.ogg');
  game.load.audio('hit3',
    'assets/audio/hit3__351754__urupin__whistle-of-a-twig-in-air.ogg');
  game.load.audio('hit4',
    'assets/audio/hit4__351754__urupin__whistle-of-a-twig-in-air.ogg');
  game.load.audio('hit5',
    'assets/audio/hit5__351754__urupin__whistle-of-a-twig-in-air.ogg');

  game.load.audio('block',
    'assets/audio/block__326845__johnbuhr__sword-clash-25.ogg');

  game.load.audio('jump',
    'assets/audio/jump__260188__splicesound__young-boy-grunts-for-body-impact.ogg'
  );
  game.load.audio('mobJump',
    'assets/audio/mob1Jump__181068__lolamadeus__zombie-vocals-grunts.ogg'
  );

  game.load.audio('mob1Die',
    'assets/audio/mob1Die__76964__michel88__grunt2.ogg');
  game.load.audio('youDied',
    'assets/audio/youDied__onlymeith_-_Toward_Isolation.ogg');

  game.load.audio('bossArea',
    'assets/audio/bossArea__377887__debsound__monster-072.ogg');
  game.load.audio('bossDead',
    'assets/audio/bossDead__56304__syna-max__monster-death-scream.ogg'
  );
}

export function loadPlayer() {
  loadHsl('player', 'assets/player/player.png');
  loadHsl('player-back', 'assets/player/player-back.png');

  game.load.image('item__heal__regular',
    'assets/player/item__heal__regular.png');
  game.load.image('item__heal__stone',
    'assets/player/item__heal__stone.png');
  game.load.image('item__stamina__stone',
    'assets/player/item__stamina__stone.png');
}

export function loadWeapon() {
  loadHsl('shield', 'assets/weapon/shield.png');
  loadHsl('sword', 'assets/weapon/sword.png');
  loadHsl('axe', 'assets/weapon/axe.png');
  loadHsl('kopie', 'assets/weapon/kopie.png');
  loadHsl('molot', 'assets/weapon/molot.png');
  loadHsl('dubina', 'assets/weapon/dubina.png');
  loadHsl('kinjal', 'assets/weapon/kinjal.png');
}

export function loadStage1() {
  game.load.image('ground', 'assets/stage1/ground.jpg');
  game.load.image('bricks', 'assets/stage1/bricks.jpg');
  game.load.image('stone', 'assets/stage1/stone.png');
  game.load.image('ice', 'assets/stage1/ice.png');
  game.load.image('dirt', 'assets/stage1/dirt.png');
  game.load.image('whole', 'assets/stage1/whole.png');
  game.load.image('lava', 'assets/stage1/lava.png');
  game.load.image('door', 'assets/stage1/door.png');
}

export function loadStage1__mobs() {
  loadHsl('stage1__mob1',
    'assets/stage1__mobs/stage1__mob1.png');
  loadHsl('stage1__mob1--back',
    'assets/stage1__mobs/stage1__mob1--back.png');
  loadHsl('stage1__mob1--hit',
    'assets/stage1__mobs/stage1__mob1--hit.png');
  loadHsl('stage1__mob1--dead',
    'assets/stage1__mobs/stage1__mob1--dead.png');
  loadHsl('stage1__mob1--foot',
    'assets/stage1__mobs/stage1__mob1--foot.png');
  loadHsl('stage1__mob1--hand',
    'assets/stage1__mobs/stage1__mob1--hand.png');
}