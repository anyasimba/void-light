export function Server() {
  const server = express();

  server.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods',
      'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  Object.assign(server, {
    useStaticFile(route, path) {
      path = path || ('.' + route);
      server
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
      server
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

  server
    .useStaticFile('/', 'client/views/layout.html')
    .useStaticFile('/client.js')
    .useStaticFile('/client.min.js')
    .useStaticFile('/client.dev.js')
    .useStaticFolder('/assets/')
    .useStaticFolder('/client/third-party/')
    .useStaticFolder('/client/')
    .useStaticFolder('/maps/')
    .useStaticFolder('/shared/');

  const socksServer = http.createServer(server);
  const ioListener = io(socksServer, {
    origins: 'http://localhost:* http://127.0.0.1:*',
  });
  socksServer.listen(3000, '0.0.0.0');
  ioListener.sockets.on('connection', server.onUserConnect);

  return server;
}