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