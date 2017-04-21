function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

export function loadAudio() {
  let fmt = '.ogg';
  if (detectIE()) {
    fmt = '.mp3';
  }
  game.load.audio('back',
    'assets/audio/back__doxent_-_Forgotten_Land' + fmt);

  game.load.audio('bossBack',
    'assets/audio/boss1__Dark Descent (Extended Cut)' + fmt);

  game.load.audio('door',
    'assets/audio/door__233389__laiaoreka__automatic-door' + fmt);

  game.load.audio('hit',
    'assets/audio/hit__86003__nextmaking__hitting-body-with-blood' + fmt
  );
  game.load.audio('hit1',
    'assets/audio/hit1__351754__urupin__whistle-of-a-twig-in-air' + fmt);
  game.load.audio('hit2',
    'assets/audio/hit2__351754__urupin__whistle-of-a-twig-in-air' + fmt);
  game.load.audio('hit3',
    'assets/audio/hit3__351754__urupin__whistle-of-a-twig-in-air' + fmt);
  game.load.audio('hit4',
    'assets/audio/hit4__351754__urupin__whistle-of-a-twig-in-air' + fmt);
  game.load.audio('hit5',
    'assets/audio/hit5__351754__urupin__whistle-of-a-twig-in-air' + fmt);

  game.load.audio('block',
    'assets/audio/block__326845__johnbuhr__sword-clash-25' + fmt);

  game.load.audio('jump',
    'assets/audio/jump__260188__splicesound__young-boy-grunts-for-body-impact' +
    fmt
  );
  game.load.audio('mobJump',
    'assets/audio/mob1Jump__181068__lolamadeus__zombie-vocals-grunts' + fmt
  );

  game.load.audio('mob1Die',
    'assets/audio/mob1Die__76964__michel88__grunt2' + fmt);
  game.load.audio('youDied',
    'assets/audio/youDied__onlymeith_-_Toward_Isolation' + fmt);

  game.load.audio('bossArea',
    'assets/audio/bossArea__377887__debsound__monster-072' + fmt);
  game.load.audio('bossDead',
    'assets/audio/bossDead__56304__syna-max__monster-death-scream' + fmt
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
  game.load.image('arrow',
    'assets/weapon/arrow.png');
  loadHsl('sword', 'assets/weapon/sword.png');
  loadHsl('axe', 'assets/weapon/axe.png');
  loadHsl('kopie', 'assets/weapon/kopie.png');
  loadHsl('molot', 'assets/weapon/molot.png');
  loadHsl('dubina', 'assets/weapon/dubina.png');
  loadHsl('kinjal', 'assets/weapon/kinjal.png');
  loadHsl('shield', 'assets/weapon/shield.png');
  loadHsl('luk', 'assets/weapon/luk.png');
}

export function loadMisc() {
  game.load.image('barrel',
    'assets/misc/barrel.png');
  game.load.image('barrel-top',
    'assets/misc/barrel-top.png');
}

export function loadStage1() {
  game.load.image('bricks', 'assets/stage1/bricks.png');
  game.load.image('bricks2', 'assets/stage1/bricks2.png');
  game.load.image('dirt', 'assets/stage1/dirt.png');
  game.load.image('dirt2', 'assets/stage1/dirt2.png');
  game.load.image('door', 'assets/stage1/door.png');
  game.load.image('forest-ground', 'assets/stage1/forest-ground.png');
  game.load.image('grass', 'assets/stage1/grass.png');
  game.load.image('grass2', 'assets/stage1/grass2.png');
  game.load.image('ground', 'assets/stage1/ground.png');
  game.load.image('ice', 'assets/stage1/ice.png');
  game.load.image('lava', 'assets/stage1/lava.png');
  game.load.image('leaves', 'assets/stage1/leaves.png');
  game.load.image('leaves2', 'assets/stage1/leaves2.png');
  game.load.image('leaves3', 'assets/stage1/leaves3.png');
  game.load.image('leaves4', 'assets/stage1/leaves4.png');
  game.load.image('leaves5', 'assets/stage1/leaves5.png');
  game.load.image('sand', 'assets/stage1/sand.png');
  game.load.image('stone', 'assets/stage1/stone.png');
  game.load.image('stones', 'assets/stage1/stones.png');
  game.load.image('toxic', 'assets/stage1/toxic.png');
  game.load.image('water', 'assets/stage1/water.png');
  game.load.image('deep-water', 'assets/stage1/deep-water.png');
  game.load.image('whole', 'assets/stage1/whole.png');
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

  loadHsl('stage1__mob3',
    'assets/stage1__mobs/stage1__mob3.png');
  loadHsl('stage1__mob3--back',
    'assets/stage1__mobs/stage1__mob3--back.png');
  loadHsl('stage1__mob3--hit',
    'assets/stage1__mobs/stage1__mob3--hit.png');
  loadHsl('stage1__mob3--dead',
    'assets/stage1__mobs/stage1__mob3--dead.png');
  loadHsl('stage1__mob3--foot',
    'assets/stage1__mobs/stage1__mob3--foot.png');
  loadHsl('stage1__mob3--hand',
    'assets/stage1__mobs/stage1__mob3--hand.png');
}