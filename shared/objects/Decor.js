export class Decor {
  static get classID() {
    return 'Decor';
  }

  get CELL_SIZE_W() {
    return 1;
  }
  get CELL_SIZE_H() {
    return 1;
  }

  constructor() {
    this.type = 'Decor';
  }
}