export class GameLevelZone {
  static get CELL_SIZE() {
    return WALL_SIZE * 4;
  }

  constructor(mapName, complex) {
    this.clients = [];

    this.objects = [];

    this.playerPoints = [];
    this.enemyPoints = [];

    this.mobs = [];
    this.tempMobs = [];
    this.timeouts = [];

    this.complex = complex;

    this.loadMap(mapName);
  }

  loadMap(mapName) {
    this.mapName = mapName;

    global.mapCache = global.mapCache || {};
    mapCache[mapName] = mapCache[mapName] || {};
    const cache = mapCache[mapName];

    if (!cache.map) {
      cache.map = JSON.parse(fs.readFileSync(
        'maps/' + mapName + '.json',
        'utf8'));
      cache.map.dictionary = loadMapDictionary(cache.map);
    }
    this.map = cache.map;
    this.w = this.map.width * WALL_SIZE;
    this.h = this.map.height * WALL_SIZE;

    if (!cache.grid) {
      cache.grid = new Array(this.map.width);

      const ground = this.map.layers[0];
      for (let y = 0; y < this.map.height; ++y) {
        for (let x = 0; x < this.map.width; ++x) {
          cache.grid[x] = cache.grid[x] || new Array(this.map.height);
          cache.grid[x][y] = 0;

          const i = y * this.map.width + x;
          const v = ground.data[i];
          const slug = this.map.dictionary[v];
          if (v !== 0) {
            switch (slug) {
              default: cache.grid[x][y] = 1;
            }
          }
        }
      }
    }
    this.grid = cache.grid;

    this.native = native.new__GameLevelZone(this, this.grid);

    this.mapObjects = []
    this.bossAreas = [];
    const objects = this.map.layers[1];
    for (const k in objects.objects) {
      const o = objects.objects[k];
      const slug = this.map.dictionary[o.gid] || o.name;
      const x = o.x / 32 * WALL_SIZE + WALL_SIZE * 0.5;
      const y = o.y / 32 * WALL_SIZE + WALL_SIZE * 0.5;
      const data = {
        mapID: o.id,
        mapX: (o.x + o.width * 0.5) / 32 * WALL_SIZE,
        mapY: (o.y + o.height * 0.5) / 32 * WALL_SIZE,
        mapW: o.width / 32 * WALL_SIZE,
        mapH: o.height / 32 * WALL_SIZE,
        x: x,
        y: y,
        slug: slug,
      };
      Object.assign(data, o.properties);

      if (slug && !o.name) {
        data.mapY -= WALL_SIZE;
        switch (slug) {
          case 'born':
            this.playerPoints.push(data);
            break;
          case 'checkpoint':
            this.mapObjects[data.mapID] = new Checkpoint(this, data);
            break;
          default:
            if (slug.slice(0, 6) === 'item__') {
              this.mapObjects[data.mapID] = new ItemOnMap(this, data);
              break;
            }
            if (slug.slice(0, 7) === 'decor__') {
              this.mapObjects[data.mapID] = new Decor(this, data);
              break;
            }
            this.enemyPoints.push(data);
        }
      } else if (o.name) {
        switch (o.name) {
          case 'Door':
            this.mapObjects[data.mapID] = new Door(this, data);
            break;
          case 'BossArea':
            this.bossAreas.push(data);
            break;
          default:
        }
      }
    }

    this.mobs = [];
    for (const k in this.enemyPoints) {
      const p = this.enemyPoints[k];
      Object.assign(p, global[p.slug]);
      const mob = new Mob(this, p);
      this.mapObjects[p.mapID] = mob;
      for (const k in this.bossAreas) {
        const area = this.bossAreas[k];
        if (area.bossID === p.mapID) {
          mob.area = area;
          mob.fighter.area = area;
          area.boss = mob;
        }
      }
      this.mobs.push(mob);
    }
  }

