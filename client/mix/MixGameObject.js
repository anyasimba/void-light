const MixGameObjectBase = global.MixGameObject;
export const MixGameObject = base => class extends mix(base, MixGameObjectBase) {
  constructor(data, state, ...args) {
    if (data.parentID) {
      state.parent = gameObjects[data.parentID];
    }
    state.bottomGroup = new Phaser.Group(game);
    state.middleGroup = new Phaser.Group(game);
    state.topGroup = new Phaser.Group(game);
    state.group = new Phaser.Group(game);

    super(data.id, state, ...args);

    this.group.add(this.bottomGroup);
    this.group.add(this.middleGroup);
    this.group.add(this.topGroup);

    if (data.parentID) {
      this.parent.middleGroup.add(this.group);
    } else {
      this.group.update = () => {
        this.update();
      }

      game.level.add(this.group);
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
        this.group.visible = true;
      } else {
        this.group.visible = false;
      }
    }
  }
  destructor() {
    super.destructor();

    if (this.parent) {
      this.parent.group.remove(this);
    } else {
      game.level.remove(this.group);
    }
  }
}