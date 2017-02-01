export const gameObjects = {};
export let gameObjectsCount = 0;

export const MixGameObject = base => class extends base {
  constructor(id, state, ...args) {
    super(...args);

    this.id = id;

    for (const k in state) {
      this[k] = state[k];
    }

    this.children = {};
    this.childrenCount = 0;

    if (this.parent) {
      this.parent.children[id] = this;
      ++this.parent.childrenCount;
    } else {
      gameObjects[id] = this;
      ++gameObjectsCount;
    }
  }
  destructor() {
    for (const k in this.children) {
      const child = this.children[k];
      if (child.destructor) {
        child.destructor();
      }
    }
    if (super.destructor) {
      super.destructor();
    }
    if (this.parent) {
      delete this.parent[this.id];
      --this.parent.childrenCount;
    } else {
      delete gameObjects[this.id];
      --gameObjectsCount;
    }
  }

  update() {
    if (this.pendingDestroy) {
      return this.destructor();
    }

    for (const id in this.children) {
      const child = this.children[id];
      child.update();
    }

    if (super.update) {
      super.update();
    }
  }
}