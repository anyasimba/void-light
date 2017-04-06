export class Mob {
  constructor(gameLevelZone, opts) {
    this.gameLevelZone = gameLevelZone;

    let size = 40;

    this.moveset = global[opts.slug + '__moveset'];

    this.opts = {};
    for (const k in opts) {
      this.opts[k] = opts[k];
    }
    this.opts.FIGHTER = {
      LOOK_ROTATE_F: 0.8,
    };
    for (const k in opts.FIGHTER) {
      this.opts.FIGHTER[k] = opts.FIGHTER[k];
    }
    this.opts.FIGHTER.kind = 'mob';
    if (!this.opts.dies) {
      this.opts.FIGHTER.HP *=
        Math.pow(this.gameLevelZone.complex, 0.5) + 1;
      this.opts.FIGHTER.damage *=
        Math.pow(this.gameLevelZone.complex, 0.5) + 1;
      this.opts.FIGHTER.hitSpeed *= 1 - this.gameLevelZone.complex * 0.04;
      this.opts.FIGHTER.BALANCE *= this.gameLevelZone.complex * 0.1 + 1;
      this.opts.VOIDS_COUNT *= Math.pow(this.gameLevelZone.complex, 2) + 1;
    }

    this.fighter = new Fighter(this, this.opts.FIGHTER);
    if (opts.rightHand) {
      const itemOpts = patch(opts.rightHand);
      itemOpts.parent = this.fighter;
      new Item(itemOpts);
    }
    if (opts.leftHand) {
      const itemOpts = patch(opts.leftHand);
      itemOpts.parent = this.fighter;
      new Item(itemOpts);
    }

    this.genGrid(
      Math.floor(opts.z / 100.0),
      Math.floor(opts.x / WALL_SIZE),
      Math.floor(opts.y / WALL_SIZE)
    );

    this.reborn();
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

    this.fighter.pos = {
      x: this.opts.x,
      y: this.opts.y,
    };
    this.fighter.z = this.opts.z;

    this.fighter.reborn();
    this.fighter.emitPos();

    this.fighter.area = this.area;
  }

  genGrid(i, x, y) {
    const grid = this.gameLevelZone.grid;
    grid.pathGrids = grid.pathGrids || {};
    const gridID = x + 'x' + y;
    if (!grid.pathGrids[gridID]) {
      const pathGrid = grid.pathGrids[gridID] = [];
      pathGrid[x] = [];
      pathGrid[x][y] = 0;
      let queue = [{
        i: i,
        x: x,
        y: y,
      }];
      while (queue.length > 0) {
        const q = queue;
        queue = [];
        for (const i in q) {
          const p = q[i];
          const cost = pathGrid[p.x][p.y];
          const check = (z, i, x, y, cost) => {
            if (cost > 20) {
              return;
            }
            if (grid[i] && grid[i][x] && grid[i][x][y][0] === 2) {

              return;
            }
            if (grid[i] && grid[i][x] &&
              grid[i][x][y][0] === 1 && grid[i][x][y][1] - 100.0 / 6.0 > z
            ) {

              return;
            }
            if (grid[i] && grid[i][x] &&
              grid[i][x][y][0] === 0 && i !== 2) {

              return;
            }
            if (pathGrid[x] && pathGrid[x][y] !== undefined &&
              pathGrid[x][y] <= cost) {
              return;
            }
            pathGrid[x] = pathGrid[x] || [];
            if (pathGrid[x][y] === undefined) {
              queue.push({
                i: i,
                x: x,
                y: y,
              });
            }
            pathGrid[x][y] = cost;
          }

          let z = 0;
          if (grid[p.i] && grid[p.i][p.x] && grid[p.i][p.x][p.y]) {
            z = grid[p.i][p.x][p.y][1];
          }

          check(z, p.i, p.x + 1, p.y, cost + 1);
          check(z, p.i, p.x - 1, p.y, cost + 1);
          check(z, p.i, p.x, p.y + 1, cost + 1);
          check(z, p.i, p.x, p.y - 1, cost + 1);

          check(z, p.i, p.x + 1, p.y + 1, cost + 1.414);
          check(z, p.i, p.x - 1, p.y + 1, cost + 1.414);
          check(z, p.i, p.x + 1, p.y - 1, cost + 1.414);
          check(z, p.i, p.x - 1, p.y - 1, cost + 1.414);
        }
      }
    }

    this.pathGrid = grid.pathGrids[gridID];

    if (grid[i] && grid[i][x] && grid[i][x][y]) {
      this.opts.z += grid[i][x][y][1];
    }
  }

  getNextPoint(x, y) {
    const check = (p, x, y, cost) => {
      if (!this.pathGrid[x] || this.pathGrid[x][y] === undefined) {
        return;
      }
      if (this.pathGrid[x][y] + cost <= p.cost) {
        p.x = x;
        p.y = y;
        p.cost = this.pathGrid[x][y] + cost;
      }
    }

    if (this.pathGrid[x] && this.pathGrid[x][y] === 0) {
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
    if (this.opts.IS_NPC) {
      return;
    }
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

    if (!this.pathGrid[x] || this.pathGrid[x][y] === undefined) {
      return;
    }

    if (Math.floor(player.z / 100.0) !== Math.floor(this.opts.z / 100.0)) {
      return;
    }
    this.opts.AGRO_D = Math.min(this.opts.AGRO_D, 16);
    if (this.target === player || this.pathGrid[x][y] <= this.opts.AGRO_D) {
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
          const cost = this.onWay || 4;
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

  checkHitDop(i) {
    let dop = this.moveset[this.movesetI][i][6];
    let time = this.moveset[this.movesetI][i][7];
    if (dop === 'jump') {
      if (time <= 0) {
        this.fighter.doJump();
      } else {
        setTimeout(() => {
          this.fighter.doJump();
        }, time * 1000 * this.fighter.hitSpeed);
      }
    }
    if (dop === 'roll') {
      if (time <= 0) {
        this.fighter.doRoll();
      } else {
        setTimeout(() => {
          this.fighter.doRoll();
        }, time * 1000 * this.fighter.hitSpeed);
      }
    }
  }

  checkNextHit() {
    if (!this.actTime) {
      return;
    }
    if (!this.target || !this.fighter.inHit) {
      this.lastAct = this.act;
      delete this.actTime;
      return;
    }
    let canAttack = true;
    const distance = this.fighter.pos.subtract(this.target.pos)
      .length();
    if (distance > 700 * this.fighter.scale) {
      canAttack = false;
    }

    if (!canAttack) {
      this.lastAct = this.act;
      delete this.actTime;
      return;
    }

    this.hitDir = this.fighter.hitVec.clone()
      .unit()
      .multiply(10000);
    const newHitDir = this.target.pos
      .subtract(this.fighter.pos);
    let a = (newHitDir.toAngle() - this.hitDir.toAngle()) *
      Math.PI / 180.0;
    if (a > Math.PI) {
      a -= Math.PI * 2;
    }
    if (a < -Math.PI) {
      a += Math.PI * 2;
    }
    if (Math.abs(a) > 130 * Math.PI / 180.0) {
      this.lastAct = this.act;
      delete this.actTime;
      return;
    }
    const af = 20 + Math.random() * 15;
    a = Math.min(Math.abs(a), af * Math.PI / 180.0) *
      Math.sign(a);
    this.hitDir = vec3.fromAngles(0, this.hitDir.toAngle() *
        Math.PI / 180.0 + a)
      .multiply(10000);


    let type = Math.floor(Math.random() * 3);
    if (this.moveset) {
      const n = this.moveset[8];
      let i = this.fighter.hitStage;
      if (!this.moveset[this.movesetI][i]) {
        this.lastAct = this.act;
        delete this.actTime;
        return;
      }
      type = this.moveset[this.movesetI][i][0];

      this.checkHitDop(i);
    }

    ++this.hitStage;
    this.fighter.doHit({
      x: this.fighter.pos.x + this.hitDir.x,
      y: this.fighter.pos.y + this.hitDir.y,
      type: type,
    });

    if (!this.moveset && this.hitStage >= 3) {
      this.lastAct = this.act;
      delete this.actTime;
      return;
    }
    if (this.moveset &&
      this.hitStage >= (this.moveset[this.movesetI][4] || 4) - 1) {

      this.lastAct = this.act;
      delete this.actTime;
      return;
    }
  }

  update() {
    if (this.target && !this.fighter.isAlive) {
      delete this.target;
      delete this.path;
      delete this.onWay;
    }
    if (!this.fighter.isAlive) {
      return;
    }

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
      if (next && next.cost < 4) {
        const dx = Math.abs(this.fighter.pos.x -
          (next.x * WALL_SIZE + WALL_SIZE * 0.5));
        const dy = Math.abs(this.fighter.pos.y -
          (next.y * WALL_SIZE + WALL_SIZE * 0.5));
        if (dx + dy < WALL_SIZE) {
          next = undefined;
        }
      }
    }
    let nextX;
    let nextY;

    if (next) {
      nextX = next.x * WALL_SIZE + WALL_SIZE * 0.5;
      nextY = next.y * WALL_SIZE + WALL_SIZE * 0.5;
    }

    let canAttack;
    let inRun;

    if (this.target) {
      const dx = this.fighter.pos.x - this.target.pos.x;
      const dy = this.fighter.pos.y - this.target.pos.y;
      const d = Math.sqrt(dx * dx + dy * dy);

      const px = Math.floor(this.target.pos.x / WALL_SIZE);
      const py = Math.floor(this.target.pos.y / WALL_SIZE);

      const needGoHome = !this.pathGrid[px] ||
        this.pathGrid[px][py] === undefined ||
        this.pathGrid[px][py] > this.opts.RUN_D ||
        this.target.isDestroyed ||
        !this.target.isAlive;
      if (needGoHome) {
        delete this.target;
        delete this.path;
        delete this.onWay;
        delete this.fighter.absLook;
        inRun = false;
        this.fighter.emitPos();
      } else if (this.pathGrid[tx] && this.pathGrid[px]) {
        if (d > 700) {
          inRun = true;
        }

        this.attackDistance = this.attackDistance ||
          (this.opts.HIT_D[0] + this.opts.HIT_D[1] * Math.random()) *
          this.fighter.scale;

        const needForce = d > this.attackDistanced &&
          d < this.attackDistance * 3 &&
          this.target.speed.length() > 50 &&
          Math.random() < 0.05;

        canAttack = d < this.attackDistance;
        if (d < this.attackDistance * 0.5 && Math.random() < 0.5) {
          canAttack = undefined;
        }
        if (Math.abs(this.fighter.z - this.target.z) > 30) {
          canAttack = undefined;
        }
        this.canAttack = canAttack;
        if (!canAttack) {
          if (needForce) {
            canAttack = true;
            inRun = true;
          } else if (d < this.attackDistance * 0.5) {
            nextX = this.fighter.pos.x * 2 - this.target.pos.x;
            nextY = this.fighter.pos.y * 2 - this.target.pos.y;
          } else {
            delete this.attackDistance;
            if (Math.random() < 0.3) {
              inRun = true;
            }
          }
        }
      }
    }

    if (nextX) {
      const dx = Math.sign(nextX - this.fighter.pos.x);
      const dy = Math.sign(nextY - this.fighter.pos.y);
      const wx = tx + dx;
      const wy = ty + dy;
      const grid = this.gameLevelZone.grid;
      if (grid[wx]) {
        switch (grid[wx][wy]) {
          case undefined:
            break;
          case 2:
          case 3:
            if (dx !== 0) {
              nextX = this.fighter.pos.x - dx * WALL_SIZE;
            }
            if (dy !== 0) {
              nextY = this.fighter.pos.y - dy * WALL_SIZE;
            }
            break;
          default:
        }
      }
    }

    if (canAttack) {
      if (!this.fighter.inBlock) {
        this.fighter.onKeyR();
      }
      inRun = false;

      if (this.act === 'hit' && !this.fighter.inHit) {
        this.lastAct = this.act;
        delete this.act;
        delete this.actTime;
      }

      if (!this.act) {
        const lastActIsMove =
          this.lastAct !== 'left' && this.lastAct !== 'right';

        if (this.lastAct !== 'hit' && Math.random() < this.opts.HIT_VER) {
          this.act = 'hit';
          this.hitDir = this.target.pos
            .subtract(this.fighter.pos)
            .unit()
            .multiply(10000);

          let type = Math.floor(Math.random() * 3);
          if (this.moveset) {
            const n = this.moveset[7];
            this.movesetI = Math.floor(Math.random() * n);
            type = this.moveset[this.movesetI][0][0];
            this.checkHitDop(0);
          }
          this.hitStage = 0;

          this.fighter.doHit({
            x: this.fighter.pos.x + this.hitDir.x,
            y: this.fighter.pos.y + this.hitDir.y,
            type: type,
          });

          this.actTime = 1000;
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
      this.actTime -= dt * 15;
      if (this.actTime <= 0) {
        this.lastAct = this.act;
        delete this.actTime;
      }
    }
    if (!this.actTime && !this.fighter.inHit && this.act) {
      delete this.act;
    }

    if (this.target && this.opts.ROLL_TIME && !this.fighter.inHit) {
      this.rollTime = this.rollTime ||
        this.opts.ROLL_TIME[0] + this.opts.ROLL_TIME[1] * Math.random();
      this.rollTime -= dt * 15;
      if (this.rollTime <= 0) {
        delete this.rollTime;
        this.fighter.doRoll();
      }
    }
    if (this.target && this.opts.JUMP_TIME && !this.fighter.inHit) {
      this.jumpTime = this.jumpTime ||
        this.opts.JUMP_TIME[0] + this.opts.JUMP_TIME[1] * Math.random();
      this.jumpTime -= dt * 15;
      if (this.jumpTime <= 0) {
        delete this.jumpTime;
        this.fighter.doJump();
      }
    }

    const oldX = this.fighter.inputMove.x;
    const oldY = this.fighter.inputMove.y;
    const oldRun = this.fighter.inRun;

    const newInputMove = {
      x: 0,
      y: 0
    };
    if (nextX) {
      if (Math.abs(nextX - this.fighter.pos.x) > 20) {
        newInputMove.x = Math.sign(nextX - this.fighter.pos.x);
      }
      if (Math.abs(nextY - this.fighter.pos.y) > 20) {
        newInputMove.y = Math.sign(nextY - this.fighter.pos.y);
      }
      if (inRun !== undefined) {
        this.fighter.inRun = inRun;
      }
    }
    this.fighter.inputMove = newInputMove;
    const hasChange =
      oldX !== this.fighter.inputMove.x ||
      oldY !== this.fighter.inputMove.y ||
      oldRun !== this.fighter.inRun;
    if (hasChange) {
      this.fighter.emitPos();
    }
  }

  onDie(source) {
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

    if (!source) {
      return;
    }
    this.opts.dies = this.opts.dies || 0;

    if (this.opts.dies === 0) {
      this.gameLevelZone.timeouts.push({
        breakable: true,
        time: 60 * 5,
        fn: () => {
          this.reborn();
        },
      });
    }
    if (this.opts.dies < this.opts.DIES || 0) {
      for (let i = 0; i < this.opts.DIES_N; ++i) {
        this.gameLevelZone.timeouts.push({
          breakable: true,
          time: 0.1 + Math.random() * 0.1,
          fn: () => {
            const opts = {};
            for (const k in this.opts) {
              opts[k] = this.opts[k];
            }
            opts.FIGHTER = {};
            for (const k in this.opts.FIGHTER) {
              opts.FIGHTER[k] = this.opts.FIGHTER[k];
            }
            Object.assign(opts, {
              dies: opts.dies + 1,
              x: this.fighter.pos.x + Math.random() * 2,
              y: this.fighter.pos.y + Math.random() * 2,
            });
            Object.assign(opts.FIGHTER, {
              HP: opts.FIGHTER.HP * opts.DIES_SCALE,
              SCALE: opts.FIGHTER.SCALE * opts.DIES_SCALE,
              hitSpeed: opts.FIGHTER.hitSpeed * opts.DIES_SCALE,
              damage: opts.FIGHTER.damage * opts.DIES_SCALE,
              BALANCE_SCALE: (opts.FIGHTER.BALANCE_SCALE || 1) *
                0.5,
              BALANCE: opts.FIGHTER.BALANCE * opts.DIES_SCALE,
            });
            const mob = new Mob(this.gameLevelZone, opts);
            this.gameLevelZone.tempMobs.push(mob);
          },
        });
      }
    }

    if (source.kind === 'player' && this.opts.VOIDS_COUNT) {
      source.owner.params.fighter.params.voidsCount +=
        this.opts.VOIDS_COUNT;
      source.owner.saveSharedParam('fighter', 'params',
        source.owner.params.fighter.params);
    }
  }
}