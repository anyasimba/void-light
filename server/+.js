const preMainCbs = [];
global.preMain = cb => {
  preMainCbs.push(cb);
}

const _require = require;
global.express = _require('express');
global.io = _require('socket.io');
global.http = _require('http');
global.fs = _require('fs');

global.native = require('../build/Release/binding');

globally(require('../common/+'));
globally(require('../shared/+'));

globally(require('./!main'));
globally(require('./configs/+'));
globally(require('./GameLevelZone/+'));
globally(require('./mix/MixGameObject'));
globally(require('./mobs/stage1'));
globally(require('./shared-objects/+'));
globally(require('./Client'));
globally(require('./Mob'));
globally(require('./NPC'));
globally(require('./Server'));

(async() => {
  for (const cb of preMainCbs) {
    await cb();
  }
  main();
})();