  addObject(object) {
    object.gameLevelZone = this;

    if (object.native) {
      native.GameLevelZone__addObject(this.native, object.native);
    }
    for (let i = 0; i < this.clients.length; ++i) {
      object.emitTo(this.clients[i])
    }

    this.objects.push(object);
  }
  removeObject(object) {
    for (let i = 0; i < this.objects.length; ++i) {
      const other = this.objects[i];
      if (other === object) {
        this.objects.splice(i, 1);
        break;
      }
    }

    object.emitAll('delete', {});

    delete object.canItem;
    delete object.canOpenDoor;
    delete object.canTalk;
    delete object.talking;
    delete object.canCheckpoint;

    delete object.gameLevelZone;

    if (object.native) {
      native.GameLevelZone__removeObject(this.native, object.native);
    }
  }

  restart() {
    let i = 0;
    while (i < this.timeouts.length) {
      const timeout = this.timeouts[i];
      if (timeout.breakable) {
        this.timeouts.splice(i, 1);
      } else {
        ++i;
      }
    }

    for (const k in this.clients) {
      const client = this.clients[k];
      client.player.reborn();
    }
    if (this.restartFull) {
      delete this.restartFull;
      for (const k in this.clients) {
        const client = this.clients[k];
        this.rebornPlayer(client.player);
        client.emit('restart', {});
      }
    } else {
      for (const k in this.clients) {
        const client = this.clients[k];
        client.emit('softRestart', {});
      }
    }
    for (const k in this.clients) {
      const client = this.clients[k];
      client.player.emitParams();
      client.player.emitPos();
      client.player.emitEffects();
    }
    for (const k in this.mobs) {
      const mob = this.mobs[k];
      mob.reborn();
      mob.fighter.emitParams();
      mob.fighter.emitPos();
      mob.fighter.emitEffects();
    }
    for (const k in this.tempMobs) {
      const mob = this.tempMobs[k];
      this.removeObject(mob.fighter);
    }
    this.tempMobs = [];
  }

  addClient(client) {
    this.rebornPlayer(client.player);
    client.player.isAlive = true;
    this.addObject(client.player);

    this.emitTo(client);
    this.clients.push(client);
  }
  removeClient(client) {
    const i = this.clients.indexOf(client);
    this.clients.splice(i, 1);
    this.removeObject(client.player);
  }
  rebornPlayer(player) {
    if (player.owner.params.checkpoint) {
      const p = player.owner.params.checkpoint.pos;
      const a = Math.random() * Math.PI * 2;
      player.pos = {
        x: p.x + Math.cos(a) * WALL_SIZE * 2,
        y: p.y + Math.sin(a) * WALL_SIZE * 2,
      };
      Checkpoint.USE(player);
      return;
    }
    const i = Math.floor(Math.random() * this.playerPoints.length);
    const p = this.playerPoints[i];
    player.pos = p;
  }

  emitTo(client) {
    const objects = this.objects;
    for (const id in objects) {
      const object = objects[id];
      object.emitTo(client);
    }
  }

