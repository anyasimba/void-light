export class Sword {
  static get classID() {
    return 'Sword';
  }

  static get BODY_SIZE() {
    return 10;
  }

  update() {
    if (this.doHit) {
      this.angle += 20;
      delete this.doHit;
    }
  }

  onHit() {
    this.doHit = true;
  }
}