export class Door {
  static get classID() {
    return 'Door';
  }

  get CELL_SIZE_W() {
    return this.size.x;
  }
  get CELL_SIZE_H() {
    return this.size.y;
  }

  constructor() {
    this.type = 'Door';
  }
  update() {
    if (this.isOpening) {
      this.isOpening -= dt;
      if (this.isOpening <= 0) {
        this.isOpening = 0;
      }

      if (this.baseSize.x > this.baseSize.y) {
        this.size.x = this.baseSize.x * this.isOpening / 4;
        this.pos.x = this.basePos.x - (this.baseSize.x - this.size.x) * 0.5;
      } else {
        this.size.y = this.baseSize.y * this.isOpening / 4;
        this.pos.y = this.basePos.y - (this.baseSize.y - this.size.y) * 0.5;
      }

      if (this.isOpening <= 0) {
        delete this.isOpening;
        this.isOpened = true;
      }
    }
    if (this.isClosing) {
      this.isClosing -= dt;

      if (this.isClosing <= 0) {
        this.isClosing = 0;
      }
      if (this.baseSize.x > this.baseSize.y) {
        this.size.x = this.baseSize.x * (1 - this.isClosing / 4);
        this.pos.x = this.basePos.x - (this.baseSize.x - this.size.x) * 0.5;
      } else {
        this.size.y = this.baseSize.y * (1 - this.isClosing / 4);
        this.pos.y = this.basePos.y - (this.baseSize.y - this.size.y) * 0.5;
      }

      if (this.isClosing <= 0) {
        delete this.isClosing;
        delete this.isOpened;
      }
    }
  }
}