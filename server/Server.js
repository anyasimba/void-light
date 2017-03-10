export function Server() {
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