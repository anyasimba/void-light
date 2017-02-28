export class Mob {
  constructor(gameLevelZone, opts, i) {
    this.gameLevelZone = gameLevelZone;

    let size = 40;
    this.hitSpeed = 2;

    this.fighter = new Fighter(this, {
      kind: 'mob',

      ACC: 1300,
      DAMAGE: 100,
      BODY_SIZE: 140,

      BALANCE: 30,
      HP: 200,
      MP: 100,
      STAMINA: 16,
    });
    this.opts = opts;

    this.reborn();

    this.genGrid(
      Math.floor(opts.x / WALL_SIZE),
      Math.floor(opts.y / WALL_SIZE)
    );
  }

  reborn() {
    delete this.act;
    delete this.actTime;
    delete this.onWay;
    delete this.path;
    delete this.target;
    delete this.rollTime;
    delete this.jumpTime;
    delete this.fighter.absLook;
    this.fighter.emitPos();
    if (this.hits) {
      clearInterval(this.hits);
      delete this.hits;
    }

    this.fighter.pos.x = this.opts.x;
    this.fighter.pos.y = this.opts.y;

    this.fighter.reborn();

    if (!this.isAlive) {
      this.isAlive = true;
      this.gameLevelZone.addObject(this.fighter);
    }
  }

  genGrid(x, y) {
    const map = this.gameLevelZone.grid;
    const pathMap = [];
    pathMap[x] = [];
    pathMap[x][y] = 0;
    let queue = [{
      x: x,
      y: y,
    }];
    while (queue.length > 0) {
      const q = queue;
      queue = [];
      for (const i in q) {
        const p = q[i];
        const cost = pathMap[p.x][p.y];
        const check = (x, y, cost) => {
          if (cost > 60) {
            return;
          }
          if (map[x] && map[x][y]) {
            return;
          }
          if (pathMap[x] && pathMap[x][y] !== undefined &&
            pathMap[x][y] <= cost) {
            return;
          }
          pathMap[x] = pathMap[x] || [];
          if (pathMap[x][y] === undefined) {
            queue.push({
              x: x,
              y: y,
            });
          }
          pathMap[x][y] = cost;
        }

        check(p.x + 1, p.y, cost + 1);
        check(p.x - 1, p.y, cost + 1);
        check(p.x, p.y + 1, cost + 1);
        check(p.x, p.y - 1, cost + 1);

        check(p.x + 1, p.y + 1, cost + 1.414);
        check(p.x - 1, p.y + 1, cost + 1.414);
        check(p.x + 1, p.y - 1, cost + 1.414);
        check(p.x - 1, p.y - 1, cost + 1.414);
      }
    }

    this.pathMap = pathMap;
  }

  getNextPoint(x, y) {
    const check = (p, x, y, cost) => {
      if (!this.pathMap[x] || this.pathMap[x][y] === undefined) {
        return;
      }
      if (this.pathMap[x][y] + cost <= p.cost) {
        p.x = x;
        p.y = y;
        p.cost = this.pathMap[x][y] + cost;
      }
    }

    if (this.pathMap[x] && this.pathMap[x][y] === 0) {
      return;
    }
    let p = {
      cost: 1000,
    };

    check(p, x + 1, y, 1);
    check(p, x - 1, y, 1);
    check(p, x, y + 1, 1);
    check(p, x, y - 1, 1);

    check(p, x + 1, y + 1, 1.414);
    check(p, x - 1, y + 1, 1.414);
    check(p, x + 1, y - 1, 1.414);
    check(p, x - 1, y - 1, 1.414);

    return p;
  }
  checkPlayer(x, y, player) {
    if (this.target && (this.target.hp <= 0 || this.target.isDestroyed)) {
      delete this.target;
      delete this.path;
      delete this.onWay;
    }
    if (player.hp <= 0 || player.isDestroyed) {
      return;
    }
    const tx = Math.floor(this.fighter.pos.x / WALL_SIZE);
    const ty = Math.floor(this.fighter.pos.y / WALL_SIZE);

    if (this.target && this.target !== player) {
      return;
    }
    if (!this.pathMap[x] || this.pathMap[x][y] === undefined) {
      delete this.target;
      delete this.path;
      delete this.onWay;
      return;
    }
    if (this.target || this.pathMap[x][y] <= this.opts.AGRO_D) {
      this.target = player;
      this.fighter.absLook = this.target.id;
      this.fighter.emitPos();
      this.path = [];
      delete this.onWay;

      let p = {
        x: x,
        y: y
      };
      while (true) {
        this.path.push(p);
        x = p.x;
        y = p.y;

        p = this.getNextPoint(x, y);
        if (!p) {
          break;
        }
        if (Math.abs(p.x - tx) + Math.abs(p.y - ty) <= 2) {
          this.onWay = true;
          break;
        }
      }
    }
  }

  update() {
    const tx = Math.floor(this.fighter.pos.x / WALL_SIZE);
    const ty = Math.floor(this.fighter.pos.y / WALL_SIZE);

    let next;
    if (this.onWay) {
      next = this.path[this.path.length - 1];
      if (next) {
        const dx = Math.abs(this.fighter.pos.x -
          (next.x * WALL_SIZE + WALL_SIZE * 0.5));
        const dy = Math.abs(this.fighter.pos.y -
          (next.y * WALL_SIZE + WALL_SIZE * 0.5));
        if (dx + dy < 20 + this.fighter.speed.length() * 0.1) {
          this.path.pop();
          next = this.path[this.path.length - 1];
        }
      }
    }
    next = next || this.getNextPoint(tx, ty);

    let nextX;
    let nextY;

    if (next) {
      const dx = Math.abs(this.fighter.pos.x -
        (next.x * WALL_SIZE + WALL_SIZE * 0.5));
      const dy = Math.abs(this.fighter.pos.y -
        (next.y * WALL_SIZE + WALL_SIZE * 0.5));

      if (dx + dy > 20 + this.fighter.speed.length() * 0.1) {
        nextX = next.x * WALL_SIZE + WALL_SIZE * 0.5;
        nextY = next.y * WALL_SIZE + WALL_SIZE * 0.5;
      }
    }

    let canAttack;

    if (this.target) {
      const dx = this.fighter.pos.x - this.target.pos.x;
      const dy = this.fighter.pos.y - this.target.pos.y;
      const d = Math.sqrt(dx * dx + dy * dy);

      const px = Math.floor(this.target.pos.x / WALL_SIZE);
      const py = Math.floor(this.target.pos.y / WALL_SIZE);

      const needGoHome = !this.pathMap[px] ||
        this.pathMap[px][py] === undefined ||
        this.pathMap[px][py] > this.opts.RUN_D ||
        this.target.isDestroyed;

      if (needGoHome) {
        delete this.target;
        delete this.path;
        delete this.onWay;
        delete this.fighter.absLook;
        this.fighter.emitPos();
      } else if (this.pathMap[tx] && this.pathMap[px]) {
        const cd = Math.abs(this.pathMap[tx][ty] - this.pathMap[px][py]);
        if (d <= 600 && cd <= 3) {
          nextX = this.target.pos.x;
          nextY = this.target.pos.y;
        }

        this.attackDistance = this.attackDistance ||
          this.opts.HIT_D[0] + this.opts.HIT_D[1] * Math.random();
        if (d < this.attackDistance) {
          canAttack = true;
        }
      }
    }

    if (canAttack) {
      if (!this.act) {
        const lastActIsMove =
          this.lastAct !== 'left' && this.lastAct !== 'right';

        if (this.lastAct !== 'hit' && Math.random() < this.opts.HIT_VER) {
          if (Math.random() < this.opts.JUMP_HIT_VER) {
            this.fighter.doJump();
          }
          if (Math.random() < this.opts.ROLL_HIT_VER) {
            this.fighter.doRoll();
          }

          this.act = 'hit';
          this.actTime = this.opts.HIT_TIME[0] +
            this.opts.HIT_TIME[1] * Math.random();
          this.hits = setInterval(() => {
            if (Math.random() < 0.1) {
              this.fighter.doRoll();
            }
            if (this.target) {
              this.fighter.doHit({
                x: this.target.pos.x,
                y: this.target.pos.y,
              });
            }
          }, 200);
        } else if (lastActIsMove && Math.random() < this.opts.MOVE_VER) {
          if (Math.random() < 0.5) {
            this.act = 'left';
          } else {
            this.act = 'right';
          }
          this.actTime = this.opts.MOVE_TIME[0] +
            this.opts.MOVE_TIME[1] * Math.random();
          if (Math.random() < this.opts.LONG_MOVE_VER) {
            this.actTime = this.opts.LONG_MOVE_TIME[0] +
              this.opts.LONG_MOVE_TIME[1] * Math.random();
          }
        } else {
          this.act = 'stop';
          this.actTime = this.opts.STOP_TIME[0] +
            this.opts.STOP_TIME[1] * Math.random();
        }
      }

      if (this.act === 'left') {
        const dx = nextX - this.fighter.pos.x;
        const dy = nextY - this.fighter.pos.y;

        nextX = this.fighter.pos.x + dy;
        nextY = this.fighter.pos.y - dx;
      } else if (this.act === 'right') {
        const dx = nextX - this.fighter.pos.x;
        const dy = nextY - this.fighter.pos.y;

        nextX = this.fighter.pos.x - dy;
        nextY = this.fighter.pos.y + dx;
      } else {
        nextX = this.fighter.pos.x;
        nextY = this.fighter.pos.y;
      }
    }

    if (this.actTime !== undefined) {
      this.actTime -= dt * 6;
      if (this.actTime <= 0) {
        this.lastAct = this.act;
        delete this.actTime;
        if (this.hits) {
          clearInterval(this.hits);
          delete this.hits;
        }
      }
    }
    if (!this.actTime && !this.fighter.inHit && this.act) {
      delete this.act;
    }

    if (this.target && this.opts.ROLL_TIME) {
      this.rollTime = this.rollTime ||
        this.opts.ROLL_TIME[0] + this.opts.ROLL_TIME[1] * Math.random();
      this.rollTime -= dt;
      if (this.rollTime <= 0) {
        delete this.rollTime;
        this.fighter.doRoll();
      }
    }
    if (this.target && this.opts.JUMP_TIME) {
      this.jumpTime = this.jumpTime ||
        this.opts.JUMP_TIME[0] + this.opts.JUMP_TIME[1] * Math.random();
      this.jumpTime -= dt;
      if (this.jumpTime <= 0) {
        delete this.jumpTime;
        this.fighter.doJump();
      }
    }

    const oldX = this.fighter.inputMove.x;
    const oldY = this.fighter.inputMove.y;

    this.fighter.inputMove.x = 0;
    this.fighter.inputMove.y = 0;

    if (nextX) {
      if (Math.abs(nextX - this.fighter.pos.x) > 8) {
        this.fighter.inputMove.x = Math.sign(nextX - this.fighter.pos.x);
      }
      if (Math.abs(nextY - this.fighter.pos.y) > 8) {
        this.fighter.inputMove.y = Math.sign(nextY - this.fighter.pos.y);
      }
    }
    const hasChange =
      oldX != this.fighter.inputMove.x ||
      oldY != this.fighter.inputMove.y;
    if (hasChange) {
      this.fighter.emitPos();
    }
  }

  onDie() {
    this.gameLevelZone.removeObject(this.fighter);
    delete this.isAlive;
  }
}