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

    this.loadMap(mapName);
  }

  loadMap(mapName) {
    this.map = JSON.parse(fs.readFileSync(
      'maps/' + mapName + '.json',
      'utf8'));

    this.mapName = mapName;

    this.w = this.map.width * 48;
    this.h = this.map.height * 48;

    const ground = this.map.layers[0];
    for (let y = 0; y < this.map.height; ++y) {
      for (let x = 0; x < this.map.width; ++x) {
        const i = y * this.map.width + x;
        const v = ground.data[i];
        if (v === 1) {
          this.grid[x] = this.grid[x] || {};
          this.grid[x][y] = true;
        }
      }
    }

    const points = this.map.layers[1];
    for (let y = 0; y < this.map.height; ++y) {
      for (let x = 0; x < this.map.width; ++x) {
        const i = y * this.map.width + x;
        const v = points.data[i];
        if (v === 2) {
          this.playerPoints.push({
            x: x * 48 + 24,
            y: y * 48 + 24
          });
        }
        if (v === 3) {
          this.enemyPoints.push({
            x: x * 48 + 24,
            y: y * 48 + 24
          });
        }
      }
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


  addClient(client) {
    const i = Math.floor(Math.random() * this.playerPoints.length);
    const p = this.playerPoints[i];
    client.player.pos.x = p.x;
    client.player.pos.y = p.y;

    this.addObject(client.player);
    this.emitTo(client);
    this.clients.push(client);
  }
  removeClient(client) {
    this.clients.slice(this.clients.indexOf(client), 1);
    this.removeObject(client.player);
  }

  emitTo(client) {
    const objects = this.objects;
    for (const id in objects) {
      const object = objects[id];
      object.emitTo(client);
    }
  }

  resolveCollision(object, other) {
    if (object.body.kind === 'circle' && other.body.kind === 'circle') {
      this.resolveCircle2CircleCollision(object, other);
    }
  }
  resolveCircle2CircleCollision(object, other) {
    const bodyD = (object.body.size + other.body.size) * 0.5;
    const dx = object.pos.x - other.pos.x;
    const dy = object.pos.y - other.pos.y;
    const d = Math.pow((dx * dx + dy * dy), 0.5);
    if (d < bodyD) {
      const x = dx / d;
      const y = dy / d;
      const rd = bodyD - d;
      const v = new vec3(rd * x, rd * y);
      vec3.add(object.pos, v);
      vec3.subtract(other.pos, v);

      vec3.unit(v);
      const force = object.speed.length() + other.speed.length();
      const imp = 0.5;
      vec3.add(object.speed, v.multiply(force * imp));
      vec3.subtract(other.speed, v.multiply(force * imp));

      object.emitPos();
      other.emitPos();
    }
  }
  resolveCircle2StaticRectCollision(object, x, y) {
    const bodyDX = (object.body.size + 48) * 0.5;
    const bodyDY = (object.body.size + 48) * 0.5;
    x = x * 48;
    y = y * 48;
    const dx = object.pos.x - x;
    const dy = object.pos.y - y;

    const imp = 0.5;

    if (Math.abs(dy) <= 24) {
      if (dx > 0 && dx < bodyDX) {
        object.pos.x = x + bodyDX;
        const force = object.speed.length();
        object.speed.x += force * imp;

        object.emitPos();
      } else if (dx < 0 && -dx < bodyDX) {
        object.pos.x = x - bodyDX;
        const force = object.speed.length();
        object.speed.x -= force * imp;

        object.emitPos();
      }
    } else if (Math.abs(dx) <= 24) {
      if (dy > 0 && dy < bodyDY) {
        object.pos.y = y + bodyDY;
        const force = object.speed.length();
        object.speed.y += force * imp;

        object.emitPos();
      } else if (dy < 0 && -dy < bodyDY) {
        object.pos.y = y - bodyDY;
        const force = object.speed.length();
        object.speed.y -= force * imp;

        object.emitPos();
      }
    }

    const x1 = (x - 24);
    const y1 = (y - 24);
    const x2 = (x + 24);
    const y2 = (y + 24);

    const dx1 = (object.pos.x - x1) * (object.pos.x - x1);
    const dy1 = (object.pos.y - y1) * (object.pos.y - y1);
    const dx2 = (object.pos.x - x2) * (object.pos.x - x2);
    const dy2 = (object.pos.y - y2) * (object.pos.y - y2);

    const d1 = Math.sqrt(dx1 + dy1);
    if (d1 < object.body.size * 0.5) {
      const dx = (object.pos.x - x1) / d1;
      const dy = (object.pos.y - y1) / d1;
      object.pos.x = x1 + dx * object.body.size * 0.5;
      object.pos.y = y1 + dy * object.body.size * 0.5;

      const force = object.speed.length();
      vec3.add(object.speed, {
        x: dx * force * imp,
        y: dy * force * imp,
        z: 0,
      });

      object.emitPos();
    }
    const d2 = Math.sqrt(dx1 + dy2);
    if (d2 < object.body.size * 0.5) {
      const dx = (object.pos.x - x1) / d2;
      const dy = (object.pos.y - y2) / d2;
      object.pos.x = x1 + dx * object.body.size * 0.5;
      object.pos.y = y2 + dy * object.body.size * 0.5;

      const force = object.speed.length();
      vec3.add(object.speed, {
        x: dx * force * imp,
        y: dy * force * imp,
        z: 0,
      });

      object.emitPos();
    }
    const d3 = Math.sqrt(dx2 + dy1);
    if (d3 < object.body.size * 0.5) {
      const dx = (object.pos.x - x2) / d3;
      const dy = (object.pos.y - y1) / d3;
      object.pos.x = x2 + dx * object.body.size * 0.5;
      object.pos.y = y1 + dy * object.body.size * 0.5;

      const force = object.speed.length();
      vec3.add(object.speed, {
        x: dx * force * imp,
        y: dy * force * imp,
        z: 0,
      });

      object.emitPos();
    }
    const d4 = Math.sqrt(dx2 + dy2);
    if (d4 < object.body.size * 0.5) {
      const dx = (object.pos.x - x2) / d4;
      const dy = (object.pos.y - y2) / d4;
      object.pos.x = x2 + dx * object.body.size * 0.5;
      object.pos.y = y2 + dy * object.body.size * 0.5;

      const force = object.speed.length();
      vec3.add(object.speed, {
        x: dx * force * imp,
        y: dy * force * imp,
        z: 0,
      });

      object.emitPos();
    }
  }

  resolveBounds(object) {
    if (object.body.kind === 'circle') {
      this.resolveCircleBounds(object);
    }
  }
  resolveCircleBounds(object) {
    const size = object.body.size;
    if (object.pos.x < size * 0.5) {
      object.pos.x = size * 0.5;
      object.speed.x = Math.abs(object.speed.x);
      object.emitPos();
    }
    if (object.pos.x > this.w - size * 0.5) {
      object.pos.x = this.w - size * 0.5;
      object.speed.x = -Math.abs(object.speed.x);
      object.emitPos();
    }
    if (object.pos.y < size * 0.5) {
      object.pos.y = size * 0.5;
      object.speed.y = Math.abs(object.speed.y);
      object.emitPos();
    }
    if (object.pos.y > this.h - size * 0.5) {
      object.pos.y = this.h - size * 0.5;
      object.speed.y = -Math.abs(object.speed.y);
      object.emitPos();
    }
  }

  update() {
    const objectsWithBody = this.bodies;
    for (const k in objectsWithBody) {
      const object = objectsWithBody[k];
      this.updateObjectWithBodyCells(object);

      const cx = Math.floor(object.pos.x / 48);
      const cy = Math.floor(object.pos.y / 48);
      for (let x = -2; x <= 2; ++x) {
        for (let y = -2; y <= 2; ++y) {
          if (this.grid[x + cx] && this.grid[x + cx][y+cy]) {
            this.resolveCircle2StaticRectCollision(object, x+cx+0.5, y+cy+0.5);
          }
        }
      }
    }
    for (const k in objectsWithBody) {
      const object = objectsWithBody[k];
      this.updateObjectWithBodyCollisions(object);
    }
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

  doDamageRadialArea(source, opts) {
    const others = this.objectWithBodyOthers(source);
    for (const k in others) {
      const other = others[k];
      switch (other.body.kind) {
        case 'circle':
          {
            this.doDamageRadialArea2Circle(source, opts, other);
          }
        default:
          break;
      }
    }
  }
  doDamageRadialArea2Circle(source, opts, other) {
    let isHit = true;

    const rel = other.pos
      .subtract(source.pos);

    const d = rel.length();
    if (other.body.size * 0.5 + d < opts.r1) {
      isHit = false;
    }
    if (other.body.size * 0.5 + d > opts.r2) {
      isHit = false;
    }

    const angle = rel.toAngle();
    if (!isAngleInRange(angle, opts.a1, opts.a2)) {
      isHit = false;
    }

    if (isHit) {
      vec3.add(other.speed, opts.hitVec.multiply(600));
      other.emitPos();
    }
  }
}