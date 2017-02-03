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
    if (this.canNextHit) {
      this.needNextHit = opts;
    }
    if (this.inHit) {
      return;
    }
    this.inHit = true;

    this.tasks.push(async() => {
      (async() => {
        const start = this.angle;
        await this.animate('angle', {
          end: start + 70,
          duration: 0.3,
          fn: easing.easeInQuad,
        });
        await this.animate('angle', {
          end: start + 100,
          duration: 0.1,
          fn: easing.easeOutQuad,
        });
        await sleep(100);
        await this.animate('angle', {
          end: start,
          duration: 0.2,
          fn: easing.easeInOutQuad,
        });
      })();
      (async() => {
        const start = this.sideAngle;
        await this.animate('sideAngle', {
          end: start,
          duration: 0.3,
          fn: easing.easeInQuad,
        });
        await this.animate('sideAngle', {
          end: start - 200,
          duration: 0.1,
          fn: easing.easeOutQuad,
        });
        await sleep(100);
        await this.animate('sideAngle', {
          end: start,
          duration: 0.2,
          fn: easing.easeInOutQuad,
        });
      })();
      await sleep(350);
      this.canNextHit = true;
      await sleep(400);
      delete this.canNextHit;
      delete this.inHit;

      if (this.needNextHit) {
        const opts = this.needNextHit;
        delete this.needNextHit;
        this.onHit(opts);
      }
    });
  }
}