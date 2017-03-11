export class ItemOnMap {
  static get classID() {
    return 'ItemOnMap';
  }

  get CELL_SIZE_W() {
    return WALL_SIZE;
  }
  get CELL_SIZE_H() {
    return WALL_SIZE;
  }

  constructor() {
    this.type = 'ItemOnMap';
  }
}