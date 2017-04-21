export const signsMap = {};

export class ItemOnMap extends mix(global.ItemOnMap,
  MixNativeGameObject,
  MixGameObject) {


  get clients() {
    if (this.gameLevelZone) {
      if (this.slug !== 'green-sign' &&
        this.slug !== 'red-sign' &&
        this.slug !== 'blue-sign') {
        return this.gameLevelZone.clients;
      }

      const list = [];
      const mapName = this.gameLevelZone.mapName;
      for (let i = 0; i < gameZonesMap[mapName].length; ++i) {
        const zone = gameZonesMap[mapName][i];
        for (let j = 0; j < zone.clients.length; ++j) {
          list.push(zone.clients[j]);
        }
      }
      return list;
    }
  }

  get state() {
    return {
      pos: this.pos.clone(),
      z: this.z,
      slug: this.slug,
    };
  }

  preCreate(opts) {
    if (!opts.isSign) {
      this.body = {
        kind: 'staticRect',
        w: 16,
        h: 16,
      }
    }
    this.native = native.new__ItemOnMap(this, opts);
  }
  constructor(gameLevelZone, opts) {
    super({
      isStatic: true,

      opts: opts,

      slug: opts.slug,
      isSign: opts.isSign,
      target: opts.target,

      pos: new vec3(opts.mapX, opts.mapY),
      z: opts.z,
      count: opts.count,
    });

    this.gameLevelZone = gameLevelZone;
    if (opts.isSign) {
      const mapName = this.gameLevelZone.mapName;
      signsMap[mapName] = signsMap[mapName] || [];
      signsMap[mapName].push(this);
    }
    gameLevelZone.addObject(this);
  }

  destructor() {
    if (this.gameLevelZone) {
      const mapName = this.gameLevelZone.mapName;
      signsMap[mapName].splice(
        signsMap[mapName].indexOf(this), 1);
    }

    super.destructor();
  }

  checkNear(player) {
    const dx = Math.abs(this.pos.x - player.pos.x);
    const dy = Math.abs(this.pos.y - player.pos.y);
    const dw = WALL_SIZE * 0.45;
    const dh = WALL_SIZE * 0.45;
    if (dx < dw && dy < dh &&
      Math.abs(this.z + 20.0 - player.z) <= 20.0) {

      player.canItem = this;
    }
  }
}