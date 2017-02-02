export class Sword {
  static get classID() {
    return 'Sword';
  }

  static get BODY_SIZE() {
    return 10;
  }

  update() {

  }

  onHit(opts) {
    this.tasks.push(async() => {
      const start = this.angle;
      this.animations['angle'] = {
        end: 200,
        fn: t => t,
      };
      await this.waitAnimation('angle');
      this.animations['angle'] = {
        end: start,
        fn: t => t,
      };
    });
  }
}