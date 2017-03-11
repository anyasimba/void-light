export class Mob {
  constructor(gameLevelZone, opts) {
    this.gameLevelZone = gameLevelZone;

    let size = 40;

    this.opts = opts;

    this.fighter = new Fighter(this, Object.assign(opts.FIGHTER, {
      kind: 'mob',
    }));
    if (opts.rightHand) {
      opts.rightHand(this.fighter);
    }
    if (opts.leftHand) {
      opts.leftHand(this.fighter);
    }

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
    if (this.hits) {
      clearInterval(this.hits);
      delete this.hits;
    }

    this.fighter.pos.x = this.opts.x;
    this.fighter.pos.y = this.opts.y;

    this.fighter.reborn();
    this.fighter.look = new vec3(0, 1, 0);
    this.fighter.emitPos();
    this.fighter.stun(0);

    this.fighter.area = this.area;
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
    return;
    if (this.target && (!this.target.isAlive || this.target.isDestroyed)) {
      delete this.target;
      delete this.path;
      delete this.onWay;
    }
    if (!player.isAlive || player.isDestroyed) {
      return;
    }
    const tx = Math.floor(this.fighter.pos.x / WALL_SIZE);
    const ty = Math.floor(this.fighter.pos.y / WALL_SIZE);

    if (!this.pathMap[x] || this.pathMap[x][y] === undefined) {
      return;
    }
    if (this.target === player || this.pathMap[x][y] <= this.opts.AGRO_D) {
      const setTarget = () => {
        if (this.opts.IS_BOSS && player.area !== this.area) {
          return;
        }
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
          const cost = this.onWay || 6;
          const d = Math.abs(p.x - tx) + Math.abs(p.y - ty);
          if (d > 0 && d < cost) {
            this.onWay = d;
          } else if (this.onWay) {
            break;
          }
        }
      };
      if (this.target && this.target !== player) {
        const d1 = this.target.pos.subtract(this.fighter.pos).length();
        const d2 = player.pos.subtract(this.fighter.pos).length();
        if (d2 < d1) {
          setTarget();
        }
      } else {
        setTarget();
      }
    }
  }

  update() {
    const tx = Math.floor(this.fighter.pos.x / WALL_SIZE);
    const ty = Math.floor(this.fighter.pos.y / WALL_SIZE);

    let next;
    if (this.onWay !== undefined) {
      next = this.path[this.path.length - 1];
      while (next) {
        const dx = Math.abs(this.fighter.pos.x -
          (next.x * WALL_SIZE + WALL_SIZE * 0.5));
        const dy = Math.abs(this.fighter.pos.y -
          (next.y * WALL_SIZE + WALL_SIZE * 0.5));
        if (dx + dy < WALL_SIZE) {
          this.path.pop();
          next = this.path[this.path.length - 1];
        } else {
          break;
        }
      }
    }
    let toHome;
    if (!next) {
      toHome = true;
      next = this.getNextPoint(tx, ty);
    }
    let nextX;
    let nextY;

    if (next) {
      nextX = next.x * WALL_SIZE + WALL_SIZE * 0.5;
      nextY = next.y * WALL_SIZE + WALL_SIZE * 0.5;
    }

    let canAttack;
    let isRun;

    if (this.target) {
      const dx = this.fighter.pos.x - this.target.pos.x;
      const dy = this.fighter.pos.y - this.target.pos.y;
      const d = Math.sqrt(dx * dx + dy * dy);

      const px = Math.floor(this.target.pos.x / WALL_SIZE);
      const py = Math.floor(this.target.pos.y / WALL_SIZE);

      const needGoHome = !this.pathMap[px] ||
        this.pathMap[px][py] === undefined ||
        this.pathMap[px][py] > this.opts.RUN_D ||
        this.target.isDestroyed ||
        !this.target.isAlive;
      if (needGoHome) {
        delete this.target;
        delete this.path;
        delete this.onWay;
        delete this.fighter.absLook;
        isRun = false;
        this.fighter.emitPos();
      } else if (this.pathMap[tx] && this.pathMap[px]) {
        const cd = Math.abs(this.pathMap[tx][ty] - this.pathMap[px][py]);
        if (d > 700) {
          isRun = true;
        }

        this.attackDistance = this.attackDistance ||
          (this.opts.HIT_D[0] + this.opts.HIT_D[1] * Math.random()) *
          this.fighter.scale;

        const needForce = d < this.attackDistance * 3 &&
          this.target.speed.length() > 50 &&
          Math.random() < 0.02;

        if (d < this.attackDistance) {
          canAttack = true;
        } else if (needForce) {
          canAttack = true;
          isRun = true;
          if (Math.random() < 0.5) {
            this.fighter.doRoll();
          } else {
            this.fighter.doJump();
          }
        } else {
          delete this.attackDistance;
          if (Math.random() < 0.3) {
            isRun = true;
          }
        }
      }
    }

    if (canAttack) {
      isRun = false;
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
          this.hitDir = this.target.pos
            .subtract(this.fighter.pos)
            .unit()
            .multiply(1000);
          this.actTime = (this.opts.HIT_TIME[0] +
              this.opts.HIT_TIME[1] * Math.random()) *
            this.fighter.hitSpeed;
          this.hits = setInterval(() => {
            if (Math.random() < this.opts.ROLL_HIT_VER) {
              this.fighter.doRoll();
            }
            if (Math.random() < this.opts.JUMP_HIT_VER) {
              this.fighter.doJump();
            }
            if (this.target) {
              if (Math.random() < 0.2) {
                this.hitDir = this.target.pos.subtract(this.fighter.pos)
                  .unit()
                  .multiply(300);
              }
              this.fighter.doHit({
                x: this.fighter.pos.x + this.hitDir.x,
                y: this.fighter.pos.y + this.hitDir.y,
              });
            }
          }, 500);
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
      this.actTime -= dt * 30;
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
    const oldRun = this.fighter.isRun;

    this.fighter.inputMove.x = 0;
    this.fighter.inputMove.y = 0;

    if (nextX) {
      if (Math.abs(nextX - this.fighter.pos.x) > 20) {
        this.fighter.inputMove.x = Math.sign(nextX - this.fighter.pos.x);
      }
      if (Math.abs(nextY - this.fighter.pos.y) > 20) {
        this.fighter.inputMove.y = Math.sign(nextY - this.fighter.pos.y);
      }
      if (isRun !== undefined) {
        this.fighter.isRun = isRun;
      }
    }
    const hasChange =
      oldX !== this.fighter.inputMove.x ||
      oldY !== this.fighter.inputMove.y ||
      oldRun !== this.fighter.isRun;
    if (hasChange) {
      this.fighter.emitPos();
    }
  }

  onDie(source) {
    if (source.kind === 'player' && this.opts.VOIDS_COUNT) {
      source.owner.params.fighter.params.voidsCount +=
        this.opts.VOIDS_COUNT;
      source.owner.saveParam('fighter', 'params',
        source.owner.params.fighter.params);
    }

    if (this.area) {
      const clients = this.gameLevelZone.clients;
      for (const k in clients) {
        const client = clients[k];
        if (client.player && client.player.area === this.area) {
          delete client.player.area;
          client.emit('bossDead', {});
        }
      }
    }
  }
}