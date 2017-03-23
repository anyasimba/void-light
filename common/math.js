Math.sign = function (n) {
  if (n > 0) {
    return 1;
  } else if (n < 0) {
    return -1;
  }
  return 0;
}

export function RGBtoHEX(r, g, b) {
  return r << 16 | g << 8 | b;
}
export function HEXtoRGB(hex) {
  const r = hex >> 16;
  const g = hex >> 8 & 0xFF;
  const b = hex & 0xFF;
  return {
    r: r,
    g: g,
    b: b,
  };
}
export function multiplyTint(tint1, tint2) {
  const c1 = HEXtoRGB(tint1);
  const c2 = HEXtoRGB(tint2);
  c1.r = Math.round(c1.r * c2.r / 255.0);
  c1.g = Math.round(c1.g * c2.g / 255.0);
  c1.b = Math.round(c1.b * c2.b / 255.0);
  return RGBtoHEX(c1.r, c1.g, c1.b);
}