export class GameLevelZone {
  static get CELL_SIZE() {
    return 256;
  }

  constructor(mapName) {
    this.cells = [];
    this.grid = [];

    this.clients = [];

    this.objects = {};
    this.staticBodies = {};
    this.bodies = {};

    this.playerPoints = [];
    this.enemyPoints = [];

    this.mobs = [];

    this.loadMap(mapName);
  }

  loadMap(mapName) {
    this.map = JSON.parse(fs.readFileSync(
      'maps/' + mapName + '.json',
      'utf8'));

    this.mapName = mapName;

    this.w = this.map.width * WALL_SIZE;
    this.h = this.map.height * WALL_SIZE;

    const ground = this.map.layers[0];
    for (let y = 0; y < this.map.height; ++y) {
      for (let x = 0; x < this.map.width; ++x) {
        const i = y * this.map.width + x;
        const v = ground.data[i];
        const slug = mapIDs[v];
        if (v !== 0) {
          this.grid[x] = this.grid[x] || {};
          this.grid[x][y] = slug;
        }
      }
    }

    this.mapObjects = []
    this.bossAreas = [];
    const objects = this.map.layers[1];
    for (const k in objects.objects) {
      const o = objects.objects[k];
      const slug = mapIDs[o.gid];
      const x = o.x / 32 * WALL_SIZE + WALL_SIZE * 0.5;
      const y = o.y / 32 * WALL_SIZE + WALL_SIZE * 0.5;
      const data = {
        mapID: o.id,
        mapX: o.x / 32 * WALL_SIZE,
        mapY: o.y / 32 * WALL_SIZE,
        mapW: o.width / 32 * WALL_SIZE,
        mapH: o.height / 32 * WALL_SIZE,
        x: x,
        y: y,
        slug: slug,
      };
      if (slug) {
        switch (slug) {
          case 'born':
            this.playerPoints.push(data);
            break;
          default:
            this.enemyPoints.push(data);
        }
      } else {
        if (o.properties && o.properties.bossID) {
          data.bossID = o.properties.bossID;
          this.bossAreas.push(data);
        }
      }
    }

    this.mobs = [];
    for (const k in this.enemyPoints) {
      const p = this.enemyPoints[k];
      Object.assign(p, global[p.slug]);
      const mob = new Mob(this, p, k);
      this.mapObjects[p.mapID] = mob;
      for (const k in this.bossAreas) {
        const area = this.bossAreas[k];
        if (area.bossID === p.mapID) {
          mob.area = area;
          mob.fighter.area = area;
          area.boss = mob;
        }
      }
      this.addObject(mob.fighter);
      this.mobs.push(mob);
    }
  }

  addObject(object) {
    object.gameLevelZone = this;

    this.objects[object.id] = object;

    if (object.body) {
      this.bodies[object.id] = object;
    }

    for (const client of this.clients) {
      object.emitTo(client);
    }
  }
  removeObject(object) {
    object.emitAll('delete', {});

    delete object.gameLevelZone;

    delete this.objects[object.id];
    delete this.bodies[object.id];

    object.cells = object.cells || [];
    for (const k in object.cells) {
      const cell = object.cells[k];
      delete this.cells[cell.x][cell.y][object.id];
    }
  }

  restart() {
    for (const k in this.clients) {
      const client = this.clients[k];
      this.rebornPlayer(client.player);
      client.player.reborn();
      client.emit('restart', {});
      client.player.emitParams();
      client.player.emitPos();
    }
    for (const k in this.mobs) {
      const mob = this.mobs[k];
      mob.reborn();
      mob.fighter.emitParams();
      mob.fighter.emitPos();
    }
  }

  addClient(client) {
    const i = Math.floor(Math.random() * this.playerPoints.length);
    const p = this.playerPoints[i];
    client.player.pos.x = p.x;
    client.player.pos.y = p.y;
    client.player.isAlive = true;

    this.addObject(client.player);
    this.emitTo(client);
    this.clients.push(client);
  }
  removeClient(client) {
    this.clients.slice(this.clients.indexOf(client), 1);
    this.removeObject(client.player);
  }
  rebornPlayer(player) {
    const i = Math.floor(Math.random() * this.playerPoints.length);
    const p = this.playerPoints[i];
    player.pos.x = p.x;
    player.pos.y = p.y;
  }

  emitTo(client) {
    const objects = this.objects;
    for (const id in objects) {
      const object = objects[id];
      object.emitTo(client);
    }
  }

