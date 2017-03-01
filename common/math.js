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