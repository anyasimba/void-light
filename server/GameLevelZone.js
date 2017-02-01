export class GameLevelZone {
  static get CELL_SIZE() {
    return 64;
  }

  constructor(opts) {
    this.w = opts.w;
    this.h = opts.h;

    this.cells = [];

    this.players = [];
  }
}