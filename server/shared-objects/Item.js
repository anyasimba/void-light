export class Item extends mix(global.Item, MixGameObject) {
  get state() {
    return {
      type: this.type,
      kind: this.kind,
      name: this.name,

      hand: this.hand,

      pos: this.pos.clone(),
      angle: this.angle,
      vAngle: this.vAngle,
      hAngle: this.hAngle,
      sideAngle: this.sideAngle,

      bodyScale: this.bodyScale || 1.0,
    };
  }

  stage(duration, fn, opts) {}
}

export function ItemSword(parent) {
  return new global.Item({
    parent: parent,
    type: 'weapon',
    kind: 'sword',
    hand: 1,
    scale_f: 0.5,
    scale_d: 0,
    damage: 10,
    balance: 4,
    stamina: 6,
    staminaTime: 0.5,
    pos: {
      x: -10,
      y: 40,
    },
    angle: 15,
    vAngle: 20,
    hAngle: 20,
  });
}
export function ItemBigSword(parent) {
  return new global.Item({
    parent: parent,
    type: 'weapon',
    kind: 'bigsword',
    hand: 1,
    bodyScale: 2.5,
    scale_f: 0.8,
    scale_d: 0,
    damage: 20,
    balance: 10,
    stamina: 12,
    staminaTime: 1,
    pos: {
      x: 10,
      y: 50,
    },
    angle: 15,
    vAngle: 30,
    hAngle: 30,
  });
}
export function ItemAxe(parent) {
  return new global.Item({
    parent: parent,
    type: 'weapon',
    kind: 'axe',
    hand: 1,
    scale_f: 0.5,
    scale_d: 0.5,
    damage: 8,
    balance: 4,
    stamina: 4,
    staminaTime: 0.4,
    pos: {
      x: -10,
      y: 40,
    },
    angle: 15,
    vAngle: 30,
    hAngle: 30,
  });
}
export function ItemBigAxe(parent) {
  return new global.Item({
    parent: parent,
    type: 'weapon',
    kind: 'bigaxe',
    hand: 1,
    bodyScale: 2,
    scale_f: 0.4,
    scale_d: 0.6,
    damage: 16,
    balance: 10,
    stamina: 10,
    staminaTime: 0.6,
    pos: {
      x: -10,
      y: 40,
    },
    angle: 15,
    vAngle: 30,
    hAngle: 30,
  });
}
export function ItemKopie(parent) {
  return new global.Item({
    parent: parent,
    type: 'weapon',
    kind: 'kopie',
    hand: 1,
    bodyScale: 3,
    scale_f: 0,
    scale_d: 0.8,
    damage: 10,
    balance: 6,
    stamina: 6,
    staminaTime: 0.5,
    pos: {
      x: -10,
      y: 40,
    },
    angle: 15,
    vAngle: 30,
    hAngle: 30,
  });
}
export function ItemMolot(parent) {
  return new global.Item({
    parent: parent,
    type: 'weapon',
    kind: 'molot',
    hand: 1,
    bodyScale: 0.8,
    scale_f: 0.6,
    scale_d: 0.0,
    damage: 12,
    balance: 8,
    stamina: 7,
    staminaTime: 0.4,
    pos: {
      x: -10,
      y: 40,
    },
    angle: 15,
    vAngle: 30,
    hAngle: 30,
  });
}
export function ItemBigMolot(parent) {
  return new global.Item({
    parent: parent,
    type: 'weapon',
    kind: 'bigmolot',
    hand: 1,
    bodyScale: 2,
    scale_f: 0.8,
    scale_d: 0.0,
    damage: 24,
    balance: 12,
    stamina: 14,
    staminaTime: 0.8,
    pos: {
      x: -10,
      y: 40,
    },
    angle: 15,
    vAngle: 30,
    hAngle: 30,
  });
}
export function ItemDubina(parent) {
  return new global.Item({
    parent: parent,
    type: 'weapon',
    kind: 'dubina',
    hand: 1,
    bodyScale: 1.5,
    scale_f: 0.5,
    scale_d: 0.0,
    damage: 14,
    balance: 6,
    stamina: 10,
    staminaTime: 0.6,
    pos: {
      x: -10,
      y: 40,
    },
    angle: 15,
    vAngle: 30,
    hAngle: 30,
  });
}
export function ItemBigDubina(parent) {
  return new global.Item({
    parent: parent,
    type: 'weapon',
    kind: 'bigdubina',
    hand: 1,
    bodyScale: 2.5,
    scale_f: 0.9,
    scale_d: 0.0,
    damage: 28,
    balance: 20,
    stamina: 18,
    staminaTime: 1.2,
    pos: {
      x: -10,
      y: 40,
    },
    angle: 15,
    vAngle: 30,
    hAngle: 30,
  });
}
export function ItemKinjal(parent) {
  return new global.Item({
    parent: parent,
    type: 'weapon',
    kind: 'kinjal',
    hand: 1,
    bodyScale: 0.7,
    scale_f: 0,
    scale_d: 0.9,
    damage: 7,
    balance: 3,
    stamina: 2,
    staminaTime: 0.4,
    pos: {
      x: -10,
      y: 40,
    },
    angle: 15,
    vAngle: 20,
    hAngle: 20,
  });
}
export function ItemShield(parent) {
  return new global.Item({
    parent: parent,
    type: 'shield',
    hand: 2,
    pos: {
      x: -15,
      y: -30,
    },
    angle: -35,
    vAngle: 0,
    hAngle: 20,
  });
}