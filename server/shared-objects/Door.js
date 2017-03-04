export class Door extends mix(global.Door, MixGameObject) {
  get state() {
    return {
      pos: this.pos,
      size: this.size,

      progress: this.progress,
    };
  }

  constructor(gameLevelZone, opts) {
    super({
      isStatic: true,
      
      pos: new vec3(opts.mapX, opts.mapY),
      size: new vec3(opts.mapW, opts.mapH),

      progress: 0,
    });

    this.gameLevelZone = gameLevelZone;

    this.body = {
      kind: 'circle',
      size: this.size.x,
    }

    this.gameLevelZone.addObject(this);
  }
}