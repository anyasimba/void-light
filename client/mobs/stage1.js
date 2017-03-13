export const stage1__mob1 = {
  VIEW: 'stage1__mob1',
  TINT: 0x449999,
  CAN_MIRROR_VIEW: true,
  BACK_VIEW: 'stage1__mob1--back',
  HIT_VIEW: 'stage1__mob1--hit',
  DEAD_VIEW: 'stage1__mob1--dead',
  LEFT_FOOT_VIEW: 'stage1__mob1--foot',
  RIGHT_FOOT_VIEW: 'stage1__mob1--foot',
  CAN_MIRROR_FOOTS: true,
  LEFT_HAND: 'stage1__mob1--hand',
  RIGHT_HAND: 'stage1__mob1--hand',
  CAN_MIRROR_HANDS: true,

  H: 0.5,

  LIGHT: 0x449999,
  LIGHT_I: 1,
  LIGHT_A: 1,
  LIGHT_SCALE: 6,
}

export const weapon__stage1__mob1__rightHand__default = new class {
  createView(isHost, kind) {
    const image = new Phaser.Image(game, 0, 0, 'stage1__mob1--hand');
    image.scale.x = 1;
    image.scale.y = 1;
    image.anchor.x = 0.2;
    image.anchor.y = 0.8;
    image.smoothed = true;
    image.tint = 0x449999;
    image.isHSL = true;
    return image;
  }
  update() {
    this.view.x = this.pos.x + this.parent.moveShift + 1;
    this.view.y = this.pos.y - this.parent.moveShift * 2 + 2;
    this.view.angle = this.angle + 90;

    this.group.angle = this.sideAngle;
  }
  onStun() {
    let time = 0;

    const step1 = 0.2;
    this.parent.step(time, () => {
      this.stage(step1, easing.easeOutCubic, {
        pos: {
          x: -40,
          y: 40,
        },
        angle: 60,
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
        angle: 80,
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
        angle: 60,
        sideAngle: -30,
      });
      this.parent.step(step3, step2FN);
    };
    this.parent.step(time, step2FN);
  }
}
export const weapon__stage1__mob1__leftHand__default = new class {
  createView(isHost, kind) {
    const image = new Phaser.Image(game, 0, 0, 'stage1__mob1--hand');
    image.scale.x = -1;
    image.scale.y = 1;
    image.anchor.x = 0.2;
    image.anchor.y = 0.8;
    image.smoothed = true;
    image.tint = 0x449999;
    image.isHSL = true;
    return image;
  }
  update() {
    this.view.x = this.pos.x + this.parent.moveShift + 1;
    this.view.y = this.pos.y - this.parent.moveShift * 2 + 2;
    this.view.angle = this.angle + 90;

    this.group.angle = this.sideAngle;
  }
  onStun() {
    let time = 0;

    const step1 = 0.2;
    this.parent.step(time, () => {
      this.stage(step1, easing.easeOutCubic, {
        pos: {
          x: -40,
          y: -40,
        },
        angle: -60,
        sideAngle: 30,
      });
    });
    time += step1;

    let step2FN, step3FN;
    step2FN = () => {
      const step2 = 1;
      this.stage(step2, easing.easeInOutCubic, {
        pos: {
          x: -40,
          y: -40,
        },
        angle: -80,
        sideAngle: 50,
      });
      this.parent.step(step2, step3FN);
    };
    step3FN = () => {
      const step3 = 1;
      this.stage(step3, easing.easeInOutCubic, {
        pos: {
          x: -40,
          y: -40,
        },
        angle: -60,
        sideAngle: 30,
      });
      this.parent.step(step3, step2FN);
    };
    this.parent.step(time, step2FN);
  }
}

//
export const stage1__mob2 = {
  VIEW: 'player',
  SCALE: 0.2,
  TINT: 0x995511,
  CAN_MIRROR_VIEW: true,
  BACK_VIEW: 'player-back',
  DEAD_VIEW: 'player-back',

  LIGHT: 0x995511,
  LIGHT_I: 2,
  LIGHT_A: 1,
  LIGHT_SCALE: 5,
}

export const weapon__stage1__mob2__rightHand__default = new class {
  createView(isHost, kind) {
    const image = new Phaser.Image(game, 0, 0, 'sword');
    image.scale.x = 1;
    image.scale.y = 1.3;
    image.anchor.x = 0.5;
    image.anchor.y = 0.8;
    image.smoothed = true;
    image.tint = 0x992200;
    return image;
  }
  update() {
    this.view.x = this.pos.x + this.parent.moveShift + 1;
    this.view.y = this.pos.y - this.parent.moveShift * 2 + 2;
    this.view.angle = this.angle + 90;

    this.group.angle = this.sideAngle;
  }
  onStun() {
    let time = 0;

    const step1 = 0.2;
    this.parent.step(time, () => {
      this.stage(step1, easing.easeOutCubic, {
        pos: {
          x: -40,
          y: 40,
        },
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
        sideAngle: -50,
      });
      this.parent.step(step3, step2FN);
    };
    this.parent.step(time, step2FN);
  }
}

//
export const stage1__boss1 = {
  VIEW: 'player',
  SCALE: 0.2,
  TINT: 0xFF8800,
  CAN_MIRROR_VIEW: true,
  BACK_VIEW: 'player-back',
  DEAD_VIEW: 'player-back',

  LIGHT: 0xFF8800,
  LIGHT_I: 3,
  LIGHT_A: 1,
  LIGHT_SCALE: 16,
}

export const weapon__stage1__boss1__rightHand__default = new class {
  createView(isHost, kind) {
    const image = new Phaser.Image(game, 0, 0, 'sword');
    image.scale.x = 1;
    image.scale.y = 1.3;
    image.anchor.x = 0.5;
    image.anchor.y = 0.8;
    image.smoothed = true;
    image.tint = 0x331100;
    return image;
  }
  update() {
    this.view.x = this.pos.x + this.parent.moveShift + 1;
    this.view.y = this.pos.y - this.parent.moveShift * 2 + 2;
    this.view.angle = this.angle + 90;

    this.group.angle = this.sideAngle;
  }
  onStun() {
    let time = 0;

    const step1 = 0.2;
    this.parent.step(time, () => {
      this.stage(step1, easing.easeOutCubic, {
        pos: {
          x: -40,
          y: 40,
        },
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
        sideAngle: -50,
      });
      this.parent.step(step3, step2FN);
    };
    this.parent.step(time, step2FN);
  }
}