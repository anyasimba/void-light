export class Sword extends mix(global.Sword, MixGameObject) {
  constructor(player, data) {
    super(Object.assign({
      parent: player,
    }, data));
  }

  get state() {
    return {
      pos: this.pos,
      angle: this.angle,
    };
  }
}