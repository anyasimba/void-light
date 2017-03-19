export let objectsNum = 0;

const MixGameObjectBase = global.MixGameObject;
export const MixGameObject = base => class extends mix(base, MixGameObjectBase) {
  constructor(data, state, ...args) {
    ++global.objectsNum;

    if (data.parentID) {
      state.parent = gameObjects[data.parentID];
    }
    state.bottomGroup = new Phaser.Group(game);
    state.middleGroup = new Phaser.Group(game);
    state.topGroup = new Phaser.Group(game);
    state.infoGroup = new Phaser.Group(game);
    state.group = new Phaser.Group(game);

    super(data.id, state, ...args);

    if (data.parentID) {
      this.group.add(this.bottomGroup);
      this.group.add(this.middleGroup);
      this.group.add(this.topGroup);
      this.parent.middleGroup.add(this.group);
      this.parent.infoGroup.add(this.infoGroup);
    } else {
      this.group.update = () => {
        this.update();

        const groups = [
          this.bottomGroup,
          this.middleGroup,
          this.topGroup,
        ];
        for (const k in groups) {
          const g = groups[k];
          g.x = this.group.x;
          g.y = this.group.y;
          g.scale.x = this.group.scale.x;
          g.scale.y = this.group.scale.y;
          g.angle = this.group.angle;
        }
        this.infoGroup.x = this.group.x;
        this.infoGroup.y = this.group.y;
      }

      game.layer.sub.bottom.add(this.bottomGroup);
      game.layer.sub.middle.add(this.middleGroup);
      game.layer.sub.top.add(this.topGroup);
      game.layer.sub.info.add(this.group);
      game.layer.sub.info.add(this.infoGroup);
    }
  }
  update() {
    if (super.update) {
      super.update();
    }
    if (!this.parent && global.client && global.client.player) {
      global.ts = global.ts || 0;
      const cx = this.group.x;
      const cy = this.group.y;
      const dx = Math.abs(cx - client.player.pos.x);
      const dy = Math.abs(cy - client.player.pos.y);
      if (dx < game.w * 0.5 + 800 && dy < game.h * 0.5 + 800) {
        this.visible = true;
        this.bottomGroup.visible = true;
        this.middleGroup.visible = true;
        this.topGroup.visible = true;
        this.infoGroup.visible = true;
      } else {
        this.visible = false;
        this.bottomGroup.visible = false;
        this.middleGroup.visible = false;
        this.topGroup.visible = false;
        this.infoGroup.visible = false;
      }
    }
  }
  destructor() {
    --global.objectsNum;

    super.destructor();

    if (this.smoothDestroy) {
      const group = new Phaser.Group(game);
      group.x = this.parent.middleGroup.x;
      group.y = this.parent.middleGroup.y;
      group.scale.x = this.parent.middleGroup.scale.x;
      group.scale.y = this.parent.middleGroup.scale.y;
      group.angle = this.parent.middleGroup.angle;

      group.add(this.group);
      game.layer.sub.middle.add(group);

      let a = 1;
      const interval = setInterval(() => {
        a -= 0.33 / 30.0;
        if (a <= 0) {
          clearInterval(interval);
          group.destroy();
          this.bottomGroup.destroy();
          this.middleGroup.destroy();
          this.topGroup.destroy();
          this.group.destroy();
          this.infoGroup.destroy();
        } else {
          group.alpha = a;
        }
      }, 1000.0 / 30.0);
      return;
    }

    this.bottomGroup.destroy();
    this.middleGroup.destroy();
    this.topGroup.destroy();
    this.group.destroy();
    this.infoGroup.destroy();
  }

  playSound(name) {
    const sound = game.add.sound(name);
    sound.volume = this.soundVolume();
    sound.play();
    return sound;
  }
  soundVolume() {
    if (game.cameraPos) {
      const d = this.pos.subtract(game.cameraPos).length();
      return 100000 / (100000 + d * d);
    }
    return 0;
  }
}