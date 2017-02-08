export function Server() {
  const server = express();

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
    .useStaticFolder('/client/third-party/')
    .useStaticFolder('/client/')
    .useStaticFolder('/maps/')
    .useStaticFolder('/shared/');

  server.listen(3000);

  const socksServer = http.createServer();
  const ioListener = io.listen(socksServer);
  socksServer.listen(8080);

  ioListener.sockets.on('connection', server.onUserConnect);

  return server;
}