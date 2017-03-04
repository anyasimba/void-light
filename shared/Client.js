export class Client {
  constructor(sock) {
    if (sock) {
      this.__sock = sock;
    } else {
      this.__sock = io.connect('http://' + location.hostname + ':3000');
    }

    this
      .on('connect', () => {
        this.onConnect();
      })
      .on('disconnect', () => {
        this.onDisconnect();
      });
  }
  get sock() {
    return this.__sock;
  }
  on(event, cb) {
    this.__sock.on(event, cb);
    return this;
  }
  emit(event, data) {
    this.__sock.emit(event, data);
    return this;
  }
  onConnect() {}
  onDisconnect() {}
}