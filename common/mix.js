export function mix(base, ...mixins) {
  if (mixins.length === 0) {
    return base;
  }
  return mixins[0](mix(base, ...mixins.slice(1)));
}