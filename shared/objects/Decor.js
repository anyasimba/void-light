export class Decor {
  static get classID() {
    return 'Decor';
  }

  get CELL_SIZE_W() {
    return 400;
  }
  get CELL_SIZE_H() {
    return 400;
  }

  constructor() {
    this.type = 'Decor';
  }
}