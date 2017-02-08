export function clampAngle(angle) {
  angle = angle % 360;
  if (angle < 0) {
    angle += 360;
  }
  return angle;
}

export function isAngleInRange(angle, a1, a2) {
  angle = clampAngle(angle);
  a1 = clampAngle(a1);
  a2 = clampAngle(a2);

  if (a1 > a2) {
    return ((angle >= a1) || (angle <= a2))
  } else if (a2 > a1) {
    return ((angle <= a2) && (angle >= a1))
  } else {
    return (angle === a2)
  }
}