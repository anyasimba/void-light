globally(require('./GameLevelZone'));

Object.assign(GameLevelZone.prototype, {
  doDamageRadialArea(source, opts) {
    const others = source.others;
    for (let i = 0; i < others.length; ++i) {
      const other = others[i];

      let canDamage = false;
      switch (other.type) {
        case 'Door':
          break;
        default:
          canDamage = true;
      }
      if (canDamage) {
        if (other.rollBlockTime && !other.inHit && !other.inJump) {
          continue;
        }
        const isInvade = source.invade || other.invade;
        if (source.kind === other.kind && !isInvade) {
          continue;
        }

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
  },

  doDamageRadialArea2Circle(source, opts, other) {
    let rollSX = 1;
    let rollSY = 1;
    if (source.inRoll) {
      const f = Math.sin(
        (source.inRoll.time / source.inRoll.duration * 2 + 0.5) * Math.PI
      );
      if (source.inHit && !source.inJump) {
        rollSY = f;
      } else {
        rollSX = f;
      }
    }

    const rel = other.pos
      .subtract(source.pos);

    const adx = rel.length() - other.body.size * 0.5;
    if (adx > opts.d * Math.abs(rollSX)) {
      return;
    }
    const ady = other.body.size * 0.5;
    let da = new vec3(adx, ady, 0).toAngle();
    let a = Math.abs(rel.toAngle() - opts.hitVec.toAngle());
    if (rollSX < 0) {
      a = 180 - a;
    }
    if (a > 180) {
      a = 360 - a;
    }
    if (a > opts.a * Math.abs(rollSY) + da) {
      return;
    }

    this.doDamage(source, opts, other);
  },

  doDamage(source, opts, other) {
    const isInBlock = other.shield &&
      other.inBlock &&
      other.stamina > 0 &&
      !other.stunTime &&
      !other.waitTime &&
      !other.inJump &&
      !other.inStun &&
      !other.inHit;

    let balanceF = source.BALANCE_SCALE || 1;
    let damageF = 1;
    const isJumpHit = source.isJumpHit || source.inJump;
    const isRollHit = source.isRollHit || source.inRoll;
    if (isRollHit) {
      balanceF = 1.5;
      damageF = 1.2;
    }
    if (isJumpHit) {
      balanceF = 2;
      damageF = 1.3;
    }
    if (isRollHit && isJumpHit) {
      balanceF = 2.5;
      damageF = 1.5;
    }
    if (!source.inBlock) {
      balanceF *= 1.5;
      damageF *= 1.3;
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

    let damage = source.damage;
    if (!damage) {
      damage = source.damage_f * source.weapon.scale_f +
        source.damage_d * source.weapon.scale_d +
        source.weapon.damage;
    }
    if (isInBlock) {
      damage = 0;
    }
    damage *= damageF;
    damage = Math.floor(damage);
    other.useHP(damage, 8);
    other.emitAll('otherHit', {
      inBlock: isInBlock,
      damage: damage,
    });
    if (other.hp <= 0) {
      other.onDie(source);
    }
    if (other.inHit && other.balance <= other.BALANCE * 0.5) {
      other.breakHit();
    }

    if (!isInBlock && other.balance <= 0) {
      other.stun(source.weapon.staminaTime);
      other.balance = other.BALANCE;
    } else if (!isInBlock && other.balance <= other.BALANCE * 0.5) {
      other.stun(0.2);
    } else if (isInBlock && other.stamina <= 0) {
      other.stun(source.weapon.staminaTime * 2);
      other.balance = other.BALANCE;
    }

    if (other.speed.length > 200) {
      other.speed = other.speed.subtract(
        other.speed.unit().multiply(200));
    } else {
      other.speed.init();
    }
    if (isJumpHit) {
      other.speed = other.speed.add(opts.hitVec.multiply(
        opts.impulse * 3 * source.scale));
    } else {
      other.speed = other.speed.add(opts.hitVec.multiply(
        opts.impulse * source.scale));
    }
    other.emitPos();
  },
});