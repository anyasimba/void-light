const preMainCbs = [];
global.preMain = cb => {
  preMainCbs.push(cb);
}

global.express = require('express');
global.io = require('socket.io');
global.http = require('http');
global.fs = require('fs');

globally(require('../common/+'));
globally(require('../shared/+'));

globally(require('./!main'));
globally(require('./mix/MixGameObject'));
globally(require('./shared-objects/+'));
globally(require('./Client'));
globally(require('./GameLevelZone'));
globally(require('./Server'));

(async() => {
  for (const cb of preMainCbs) {
    await cb();
  }
})();

main();