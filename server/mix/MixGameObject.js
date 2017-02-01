preMain(async() => {
  MixGameObject.createID = function () {
    this.__lastID = this.__lastID || 0;
    ++this.__lastID;
    return this.__lastID;
  }
})

const MixGameObjectBase = global.MixGameObject;
export const MixGameObject = base => class extends mix(base, MixGameObjectBase) {
  constructor(state, ...args) {
    super(MixGameObject.createID(), state, ...args);

    const message = {
      class: this.constructor.classID,
    };
    if (this.parent) {
      message.parentID = this.parent.id;
    }
    this.emitAll('new', Object.assign(message, this.state));
  }
  destructor() {
    super.destructor();

    this.emitAll('delete', {});
  }

  get players() {
    return Player.list;
  }
  get objects() {
    return gameObjects;
  }

  emitAll(eventType, eventData) {
    eventData.id = this.id;
    if (this.parent) {
      eventData.parentID = this.parent.id;
    }
    const players = this.players;
    for (const player of players) {
      player.emit(eventType, eventData);
    }
  }
}