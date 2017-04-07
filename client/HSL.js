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

  rt.renderXY(makeRect(0xFFFF00, PIXI.blendModes.MULTIPLY), 0, 0, false);
  rt = finishChannel(rt, 76 + 150);

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

  if (tint === 0x000000) {
    const v = new Phaser.Image(game, 0, 0, tex);
    v.tint = tint;
    rt.renderXY(v, 0, 0, true);
    return rt;
  }

  let g = new Phaser.Graphics(game, 0, 0);
  g.beginFill(0x000000);
  g.drawRect(0, 0, tex.width, tex.height);
  g.endFill();
  rt.renderXY(g, 0, 0, true);

  const v = new Phaser.Image(game, 0, 0, tex);
  rt.renderXY(v, 0, 0, false);

  let f = new Phaser.Graphics(game, 0, 0);
  f.beginFill(tint);
  f.drawRect(0, 0, tex.width, tex.height);
  f.endFill();
  f.blendMode = PIXI.blendModes.MULTIPLY;
  rt.renderXY(f, 0, 0, false);

  return rt;
}
export function makeHSL(hsl, ax, ay, tints, g) {
  tints[7] = 0x000000;

  ax = ax || 0;
  ay = ay || 0;

  let shadowAlpha = 0.5;
  if (tints[2] && typeof tints[2] !== 'number') {
    shadowAlpha = tints[2][1];
    tints[2] = tints[2][0];
  }

  let rt;
  if (!g) {
    g = new Phaser.Group(game, 0, 0, null);
    g.isHSL = true;
    g.hsl = hsl;
  }

  hsl.texs = hsl.texs || [];
  for (let i = 0; i < 8; ++i) {
    hsl.texs[i] = hsl.texs[i] || {};
    if (tints[i] !== undefined && !hsl.texs[i][tints[i]]) {
      let tex;
      switch (i) {
        case 0:
          tex = hsl.gray;
          break;
        case 1:
          tex = hsl.color;
          break;
        case 2:
          tex = hsl.ambient;
          break;
        case 3:
          tex = hsl.special;
          break;
        case 4:
          tex = hsl.color;
          break;
        case 5:
          tex = hsl.ambient;
          break;
        case 6:
          tex = hsl.special;
          break;
        case 7:
          tex = hsl.gray;
          break;
      }
      hsl.texs[i][tints[i]] = makeTinted(tex, tints[i]);
    }
  }

  g.removeAll();

  const rt1 = new Phaser.RenderTexture(
    game, hsl.gray.width, hsl.gray.height, null, null, 1);
  const temp = new Phaser.Group(game, 0, 0, null);
  let tex = new Phaser.Image(game, 0, 0, hsl.texs[0][tints[0]]);
  temp.add(tex);
  for (let i = 1; i <= 3; ++i) {
    if (tints[i] !== undefined && tints[i] !== null) {
      tex = new Phaser.Image(game, 0, 0, hsl.texs[i][tints[i]]);
      tex.blendMode = PIXI.blendModes.ADD;
      if (i === 2) {
        tex.alpha = shadowAlpha;
      }
      temp.add(tex);
    }
  }
  rt1.renderXY(temp, 0, 0, true);

  tex = new Phaser.Image(game, 0, 0, hsl.texs[7][tints[7]]);
  tex.anchor.x = ax;
  tex.anchor.y = ay;
  g.add(tex);
  g.blackTex = tex;

  tex = new Phaser.Image(game, 0, 0, rt1);
  tex.anchor.x = ax;
  tex.anchor.y = ay;
  g.add(tex);
  g.tex = tex;
  tex.blendMode = PIXI.blendModes.ADD;

  const rt2 = new Phaser.RenderTexture(
    game, hsl.gray.width, hsl.gray.height, null, null, 1);
  temp.removeAll();
  tex = new Phaser.Graphics(game, 0, 0);
  tex.beginFill(0x000000);
  tex.drawRect(0, 0, hsl.gray.width, hsl.gray.height);
  tex.endFill();
  temp.add(tex);
  for (let i = 4; i <= 6; ++i) {
    if (tints[i] !== undefined && tints[i] !== null) {
      tex = new Phaser.Image(game, 0, 0, hsl.texs[i][tints[i]]);
      tex.blendMode = PIXI.blendModes.ADD;
      temp.add(tex);
    }
  }
  rt2.renderXY(temp, 0, 0, true);

  tex = new Phaser.Image(game, 0, 0, rt2);
  tex.anchor.x = ax;
  tex.anchor.y = ay;
  g.addTex = tex;
  tex.blendMode = PIXI.blendModes.ADD;
  if (tints[4] ||
    tints[5] ||
    tints[6]) {

    g.add(tex);
    const addTex = tex;
    g.update = () => {
      addTex.time = addTex.time || Math.random();
      addTex.time += dt;
      addTex.alpha = (Math.sin(addTex.time * Math.PI) * 0.5 + 0.5);
    }
  }

  return g;
}

export function changeHSL(v, tints) {
  makeHSL(v.hsl, v.gray.anchor.x, v.gray.anchor.y, tints, v);
}