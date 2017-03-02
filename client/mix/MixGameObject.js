const MixGameObjectBase = global.MixGameObject;
export const MixGameObject = base => class extends mix(base, MixGameObjectBase) {
  constructor(data, state, ...args) {
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
          g.setAll('tint', this.group.tint);
        }
        this.infoGroup.x = this.group.x;
        this.infoGroup.y = this.group.y;
      }

      game.bottom.add(this.bottomGroup);
      game.middle.add(this.middleGroup);
      game.top.add(this.topGroup);
      game.info.add(this.infoGroup);
    }
  }
  update() {
    if (super.update) {
      super.update();
    }
    if (!this.parent && global.client && global.client.player) {
      const ts = WALL_SIZE * 20;
      const cx = this.group.x;
      const cy = this.group.y;
      const dx = Math.abs(cx - client.player.pos.x);
      const dy = Math.abs(cy - client.player.pos.y);
      if (dx < ts * 2 && dy < ts) {
        this.bottomGroup.visible = true;
        this.middleGroup.visible = true;
        this.topGroup.visible = true;
      } else {
        this.bottomGroup.visible = false;
        this.middleGroup.visible = false;
        this.topGroup.visible = false;
      }
    }
  }
  destructor() {
    super.destructor();

    if (this.parent) {
      this.parent.middleGroup.remove(this.group);
      this.parent.infoGroup.remove(this.infoGroup);
    } else {
      game.bottom.remove(this.bottomGroup);
      game.middle.remove(this.middleGroup);
      game.top.remove(this.topGroup);
      game.info.remove(this.infoGroup);
    }
  }
}