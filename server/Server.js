function assert(flag, msg) {
  if (!flag) {
    logAndExit(msg);
  }
}

function logAndExit(msg) {
  console.log(msg);
  process.exit(1);
}

async function exitOnErrorAsync(body) {
  try {
    return await body();
  } catch (ex) {
    logAndExit(ex);
  }
}

export function mongoInsert(table, v) {
  return exitOnErrorAsync(() => {
    const collection = mongo.collection(table);
    return collection.insertMany(v);
  })
}

export function mongoUpdate(table, k, v) {
  return exitOnErrorAsync(() => {
    const collection = mongo.collection(table);
    return collection.updateOne(k, {
      $set: v
    });
  });
}

export function mongoDelete(table, k) {
  return exitOnErrorAsync(() => {
    const collection = mongo.collection(table);
    return collection.deleteMany(k);
  });
}
export function mongoFind(table, k) {
  return exitOnErrorAsync(() => {
    const collection = mongo.collection(table);
    return collection.find(k).toArray();
  })
}

async function mongoConnect(url) {
  return exitOnErrorAsync(() => {
    const { MongoClient } = require('mongodb');
    return MongoClient.connect(url);
  });
}

export async function Server() {
  global.mongo = await mongoConnect('mongodb://localhost:27017/voidlight');
  console.log("Connected to mongoDB");

  const app = express();

  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods',
      'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  Object.assign(app, {
    useStaticFile(route, path, fn) {
      path = path || ('.' + route);
      app
        .get(route, (req, res) => {
          res.sendFile(path, {
            'root': './',
          });
        })
        .use(route, (err, req, res, next) => {
          next();
        });
      return this;
    },

    useStaticFolder(route, path) {
      path = path || ('.' + route);
      route += '*';
      app
        .get(route, (req, res) => {
          res.sendFile(path + req.params[0], {
            'root': './',
          });
        })
        .use(route, (err, req, res, next) => {
          next();
        });
      return this;
    },

    onUserConnect(sock) {
      console.log('User connected');
      new Client(sock);
    }
  });

  app
    .useStaticFile('/', 'client/views/layout.html')
    .useStaticFile('/client.js')
    .useStaticFile('/client.min.js')
    .useStaticFile('/client.dev.js')
    .useStaticFolder('/assets/')
    .useStaticFolder('/client/third-party/')
    .useStaticFolder('/client/')
    .useStaticFolder('/maps/')
    .useStaticFolder('/shared/');

  const socks = http.createServer(app);
  const ioListener = io(socks);
  socks.listen(3000, '0.0.0.0');
  ioListener.sockets.on('connection', app.onUserConnect);

  return app;
}