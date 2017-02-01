const MixGameObjectBase = global.MixGameObject;
export const MixGameObject = base => class extends mix(base, MixGameObjectBase) {
  constructor(data, state, ...args) {
    if (data.parentID) {
      state.parent = gameObjects[data.parentID];
    }
    state.group = new Phaser.Group(game);

    super(data.id, state, ...args);


    if (data.parentID) {
      this.parent.group.add(this.group);
    } else {
      this.group.update = () => {
        this.update();
      }

      game.scene.add(this.group);
    }
  }
  destructor() {
    super.destructor();

    if (this.parent) {
      this.parent.group.remove(this);
    } else {
      game.scene.remove(this.group);
    }
  }
}