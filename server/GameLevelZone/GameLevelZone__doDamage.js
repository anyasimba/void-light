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
    if (d + other.body.size * 0.5 < opts.r1) {
      isHit = false;
    }
    if (d - other.body.size * 0.5 > opts.r2) {
      isHit = false;
    }

    const angle = rel.toAngle();
    if (!isAngleInRange(angle, opts.a1, opts.a2)) {
      isHit = false;
    }

    if (isHit) {
      const isInBlock = other.shield &&
        other.stamina > 0 &&
        !other.inJump &&
        !other.inHit;

      let balanceF = 1;
      let damageF = 1;
      const isJumpHit = source.isJumpHit || source.inJump;
      const isRollHit = source.isRollHit || source.inRoll;
      if (isRollHit) {
        balanceF = 1.5;
        damageF = 1.3;
      }
      if (isJumpHit) {
        balanceF = 2;
        damageF = 1.5;
      }
      if (isRollHit && isJumpHit) {
        balanceF = 2.5;
        damageF = 1.8;
      }
      if (isInBlock) {
        other.useStamina(
          source.weapon.stamina * balanceF * 2,
          source.weapon.staminaTime * 2);
      } else {
        other.useBalance(source.weapon.balance * balanceF, 1);
        other.useStamina(
          source.weapon.stamina * balanceF,
          source.weapon.staminaTime);
      }

      let damage = 20;
      if (source.kind === 'player') {
        damage = 30;
      }
      if (isInBlock) {
        damage = 0;
      }
      damage *= damageF;
      other.hp -= damage;
      other.emitAll('otherHit', {
        inBlock: isInBlock,
        damage: damage,
      });
      other.emitParams();
      if (other.hp <= 0) {
        other.onDie();
      }
      if (other.inHit && other.balance <= other.BALANCE * 0.5) {
        other.breakHit();
      }
      if (!isInBlock && other.balance <= 0) {
        other.stun(source.weapon.staminaTime);
      } else if (!isInBlock && other.balance <= other.BALANCE * 0.5) {
        other.stun(0.4);
      } else if (other.stamina <= 0) {
        other.stun(source.weapon.staminaTime * 2);
      } else {
        other.stun(0.05);
      }

      if (other.speed.length > 200) {
        vec3.subtract(other.speed, other.speed.unit().multiply(200));
      } else {
        other.speed.init();
      }
      vec3.add(other.speed, opts.hitVec.multiply(600));
      other.emitPos();
    }
  },
});