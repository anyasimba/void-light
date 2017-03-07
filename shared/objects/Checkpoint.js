export class Checkpoint {
  static get classID() {
    return 'Checkpoint';
  }

  get CELL_SIZE_W() {
    return this.size.x;
  }
  get CELL_SIZE_H() {
    return this.size.y;
  }

  constructor() {
    this.type = 'Checkpoint';
  }
}