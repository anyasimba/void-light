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
    };
  }

  stage(duration, fn, opts) {
  }
}

export function ItemSword(parent) {
  return new global.Item({
    parent: parent,
    type: 'weapon',
    kind: 'sword',
    hand: 1,
    scale_f: 0.6,
    scale_d: 0,
    damage: 10,
    balance: 4,
    stamina: 6,
    staminaTime: 0.5,
    pos: {
      x: -25,
      y: 25,
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
    bodyScale: 2,
    scale_f: 0.8,
    scale_d: 0,
    damage: 16,
    balance: 10,
    stamina: 12,
    staminaTime: 1,
    pos: {
      x: -40,
      y: 40,
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
    scale_d: 0.4,
    damage: 12,
    balance: 4,
    stamina: 3,
    staminaTime: 0.4,
    pos: {
      x: -25,
      y: 25,
    },
    angle: 15,
    vAngle: 30,
    hAngle: 30,
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