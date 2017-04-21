export let objectsNum = 0;

const MixGameObjectBase = global.MixGameObject;
export const MixGameObject = base => class extends mix(base, MixGameObjectBase) {
  constructor(data, state, ...args) {
    ++global.objectsNum;

    if (data.parentID) {
      state.parent = gameObjects[data.parentID];
    }
    state.bottomGroup = new Phaser.Group(game);
    state.middleGroup = new Phaser.Group(game);
    state.topGroup = new Phaser.Group(game);
    state.ceilGroup = new Phaser.Group(game);
    state.infoGroup = new Phaser.Group(game);
    state.group = new Phaser.Group(game);

    super(data.id, state, ...args);

    if (data.parentID) {
      this.group.add(this.bottomGroup);
      this.group.add(this.middleGroup);
      this.group.add(this.topGroup);
      this.group.add(this.ceilGroup);
      this.parent.middleGroup.add(this.group);
      this.parent.infoGroup.add(this.infoGroup);
    } else {
      this.group.update = () => {
        this.updateVisibility();
        if (!this.visible) {
          return;
        }
        this.update();

        this.z = this.z || 0;
        const p = game.cameraPos;
        const a = -game.cameraAngle + 90;
        let px = p.x - this.group.x +
          1500 * Math.cos(a * Math.PI / 180.0) * cameraDF;
        let py = p.y - this.group.y +
          1500 * Math.sin(a * Math.PI / 180.0) * cameraDF;

        const groups = [
          this.bottomGroup,
          this.middleGroup,
          this.topGroup,
          this.ceilGroup,
        ];
        let i = 0;
        for (const k in groups) {
          const g = groups[k];
          g.x = this.group.x;
          g.y = this.group.y;
          g.scale.x = this.group.scale.x;
          g.scale.y = this.group.scale.y;
          g.angle = this.group.angle;
          g.alpha = this.group.alpha;

          if (i < 3) {
            const f =
              (pf / (pf + client.player.z - this.z - i * 100 / 6)) /
              (pf / (pf + client.player.z - Math.min(this.lastL + i, 36) *
                100 / 6));
            g.scale.x *= f;
            g.scale.y *= f;
            g.x = p.x - px * f + 1500 * Math.cos(a * Math.PI / 180.0) *
              cameraDF;
            g.y = p.y - py * f + 1500 * Math.sin(a * Math.PI / 180.0) *
              cameraDF;
          }
          ++i;
        }
        this.infoGroup.x = this.group.x;
        this.infoGroup.y = this.group.y;
        this.infoGroup.alpha = this.group.alpha;
      }

      this.updateViewScale();
    }
  }
  updateVisibility() {
    if (super.update) {
      super.update();
    }
    if (!this.parent && global.client && global.client.player) {
      global.ts = global.ts || 0;
      const cx = this.pos.x;
      const cy = this.pos.y;
      const dx = Math.abs(cx - game.cameraPos.x);
      const dy = Math.abs(cy - game.cameraPos.y);
      const fx = 1 / game.sceneWrap.scale.x;
      const fy = 1 / game.sceneWrap.scale.y;
      let w = 800;
      let h = 800;
      if (this.size && typeof this.size === 'object') {
        w = this.size.x + 300;
        h = this.size.y + 300;
      }

      this.z = this.z || 0;
      let l = Math.floor(this.z / 100.0 * 6 + 0.5);
      l = Math.max(l, 0);

      let li = Math.floor(this.z / 100.0 + 1 / 12);
      li = Math.min(li, 5);
      li = Math.max(li, 0);
      const la = game.layers[li].sub['mix' + Math.min(l - li * 6 + 1, 7)].alpha;

      if (la <= 0.0 || (dx < game.w * 0.5 * fx + w && dy < game.h * 0.5 *
          fy + h)) {
        this.visible = true;
        this.bottomGroup.visible = true;
        this.middleGroup.visible = true;
        this.topGroup.visible = true;
        this.infoGroup.visible = true;
        this.ceilGroup.visible = true;
      } else {
        this.visible = false;
        this.bottomGroup.visible = false;
        this.middleGroup.visible = false;
        this.topGroup.visible = false;
        this.infoGroup.visible = false;
        this.ceilGroup.visible = false;
      }
    }
  }
  update() {
    if (this.parent) {
      if (super.update) {
        super.update();
      }
    }
    if (!this.parent && global.client && global.client.player) {
      this.updateViewScale();
    }
  }
  updateViewScale() {
    this.z = this.z || 0;
    let l = Math.floor(this.z / 100.0 * 6 + 0.5);
    l = Math.max(l, 0);

    let li = Math.floor(this.z / 100.0 + 1 / 12);
    li = Math.min(li, 5);
    li = Math.max(li, 0);
    if (l !== this.lastL) {
      game.layers[li].sub['mix' + Math.min(l - li * 6 + 1, 7)].add(this.bottomGroup);
      game.layers[li].sub['mix' + Math.min(l - li * 6 + 2, 7)].add(this.middleGroup);
      game.layers[li].sub['mix' + Math.min(l - li * 6 + 3, 7)].add(this.topGroup);
      game.layers[li].sub.ceil.add(this.ceilGroup);
      game.layers[li].sub.info.add(this.group);
      game.layers[li].sub.info.add(this.infoGroup);
    }
    this.lastL = l;
  }
  destructor() {
    --global.objectsNum;

    super.destructor();

    if (this.smoothDestroy) {
      const group = new Phaser.Group(game);
      group.x = this.parent.middleGroup.x;
      group.y = this.parent.middleGroup.y;
      group.scale.x = this.parent.middleGroup.scale.x;
      group.scale.y = this.parent.middleGroup.scale.y;
      group.angle = this.parent.middleGroup.angle;

      group.add(this.group);
      let l = Math.floor(this.parent.z / 100.0 * 6 + 0.5);
      l = Math.max(l, 0);

      let li = Math.floor(this.parent.z / 100.0 + 1 / 12);
      li = Math.min(li, 5);
      li = Math.max(li, 0);
      game.layers[li].sub['mix' + Math.min(l - li * 6 + 1, 7)].add(group);

      let a = 1;
      const interval = setInterval(() => {
        a -= 0.1 / 30.0;
        if (a <= 0) {
          clearInterval(interval);
          group.destroy();
          this.bottomGroup.destroy();
          this.middleGroup.destroy();
          this.topGroup.destroy();
          this.group.destroy();
          this.infoGroup.destroy();
        } else {
          group.alpha = a;
        }
      }, 1000.0 / 30.0);
      return;
    }

    this.bottomGroup.destroy();
    this.middleGroup.destroy();
    this.topGroup.destroy();
    this.ceilGroup.destroy();
    this.group.destroy();
    this.infoGroup.destroy();
  }

  playSound(name) {
    const sound = game.add.sound(name);
    sound.volume = this.soundVolume();
    sound.play();
    return sound;
  }
  soundVolume() {
    if (game.cameraPos) {
      const d = this.pos.subtract(game.cameraPos).length();
      return 100000 / (100000 + d * d);
    }
    return 0;
  }
}