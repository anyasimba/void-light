export class Sword extends mix(global.Sword, MixGameObject) {
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

  onHit() {
    super.onHit();

    this.emitAll('hit', {});
  }
}