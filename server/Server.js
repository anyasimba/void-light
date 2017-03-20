function assert(flag, msg) {
  if (!flag) {
    console.log(msg);
    process.exit(1);
  }
}

export function mongoInsert(table, v) {
  return new Promise(r => {
    const collection = mongo.collection(table);
    collection.insertMany(v, (err, result) => {
      assert(err === null, err);
      r(result);
    });
  });
}
export function mongoUpdate(table, k, v) {
  return new Promise(r => {
    const collection = mongo.collection(table);
    collection.updateOne(k, {
      $set: v
    }, (err, result) => {
      assert(err === null, err);
      r(result);
    });
  });
}
export function mongoDelete(table, k) {
  return new Promise(r => {
    const collection = mongo.collection(table);
    collection.deleteMany(k, (err, result) => {
      assert(err === null, err);
      r(result);
    });
  });
}
export function mongoFind(table, k) {
  return new Promise(r => {
    const collection = mongo.collection(table);
    collection.find(k).toArray((err, docs) => {
      assert(err === null, err);
      r(docs);
    });
  });
}

function mongoDB() {
  const MongoClient = require('mongodb').MongoClient;

  const url = 'mongodb://localhost:27017/voidlight';
  return new Promise(r => {
    MongoClient.connect(url, async(err, db) => {
      assert(err === null, err);
      console.log("Connected to mongoDB");

      global.mongo = db;
      r();
    });
  });
}

export async function Server() {
  await mongoDB();

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