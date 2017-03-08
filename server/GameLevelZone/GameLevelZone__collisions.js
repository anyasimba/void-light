globally(require('./GameLevelZone'));

Object.assign(GameLevelZone.prototype, {
  resolveCollision(object, other) {
    if (object.body.kind === 'circle' && other.body.kind === 'circle') {
      this.resolveCircle2CircleCollision(object, other);
    }
    if (object.body.kind === 'circle' && other.body.kind === 'staticRect') {
      this.resolveCircle2StaticRectCollision(object,
        other.pos.x, other.pos.y, other.body.w, other.body.h);
    }
    if (object.body.kind === 'staticRect' && other.body.kind === 'circle') {
      this.resolveCircle2StaticRectCollision(other,
        object.pos.x, object.pos.y, object.body.w, object.body.h);
    }
  },
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
    }
  },
  resolveCircle2StaticRectCollision(object, x, y, w, h) {
    const bodyDX = (object.body.size + w) * 0.5;
    const bodyDY = (object.body.size + h) * 0.5;
    const dx = object.pos.x - x;
    const dy = object.pos.y - y;

    let hasCollision = false;
    if (Math.abs(dy) <= h * 0.5) {
      if (dx > 0 && dx < bodyDX) {
        hasCollision = true;
      } else if (dx < 0 && -dx < bodyDX) {
        hasCollision = true;
      }
    } else if (Math.abs(dx) <= w * 0.5) {
      if (dy > 0 && dy < bodyDY) {
        hasCollision = true;
      } else if (dy < 0 && -dy < bodyDY) {
        hasCollision = true;
      }
    }

    const x1 = (x - w * 0.5);
    const y1 = (y - h * 0.5);
    const x2 = (x + w * 0.5);
    const y2 = (y + h * 0.5);

    const dx1 = (object.pos.x - x1) * (object.pos.x - x1);
    const dy1 = (object.pos.y - y1) * (object.pos.y - y1);
    const dx2 = (object.pos.x - x2) * (object.pos.x - x2);
    const dy2 = (object.pos.y - y2) * (object.pos.y - y2);

    const d1 = Math.sqrt(dx1 + dy1);
    if (d1 < object.body.size * 0.5) {
      hasCollision = true;
    }
    const d2 = Math.sqrt(dx1 + dy2);
    if (d2 < object.body.size * 0.5) {
      hasCollision = true;
    }
    const d3 = Math.sqrt(dx2 + dy1);
    if (d3 < object.body.size * 0.5) {
      hasCollision = true;
    }
    const d4 = Math.sqrt(dx2 + dy2);
    if (d4 < object.body.size * 0.5) {
      hasCollision = true;
    }

    if (hasCollision) {
      const dx = object.prevPos.x - x;
      const dy = object.prevPos.y - y;

      const imp = 0.5;
      if (Math.abs(dy) <= h * 0.5) {
        if (dx > 0) {
          object.pos.x = x + bodyDX;
          object.speed.x = Math.abs(object.speed.x * imp);
        } else {
          object.pos.x = x - bodyDX;
          object.speed.x = -Math.abs(object.speed.x * imp);
        }
      } else if (Math.abs(dx) <= w * 0.5) {
        if (dy > 0) {
          object.pos.y = y + bodyDY;
          object.speed.y = Math.abs(object.speed.y * imp);
        } else {
          object.pos.y = y - bodyDY;
          object.speed.y = -Math.abs(object.speed.y * imp);
        }
      } else {
        if (dx < 0 && dy < 0) {
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
        }
        if (dx < 0 && dy >= 0) {
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
        }
        if (dx >= 0 && dy < 0) {
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
        }
        if (dx >= 0 && dy >= 0) {
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
        }
      }
    }
  },
});