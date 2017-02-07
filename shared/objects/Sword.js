export class Sword {
  static get classID() {
    return 'Sword';
  }

  static get BODY_SIZE() {
    return 3;
  }

  onCreate() {
    this.parent.sword = this;
  }

  doHit() {
    run(async() => {
      let start = this.pos.clone();
      await this.animate('pos', {
        end: start.add({
          x: -20,
          y: 20,
        }),
        duration: 0.3,
        fn: easing.easeInQuad,
      });
      await this.sleep(0.2);
      await this.animate('pos', {
        end: start,
        duration: 0.2,
        fn: easing.easeInOutQuad,
      });
    });
    run(async() => {
      const start = this.angle;
      await this.animate('angle', {
        end: start + 120,
        duration: 0.3,
        fn: easing.easeInQuad,
      });
      await this.sleep(0.2);
      await this.animate('angle', {
        end: start,
        duration: 0.2,
        fn: easing.easeInOutQuad,
      });
    });
    run(async() => {
      const start = this.sideAngle;
      await this.animate('sideAngle', {
        end: start - 50,
        duration: 0.3,
        fn: easing.easeInQuad,
      });
      await this.animate('sideAngle', {
        end: start - 200,
        duration: 0.1,
        fn: easing.easeOutQuad,
      });
      await this.sleep(0.1);
      await this.animate('sideAngle', {
        end: start,
        duration: 0.2,
        fn: easing.easeInOutQuad,
      });
    });
  }
}