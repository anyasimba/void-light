globally(require('./GameLevelZone'));

Object.assign(GameLevelZone.prototype, {
  doDamageRadialArea(source, opts) {
    console.log(source.name, source.others.length);
    for (let i = 0; i < source.others.length; ++i) {
      const other = source.others[i];

      let canDamage = false;
      switch (other.type) {
        case 'Door':
          break;
        default:
          canDamage = true;
      }
      if (canDamage) {
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
    if (other.rollBlockTime && !other.inHit && !other.inJump) {
      return;
    }
    const isInvade = source.invade || other.invade;
    if (source.kind === other.kind && !isInvade) {
      return;
    }

    const rel = other.pos
      .subtract(source.pos);

    const adx = rel.length();
    if (adx > opts.d) {
      return;
    }
    const ady = other.body.size * 0.5;
    let da = new vec3(adx, ady, 0).toAngle();
    let a = Math.abs(rel.toAngle() - opts.hitVec.toAngle());
    if (a > 180) {
      a = 360 - a;
    }
    if (a > opts.a + da) {
      return;
    }

    const isInBlock = other.shield &&
      other.isBlock &&
      other.stamina > 0 &&
      !other.inJump &&
      !other.inStun &&
      !other.inHit;

    let balanceF = source.BALANCE_SCALE || 1;
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
      vec3.subtract(other.speed, other.speed.unit().multiply(200));
    } else {
      other.speed.init();
    }
    if (isJumpHit) {
      vec3.add(other.speed, opts.hitVec.multiply(
        opts.impulse * 3 * source.scale));
    } else {
      vec3.add(other.speed, opts.hitVec.multiply(
        opts.impulse * source.scale));
    }
    other.emitPos();
  },
});