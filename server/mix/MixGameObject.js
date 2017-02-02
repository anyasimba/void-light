preMain(async() => {
  MixGameObject.createID = function () {
    this.__lastID = this.__lastID || 0;
    ++this.__lastID;
    return this.__lastID;
  }
})

const MixGameObjectBase = global.MixGameObject;
export const MixGameObject = base => class extends mix(base, MixGameObjectBase) {
  get clients() {
    if (this.gameLevelZone) {
      return this.gameLevelZone.clients;
    }
    if (this.parent) {
      return this.parent.clients;
    }
  }
  get objects() {
    if (this.gameLevelZone) {
      return this.gameLevelZone.objects;
    }
    if (this.parent) {
      return this.parent.objects;
    }
  }

  constructor(state, ...args) {
    super(MixGameObject.createID(), state, ...args);

    if (this.clients) {
      for (const client of this.clients) {
        this.emitTo(client);
      }
    }
  }
  destructor() {
    if (this.gameLevelZone) {
      this.gameLevelZone.removeObject(this);
    }

    super.destructor();
  }

  emitTo(client) {
    client.emit('new', Object.assign({
      class: this.constructor.classID,
      id: this.id,
    }, this.state));

    if (this.childrenCount > 0) {
      for (const id in this.children) {
        const child = this.children[id];
        client.emit('new', Object.assign({
          class: child.constructor.classID,
          id: child.id,
          parentID: this.id,
        }, child.state));
      }
    }
  }

  emitAll(eventType, eventData) {
    eventData.id = this.id;
    if (this.parent) {
      eventData.parentID = this.parent.id;
    }
    const clients = this.clients;
    for (const i in clients) {
      const client = clients[i];
      client.emit(eventType, eventData);
    }
  }
}