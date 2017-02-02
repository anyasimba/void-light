export class Sword extends mix(global.Sword, MixGameObject) {
  get state() {
    return {
      pos: this.pos,
      angle: this.angle,
    };
  }

  onHit() {
    super.onHit();

    this.emitAll('hit', {});
  }
}