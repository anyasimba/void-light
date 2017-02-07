export class GameLevelZone {
  static get CELL_SIZE() {
    return 64;
  }

  constructor(opts) {
    this.w = opts.w;
    this.h = opts.h;

    this.cells = [];

    this.clients = [];

    this.objects = {};
    this.bodies = {};
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
  }


  addClient(client) {
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

  resolveCollision(object, otherObject) {
    if (object.body.kind === 'circle' && otherObject.body.kind === 'circle') {
      this.resolveCircle2CircleCollision(object, otherObject);
    }
  }
  resolveCircle2CircleCollision(object, otherObject) {
    const bodyD = (object.body.size + otherObject.body.size) * 0.5;
    const dx = object.pos.x - otherObject.pos.x;
    const dy = object.pos.y - otherObject.pos.y;
    const d = Math.pow((dx * dx + dy * dy), 0.5);
    if (d < bodyD) {
      const x = dx / d;
      const y = dy / d;
      const rd = bodyD - d;
      const v = new vec3(rd * x, rd * y);
      vec3.add(object.pos, v);
      vec3.subtract(otherObject.pos, v);

      vec3.unit(v);
      const force = object.speed.length() + otherObject.speed.length();
      const imp = 0.5;
      vec3.add(object.speed, v.multiply(force * imp));
      vec3.subtract(otherObject.speed, v.multiply(force * imp));

      object.emitPos();
      otherObject.emitPos();
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
    for (const id in objectsWithBody) {
      const object = objectsWithBody[id];
      this.updateObjectWithBody(object);
    }
  }

  updateObjectWithBody(object) {
    const objectsWithBody = this.bodies;
    for (const id in objectsWithBody) {
      const otherObject = objectsWithBody[id];
      if (object !== otherObject) {
        this.resolveCollision(object, otherObject);
      }
    }

    this.resolveBounds(object);
  }

  doDamageRadialArea(source, opts) {
    const objectsWithBody = this.bodies;
    for (const id in objectsWithBody) {
      const object = objectsWithBody[id];
      if (object !== source) {
        switch (object.body.kind) {
          case 'circle':
            {
              this.doDamageRadialArea2Circle(source, opts, object);
            }
          default:
            break;
        }
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