export class Shield {
  static get classID() {
    return 'Shield';
  }

  static get BODY_SIZE() {
    return 3;
  }

  onCreate() {
    this.parent.shield = this;
  }

  doBeginBlock() {

  }
  doEndBlock() {

  }
}