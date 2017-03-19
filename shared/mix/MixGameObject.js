export const gameObjects = {};
export let gameObjectsCount = 0;

export const MixGameObject = base => class extends base {
  constructor(id, state, ...args) {
    super(...args);

    this.id = id;

    if (this.preCreate) {
      this.preCreate(state);
    }

    for (const k in state) {
      this[k] = state[k];
    }

    this.children = [];
    this.childrenCount = 0;

    if (this.parent) {
      this.parent.children.push(this);
    } else {
      gameObjects[id] = this;
      ++gameObjectsCount;
    }

    if (this.onCreate) {
      this.onCreate();
    }
  }
  destructor() {
    for (let i = 0; i < this.children.length; ++i) {
      this.children[i].destructor();
      --i;
    }
    this.children.length = 0;

    if (super.destructor) {
      super.destructor();
    }
    if (this.parent) {
      this.parent.children.splice(this.parent.children.indexOf(this), 1);
    } else {
      delete gameObjects[this.id];
      --gameObjectsCount;
    }

    this.isDestroyed = true;
  }

  update() {
    for (let i = 0; i < this.children.length; ++i) {
      this.children[i].update();
    }

    if (super.update) {
      super.update();
    }
  }
}