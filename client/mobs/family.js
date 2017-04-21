export const mobs__hands__family = {
  rightHand: {
    update() {
      this.view.x = this.pos.x + this.parent.moveShift + 1;
      this.view.y = this.pos.y - this.parent.moveShift * 2 + 2;
      this.view.angle = this.angle + 50;

      this.group.angle = this.sideAngle;
    },
    onStun() {
      let time = this.parent.stunDelay || 0;

      const step1 = 0.2;
      this.parent.step(time, () => {
        this.stage(step1, easing.easeOutCubic, {
          angle: 120,
          vAngle: 0,
          hAngle: 0,
          sideAngle: -30,
        });
      });
      time += step1;

      let step2FN, step3FN;
      step2FN = () => {
        const step2 = 1;
        this.stage(step2, easing.easeInOutCubic, {
          angle: 80,
          sideAngle: -50,
        });
        this.parent.step(step2, step3FN);
      };
      step3FN = () => {
        const step3 = 1;
        this.stage(step3, easing.easeInOutCubic, {
          angle: 60,
          sideAngle: -30,
        });
        this.parent.step(step3, step2FN);
      };
      this.parent.step(time, step2FN);
    },
  },
  leftHand: {
    update() {
      this.view.x = this.pos.x + this.parent.moveShift + 1;
      this.view.y = this.pos.y - this.parent.moveShift * 2 + 2;
      this.view.angle = this.angle + 130;

      this.group.angle = this.sideAngle;
    },
    onStun() {
      let time = this.parent.stunDelay || 0;

      const step1 = 0.2;
      this.parent.step(time, () => {
        this.stage(step1, easing.easeOutCubic, {
          angle: -120,
          sideAngle: 30,
        });
      });
      time += step1;

      let step2FN, step3FN;
      step2FN = () => {
        const step2 = 1;
        this.stage(step2, easing.easeInOutCubic, {
          angle: -80,
          sideAngle: 50,
        });
        this.parent.step(step2, step3FN);
      };
      step3FN = () => {
        const step3 = 1;
        this.stage(step3, easing.easeInOutCubic, {
          angle: -60,
          sideAngle: 30,
        });
        this.parent.step(step3, step2FN);
      };
      this.parent.step(time, step2FN);
    },
  },
};
export const mobs__weapon__family = {
  rightHand: {
    update() {
      this.view.x = this.pos.x + this.parent.moveShift + 1;
      this.view.y = this.pos.y - this.parent.moveShift * 2 + 2;
      this.view.angle = this.angle + 90;

      this.group.angle = this.sideAngle;
    },
    onStun() {
      let time = this.parent.stunDelay || 0;

      const step1 = 0.2;
      this.parent.step(time, () => {
        this.stage(step1, easing.easeOutCubic, {
          pos: {
            x: -40,
            y: 40,
          },
          vAngle: 0,
          hAngle: 0,
          angle: 140,
          sideAngle: -30,
        });
      });
      time += step1;

      let step2FN, step3FN;
      step2FN = () => {
        const step2 = 1;
        this.stage(step2, easing.easeInOutCubic, {
          pos: {
            x: -40,
            y: 40,
          },
          angle: 120,
          sideAngle: -50,
        });
        this.parent.step(step2, step3FN);
      };
      step3FN = () => {
        const step3 = 1;
        this.stage(step3, easing.easeInOutCubic, {
          pos: {
            x: -40,
            y: 40,
          },
          angle: 120,
          sideAngle: -30,
        });
        this.parent.step(step3, step2FN);
      };
      this.parent.step(time, step2FN);
    },
  },
  leftHand: {
    update() {
      this.view.x = this.pos.x + this.parent.moveShift + 1;
      this.view.y = this.pos.y - this.parent.moveShift * 2 + 2;
      this.view.angle = this.angle + 90;
    },
    onStun() {
      let time = this.parent.stunDelay || 0;

      const step1 = 0.2;
      this.parent.step(time, () => {
        this.stage(step1, easing.easeOutCubic, {
          pos: {
            x: -45,
            y: -30,
          },
          angle: -120,
          sideAngle: -30,
        });
      });
      time += step1;

      let step2FN, step3FN;
      step2FN = () => {
        const step2 = 1;
        this.stage(step2, easing.easeInOutCubic, {
          pos: {
            x: -45,
            y: -30,
          },
          angle: -80,
          sideAngle: -50,
        });
        this.parent.step(step2, step3FN);
      };
      step3FN = () => {
        const step3 = 1;
        this.stage(step3, easing.easeInOutCubic, {
          pos: {
            x: -45,
            y: -30,
          },
          angle: -120,
          sideAngle: -30,
        });
        this.parent.step(step3, step2FN);
      };
      this.parent.step(time, step2FN);
    },
  },
};