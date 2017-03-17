const modules = {};
let moduleID = 0;
global.globally = module => {
  if (!module.___id) {
    module.___id = moduleID;
    ++moduleID;
  }
  if (!modules[module.___id]) {
    modules[module.___id] = true;
    for (const k in module) {
      if (k !== '___id') {
        global[k] = module[k];
      }
    }
  }
}

require('./server/+');