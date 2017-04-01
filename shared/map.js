export function loadMapDictionary(map) {
  const prefix = '../_editor-assets/';

  const layers = map.layers;
  const tilesets = map.tilesets;
  const tiles = {};
  for (const k in tilesets) {
    const set = tilesets[k];
    const firstgid = set.firstgid;
    for (const k in set.tiles) {
      const tile = set.tiles[k];
      const id = firstgid + parseInt(k);
      let slug = tile.image.slice(prefix.length, -4);
      slug = slug.slice(slug.indexOf('/') + 1);
      tiles[id] = slug;
    }
  }
  return tiles;
}