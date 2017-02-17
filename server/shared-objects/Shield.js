export class Shield extends mix(global.Shield, MixGameObject) {
  get state() {
    return {
      pos: this.pos,
      angle: this.angle,
      sideAngle: this.sideAngle,
    };
  }

  constructor(...args) {
    super(...args);

    this.sideAngle = 0;
  }
}