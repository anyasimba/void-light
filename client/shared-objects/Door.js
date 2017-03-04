export class Door extends mix(global.Door, MixGameObject) {
  static createView(isHost, kind, name, size) {

  }

  constructor(data) {
    data.pos = new vec3(data.pos);
    data.size = new vec3(data.size);

    super(data, data);

  }

  update() {}
}