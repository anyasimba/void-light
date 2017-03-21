'use strict';

const goal = process.argv[2];
const file = process.argv[3];

switch (goal) {
  case 'default':
    beautify();
    build()
      .addListener('finish', () => {
        runServer();
      });
    break;
  case 'run':
    runServer();
  default:
}

/**
 * build
 */
function build() {
  return buildClientJS();
}

function buildClientJS() {
  const fs = require('fs');

  const browserify = require('browserify');
  const babelify = require('babelify');

  const r = browserify({
      debug: true,
    })
    .transform(babelify, {
      ignore: /(bower_components)|(node_modules)/,
      presets: ['es2015'],
      plugins: [
        'transform-async-to-generator', ['transform-runtime', {
          'helpers': false,
          'polyfill': true,
        }],
      ],
      compact: true,
    })
    .require(__dirname + '/client.js', {
      entry: true,
    })
    .bundle()
    .pipe(fs.createWriteStream(__dirname + '/client.dev.js'));

  console.log('=> begin build client');
  const date = new Date;
  r.addListener('finish', () => {
    const dt = ((new Date).getTime() - date.getTime()) * 0.001;
    console.log('[ok] done build client (' + dt + 's)');
  });

  return r;
}

function buildFinalClientJS() {
  const fs = require('fs');

  const browserify = require('browserify');

  browserify({
      debug: true
    })
    .transform('babelify', {
      'presets': ['es2015'],
      'plugins': [
        'transform-async-to-generator', ['transform-runtime', {
          'helpers': false,
          'polyfill': false,
        }],
      ],
    })
    .transform({
      'global': true,
    }, 'uglifyify')
    .require(__dirname + '/client.js', {
      entry: true,
    })
    .bundle()
    .pipe(fs.createWriteStream(__dirname + '/client.min.js'));
}

/**
 * run
 */
function runServer() {
  const execSync = require('child_process').execSync;
  execSync('node-gyp build');

  const traceur = require('traceur');

  require('traceur-source-maps').install(traceur);

  traceur.require.makeDefault(fileName => {
    return fileName.indexOf('node_modules') === -1;
  }, {
    'asyncFunctions': true,
  });

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

  setImmediate(() => {
    require('./server/+');
  });
}

function buildServerJS() {
  const fs = require('fs');

  const browserify = require('browserify');
  const babelify = require('babelify');

  const r = browserify({
      debug: true,
    })
    .transform(babelify, {
      ignore: /(bower_components)|(node_modules)/,
      presets: ['es2015'],
      plugins: [
        'transform-async-to-generator', ['transform-runtime', {
          'helpers': false,
          'polyfill': false,
        }],
      ],
      compact: false,
    })
    .require(__dirname + '/server.js', {
      entry: true,
    })
    .bundle()
    .pipe(fs.createWriteStream(__dirname + '/server.dev.js'));

  console.log('=> begin build server');
  const date = new Date;
  r.addListener('finish', () => {
    const dt = ((new Date).getTime() - date.getTime()) * 0.001;
    console.log('[ok] done build server (' + dt + 's)');

    setImmediate(() => {
      require('./server.dev');
    });
  });

  return r;
}

/**
 * beautify
 */
function beautify() {
  if (file) {
    if (file.indexOf('third-party') >= 0) {
      return;
    }
    const path = require('path');
    switch (path.extname(file)) {
      case '.js':
        beautifyJS();
        break;
      default:
    }
  } else {
    beautifyJS();
  }
}

function beautifyJS() {
  var files = [];
  if (file) {
    files = [file];
  }

  const fs = require('fs');
  const jsBeautify = require('js-beautify').js_beautify;
  for (const file of files) {
    var content = fs.readFileSync(file, 'utf8');
    content = jsBeautify(content, {
      indent_size: 2,
      space_after_anon_function: true,
      wrap_line_length: 79,
    });
    fs.writeFileSync(file, content);
  }
}