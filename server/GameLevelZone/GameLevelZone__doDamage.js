globally(require('./GameLevelZone'));

Object.assign(GameLevelZone.prototype, {
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
  },
  doDamageRadialArea2Circle(source, opts, other) {
    if (other.inRoll) {
      return;
    }
    if (source.kind === other.kind) {
      return;
    }

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
      let damage = 5;
      if (source.kind === 'player') {
        damage = 60;
      }
      other.hp -= damage;
      other.emitAll('otherHit', {});
      if (other.hp <= 0) {
        other.onDie();
      }
      if (other.inHit) {
        other.breakHit();
      }
      if (other.kind === 'player') {
        other.stun(0.1);
      } else {
        other.stun(1);
      }
    }
  },
});