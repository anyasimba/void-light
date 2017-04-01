export let hsl = [];
export let hslMap = {};

export function loadHsl(title, path) {
  game.load.image(title, path);
  hsl.push(title);
}

export function processHsl(hsl) {
  let image = new Phaser.Image(game, 0, 0, hsl);
  const makeRect = (color, blend) => {
    let g = new Phaser.Graphics(game, 0, 0);
    g.beginFill(color);
    g.drawRect(0, 0, image.width, image.height);
    g.endFill();
    g.blendMode = blend;
    return g;
  };

  let makeChannel = (mask1, mask2, f) => {
    let rt = new Phaser.RenderTexture(
      game, image.width, image.height, null, null, 1);

    rt.renderXY(makeRect(0x000000, PIXI.blendModes.NORMAL), 0, 0, true);
    rt.renderXY(image, 0, 0, false);
    rt.renderXY(makeRect(mask1, PIXI.blendModes.LUMINOSITY), 0, 0, false);
    rt.renderXY(makeRect(mask1, PIXI.blendModes.MULTIPLY), 0, 0, false);
    rt.renderXY(makeRect(mask2, PIXI.blendModes.LIGHTEN), 0, 0, false);
    rt.renderXY(makeRect(mask2, PIXI.blendModes.DIFFERENCE), 0, 0, false);

    let s = new Phaser.Image(game, 0, 0, rt);
    s.blendMode = PIXI.blendModes.ADD;
    let rt2 = new Phaser.RenderTexture(
      game, image.width, image.height, null, null, 1);
    rt2.renderXY(s, 0, 0, true);
    s.alpha = 255 / (255 - f) - 1;
    rt2.renderXY(s, 0, 0, false);
    return rt2;
  }
  let finishChannel = (rt, f) => {
    rt.renderXY(makeRect(0xFFFFFF, PIXI.blendModes.HUE), 0, 0, false);
    let s = new Phaser.Image(game, 0, 0, rt);
    s.blendMode = PIXI.blendModes.ADD;
    let rt2 = new Phaser.RenderTexture(
      game, image.width, image.height, null, null, 1);
    rt2.renderXY(s, 0, 0, true);
    for (let i = 0; i < Math.floor(255 / f - 1); ++i) {
      rt2.renderXY(s, 0, 0, false);
    }
    s.alpha = (255 - Math.floor(255 / f) * f) / f;
    rt2.renderXY(s, 0, 0, false);
    return rt2;
  }

  let rt = new Phaser.RenderTexture(
    game, image.width, image.height, null, null, 1);
  rt.renderXY(makeRect(0x000000, PIXI.blendModes.NORMAL), 0, 0, true);
  rt.renderXY(image, 0, 0, false);

  let red = makeChannel(0xFF0000, 0x4c0000, 76);
  const redS = new Phaser.Image(game, 0, 0, red);
  redS.blendMode = PIXI.blendModes.DIFFERENCE;
  rt.renderXY(redS, 0, 0, false);
  red = finishChannel(red, 76);
  let green = makeChannel(0x00FF00, 0x009600, 150);
  const greenS = new Phaser.Image(game, 0, 0, green);
  greenS.blendMode = PIXI.blendModes.DIFFERENCE;
  rt.renderXY(greenS, 0, 0, false);
  green = finishChannel(green, 150);
  let blue = makeChannel(0x0000FF, 0x00001c, 28);
  const blueS = new Phaser.Image(game, 0, 0, blue);
  blueS.blendMode = PIXI.blendModes.DIFFERENCE;
  rt.renderXY(blueS, 0, 0, false);
  blue = finishChannel(blue, 28);

  rt.renderXY(makeRect(0x00FF00, PIXI.blendModes.MULTIPLY), 0, 0, false);
  rt = finishChannel(rt, 150);

  const bmd = new Phaser.BitmapData(game, null, image.width, image.height);
  bmd.alphaMask(new Phaser.Image(game, 0, 0, rt), image);

  hslMap[hsl] = {
    gray: bmd,
    color: red,
    ambient: green,
    special: blue,
  };
}

export function makeTinted(tex, tint) {
  const rt = new Phaser.RenderTexture(
    game, tex.width, tex.height, null, null, 1);
  const v = new Phaser.Image(game, 0, 0, tex);
  v.tint = tint;
  rt.renderXY(v, 0, 0, true);
  return rt;
}
export function makeHSL(hsl, ax, ay, tints, g) {
  ax = ax || 0;
  ay = ay || 0;
  g = g || new Phaser.Group(game, 0, 0, null);
  g.isHSL = true;
  g.hsl = hsl;

  hsl.grays = hsl.grays || {};
  if (!hsl.grays[tints[0]]) {
    hsl.grays[tints[0]] = makeTinted(hsl.gray, tints[0]);
  }
  hsl.colors = hsl.colors || {};
  if (!hsl.colors[tints[1]]) {
    hsl.colors[tints[1]] = makeTinted(hsl.color, tints[1]);
  }
  hsl.ambients = hsl.ambients || {};
  if (!hsl.ambients[tints[2]]) {
    hsl.ambients[tints[2]] = makeTinted(hsl.ambient, tints[2]);
  }
  hsl.specials = hsl.specials || {};
  if (!hsl.specials[tints[3]]) {
    hsl.specials[tints[3]] = makeTinted(hsl.special, tints[3]);
  }

  g.removeAll();
  g.gray = g.add(new Phaser.Image(game, 0, 0, hsl.grays[tints[0]]));
  g.gray.anchor.x = ax;
  g.gray.anchor.y = ay;
  g.color = g.add(new Phaser.Image(game, 0, 0, hsl.colors[tints[1]]));
  g.color.anchor.x = ax;
  g.color.anchor.y = ay;
  g.color.blendMode = PIXI.blendModes.ADD;
  g.ambient = g.add(new Phaser.Image(game, 0, 0, hsl.ambients[tints[2]]));
  g.ambient.anchor.x = ax;
  g.ambient.anchor.y = ay;
  g.ambient.blendMode = PIXI.blendModes.ADD;
  g.special = g.add(new Phaser.Image(game, 0, 0, hsl.specials[tints[3]]));
  g.special.anchor.x = ax;
  g.special.anchor.y = ay;
  g.special.blendMode = PIXI.blendModes.ADD;

  return g;
}

export function changeHSL(v, tints) {
  makeHSL(v.hsl, v.gray.anchor.x, v.gray.anchor.y, tints, v);
}