  update() {
    native.GameLevelZone__update(this.native, dt);

    if (this.restartTime) {
      this.restartTime -= dt;
      if (this.restartTime <= 0) {
        delete this.restartTime;
        this.restart();
        return;
      }
    }

    this.updateTimeoutsTime = this.updateTimeoutsTime || Math.random();
    this.updateTimeoutsTime += dt;
    if (this.updateTimeoutsTime >= 1) {
      this.updateTimeoutsTime -= 1;

      let i = 0;
      while (i < this.timeouts.length) {
        const timeout = this.timeouts[i];
        timeout.time -= 1;
        if (timeout.time <= 0) {
          this.timeouts.splice(i, 1);
          timeout.fn();
        } else {
          ++i;
        }
      }
    }
    this.updateNears = this.updateNears || Math.random();
    this.updateNears += dt;
    if (this.updateNears >= 1.0) {
      this.updateNears -= 1.0;
      for (let i = 0; i < this.clients.length; ++i) {
        const player = this.clients[i].player;
        if (player.isAlive) {
          this.updateObjectNears(player);
        }
      }
      this.checkBossAreas();
    }

    this.updateMobsTime = this.updateMobsTime || Math.random();
    this.updateMobsTime += dt;
    if (this.updateMobsTime >= 1) {
      this.updateMobsTime -= 1;

      const clients = this.clients;
      for (const k in clients) {
        const client = clients[k];
        const x = Math.floor(client.player.pos.x / WALL_SIZE);
        const y = Math.floor(client.player.pos.y / WALL_SIZE);

        const mobs = this.mobs;
        for (const k in mobs) {
          const mob = mobs[k];
          mob.checkPlayer(x, y, client.player);
        }
        const tempMobs = this.tempMobs;
        let i = 0;
        while (i < tempMobs.length) {
          const mob = tempMobs[i];
          if (!mob.fighter.isAlive) {
            tempMobs.splice(i, 1);
          } else {
            mob.checkPlayer(x, y, client.player);
            ++i;
          }
        }
      }
    }

    for (let i = 0; i < 10; ++i) {
      if (this.mobs.length) {
        const mobI = Math.floor(Math.random() * this.mobs.length);
        this.mobs[mobI].update();
      }
      if (this.tempMobs.length) {
        const tempMobI = Math.floor(Math.random() * this.tempMobs.length);
        this.tempMobs[tempMobI].update();
      }
    }

    this.updateMobsTime2 = this.updateMobsTime2 || Math.random();
    this.updateMobsTime2 += dt;
    if (this.updateMobsTime2 >= 0.33) {
      this.updateMobsTime2 -= 0.33;
      this.checkBossAreas();
    }
  }
  updateObjectNears(player) {
    const canItem = player.canItem;
    const canOpenDoor = player.canOpenDoor;
    const canTalk = player.canTalk;
    const canCheckpoint = player.canCheckpoint;

    delete player.canItem;
    delete player.canOpenDoor;
    delete player.canTalk;
    delete player.canCheckpoint;

    const others = player.others;
    for (const k in others) {
      const other = others[k];
      if (other.checkNear) {
        other.checkNear(player);
      }
    }

    //
    if (canItem && !player.canItem) {
      player.owner.emit('stopCan', {});
      return;
    }
    if (canOpenDoor && !player.canOpenDoor) {
      player.owner.emit('stopCan', {});
      return;
    }
    if (canTalk && !player.canTalk) {
      player.owner.emit('stopCan', {});
      delete player.talking;
      return;
    }
    if (canTalk !== player.canTalk) {
      player.owner.emit('stopCan', {});
      player.owner.emit('canTalk', {});
      delete player.talking;
      return;
    }
    if (canCheckpoint && !player.canCheckpoint) {
      player.owner.emit('stopCan', {});
      return;
    }
    //
    if (!canItem && player.canItem) {
      player.owner.emit('canItem', {});
      return;
    }
    if (!canOpenDoor && player.canOpenDoor) {
      if (player.canOpenDoor.isOpened) {
        player.owner.emit('canCloseDoor', {});
      } else {
        player.owner.emit('canOpenDoor', {});
      }
      return;
    }
    if (!canTalk && player.canTalk) {
      player.owner.emit('canTalk', {});
      return;
    }
    if (!canCheckpoint && player.canCheckpoint) {
      player.owner.emit('canCheckpoint', {});
      return;
    }
  }

  checkBossAreas() {
    for (const k in this.bossAreas) {
      const area = this.bossAreas[k];
      if (area.boss.fighter.isAlive) {
        for (const k in this.clients) {
          const client = this.clients[k];
          if (client.player && client.player.hp > 0 && !client.player.area) {
            const dx = Math.abs(client.player.pos.x - area.mapX);
            const dy = Math.abs(client.player.pos.y - area.mapY);
            if (dx < area.mapW * 0.5 && dy < area.mapH * 0.5) {
              client.player.area = area;
              client.emit('bossArea', {});
            }
          }
        }
      }
    }
  }
}