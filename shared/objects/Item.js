export class Item {
  static get classID() {
    return 'Item';
  }

  onCreate() {
    this.pos = new vec3(this.pos);

    this.sideAngle = 0;

    this.basePos = this.pos.clone();
    this.baseAngle = this.angle;
    this.baseVAngle = this.vAngle;
    this.baseHAngle = this.hAngle;
    this.baseSideAngle = this.sideAngle;

    if (false) {
      //
    } else if (this.type === 'weapon' && this.hand === 1) {
      this.ownerSlug = 'weapon';
    } else if (this.type === 'weapon' && this.hand === 2) {
      this.ownerSlug = 'weapon2';
    } else if (this.type === 'shield') {
      this.ownerSlug = 'shield';
    }

    this.parent[this.ownerSlug] = this;

    const kind = this.kind || 'default';
    const name = this.name || 'default';

    this.slug = this.type + '__' + kind + '__' + name;
  }
  destructor() {
    delete this.parent[this.ownerSlug];
  }

  reborn() {
    this.pos = this.basePos.clone();
    this.angle = this.baseAngle;
    this.vAngle = this.baseVAngle;
    this.hAngle = this.baseHAngle;
    this.sideAngle = this.baseSideAngle;
    this.sideBAngle = this.baseSideBAngle;
  }

  finalStage(duration, fn) {
    this.stage(duration, fn, {
      pos: this.basePos,
      angle: this.baseAngle,
      vAngle: this.baseVAngle,
      hAngle: this.baseHAngle,
      sideAngle: this.baseSideAngle,
    });
  }
}

export function player_moveset(begin, wait, end, imp, a, tf, impf, af) {
  let r = [];
  for (let j = 0; j < 4; ++j) {
    const ctf = Math.pow(tf, j);
    const cimpf = Math.pow(impf, j);
    const caf = Math.pow(af, j);
    r.push([
      begin * ctf, wait * ctf, end * ctf, imp * cimpf, a * caf
    ]);
  }
  return r;
}

