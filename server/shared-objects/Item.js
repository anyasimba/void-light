export class Item extends mix(global.Item, MixGameObject) {
  get state() {
    return {
      type: this.type,
      kind: this.kind,
      name: this.name,

      hand: this.hand,

      pos: this.pos,
      angle: this.angle,
      sideAngle: this.sideAngle,
    };
  }
}

export function ItemSword(parent) {
  return new global.Item({
    parent: parent,
    type: 'weapon',
    kind: 'sword',
    damage: 40,
    balance: 5,
    hand: 1,
    pos: {
      x: -25,
      y: 25,
    },
    angle: 15,
    doHit: weapon__sword__default__doHit,
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
  });
}