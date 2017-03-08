export class Checkpoint {
  static get classID() {
    return 'Checkpoint';
  }

  get CELL_SIZE_W() {
    return this.size;
  }
  get CELL_SIZE_H() {
    return this.size;
  }

  constructor() {
    this.type = 'Checkpoint';
  }
}