export const weapon__sword__default__doHit = ia_sword__doHit([
  player_moveset(0.2, 0.3, 0.2, 700, 30, 0.88, 0.9, 0.9),
  player_moveset(0.15, 0.2, 0.2, 800, 10, 0.88, 1, 1),
  player_moveset(0.25, 0.4, 0.3, 600, 60, 0.88, 0.9, 1.1), //
  [0.4, 0.3, 0.3, 0, 10],
  player_moveset(0.2, 0.3, 0.2, 700, 10, 0.88, 0.9, 0.9),
  player_moveset(0.15, 0.2, 0.2, 800, 10, 0.88, 1, 1),
  player_moveset(0.25, 0.4, 0.3, 600, 40, 0.88, 0.9, 1.1),
]);
export const weapon__bigsword__default__doHit = ia_sword__doHit([
  player_moveset(0.4, 0.4, 0.4, 800, 5, 0.88, 0.9, 2),
  player_moveset(0.5, 0.3, 0.4, 1500, 10, 0.88, 1, 1),
  player_moveset(0.5, 0.5, 0.5, 700, 60, 0.88, 0.9, 1.3), //
  [0.8, 0.3, 0.3, 0, 10],
  player_moveset(0.4, 0.4, 0.4, 800, 30, 0.88, 0.9, 0.9),
  player_moveset(0.3, 0.3, 0.4, 900, 10, 0.88, 1, 1),
  player_moveset(0.5, 0.5, 0.5, 700, 60, 0.88, 0.9, 1.1),
]);
export const weapon__bigsword2__default__doHit = ia_sword__doHit([
  player_moveset(0.3, 0.3, 0.4, 1200, 50, 0.85, 0.9, 1.2),
  player_moveset(0.4, 0.2, 0.4, 1500, 10, 0.85, 1, 1),
  player_moveset(0.4, 0.4, 0.5, 1200, 90, 0.85, 0.9, 1.3), //
  [0.5, 0.3, 0.3, 0, 10],
  player_moveset(0.3, 0.3, 0.4, 1200, 50, 0.85, 0.9, 1.1),
  player_moveset(0.2, 0.2, 0.4, 1500, 10, 0.85, 1, 1),
  player_moveset(0.4, 0.4, 0.5, 1200, 90, 0.85, 0.9, 1.1),
]);
export const weapon__axe__default__doHit = ia_axe__doHit([
  player_moveset(0.15, 0.3, 0.2, 600, 70, 0.88, 0.9, 0.9),
  player_moveset(0.15, 0.3, 0.2, 600, 100, 0.88, 0.9, 0.9), //
  [0.3, 0.3, 0.3, 0, 10],
  player_moveset(0.15, 0.3, 0.2, 600, 20, 0.88, 0.9, 0.9),
  player_moveset(0.15, 0.3, 0.2, 600, 80, 0.88, 0.9, 0.9),
]);
export const weapon__bigaxe__default__doHit = ia_axe__doHit([
  player_moveset(0.25, 0.4, 0.3, 600, 5, 0.88, 0.9, 0.9),
  player_moveset(0.25, 0.4, 0.3, 600, 100, 0.88, 0.9, 0.9), //
  [0.5, 0.3, 0.3, 0, 10],
  player_moveset(0.25, 0.4, 0.3, 600, 20, 0.88, 0.9, 0.9),
  player_moveset(0.25, 0.4, 0.3, 600, 80, 0.88, 0.9, 0.9),
]);
export const weapon__kopie__default__doHit = ia_kopie__doHit([
  player_moveset(0.2, 0.1, 0.4, 1200, 5, 0.88, 1, 1), //
  [0.8, 0.3, 0.3, 0, 5],
  player_moveset(0.3, 0.1, 0.4, 500, 5, 0.88, 1, 1), //
]);
export const weapon__molot__default__doHit = ia_molot__doHit([
  player_moveset(0.15, 0.2, 0.2, 600, 70, 0.88, 0.9, 0.9),
  player_moveset(0.15, 0.2, 0.2, 600, 100, 0.88, 0.9, 0.9), //
  [0.3, 0.3, 0.3, 0, 10],
  player_moveset(0.15, 0.2, 0.2, 600, 20, 0.88, 0.9, 0.9),
  player_moveset(0.15, 0.2, 0.2, 600, 80, 0.88, 0.9, 0.9),
]);
export const weapon__bigmolot__default__doHit = ia_molot__doHit([
  player_moveset(0.4, 0.35, 0.3, 600, 10, 0.88, 0.9, 0.9),
  player_moveset(0.4, 0.35, 0.3, 600, 100, 0.88, 0.9, 0.9), //
  [0.6, 0.3, 0.3, 0, 10],
  player_moveset(0.4, 0.35, 0.3, 600, 20, 0.88, 0.9, 0.9),
  player_moveset(0.4, 0.35, 0.3, 600, 80, 0.88, 0.9, 0.9),
]);
export const weapon__dubina__default__doHit = ia_dubina__doHit([
  player_moveset(0.3, 0.3, 0.2, 600, 70, 0.88, 0.9, 0.9),
  player_moveset(0.3, 0.3, 0.2, 600, 100, 0.88, 0.9, 0.9), //
  [0.3, 0.3, 0.3, 0, 15],
  player_moveset(0.3, 0.3, 0.2, 600, 20, 0.88, 0.9, 0.9),
  player_moveset(0.3, 0.3, 0.2, 600, 80, 0.88, 0.9, 0.9),
]);
export const weapon__bigdubina__default__doHit = ia_dubina__doHit([
  player_moveset(0.5, 0.6, 0.5, 800, 10, 0.88, 0.9, 0.9),
  player_moveset(0.5, 0.6, 0.5, 800, 100, 0.88, 0.9, 0.9), //
  [0.7, 0.3, 0.3, 0, 15],
  player_moveset(0.5, 0.6, 0.5, 800, 20, 0.88, 0.9, 0.9),
  player_moveset(0.5, 0.6, 0.5, 800, 80, 0.88, 0.9, 0.9),
]);
export const weapon__kinjal__default__doHit = ia_sword__doHit([
  player_moveset(0.1, 0.15, 0.1, 700, 30, 0.8, 1, 0.9),
  player_moveset(0.1, 0.15, 0.1, 700, 10, 0.8, 1, 1),
  player_moveset(0.1, 0.15, 0.1, 700, 60, 0.8, 1, 1.1), //
  [0.2, 0.3, 0.3, 0, 10],
  player_moveset(0.1, 0.15, 0.1, 700, 10, 0.8, 1, 0.9),
  player_moveset(0.1, 0.15, 0.1, 700, 10, 0.8, 1, 1),
  player_moveset(0.1, 0.15, 0.1, 700, 40, 0.8, 1, 1.1),
]);
export const weapon__luk__default__doHit = ia_luk__doHit();