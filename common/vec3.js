export class vec3 {
  constructor(x, y, z) {
    if (x && typeof x !== 'number') {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
      return;
    }
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  negative() {
    return new vec3(-this.x, -this.y, -this.z);
  }
  add(v) {
    if (typeof v !== 'number') {
      return new vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    } else {
      return new vec3(this.x + v, this.y + v, this.z + v);
    }
  }
  subtract(v) {
    if (typeof v !== 'number') {
      return new vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    } else {
      return new vec3(this.x - v, this.y - v, this.z - v);
    }
  }
  multiply(v) {
    if (typeof v !== 'number') {
      return new vec3(this.x * v.x, this.y * v.y, this.z * v.z);
    } else {
      return new vec3(this.x * v, this.y * v, this.z * v);
    }
  }
  divide(v) {
    if (typeof v !== 'number') {
      return new vec3(this.x / v.x, this.y / v.y, this.z / v.z);
    } else {
      return new vec3(this.x / v, this.y / v, this.z / v);
    }
  }
  equals(v) {
    return this.x == v.x && this.y == v.y && this.z == v.z;
  }
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  cross(v) {
    return new vec3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }
  length() {
    return Math.sqrt(this.dot(this));
  }
  unit() {
    return this.divide(this.length());
  }
  min() {
    return Math.min(Math.min(this.x, this.y), this.z);
  }
  max() {
    return Math.max(Math.max(this.x, this.y), this.z);
  }
  toAngle() {
    return Math.atan2(this.y, this.x) * 180 / Math.PI;
  }
  toAngles() {
    return {
      theta: Math.atan2(this.z, this.x),
      phi: Math.asin(this.y / this.length())
    }
  }
  angleTo(a) {
    return Math.acos(this.dot(a) / (this.length() * a.length()));
  }
  toArray(n) {
    return [this.x, this.y, this.z].slice(0, n || 3);
  }
  clone() {
    return new vec3(this.x, this.y, this.z);
  }
  init(x, y, z) {
    if (x && typeof x !== 'number') {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
      return this;
    }
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    return this;
  }

  static negative(a, b) {
    b.x = -a.x;
    b.y = -a.y;
    b.z = -a.z;
    return b;
  }
  static add(a, b) {
    if (typeof b !== 'number') {
      a.x = a.x + b.x;
      a.y = a.y + b.y;
      a.z = a.z + b.z;
    } else {
      a.x = a.x + b;
      a.y = a.y + b;
      a.z = a.z + b;
    }
  }
  static subtract(a, b) {
    if (typeof b !== 'number') {
      a.x = a.x - b.x;
      a.y = a.y - b.y;
      a.z = a.z - b.z;
    } else {
      a.x = a.x - b;
      a.y = a.y - b;
      a.z = a.z - b;
    }
  }
  static multiply(a, b) {
    if (typeof b !== 'number') {
      a.x = a.x * b.x;
      a.y = a.y * b.y;
      a.z = a.z * b.z;
    } else {
      a.x = a.x * b;
      a.y = a.y * b;
      a.z = a.z * b;
    }
  }
  static divide(a, b) {
    if (typeof b !== 'number') {
      a.x = a.x / b.x;
      a.y = a.y / b.y;
      a.z = a.z / b.z;
    } else {
      a.x = a.x / b;
      a.y = a.y / b;
      a.z = a.z / b;
    }
  }
  static cross(a, b) {
    a.x = a.y * b.z - a.z * b.y;
    a.y = a.z * b.x - a.x * b.z;
    a.z = a.x * b.y - a.y * b.x;
  }
  static unit(a) {
    const length = a.length();
    a.x = a.x / length;
    a.y = a.y / length;
    a.z = a.z / length;
  }
  static fromAngles(theta, phi) {
    return new vec3(
      Math.cos(theta) * Math.cos(phi),
      Math.sin(phi),
      Math.sin(theta) * Math.cos(phi));
  }
  static randomDirection() {
    return vec3.fromAngles(
      Math.random() * Math.PI * 2,
      Math.asin(Math.random() * 2 - 1));
  }
  static min(a, b) {
    return new vec3(
      Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
  }
  static max(a, b) {
    return new vec3(
      Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
  }
  static lerp(a, b, fraction) {
    return b.subtract(a).multiply(fraction).add(a);
  }
  static fromArray(a) {
    return new vec3(a[0], a[1], a[2]);
  }
  static angleBetween(a, b) {
    return a.angleTo(b);
  }
}