  resolveBounds(object) {
    if (object.body.kind === 'circle') {
      this.resolveCircleBounds(object, {
        x: 0,
        y: 0,
        w: this.w,
        h: this.h,
      });
      if (object.area) {
        const area = object.area;
        this.resolveCircleBounds(object, {
          x: area.mapX,
          y: area.mapY,
          w: area.mapW,
          h: area.mapH,
        });
      }
    }
  }
  resolveCircleBounds(object, rect) {
    const size = object.body.size;
    if (object.pos.x < rect.x + size * 0.5) {
      object.pos.x = rect.x + size * 0.5;
      object.speed.x = Math.abs(object.speed.x);
      object.emitPos();
    }
    if (object.pos.x > rect.x + rect.w - size * 0.5) {
      object.pos.x = rect.x + rect.w - size * 0.5;
      object.speed.x = -Math.abs(object.speed.x);
      object.emitPos();
    }
    if (object.pos.y < rect.y + size * 0.5) {
      object.pos.y = rect.y + size * 0.5;
      object.speed.y = Math.abs(object.speed.y);
      object.emitPos();
    }
    if (object.pos.y > rect.y + rect.h - size * 0.5) {
      object.pos.y = rect.y + rect.h - size * 0.5;
      object.speed.y = -Math.abs(object.speed.y);
      object.emitPos();
    }
  }

  update() {
    if (this.restartTime) {
      this.restartTime -= dt;
      if (this.restartTime <= 0) {
        delete this.restartTime;
        this.restart();
        return;
      }
    }
    const objectsWithBody = this.bodies;
    for (const k in objectsWithBody) {
      const object = objectsWithBody[k];
      this.updateObjectWithBodyCells(object);

      const cx = Math.floor(object.pos.x / WALL_SIZE);
      const cy = Math.floor(object.pos.y / WALL_SIZE);
      for (let x = -2; x <= 2; ++x) {
        for (let y = -2; y <= 2; ++y) {
          if (this.grid[x + cx] && this.grid[x + cx][y + cy]) {
            this.resolveCircle2StaticRectCollision(
              object, x + cx + 0.5, y + cy + 0.5);
          }
        }
      }
    }
    for (const k in objectsWithBody) {
      const object = objectsWithBody[k];
      this.updateObjectWithBodyCollisions(object);
    }

    this.updateMobs();
  }
  updateObjectWithBodyCells(object) {
    object.cells = object.cells || [];
    for (const k in object.cells) {
      const cell = object.cells[k];
      delete this.cells[cell.x][cell.y][object.id];
    }
    object.cells = [];

    const CELL_SIZE = GameLevelZone.CELL_SIZE;
    const xb = Math.floor(
      (object.pos.x - object.CELL_SIZE * 0.5) / CELL_SIZE);
    const xe = Math.ceil(
      (object.pos.x + object.CELL_SIZE * 0.5) / CELL_SIZE);
    const yb = Math.floor(
      (object.pos.y - object.CELL_SIZE * 0.5) / CELL_SIZE);
    const ye = Math.ceil(
      (object.pos.y + object.CELL_SIZE * 0.5) / CELL_SIZE);

    for (let x = xb; x <= xe; ++x) {
      for (let y = yb; y <= ye; ++y) {
        this.cells[x] = this.cells[x] || {};
        this.cells[x][y] = this.cells[x][y] || {};
        this.cells[x][y][object.id] = object;
        object.cells.push({
          x: x,
          y: y
        });
      }
    }
  }
  objectWithBodyOthers(object, log) {
    const others = {};
    for (const k in object.cells) {
      const cellID = object.cells[k];
      const cell = this.cells[cellID.x][cellID.y];
      for (const k in cell) {
        const other = cell[k];
        if (object !== other) {
          others[other.id] = other;
        }
      }
    }
    return others;
  }
  updateObjectWithBodyCollisions(object) {
    const others = this.objectWithBodyOthers(object);
    for (const k in others) {
      const other = others[k];
      this.resolveCollision(object, other);
    }

    this.resolveBounds(object);
  }

  updateMobs() {
    this.updateMobsTime = this.updateMobsTime || 0;
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
      }
    }

    this.updateMobsTime2 = this.updateMobsTime2 || 0;
    this.updateMobsTime2 += dt;
    if (this.updateMobsTime2 >= 0.5) {
      this.updateMobsTime2 -= 0.5;

      const mobs = this.mobs;
      for (const k in mobs) {
        const mob = mobs[k];
        mob.update();
      }

      this.checkBossAreas();
    }
  }
  checkBossAreas() {
    for (const k in this.bossAreas) {
      const area = this.bossAreas[k];
      if (area.boss.fighter.isAlive) {
        for (const k in this.clients) {
          const client = this.clients[k];
          if (client.player && client.player.hp > 0 && !client.player.area) {
            const inArea = client.player.pos.x > area.mapX &&
              client.player.pos.y > area.mapY &&
              client.player.pos.x < area.mapX + area.mapW &&
              client.player.pos.y < area.mapY + area.mapH;
            if (inArea) {
              client.player.area = area;
              client.emit('bossArea', {});
            }
          }
        }
      }
    }
  }
}