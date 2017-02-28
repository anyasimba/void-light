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